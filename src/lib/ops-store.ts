import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SHOP } from "./config";
import { getProduct, type ProductId } from "./products";
import type { Channel } from "./brain";
import { evaluateClose, draftReply, detectPhone, detectProvince, detectSet } from "./brain";

export type Msg = {
  id: string;
  at: string;
  from: "khach" | "bot" | "ban";
  text: string;
};

export type Thread = {
  id: string;
  channel: Channel;
  customer: string;
  lastAt: string;
  unread: boolean;
  status: "bot" | "cho_duyet" | "nguoi" | "chot" | "bo";
  suggestedSet?: ProductId;
  phone?: string;
  address?: string;
  messages: Msg[];
};

export type OpsOrder = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  address: string;
  note: string;
  setId: ProductId;
  qty: number;
  total: number;
  source: Channel | "landing";
  status: "moi" | "xac_nhan" | "giao" | "huy";
};

export type PostStatus = "cho_duyet" | "san_sang" | "da_dang" | "khoa";

export type SocialPost = {
  id: string;
  channel: "tiktok" | "facebook";
  setId: ProductId;
  hook: string;
  caption: string;
  cta: string;
  scheduledAt: string;
  status: PostStatus;
  clip: string;
};

export type HumanTask = {
  id: string;
  title: string;
  why: string;
  steps: string[];
  cannot: string;
  done: boolean;
};

export type ShopSettings = {
  zaloPhone: string;
  facebookPage: string;
  tiktokUser: string;
  pinHash?: string;
};

type OpsState = {
  settings: ShopSettings;
  stock: Record<ProductId, number>;
  threads: Thread[];
  orders: OpsOrder[];
  posts: SocialPost[];
  tasks: HumanTask[];
  activeThreadId: string | null;
  setSettings: (p: Partial<ShopSettings>) => void;
  setActiveThread: (id: string | null) => void;
  addIncoming: (t: { channel: Channel; customer: string; text: string }) => string;
  pushMessage: (threadId: string, from: Msg["from"], text: string) => void;
  markThread: (id: string, patch: Partial<Thread>) => void;
  consumeStock: (id: ProductId, qty?: number) => boolean;
  placeFromInbox: (threadId: string, name: string) => OpsOrder | { error: string };
  addLandingOrder: (o: Omit<OpsOrder, "status">) => void;
  setOrderStatus: (id: string, status: OpsOrder["status"]) => void;
  approvePost: (id: string) => void;
  markPosted: (id: string) => void;
  toggleTask: (id: string) => void;
  seedIfEmpty: () => void;
};

function uid(prefix: string) {
  return prefix + "-" + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-3);
}

function nowIso() {
  return new Date().toISOString();
}

const TASKS: Omit<HumanTask, "done">[] = [
  {
    id: "so_zalo",
    title: "Đổi số Zalo thật",
    why: "Nút Zalo trên trang bán đang trỏ số mẫu. Khách bấm vào là mất đơn.",
    steps: [
      "Mở tab Việc của bạn, ô Số Zalo — điền số đang dùng (10 số).",
      "Thử bấm Zalo trên trang bán: phải mở đúng chat của bạn.",
      "Ghim số này trên bio TikTok và mô tả Page Facebook, cùng một số.",
    ],
    cannot: "Mình không giữ sim/Zalo giúp bạn. Số phải là số bạn nhấc máy được Tết này.",
  },
  {
    id: "zalo_oa",
    title: "Mở Zalo Official Account (gói có API)",
    why: "Inbox Zalo cá nhân không gắn được bot. OA mới cho chatbot + tin hàng loạt.",
    steps: [
      "Vào Zalo Business / Official Account, tạo OA tên «Nhà Có Tết».",
      "Xác minh hộ kinh doanh hoặc công ty (ảnh GPKD + CCCD).",
      "Mua gói Growth trở lên — gói rẻ hơn không có API chatbot.",
      "Bật webhook sau. 30 ngày đầu có thể dán 8 thẻ bán hàng vào kịch bản Zalo OA / Manychat, chưa cần lập trình.",
    ],
    cannot: "Mình không nộp hồ sơ pháp lý thay bạn. Chưa có OA thì bot trong app này chỉ chạy được khi bạn dán tin nhắn khách vào Inbox.",
  },
  {
    id: "facebook",
    title: "Page Facebook + bật Messenger",
    why: "Khách ads Facebook chốt trong Messenger. Không có Page thì ads không có chỗ rơi.",
    steps: [
      "Tạo Facebook Page «Nhà Có Tết» (danh mục Nhà cửa / Trang trí).",
      "Bật Inbox Messenger, giờ trả lời Hiện diện.",
      "Meta Business Suite → gán Page. Có thể bật trợ lý bán hàng Meta cho 30 ngày đầu.",
      "Dán link Page vào ô bên trái. Bio Page: 3 giá + Zalo.",
    ],
    cannot: "App không tự đăng lên Page của bạn cho đến khi bạn cấp token Page. Bây giờ: duyệt caption → copy → dán Reels.",
  },
  {
    id: "tiktok",
    title: "TikTok Business (Shop là bước sau)",
    why: "Kênh chính. Comment «giá / còn hàng» phải trả trong vài phút.",
    steps: [
      "Chuyển tài khoản sang Business, tên @ trùng brand.",
      "Bio: «Set Tết hiện đại · 399 / 699 / 999 · inbox Zalo».",
      "Ghim 1 video set 699k. Tắt giỏ TikTok Shop nếu chưa đăng ký hộ KD — đừng để khách mua giá sàn lệch landing.",
      "TikTok Shop chỉ mở khi có GPKD + TK ngân hàng VN. Phí sàn 2026 không nhỏ — chốt Zalo/landing trước.",
    ],
    cannot: "TikTok không cho web app đăng video hộ nếu chưa ủy quyền. Bấm «Copy & mở TikTok» rồi dán clip trong app TikTok.",
  },
  {
    id: "hang",
    title: "Hàng thật trong kho + đóng hộp 3 set",
    why: "Bot bán đúng clip. Nếu hộp gửi đi khác clip, Tết này bạn xử lý hoàn.",
    steps: [
      "Nhập đúng 3 SKU, đếm tồn, ghi vào tab Kho.",
      "Mỗi hộp: layout treo + móc dán + hướng dẫn 20 phút. Không thiếu móc nhà thuê.",
      "Chụp 1 ảnh hộp thật (nắp mở) — dùng làm ảnh cận, đừng chỉ xài ảnh dựng.",
      "Khi tồn set 699 dưới 10: khóa bài set đó trong tab Bài (app tự khóa).",
    ],
    cannot: "Mình không nhập hàng giúp. Giá 399/699/999 đã khóa trên trang — đổi giá nói mình, đừng tự sửa lung tung giữa mùa ads.",
  },
  {
    id: "clip",
    title: "Quay 1 phòng mẫu thật (khi có hàng)",
    why: "Clip dựng chỉ để chạy ads sớm. Khách soi cận ban ngày. Hàng thật phải khớp.",
    steps: [
      "Một phòng kem + sofa trung tính. Quay: timelapse 15s, hero 8s, cận mai/đèn/linen ban ngày, unbox.",
      "Mỗi clip gắn đúng 1 set. Ads set nào, trang mở set đó.",
      "Không ghép nhạc bản quyền. Giọng nói hoặc nhạc đã mua.",
      "Upload file vào điện thoại — tab Bài chỉ giữ caption + chọn clip có sẵn trên web.",
    ],
    cannot: "App không đẩy file từ máy bạn lên TikTok. Clip trên trang bán là mẫu — thay bằng phòng thật trước khi ads lớn.",
  },
  {
    id: "duyet",
    title: "Duyệt bài 30 ngày đầu (30 giây/bài)",
    why: "Bot lệch giá/set một lần là ads đang chạy bán sai.",
    steps: [
      "Tab Bài → đọc hook + caption + set. Đúng thì bấm Duyệt.",
      "Copy caption, mở TikTok hoặc Facebook, dán, đăng, quay lại bấm Đã đăng.",
      "Khung gợi ý: TikTok T2–T4–T6 lúc 11:00 và 19:30. Facebook T3–T5. Chủ nhật 1 bài deadline.",
      "Sau ~20 bài không lệch: có thể cho tự đăng khi gắn được token. Trước đó đừng tắt duyệt.",
    ],
    cannot: "Mình không bấm Đăng hộ trên tài khoản của bạn. Nút trong app = copy + đánh dấu, không phải lên sóng.",
  },
  {
    id: "truc",
    title: "Trực inbox 20:00–23:00 từ 15/01",
    why: "Bot không thay ca đêm sát Tết. Đơn tỉnh xa, nhà méo, khách mắng — phải người.",
    steps: [
      "Từ 15/01/2027: một người cầm điện thoại giờ này. Bot vẫn trả câu giá/size.",
      "Mọi thread gắn «Người» là việc của bạn, không để qua đêm.",
      "Đơn trễ Tết vì hứa sai: mục tiêu = 0. Không để bot tự nhận sau mốc tỉnh.",
    ],
    cannot: "Không tự động hóa được ca đêm. Đây là chỗ giữ uy tín, không phải chỗ tiết kiệm.",
  },
];

function seedThreads(): Thread[] {
  const t0 = nowIso();
  const mk = (
    partial: Omit<Thread, "id" | "lastAt" | "unread" | "messages"> & { lines: [Msg["from"], string][] },
  ): Thread => {
    const messages: Msg[] = [];
    partial.lines.forEach(([from, text], i) => {
      messages.push({
        id: uid("m"),
        at: new Date(Date.now() - (partial.lines.length - i) * 120000).toISOString(),
        from,
        text,
      });
    });
    const lastKhach = [...partial.lines].reverse().find((l) => l[0] === "khach")?.[1] ?? "";
    const draft = draftReply(lastKhach);
    const phone = detectPhone(lastKhach);
    const province = detectProvince(lastKhach);
    const setId = detectSet(lastKhach) ?? draft.suggestedSet;
    messages.push({
      id: uid("m"),
      at: t0,
      from: "bot",
      text: draft.reply,
    });
    const ready = Boolean(setId && phone && (province || lastKhach.length > 24));
    return {
      id: uid("th"),
      lastAt: t0,
      unread: true,
      messages,
      channel: partial.channel,
      customer: partial.customer,
      status: draft.escalate ? "nguoi" : ready ? "cho_duyet" : "bot",
      suggestedSet: setId,
      phone: phone ?? partial.phone,
      address: partial.address ?? (province ? lastKhach : undefined),
    };
  };
  return [
    mk({
      channel: "tiktok",
      customer: "Huyền",
      status: "bot",
      lines: [["khach", "set kia giá bn"]],
    }),
    mk({
      channel: "facebook",
      customer: "Anh Minh",
      status: "bot",
      lines: [["khach", "chung cư 70m2 treo j"]],
    }),
    mk({
      channel: "zalo",
      customer: "Linh Sầm Sơn",
      status: "bot",
      lines: [["khach", "ship về thanh hóa kịp tết ko"]],
    }),
    mk({
      channel: "tiktok",
      customer: "Ngọc",
      status: "bot",
      lines: [["khach", "mai giả nhìn rẻ ko"]],
    }),
    mk({
      channel: "facebook",
      customer: "Chị Hoa",
      status: "bot",
      lines: [["khach", "nhà thuê khoan được không"]],
    }),
    mk({
      channel: "zalo",
      customer: "Tuấn",
      status: "cho_duyet",
      suggestedSet: "khach",
      phone: "0912345678",
      address: "12 Trần Phú, Sầm Sơn, Thanh Hóa",
      lines: [
        ["khach", "Lấy set phòng khách 699k. Tên Nguyễn Văn Tuấn, 0912345678, 12 Trần Phú Sầm Sơn Thanh Hóa"],
      ],
    }),
  ];
}

function seedPosts(): SocialPost[] {
  const clips: Record<ProductId, string> = {
    cua: "/videos/set-cua.mp4",
    khach: "/videos/set-khach.mp4",
    nha: "/videos/hero.mp4",
  };
  const plans: Omit<SocialPost, "id" | "status" | "clip" | "scheduledAt">[] = [
    {
      channel: "tiktok",
      setId: "khach",
      hook: "Phòng trống → 8 giây có Tết",
      caption:
        "Phòng khách tường 2m. Mai dáng gọn, đèn ấm, không chữ đỏ in sẵn.\nSet Phòng khách 699.000đ. Inbox «ảnh phòng» mình chỉ đúng 1 set.\n#trangtritết #noeldecor #chungcư",
      cta: "Inbox ảnh phòng · Set 699k",
    },
    {
      channel: "facebook",
      setId: "cua",
      hook: "Khách vừa tới đã thấy Tết",
      caption:
        "Cửa chung cư 1m — liễn linen, đèn lồng hình học, không chiếm sàn.\nSet Cửa 399.000đ. COD. Chốt trước 23 tháng Chạp (30/01) thì nhà có Tết đúng Tết.",
      cta: "Nhắn tin Page · 399k",
    },
    {
      channel: "tiktok",
      setId: "khach",
      hook: "Mai giả? Cận ban ngày này",
      caption:
        "Không tán hội chợ. Ban ngày là gỗ/kem, tối mới lộ đèn.\nSet 699k. Sợ giả thì đừng mua — mình gửi cận trước.",
      cta: "Comment «cận»",
    },
    {
      channel: "facebook",
      setId: "nha",
      hook: "Nhà phố treo gì cho đồng bộ",
      caption:
        "Cửa một kiểu, phòng một kiểu = nhà trông như vừa đi siêu thị đồ lễ về.\nSet Cả nhà 999k: một theme đỏ son / kem / gỗ. Treo một buổi.",
      cta: "Nhắn «nhà phố»",
    },
    {
      channel: "tiktok",
      setId: "khach",
      hook: "Nhà thuê, không khoan",
      caption:
        "Móc dán có trong hộp. Cây đặt sàn.\nChung cư thuê vẫn Tết được. Set 699k.",
      cta: "Inbox «thuê»",
    },
    {
      channel: "facebook",
      setId: "khach",
      hook: "Còn bao nhiêu ngày tới 23 Chạp",
      caption:
        "Chốt trước 30/01 (23 tháng Chạp) thì kịp. Tỉnh xa: trước 25/01.\nSau mốc mình nói không — không nhận rồi im.\nSet 399 / 699 / 999. COD.",
      cta: "Đặt COD trên trang",
    },
  ];
  const start = new Date();
  start.setHours(19, 30, 0, 0);
  return plans.map((p, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    if (p.channel === "tiktok") d.setHours(i % 2 === 0 ? 19 : 11, 30, 0, 0);
    return {
      ...p,
      id: uid("p"),
      clip: clips[p.setId],
      scheduledAt: d.toISOString(),
      status: i === 0 ? "cho_duyet" : "cho_duyet",
    };
  });
}

const defaultSettings: ShopSettings = {
  zaloPhone: SHOP.phoneTel,
  facebookPage: "",
  tiktokUser: "",
};

export function zaloHref(phone: string) {
  const n = phone.replace(/\D/g, "") || SHOP.phoneTel;
  return `https://zalo.me/${n}`;
}

export const useOps = create<OpsState>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      stock: { cua: 30, khach: 30, nha: 18 },
      threads: seedThreads(),
      orders: [],
      posts: seedPosts(),
      tasks: TASKS.map((t) => ({ ...t, done: false })),
      activeThreadId: null,
      setSettings: (p) => set((s) => ({ settings: { ...s.settings, ...p } })),
      setActiveThread: (id) => set({ activeThreadId: id }),
      addIncoming: ({ channel, customer, text }) => {
        const id = uid("th");
        const thread: Thread = {
          id,
          channel,
          customer: customer || "Khách",
          lastAt: nowIso(),
          unread: true,
          status: "bot",
          messages: [{ id: uid("m"), at: nowIso(), from: "khach", text }],
        };
        set((s) => ({ threads: [thread, ...s.threads], activeThreadId: id }));
        return id;
      },
      pushMessage: (threadId, from, text) =>
        set((s) => ({
          threads: s.threads.map((t) =>
            t.id !== threadId
              ? t
              : {
                  ...t,
                  lastAt: nowIso(),
                  unread: from === "khach",
                  messages: [...t.messages, { id: uid("m"), at: nowIso(), from, text }],
                },
          ),
        })),
      markThread: (id, patch) =>
        set((s) => ({
          threads: s.threads.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        })),
      consumeStock: (id, qty = 1) => {
        const cur = get().stock[id] ?? 0;
        if (cur < qty) return false;
        set((s) => ({ stock: { ...s.stock, [id]: cur - qty } }));
        const left = cur - qty;
        if (left < 10) {
          set((s) => ({
            posts: s.posts.map((p) =>
              p.setId === id && p.status !== "da_dang" ? { ...p, status: "khoa" } : p,
            ),
          }));
        }
        return true;
      },
      placeFromInbox: (threadId, name) => {
        const t = get().threads.find((x) => x.id === threadId);
        if (!t) return { error: "Không thấy hội thoại" };
        const verdict = evaluateClose({
          setId: t.suggestedSet,
          phone: t.phone,
          address: t.address,
          stock: get().stock,
        });
        if (!verdict.canClose) return { error: verdict.failReasons.join(" · ") };
        const setId = t.suggestedSet!;
        if (!get().consumeStock(setId, 1)) return { error: "Hết hàng" };
        const order: OpsOrder = {
          id: "NCT-" + Date.now().toString(36).toUpperCase(),
          createdAt: nowIso(),
          name: name.trim() || t.customer,
          phone: t.phone!,
          address: t.address!,
          note: "Chốt từ inbox " + t.channel,
          setId,
          qty: 1,
          total: getProduct(setId).price,
          source: t.channel,
          status: "moi",
        };
        set((s) => ({
          orders: [order, ...s.orders],
          threads: s.threads.map((th) =>
            th.id === threadId
              ? {
                  ...th,
                  status: "chot" as const,
                  unread: false,
                  messages: [
                    ...th.messages,
                    {
                      id: uid("m"),
                      at: nowIso(),
                      from: "bot" as const,
                      text: `Đã ghi đơn ${order.id}. ${getProduct(setId).name} ${getProduct(setId).price.toLocaleString("vi-VN")}đ, COD. Mình báo ngày giao. Không chuyển khoản trước.`,
                    },
                  ],
                }
              : th,
          ),
        }));
        return order;
      },
      addLandingOrder: (o) =>
        set((s) => ({
          orders: s.orders.some((x) => x.id === o.id) ? s.orders : [{ ...o, status: "moi" }, ...s.orders],
        })),
      setOrderStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
      approvePost: (id) =>
        set((s) => ({
          posts: s.posts.map((p) => (p.id === id && p.status === "cho_duyet" ? { ...p, status: "san_sang" } : p)),
        })),
      markPosted: (id) =>
        set((s) => ({
          posts: s.posts.map((p) => (p.id === id ? { ...p, status: "da_dang" } : p)),
        })),
      toggleTask: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
          settings: s.settings,
        })),
      seedIfEmpty: () => {
        const s = get();
        if (s.threads.length === 0 || s.posts.length === 0) {
          set({
            threads: s.threads.length ? s.threads : seedThreads(),
            posts: s.posts.length ? s.posts : seedPosts(),
            tasks: s.tasks.length ? s.tasks : TASKS.map((t) => ({ ...t, done: false })),
          });
        }
      },
    }),
    {
      name: "nct-ops",
      partialize: (s) => ({
        settings: s.settings,
        stock: s.stock,
        threads: s.threads,
        orders: s.orders,
        posts: s.posts,
        tasks: s.tasks,
      }),
      onRehydrateStorage: () => (state) => {
        state?.seedIfEmpty();
      },
    },
  ),
);
