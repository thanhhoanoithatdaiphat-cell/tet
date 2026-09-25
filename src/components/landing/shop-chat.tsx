import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { consultShop, type ChatTurn } from "@/lib/shop-ai";
import { SHOP } from "@/lib/config";
import { getProduct, type ProductId, ZALO_PRESET } from "@/lib/products";
import { useOps, zaloHref } from "@/lib/ops-store";
import { useShop } from "@/lib/store";
import { cn, formatVnd } from "@/lib/utils";

const SETS: ProductId[] = ["cua", "khach", "nha"];

const WELCOME =
  "Mình là Nhà Có Tết. Ba set cố định: cửa 399.000đ, phòng khách 699.000đ, cả nhà 999.000đ. COD. Nhà bạn chung cư hay nhà phố?";

const CHIPS = [
  "Chung cư ~70m²",
  "Nhà phố",
  "Giá 3 set",
  "Kịp Tết không?",
  "Nhà thuê, không khoan",
];

type Line = { id: string; from: "bot" | "khach"; text: string };

export function ShopChat({
  lift,
  onOpenChange,
}: {
  lift?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([{ id: "w", from: "bot", text: WELCOME }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [setId, setSetId] = useState<ProductId | undefined>();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [canClose, setCanClose] = useState(false);
  const [turns, setTurns] = useState(0);
  const [codOpen, setCodOpen] = useState(false);
  const [doneId, setDoneId] = useState<string | null>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const stock = useOps((s) => s.stock);

  function setOpenSafe(next: boolean) {
    setOpen(next);
    onOpenChange?.(next);
  }

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, busy, open]);

  async function send(text: string) {
    const msg = text.trim();
    if (!msg || busy) return;
    if (turns >= 12) {
      setLines((s) => [
        ...s,
        {
          id: crypto.randomUUID(),
          from: "bot",
          text: "Mình chuyển Zalo cho nhanh — gửi 1 ảnh tường, mình chỉ đúng 1 set.",
        },
      ]);
      return;
    }
    setInput("");
    setLines((s) => [...s, { id: crypto.randomUUID(), from: "khach", text: msg }]);
    setBusy(true);
    const history: ChatTurn[] = [
      ...lines
        .filter((l) => l.id !== "w")
        .map((l) => ({ role: l.from === "khach" ? "user" : "assistant", content: l.text }) as ChatTurn),
      { role: "user", content: msg },
    ];
    try {
      const res = await consultShop({ data: { messages: history, stock } });
      setTurns((n) => n + 1);
      setLines((s) => [...s, { id: crypto.randomUUID(), from: "bot", text: res.reply }]);
      if (res.suggestedSet) setSetId(res.suggestedSet);
      if (res.phone) setPhone(res.phone);
      if (res.address) setAddress(res.address);
      if (res.name) setName(res.name);
      if (res.verdict.canClose) setCodOpen(true);
      setCanClose(res.verdict.canClose || Boolean(res.suggestedSet));
    } catch {
      toast.error("Lỗi mạng. Thử lại hoặc Zalo.");
    } finally {
      setBusy(false);
    }
  }

  function submitCod(e: React.FormEvent) {
    e.preventDefault();
    if (!setId) {
      toast.error("Chọn set 399 / 699 / 999.");
      return;
    }
    if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 9 || address.trim().length < 8) {
      toast.error("Điền họ tên, SĐT, địa chỉ có tỉnh.");
      return;
    }
    const shop = useShop.getState();
    shop.clearCart();
    shop.add(setId);
    const order = shop.placeOrder({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      note: "Chốt từ chat trang bán",
    });
    setDoneId(order.id);
    setLines((s) => [
      ...s,
      {
        id: crypto.randomUUID(),
        from: "bot",
        text: `Đã ghi ${order.id}. ${getProduct(setId).name} ${formatVnd(getProduct(setId).price)}, COD. Mình báo ngày giao. Không chuyển khoản trước.`,
      },
    ]);
  }

  function openZalo() {
    const t = encodeURIComponent(ZALO_PRESET(setId) + " (từ chat trang bán)");
    const p = useOps.getState().settings.zaloPhone || SHOP.phoneTel;
    window.open(`${zaloHref(p)}?text=${t}`, "_blank", "noopener");
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpenSafe(true)}
          aria-label="Hỏi set nhà bạn"
          className={cn(
            "fixed right-3 z-50 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg md:right-4 md:bottom-6 md:h-12 md:w-auto md:gap-2 md:px-4",
            lift ? "bottom-[calc(4.75rem+env(safe-area-inset-bottom))]" : "bottom-[max(0.75rem,env(safe-area-inset-bottom))]",
          )}
        >
          <MessageCircle className="size-5 md:size-4" />
          <span className="hidden text-sm md:inline">Hỏi set nhà bạn</span>
        </button>
      )}

      {open && (
        <div className="fixed inset-x-0 bottom-0 z-50 flex h-[min(100dvh,36rem)] max-h-[100dvh] flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-xl sm:inset-x-auto sm:right-4 sm:bottom-4 sm:h-auto sm:max-h-[min(36rem,85dvh)] sm:w-[24rem] sm:rounded-2xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="font-display text-lg leading-none">Hỏi shop</p>
              <p className="mt-1 text-xs text-muted-foreground">AI nói chuyện · giá và mốc giao khóa cứng</p>
            </div>
            <button type="button" className="flex size-11 items-center justify-center rounded-md hover:bg-muted" onClick={() => setOpenSafe(false)} aria-label="Đóng">
              <X className="size-4" />
            </button>
          </div>

          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-3">
            {lines.map((l) => (
              <div
                key={l.id}
                className={cn(
                  "max-w-[90%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap",
                  l.from === "khach" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted text-foreground",
                )}
              >
                {l.text}
              </div>
            ))}
            {busy && (
              <div className="w-fit rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">Đang xem nhà bạn…</div>
            )}
            {lines.length === 1 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {CHIPS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className="h-9 rounded-full border border-border bg-background px-3 text-xs"
                    onClick={() => void send(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottom} />
          </div>

          {setId && !doneId && !codOpen && (
            <div className="border-t border-border px-3 py-2">
              <Button type="button" className="w-full" size="sm" onClick={() => setCodOpen(true)}>
                Lấy {getProduct(setId).name} {formatVnd(getProduct(setId).price)} · COD
              </Button>
            </div>
          )}

          {setId && !doneId && codOpen && (
            <form onSubmit={submitCod} className="border-t border-border px-3 py-3">
              <p className="text-xs text-muted-foreground">
                Gợi ý: {getProduct(setId).name} {formatVnd(getProduct(setId).price)}
              </p>
              <div className="mt-2 grid grid-cols-3 gap-1">
                {SETS.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSetId(id)}
                    className={cn(
                      "h-9 rounded-md text-xs",
                      setId === id ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    {formatVnd(getProduct(id).price).replace("đ", "")}
                  </button>
                ))}
              </div>
              <div className="mt-2 grid gap-2">
                <div>
                  <Label htmlFor="c-name" className="sr-only">
                    Tên
                  </Label>
                  <Input id="c-name" placeholder="Họ tên" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <Input placeholder="SĐT" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <Input placeholder="Địa chỉ có tỉnh" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <Button type="submit" className="mt-2 w-full" size="sm">
                {canClose ? "Chốt COD" : "Gửi đặt COD"}
              </Button>
            </form>
          )}

          {doneId && (
            <p className="border-t border-border px-3 py-3 text-sm">
              Đơn {doneId}. Có ảnh phòng thì{" "}
              <button type="button" className="underline" onClick={openZalo}>
                gửi Zalo
              </button>
              .
            </p>
          )}

          <div className="flex gap-2 border-t border-border p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
            <input
              className="h-11 flex-1 rounded-md border border-border bg-background px-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Nhắn: chung cư / giá / tỉnh…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void send(input);
              }}
              disabled={busy}
            />
            <Button type="button" size="icon" disabled={busy || !input.trim()} onClick={() => void send(input)} aria-label="Gửi">
              <Send />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
