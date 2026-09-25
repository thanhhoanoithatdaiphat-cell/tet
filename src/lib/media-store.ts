import { create } from "zustand";

const DB = "nct-media";
const STORE = "files";
const IMAGE_MAX = 10 * 1024 * 1024;
const VIDEO_MAX = 40 * 1024 * 1024;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbPut(path: string, blob: Blob) {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(blob, path);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function idbDel(path: string) {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(path);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function idbAll(): Promise<Record<string, Blob>> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).openCursor();
    const out: Record<string, Blob> = {};
    req.onsuccess = () => {
      const c = req.result;
      if (!c) return resolve(out);
      out[String(c.key)] = c.value as Blob;
      c.continue();
    };
    req.onerror = () => reject(req.error);
  });
}

async function compressImage(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1800 / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bmp.width * scale));
  canvas.height = Math.max(1, Math.round(bmp.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  bmp.close();
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.86));
  return blob ?? file;
}

type MediaState = {
  urls: Record<string, string>;
  ready: boolean;
  hydrate: () => Promise<void>;
  put: (path: string, file: File) => Promise<void>;
  clear: (path: string) => Promise<void>;
};

export const useMedia = create<MediaState>((set, get) => ({
  urls: {},
  ready: false,
  hydrate: async () => {
    if (get().ready) return;
    try {
      const files = await idbAll();
      const urls: Record<string, string> = {};
      for (const [path, blob] of Object.entries(files)) {
        urls[path] = URL.createObjectURL(blob);
      }
      set({ urls, ready: true });
    } catch {
      set({ ready: true });
    }
  },
  put: async (path, file) => {
    const isVideo = file.type.startsWith("video/");
    if (isVideo && file.size > VIDEO_MAX) throw new Error("Clip tối đa 40MB. Nén trên điện thoại rồi chọn lại.");
    if (!isVideo && file.size > IMAGE_MAX) throw new Error("Ảnh gốc quá nặng (10MB). Chụp lại hoặc giảm dung lượng.");
    const blob = isVideo ? file : await compressImage(file);
    await idbPut(path, blob);
    const prev = get().urls[path];
    if (prev) URL.revokeObjectURL(prev);
    set({ urls: { ...get().urls, [path]: URL.createObjectURL(blob) } });
  },
  clear: async (path) => {
    await idbDel(path);
    const prev = get().urls[path];
    if (prev) URL.revokeObjectURL(prev);
    const urls = { ...get().urls };
    delete urls[path];
    set({ urls });
  },
}));

export function useMediaUrl(path: string) {
  return useMedia((s) => s.urls[path] ?? path);
}
