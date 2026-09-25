import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MEDIA_GROUPS, MEDIA_SLOTS, type MediaSlot } from "@/lib/media-slots";
import { useMedia, useMediaUrl } from "@/lib/media-store";
import { useOps } from "@/lib/ops-store";
import { cn } from "@/lib/utils";

export function MediaTab() {
  const urls = useMedia((s) => s.urls);
  const replaced = MEDIA_SLOTS.filter((s) => urls[s.path]).length;
  const need = MEDIA_SLOTS.filter((s) => s.priority).length;
  const havePri = MEDIA_SLOTS.filter((s) => s.priority && urls[s.path]).length;

  return (
    <div>
      <h1 className="font-display text-2xl">Đổi ảnh & clip demo</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Bấm ô, chọn file từ điện thoại hoặc máy. Trang bán đổi ngay. Ảnh tự nén. Clip MP4 tối đa 40MB.
      </p>
      <p className="mt-2 max-w-2xl rounded-md bg-muted px-3 py-2 text-sm">
        File nằm trên trình duyệt này. Khách vào trang published vẫn thấy demo cho đến khi bạn gửi file trong
        chat Grok (ghi rõ ô: hero / set cửa / set khách…) để mình gắn vào bản phát hành — hoặc bạn mở trang
        bán trên cùng máy vừa tải lên.
      </p>
      <p className="mt-3 text-sm">
        Ưu tiên: {havePri}/{need} ô quan trọng · Tổng {replaced}/{MEDIA_SLOTS.length}
      </p>
      {MEDIA_GROUPS.map((g) => (
        <section key={g} className="mt-8">
          <h2 className="font-medium">{g}</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MEDIA_SLOTS.filter((s) => s.group === g).map((s) => (
              <SlotCard key={s.path + s.label} slot={s} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function SlotCard({ slot }: { slot: MediaSlot }) {
  const input = useRef<HTMLInputElement>(null);
  const url = useMediaUrl(slot.path);
  const custom = useMedia((s) => Boolean(s.urls[slot.path]));
  const put = useMedia((s) => s.put);
  const clear = useMedia((s) => s.clear);
  const toggleTask = useOps((s) => s.toggleTask);
  const [busy, setBusy] = useState(false);

  async function onFile(file: File | undefined) {
    if (!file) return;
    const okImg = slot.kind === "image" && file.type.startsWith("image/");
    const okVid = slot.kind === "video" && file.type.startsWith("video/");
    if (!okImg && !okVid) {
      toast.error(slot.kind === "video" ? "Chọn file MP4/WebM." : "Chọn file ảnh.");
      return;
    }
    setBusy(true);
    try {
      await put(slot.path, file);
      toast.success("Đã gắn «" + slot.label + "». Xem Trang bán.");
      const pri = MEDIA_SLOTS.filter((s) => s.priority);
      const urls = useMedia.getState().urls;
      if (pri.every((s) => urls[s.path])) {
        const clip = useOps.getState().tasks.find((t) => t.id === "clip");
        if (clip && !clip.done) toggleTask("clip");
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Không nhận file.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <li className="overflow-hidden rounded-xl border border-border bg-surface">
      <button
        type="button"
        className="relative block aspect-4/3 w-full bg-muted"
        onClick={() => input.current?.click()}
      >
        {slot.kind === "video" ? (
          <video src={url} className="size-full object-cover" muted playsInline preload="metadata" />
        ) : (
          <img src={url} alt="" className="size-full object-cover" />
        )}
        <span
          className={cn(
            "absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs",
            custom ? "bg-primary text-primary-foreground" : "bg-foreground/70 text-surface",
          )}
        >
          {custom ? "Hàng thật" : "Demo"}
        </span>
      </button>
      <div className="p-3">
        <p className="text-sm font-medium">{slot.label}</p>
        <p className="mt-1 text-xs text-muted-foreground">{slot.shoot}</p>
        <input
          ref={input}
          type="file"
          accept={slot.kind === "video" ? "video/mp4,video/webm,video/quicktime" : "image/*"}
          className="sr-only"
          onChange={(e) => void onFile(e.target.files?.[0])}
        />
        <div className="mt-2 flex gap-2">
          <Button size="sm" disabled={busy} onClick={() => input.current?.click()}>
            {busy ? "Đang nén…" : "Chọn file"}
          </Button>
          {custom && (
            <Button size="sm" variant="secondary" onClick={() => void clear(slot.path)}>
              Về demo
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}
