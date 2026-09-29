import { useMemo, useState } from "react";
import { Search, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckoutDrawer } from "@/components/checkout-drawer";
import { ShopChat } from "@/components/landing/shop-chat";
import { ProductRail } from "@/components/landing/product-rail";
import { MomentCards } from "@/components/landing/moment-cards";
import { ShopImg } from "@/components/media/shop-img";
import { SHOP } from "@/lib/config";
import {
  CATEGORIES,
  filterCatalog,
  minPrice,
  resolveSku,
  seasonBanner,
  spotlight,
  type Item,
} from "@/lib/catalog";
import { ZALO_PRESET } from "@/lib/products";
import { useSeason } from "@/lib/seasons";
import { cartCount, cartTotal, useShop } from "@/lib/store";
import { useOps, zaloHref } from "@/lib/ops-store";
import { cn, formatVnd } from "@/lib/utils";

const PLACEHOLDER_PHONE = "0901234567";

function dayMonth(d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
  }).format(d);
}

export function LandingPage() {
  const season = useSeason();
  const shop = useShop();
  const count = cartCount(shop.cart);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [sizeId, setSizeId] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const phone = useOps((s) => s.settings.zaloPhone);
  const tel = !phone || phone === PLACEHOLDER_PHONE ? SHOP.phoneTel : phone;

  const items = useMemo(() => filterCatalog(q, cat, season.id), [q, cat, season.id]);
  const spots = useMemo(() => spotlight(season.id), [season.id]);
  const rail = useMemo(() => {
    const heroId = seasonBanner(season.id).hero;
    return [...spots].sort((a, b) => {
      if (a.item.id === heroId) return -1;
      if (b.item.id === heroId) return 1;
      return minPrice(a.item) - minPrice(b.item);
    });
  }, [spots, season.id]);
  const banner = seasonBanner(season.id);
  const fromPrice = spots.length ? Math.min(...spots.map((s) => minPrice(s.item))) : 0;
  const showSpot = !q.trim() && (cat === "all" || cat === "mua") && spots.length > 0;
  const open = items.find((i) => i.id === openId) ?? spots.find((s) => s.item.id === openId)?.item ?? null;

  function show(item: Item) {
    setOpenId(item.id);
    setSizeId(item.sizes?.[0]?.id ?? null);
  }

  function addPlain(item: Item) {
    if (item.sizes?.length) {
      show(item);
      return;
    }
    shop.add(item.id);
    toast.success(`Đã thêm ${item.name}`);
  }

  function zalo(id?: string) {
    const text = encodeURIComponent(ZALO_PRESET(id));
    window.open(`${zaloHref(tel)}?text=${text}`, "_blank", "noopener");
  }

  const chips = [{ id: "all", label: "Tất cả" }, { id: "mua", label: "Đang mùa" }, ...CATEGORIES];

  return (
    <div
      data-season={season.id}
      className={cn(
        "min-h-screen bg-background text-foreground",
        count > 0 ? "pb-[calc(4.75rem+env(safe-area-inset-bottom))] md:pb-10" : "pb-16 md:pb-10",
      )}
    >
      <header className="md:sticky md:top-0 md:z-30 md:border-b md:border-border md:bg-background/95 md:backdrop-blur-md">
        <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md md:static md:border-0 md:bg-transparent md:backdrop-blur-none">
          <div className="mx-auto flex h-12 max-w-6xl items-center gap-3 px-3 sm:h-14 sm:px-4">
            <a href="#hang" className="font-display text-lg leading-none tracking-tight">
              {SHOP.name}
            </a>
            <p className="hidden text-sm text-muted-foreground sm:block">Đồ gỗ cắt laser</p>
            <div className="ml-auto">
              <Button size="sm" onClick={() => shop.openCheckout()} className="relative h-10 px-3 text-sm">
                <ShoppingBag />
                Giỏ
                {count > 0 && (
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-surface text-xs font-medium text-primary">
                    {count}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-3 pt-3 sm:px-4">
          <label className="flex h-11 items-center gap-2 rounded-lg border border-border bg-surface px-3">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                if (e.target.value.trim()) setCat("all");
              }}
              placeholder="Tìm tag, dây chữ, lịch…"
              aria-label="Tìm món"
              enterKeyHint="search"
              className="h-full w-full bg-transparent text-base outline-none"
            />
          </label>
        </div>
        <div className="chip-row mt-2 flex gap-2 overflow-x-auto px-3 pb-3 sm:px-4">
          {chips.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setCat(c.id);
                setQ("");
              }}
              className={cn(
                "h-10 shrink-0 rounded-full px-3 text-sm",
                cat === c.id ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </header>

      {showSpot && (
        <section className="border-b border-border">
          <div className="h-1 bg-primary" />
          <div className="mx-auto max-w-6xl px-3 pt-4 pb-3 sm:px-4 sm:pt-6 sm:pb-4">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-xs tracking-wide text-primary uppercase">
                {season.name} · {season.mode === "soon" ? "Mở" : "Đến"}{" "}
                {dayMonth(season.mode === "soon" ? season.event : season.sellUntil)}
              </p>
              <button
                type="button"
                className="shrink-0 text-sm underline-offset-4 hover:underline"
                onClick={() => {
                  setCat("mua");
                  document.getElementById("hang")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Xem hết
              </button>
            </div>
            <h1 className="mt-2 max-w-2xl font-display text-[1.7rem] leading-[1.15] sm:text-5xl">{banner.title}</h1>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {banner.line} Từ {formatVnd(fromPrice)}.
            </p>
          </div>
          <ProductRail spots={rail} onOpen={show} />
        </section>
      )}

      {showSpot && <MomentCards seasonId={season.id} onOpen={show} />}

      <main id="hang" className="mx-auto max-w-6xl scroll-mt-14 px-3 py-4 sm:px-4">
        <p className="text-sm text-muted-foreground">
          {items.length} món · trả khi nhận hàng
        </p>
        {items.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">Không có món khớp. Thử từ khác hoặc chọn Tất cả.</p>
        ) : (
          <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <li key={item.id}>
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface">
                  <button type="button" onClick={() => show(item)} className="block w-full text-left">
                    <ShopImg src={item.image} alt={item.name} className="aspect-square w-full bg-muted object-cover object-top" />
                    <div className="p-2.5 sm:p-3">
                      <p className="text-[11px] text-muted-foreground">
                        {CATEGORIES.find((c) => c.id === item.category)?.label}
                      </p>
                      <h2 className="mt-0.5 line-clamp-2 min-h-10 text-sm leading-snug">{item.name}</h2>
                      <p className="mt-1 text-sm font-medium tabular-nums">
                        {item.sizes ? "Từ " : ""}
                        {formatVnd(minPrice(item))}
                        <span className="mt-0.5 block font-normal text-xs text-muted-foreground"> / {item.unit}</span>
                      </p>
                    </div>
                  </button>
                  <div className="mt-auto px-2.5 pb-2.5 sm:px-3 sm:pb-3">
                    <Button className="h-10 w-full text-sm" onClick={() => addPlain(item)}>
                      {item.sizes?.length ? "Chọn size" : "Thêm"}
                    </Button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}

        <footer className="mt-12 border-t border-border py-8 text-sm text-muted-foreground">
          <p className="font-display text-lg text-foreground">{SHOP.name}</p>
          <p className="mt-1 max-w-md">Xưởng cắt laser trên gỗ. Giá trên trang là giá bán lẻ. Đại lý lấy từ 20 cái, nhắn Zalo để nhận bảng sỉ.</p>
          <p className="mt-3">
            Zalo / gọi:{" "}
            <a className="inline-flex min-h-11 items-center text-foreground" href={`tel:${tel}`}>
              {tel.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}
            </a>
          </p>
          <p className="mt-1">Facebook Petitewoodart - Home Decor · TikTok Petitewoodart</p>
          <p className="mt-3">
            <a href="/van-hanh" className="text-foreground underline-offset-4 hover:underline">
              Vận hành shop
            </a>
          </p>
        </footer>
      </main>

      {count > 0 && !chatOpen && !open && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface px-3 py-2.5 md:hidden"
          style={{ paddingBottom: "max(0.6rem, env(safe-area-inset-bottom))" }}
        >
          <Button className="w-full" onClick={() => shop.openCheckout()}>
            Giỏ {count} món · {formatVnd(cartTotal(shop.cart))}
          </Button>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 sm:items-center" onClick={() => setOpenId(null)}>
          <div
            className="flex max-h-[100dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-surface sm:max-h-[88vh] sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between px-4 py-2">
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                {CATEGORIES.find((c) => c.id === open.category)?.label}
              </p>
              <button type="button" onClick={() => setOpenId(null)} aria-label="Đóng" className="flex size-11 items-center justify-center">
                <X className="size-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <ShopImg src={open.image} alt={open.name} className="aspect-[5/4] max-h-[38vh] w-full bg-muted object-cover object-top sm:aspect-square sm:max-h-none" />
              <div className="px-4 py-4">
                <h2 className="font-display text-2xl leading-tight">{open.name}</h2>
                <p className="mt-2 text-sm leading-relaxed">{open.blurb}</p>
                {open.sizes && (
                  <div className="mt-4 flex gap-2">
                    {open.sizes.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        data-size={s.id}
                        onClick={() => setSizeId(s.id)}
                        className={cn(
                          "min-h-11 flex-1 rounded-lg px-2 py-2 text-sm",
                          sizeId === s.id ? "bg-primary text-primary-foreground" : "bg-muted",
                        )}
                      >
                        {s.label}
                        <span className="mt-0.5 block text-xs opacity-80">{formatVnd(s.price)}</span>
                      </button>
                    ))}
                  </div>
                )}
                <p className="mt-4 font-display text-3xl tabular-nums">
                  {formatVnd(resolveSku(open.sizes?.length && sizeId ? `${open.id}--${sizeId}` : open.id)?.price ?? open.price)}
                  <span className="ml-1 font-sans text-base text-muted-foreground">/ {open.unit}</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Giá bán lẻ. Từ 20 cái có giá sỉ, nhắn Zalo.</p>
              </div>
            </div>
            <div className="grid shrink-0 gap-2 border-t border-border px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <Button
                size="lg"
                onClick={() => {
                  const id = open.sizes?.length && sizeId ? `${open.id}--${sizeId}` : open.id;
                  shop.add(id);
                  toast.success("Đã thêm vào giỏ");
                  setOpenId(null);
                }}
              >
                Thêm vào giỏ
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => zalo(open.sizes?.length && sizeId ? `${open.id}--${sizeId}` : open.id)}
              >
                Nhắn Zalo món này
              </Button>
            </div>
          </div>
        </div>
      )}

      <CheckoutDrawer />
      <ShopChat lift={count > 0} onOpenChange={setChatOpen} />
    </div>
  );
}
