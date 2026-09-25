import { useEffect, useState } from "react";
import {
  Clock3,
  House,
  MessageCircle,
  Package,
  Ruler,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CheckoutDrawer } from "@/components/checkout-drawer";
import { ShopChat } from "@/components/landing/shop-chat";
import { AutoVideo } from "@/components/media/auto-video";
import { BeforeAfter } from "@/components/media/before-after";
import { ShopImg } from "@/components/media/shop-img";
import { DEADLINE_23, DEADLINE_28, SHOP } from "@/lib/config";
import { PRODUCTS, ZALO_PRESET, type ProductId } from "@/lib/products";
import { cartCount, useShop } from "@/lib/store";
import { zaloHref, useOps } from "@/lib/ops-store";
import { useMediaUrl } from "@/lib/media-store";
import { cn, formatVnd } from "@/lib/utils";

function zalo(id?: ProductId) {
  const t = encodeURIComponent(ZALO_PRESET(id));
  const phone = useOps.getState().settings.zaloPhone || SHOP.phoneTel;
  window.open(`${zaloHref(phone)}?text=${t}`, "_blank", "noopener");
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  return { days, hours, mins, expired: diff === 0 };
}

export function LandingPage() {
  const shop = useShop();
  const count = cartCount(shop.cart);
  const { days } = useCountdown(DEADLINE_23);
  const [scrolled, setScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-[calc(4.75rem+env(safe-area-inset-bottom))] text-foreground md:pb-0">
      <a
        href="#sets"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:bg-surface focus:px-3 focus:py-2"
      >
        Tới combo
      </a>

      <Ticker />
      <Header count={count} onCart={() => shop.openCheckout()} />
      <Hero onBuy={() => shop.openCheckout("khach")} />
      <Trust />
      <Spaces />
      <Sets />
      <Materials />
      <BeforeSection />
      <Steps />
      <Proof />
      <Shipping days={days} />
      <Faq />
      <FinalCta />
      <Footer />

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 px-3 py-2.5 backdrop-blur-md transition-transform duration-(--motion-fast) md:hidden",
          scrolled && !chatOpen ? "translate-y-0" : "translate-y-full",
        )}
        style={{ paddingBottom: "max(0.6rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-lg gap-2">
          <Button className="flex-1" onClick={() => shop.openCheckout("khach")}>
            Mua set 699k
          </Button>
          <Button variant="secondary" className="flex-1" onClick={() => zalo("khach")}>
            Zalo
          </Button>
        </div>
      </div>

      <CheckoutDrawer />
      <ShopChat lift={scrolled} onOpenChange={setChatOpen} />
      <VideoModal />
    </div>
  );
}

function Ticker() {
  const items = [
    "Đặt trước 23 tháng Chạp (30/01) để nhà có Tết đúng Tết",
    "COD toàn quốc",
    "Treo khoảng 20 phút",
    "Đổi set nếu sai size trong 48 giờ",
  ];
  return (
    <div className="overflow-hidden border-b border-border bg-primary text-primary-foreground">
      <div className="animate-marquee flex w-max gap-16 py-2 pr-16 text-[11px] tracking-[0.14em] uppercase">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="px-2">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Header({ count, onCart }: { count: number; onCart: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
        <a href="#top" className="font-display text-lg tracking-tight">
          Nhà Có Tết
        </a>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#spaces" className="hover:text-foreground">
            Theo nhà
          </a>
          <a href="#sets" className="hover:text-foreground">
            Combo
          </a>
          <a href="#giao" className="hover:text-foreground">
            Giao Tết
          </a>
          <a href="#faq" className="hover:text-foreground">
            Hỏi đáp
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => zalo()}>
            <MessageCircle />
            Zalo
          </Button>
          <Button size="sm" onClick={onCart} className="relative">
            <ShoppingBag />
            Giỏ
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-surface text-[10px] font-medium text-primary">
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onBuy }: { onBuy: () => void }) {
  return (
    <section id="top" className="relative isolate">
      <div className="relative flex w-full flex-col justify-end bg-foreground md:h-[70vh] md:min-h-[32.5rem] md:max-h-[40rem] md:overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <ShopImg
            src="/images/hero.jpg"
            alt=""
            className="absolute inset-0 size-full object-cover object-[center_40%] md:object-[center_65%]"
          />
          <AutoVideo
            src="/videos/hero.mp4"
            poster="/images/hero.jpg"
            className="absolute inset-0 object-[center_40%] md:object-[center_65%]"
          />
          <div className="absolute inset-0 bg-foreground/45 md:bg-foreground/40" />
          <div className="absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/35 to-foreground/15" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-36 pb-5 text-surface md:pt-24 md:pb-10">
          <p className="mb-2 text-[11px] tracking-[0.16em] uppercase text-surface/80 sm:mb-3 sm:text-xs sm:tracking-[0.2em]">
            Tết Đinh Mùi · set hiện đại
          </p>
          <h1 className="max-w-xl font-display text-[1.85rem] leading-[1.12] text-balance sm:text-5xl">
            Nhà có Tết sau một buổi treo. Không sến. Không phải đi 4 chợ.
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-pretty text-surface/90 sm:mt-3 sm:text-base">
            Set Tết hiện đại cho chung cư và nhà phố. Đỏ son, gỗ, kem — nhìn lên ảnh đẹp, cầm lên
            không giống đồ chợ.
          </p>
          <p className="mt-3 font-display text-2xl tabular-nums">
            Set phòng khách {formatVnd(699000)}
          </p>
          <p className="mt-1 text-sm text-surface/80">
            Set cửa {formatVnd(399000)} · Cả nhà {formatVnd(999000)}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row">
            <Button size="xl" className="w-full bg-surface text-foreground hover:bg-surface/90 sm:w-auto" onClick={onBuy}>
              Chọn set 699k
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="h-auto min-h-14 w-full whitespace-normal border-surface/40 bg-transparent py-3 text-surface hover:bg-surface/10 sm:h-14 sm:w-auto sm:whitespace-nowrap"
              onClick={() => zalo("khach")}
            >
              Gửi ảnh tường qua Zalo
            </Button>
          </div>
          <p className="mt-3 text-xs text-surface/75">
            Giao theo mốc Tết · Đổi set nếu sai size · Có clip hướng dẫn treo
          </p>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    { icon: Truck, t: "Giao trước mốc Tết", d: "Chốt 23 tháng Chạp để trang trí đúng Tết." },
    { icon: Sparkles, t: "Đúng màu như clip", d: "Đỏ son, kem, gỗ. Không đỏ bóng hội chợ." },
    { icon: House, t: "Treo không cần thợ", d: "Móc / dán có trong hộp. Khoảng 20 phút." },
    { icon: Package, t: "Dùng lại năm sau", d: "Gấp được. Không mua lại cả nhà mỗi Tết." },
  ];
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, t, d }) => (
          <div key={t} className="bg-background px-5 py-6">
            <Icon className="mb-3 size-5 text-primary" />
            <p className="font-medium">{t}</p>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Spaces() {
  const cards = [
    {
      img: "/images/space-apt.jpg",
      title: "Chung cư / studio",
      body: "Phòng khách nhỏ, sofa sẵn, chỉ thiếu điểm nhấn.",
      hint: "Set 399k hoặc 699k",
      href: "#set-khach",
    },
    {
      img: "/images/space-house.jpg",
      title: "Nhà phố",
      body: "Cửa ra vào + phòng khách — khách tới nhìn thấy ngay.",
      hint: "Set 699k hoặc 999k",
      href: "#set-nha",
    },
    {
      img: "/images/space-shop.jpg",
      title: "Shop / văn phòng",
      body: "Góc chụp khai xuân, không biến mặt bằng thành hội chợ.",
      hint: "Set cửa 399k",
      href: "#set-cua",
    },
  ];
  return (
    <section id="spaces" className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Bước 1</p>
      <h2 className="mt-2 max-w-lg font-display text-3xl leading-tight text-balance sm:text-4xl">
        Nhà bạn đang trống chỗ nào?
      </h2>
      <p className="mt-3 max-w-lg text-sm text-muted-foreground">
        Bấm để xem đúng set — không phải xem 40 món lẻ.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <a
            key={c.title}
            href={c.href}
            className="group overflow-hidden rounded-2xl border border-border bg-surface"
          >
            <div className="aspect-4/3 overflow-hidden md:aspect-3/4">
              <ShopImg
                src={c.img}
                alt={c.title}
                className="size-full object-cover transition-transform duration-(--motion-slow) group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-4">
              <p className="font-display text-xl">{c.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
              <p className="mt-3 text-sm font-medium text-primary">{c.hint}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Sets() {
  const openCheckout = useShop((s) => s.openCheckout);
  const openVideo = useShop((s) => s.openVideo);

  return (
    <section id="sets" className="border-y border-border bg-muted/50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Bước 2</p>
        <h2 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">Ba set. Một theme.</h2>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          Không chắc tường rộng bao nhiêu? Gửi 1 ảnh phòng qua Zalo — mình chỉ đúng set, không nhồi
          thêm đồ.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <article
              key={p.id}
              id={`set-${p.id}`}
              className={cn(
                "flex flex-col overflow-hidden rounded-2xl border bg-surface",
                p.featured ? "border-primary shadow-[0_0_0_1px_var(--color-primary)]" : "border-border",
              )}
            >
              <div className="relative aspect-4/3 overflow-hidden">
                {p.video ? (
                  <AutoVideo src={p.video} poster={p.image} />
                ) : (
                  <ShopImg src={p.image} alt={p.name} className="size-full object-cover" />
                )}
                {p.featured && (
                  <Badge className="absolute left-3 top-3 border-0 bg-primary text-primary-foreground">
                    Hay chọn nhất
                  </Badge>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-2xl">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                <p className="mt-3 font-display text-3xl tabular-nums">{formatVnd(p.price)}</p>
                {p.compareAt && (
                  <p className="text-xs text-muted-foreground">
                    <span className="line-through">{formatVnd(p.compareAt)}</span>
                    {" · "}
                    tiết kiệm {formatVnd(p.saveVsRetail)} so với gom lẻ
                  </p>
                )}
                <p className="mt-3 text-sm leading-relaxed">{p.blurb}</p>
                <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Ruler className="size-3.5" /> {p.wall}
                </p>
                <ul className="mt-4 space-y-1.5 text-sm">
                  {p.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-2">
                  <Button size="lg" onClick={() => openCheckout(p.id)}>
                    Mua {p.name} {formatVnd(p.price)}
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="secondary" onClick={() => zalo(p.id)}>
                      Zalo set này
                    </Button>
                    {p.video ? (
                      <Button variant="outline" onClick={() => openVideo(p.video!)}>
                        Xem clip 15s
                      </Button>
                    ) : (
                      <Button variant="outline" asChild>
                        <a href="#chatlieu">Xem chất liệu</a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Materials() {
  const tiles = [
    { img: "/images/material-linen.jpg", t: "Vải liễn", d: "Dày, treo thẳng, không võng chữ." },
    { img: "/images/material-lantern.jpg", t: "Đèn", d: "Vàng ấm, không nháy bảy sắc." },
    { img: "/images/material-mai.jpg", t: "Mai dáng gọn", d: "Để góc tường, không che TV." },
    { img: "/images/material-wood.jpg", t: "Đế, móc, dây", d: "Cầm chắc tay. Có sẵn trong hộp." },
  ];
  return (
    <section id="chatlieu" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="font-display text-3xl leading-tight sm:text-4xl">
        Clip cho thấy không khí. Ảnh này cho thấy đồ thật.
      </h2>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        699k không phải giá đồ chợ. Nên mình không gửi đồ chợ.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((x) => (
          <figure key={x.t} className="overflow-hidden rounded-xl border border-border bg-surface">
            <ShopImg src={x.img} alt={x.t} className="aspect-4/3 w-full object-cover" />
            <figcaption className="p-3">
              <p className="font-medium">{x.t}</p>
              <p className="text-sm text-muted-foreground">{x.d}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function BeforeSection() {
  return (
    <section className="border-y border-border bg-muted/40 py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Cùng một phòng. Chỉ thiếu lớp Tết.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Tường kem, sofa xám — thiếu đúng một set 699k. Không cần cải tạo. Kéo để xem trước /
            sau.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>Cửa nhà phố — khoảng 8 phút với Set Cửa.</li>
            <li>Góc 1.5m: đủ chụp ảnh, không vướng lối đi.</li>
          </ul>
        </div>
        <BeforeAfter before="/images/before-room.jpg" after="/images/after-room.jpg" />
      </div>
    </section>
  );
}

function Steps() {
  const steps = [
    { n: "01", img: "/images/step-unbox.jpg", t: "Mở hộp", d: "Căn theo layout mẫu 2m / 3m trong hộp." },
    { n: "02", img: "/images/step-hang.jpg", t: "Treo", d: "Móc hoặc dán. Phụ kiện có sẵn. Không cần thợ." },
    { n: "03", img: "/images/step-lights.jpg", t: "Bật đèn, chụp ảnh", d: "Chỉnh 2–3 vị trí là xong." },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="font-display text-3xl leading-tight sm:text-4xl">
        Mở hộp. Treo. Bật đèn. Chụp ảnh.
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">Không cần đi mua thêm keo.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <figure key={s.n} className="overflow-hidden rounded-2xl border border-border bg-surface">
            <ShopImg src={s.img} alt={s.t} className="aspect-4/3 w-full object-cover" />
            <figcaption className="p-4">
              <p className="text-xs tracking-widest text-muted-foreground">{s.n}</p>
              <p className="mt-1 font-display text-xl">{s.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Proof() {
  const shots = [
    { img: "/images/space-apt.jpg", c: "Chung cư 70m² · Set 699k" },
    { img: "/images/space-house.jpg", c: "Cửa sắt nhà phố · Set 399k" },
    { img: "/images/space-shop.jpg", c: "Shop nhỏ · Set cửa + cây" },
    { img: "/images/ugc-studio.jpg", c: "Studio · Set 399k" },
  ];
  return (
    <section className="border-y border-border py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-3xl leading-tight sm:text-4xl">
          Nhà mẫu, đúng set bạn nhận.
        </h2>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          Góc setup showroom — không phải phòng chụp mãi một góc. Khi có khách thật, mình thay bằng
          ảnh nhà họ.
        </p>
        <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2">
          {shots.map((s) => (
            <figure key={s.c} className="w-[78vw] shrink-0 snap-center sm:w-72">
              <ShopImg
                src={s.img}
                alt={s.c}
                className="aspect-3/4 w-full rounded-xl object-cover"
              />
              <figcaption className="mt-2 text-sm text-muted-foreground">{s.c}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Shipping({ days }: { days: number }) {
  return (
    <section id="giao" className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-2xl bg-primary px-5 py-10 text-primary-foreground sm:px-10">
        <p className="flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-primary-foreground/70">
          <Clock3 className="size-4" /> Mốc giao
        </p>
        <h2 className="mt-3 max-w-lg font-display text-3xl leading-tight sm:text-4xl">
          Đẹp mà tới sau mùng 3 thì không phải Tết.
        </h2>
        <p className="mt-4 font-display text-5xl tabular-nums">{days} ngày</p>
        <p className="mt-1 text-sm text-primary-foreground/75">
          còn để chốt mốc 23 tháng Chạp (30/01/2027)
        </p>
        <ol className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
          <li className="rounded-xl bg-primary-foreground/10 p-4">
            <p className="font-medium">Trước 30/01</p>
            <p className="mt-1 text-primary-foreground/80">
              23 tháng Chạp — nhận để kịp trang trí, gồm tỉnh xa.
            </p>
          </li>
          <li className="rounded-xl bg-primary-foreground/10 p-4">
            <p className="font-medium">Trước 04/02</p>
            <p className="mt-1 text-primary-foreground/80">
              28 Tết — còn hàng thì giao, không cam kết mọi tỉnh.
            </p>
          </li>
          <li className="rounded-xl bg-primary-foreground/10 p-4">
            <p className="font-medium">Sau mốc</p>
            <p className="mt-1 text-primary-foreground/80">
              Mình nói thẳng có kịp hay không. Không nhận đơn rồi im.
            </p>
          </li>
        </ol>
        <p className="mt-6 text-sm text-primary-foreground/75">
          COD. Đóng hộp riêng đèn / hoa. Hết lô theme này là hết.
        </p>
        <p className="sr-only">
          Mốc phụ 28 Tết {DEADLINE_28.toISOString()}
        </p>
      </div>
    </section>
  );
}

function Faq() {
  const qas = [
    {
      q: "Mai giả nhìn có “giả” không?",
      a: "Dáng gọn, màu hiện đại. Có ảnh cận ban ngày trên trang. Không phải cây hội chợ cắm kín hộp.",
    },
    {
      q: "Nhà sơn trắng / xám thì có hợp?",
      a: "Đúng nhà mình làm set này. Đỏ son + kem + gỗ nuốt tường trung tính tốt hơn đỏ bóng.",
    },
    {
      q: "Có phải khoan tường không?",
      a: "Set cửa và phần lớn set 699k treo móc/dán. Cây đặt sàn. Nhà thuê vẫn dùng được.",
    },
    {
      q: "Sai size thì sao?",
      a: "Zalo gửi ảnh tường trước khi chốt. Nhận sai set / sai size: đổi trong 48 giờ, hàng còn nguyên.",
    },
    {
      q: "Năm sau dùng lại được không?",
      a: "Được. Gấp gọn. Đèn và liễn giữ form nếu cất khô.",
    },
    {
      q: "Ở tỉnh, sợ trễ?",
      a: "Chọn mốc 23 tháng Chạp. Để muộn, mình nói thẳng có kịp hay không.",
    },
  ];
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-8 pb-16">
      <h2 className="font-display text-3xl">Hỏi trước khi inbox</h2>
      <Accordion type="single" collapsible className="mt-6">
        {qas.map((x, i) => (
          <AccordionItem key={x.q} value={`q${i}`}>
            <AccordionTrigger>{x.q}</AccordionTrigger>
            <AccordionContent>{x.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function FinalCta() {
  const openCheckout = useShop((s) => s.openCheckout);
  return (
    <section className="relative overflow-hidden">
      <ShopImg
        src="/images/hero.jpg"
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-foreground/70" />
      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center text-surface">
        <h2 className="font-display text-3xl leading-tight text-balance sm:text-4xl">
          Tết năm nay nhà nhìn có chủ ý. Không nhìn như vừa đi siêu thị đồ lễ về.
        </h2>
        <p className="mt-4 text-sm text-surface/80">Một set. Một theme. Một buổi treo. Xong.</p>
        <div className="mt-8 grid gap-2 sm:grid-cols-3">
          {PRODUCTS.map((p) => (
            <Button
              key={p.id}
              size="lg"
              className="bg-surface text-foreground hover:bg-surface/90"
              onClick={() => openCheckout(p.id)}
            >
              {p.name} {formatVnd(p.price)}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="lg"
          className="mt-3 w-full border-surface/40 bg-transparent text-surface hover:bg-surface/10 sm:w-auto"
          onClick={() => zalo()}
        >
          Gửi ảnh phòng qua Zalo
        </Button>
      </div>
    </section>
  );
}

function Footer() {
  const phone = useOps((s) => s.settings.zaloPhone) || SHOP.phoneTel;
  const display = phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  return (
    <footer className="border-t border-border bg-background pb-24 pt-10 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:justify-between">
        <div>
          <p className="font-display text-xl">Nhà Có Tết</p>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Set Tết hiện đại cho chung cư và nhà phố. COD toàn quốc.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>
            Zalo / gọi:{" "}
            <a className="text-foreground" href={`tel:${phone}`}>
              {display}
            </a>
          </p>
          <p className="mt-1">{SHOP.email}</p>
          <p className="mt-3">Đổi set 48 giờ · Hàng còn nguyên</p>
          <p className="mt-3">
            <a href="/van-hanh" className="text-foreground underline-offset-4 hover:underline">
              Vận hành shop
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function VideoModal() {
  const src = useShop((s) => s.videoId);
  const close = useShop((s) => s.closeVideo);
  const url = useMediaUrl(src ?? "");
  if (!src) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-4"
      onClick={close}
    >
      <button
        type="button"
        className="absolute right-4 top-4 rounded-full bg-surface p-2 text-foreground"
        onClick={close}
        aria-label="Đóng"
      >
        <X className="size-4" />
      </button>
      <video
        src={url}
        className="max-h-[80vh] w-full max-w-3xl rounded-xl"
        controls
        autoPlay
        muted
        playsInline
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
