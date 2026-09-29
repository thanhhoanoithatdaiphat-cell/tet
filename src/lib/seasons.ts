import { useEffect, useState } from "react";
import type { Product, ProductId } from "./products";
import { formatVnd } from "./utils";

export type SeasonMode = "open" | "soon";

export type SeasonView = {
  id: string;
  name: string;
  mode: SeasonMode;
  event: Date;
  sellUntil: Date;
  early: boolean;
  daysLeft: number;
  products: Product[];
  nextName: string | null;
  ticker: string[];
  kicker: string;
  heroTitle: string;
  heroBody: string;
  heroImage: string;
  trust: { t: string; d: string }[];
  setKicker: string;
  setTitle: string;
  setIntro: string;
  shipTitle: string;
  shipHint: string;
  milestones: { t: string; d: string }[];
  faqs: { q: string; a: string }[];
  finalTitle: string;
  finalSub: string;
  chatWelcome: string;
  footerBlurb: string;
  shipRules: string;
  farCutoff: Date;
  hardStop: Date;
};

type Win = {
  id: string;
  name: string;
  priority: number;
  sellFrom: Date;
  earlyEnd: Date;
  event: Date;
  sellUntil: Date;
  products: (early: boolean) => Product[];
  copy: Omit<SeasonView, "id" | "name" | "mode" | "event" | "sellUntil" | "early" | "daysLeft" | "products" | "nextName" | "farCutoff" | "hardStop">;
  farCutoff?: Date;
  hardStop?: Date;
};

function at(y: number, m: number, d: number, end = false) {
  const mm = String(m).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return new Date(`${y}-${mm}-${dd}T${end ? "23:59:59" : "00:00:00"}+07:00`);
}

function tier(
  id: ProductId,
  name: string,
  price: number,
  compareAt: number,
  tagline: string,
  blurb: string,
  wall: string,
  includes: string[],
  image: string,
  featured?: boolean,
  video?: string,
): Product {
  return {
    id,
    name,
    price,
    compareAt,
    tagline,
    blurb,
    wall,
    includes,
    image,
    video,
    featured,
    saveVsRetail: Math.max(0, compareAt - price),
  };
}

const faqBase = [
  {
    q: "Có phải khoan tường không?",
    a: "Móc hoặc dán. Cây và bình đặt sàn. Nhà thuê vẫn dùng được.",
  },
  {
    q: "Sai size thì sao?",
    a: "Gửi ảnh tường trước khi chốt. Sai set: đổi trong 48 giờ, hàng còn nguyên.",
  },
  {
    q: "COD được không?",
    a: "Được. Không chuyển khoản trước. Hết lô theme này là hết.",
  },
];

function halloweenProducts(early: boolean): Product[] {
  const cut = early ? 0 : 50000;
  return [
    tier(
      "cua",
      "Set Cửa",
      349000 + cut,
      449000,
      "Khách đứng ngoài đã thấy nhà có chủ ý.",
      "Ruy băng linen đen, một đèn hổ phách, bí trắng nhỏ. Không dán máu, không đèn nhấp nháy.",
      "Cửa rộng khoảng 1–1.2m",
      ["Ruy băng linen đen", "Đèn hổ phách", "Bí trắng nhỏ", "Móc dán"],
      "/images/halloween-cua.jpg",
    ),
    tier(
      "khach",
      "Set Phòng khách",
      599000 + cut,
      790000,
      "Góc sofa lên ảnh tối, ban ngày vẫn sạch.",
      "Cành lá mờ, đèn dây ấm, hai bí trắng. Tường kem nuốt màu đen — không thành quán ma.",
      "Tường phòng khách 2–3m",
      ["Cành lá đen mờ", "Đèn dây ấm", "2 bí trắng", "Bình gốm", "Layout 2m và 3m"],
      "/images/halloween-khach.jpg",
      true,
    ),
    tier(
      "nha",
      "Set Cả nhà",
      899000 + cut,
      1190000,
      "Cửa, khách, bàn — một màu.",
      "Đen, kem, hổ phách đi xuyên suốt. Không cửa một kiểu, bàn một kiểu.",
      "Cửa + phòng khách + bàn",
      ["Toàn bộ Set Cửa", "Toàn bộ Set Phòng khách", "Runner bàn", "Nến và quạt giấy"],
      "/images/halloween-nha.jpg",
    ),
  ];
}

function tetProducts(): Product[] {
  return [
    tier(
      "cua",
      "Set Cửa",
      399000,
      490000,
      "Khách vừa tới đã thấy Tết.",
      "Cửa sắt, cửa gỗ, cửa kính chung cư — một lớp liễn vải, đèn và dây treo. Không chiếm sàn.",
      "Cửa / tường rộng khoảng 1–1.2m",
      ["Liễn vải linen", "Đèn lồng đỏ son", "Dây treo + móc dán", "Thảm nhỏ trước cửa"],
      "/images/set-cua.jpg",
      false,
      "/videos/set-cua.mp4",
    ),
    tier(
      "khach",
      "Set Phòng khách",
      699000,
      890000,
      "Góc nhà lên ảnh Tết được luôn.",
      "Cây mai dáng gọn, đèn dây, 2–3 món điểm nhấn. Ban ngày hiện đại, tối có chiều sâu.",
      "Phòng khách tường 2–3m",
      ["Cây mai dáng gọn", "Đèn dây ấm", "Đèn lồng + decor kệ", "Layout 2m và 3m"],
      "/images/set-khach.jpg",
      true,
      "/videos/set-khach.mp4",
    ),
    tier(
      "nha",
      "Set Cả nhà",
      999000,
      1290000,
      "Cửa + khách + bàn. Xong việc.",
      "Một theme xuyên suốt. Hợp người không muốn nghĩ tiếp.",
      "Cửa + phòng khách + bàn ăn",
      ["Toàn bộ Set Cửa", "Toàn bộ Set Phòng khách", "Runner bàn", "Đồng bộ đỏ son / kem / gỗ"],
      "/images/set-nha.jpg",
    ),
  ];
}

function simpleProducts(
  early: boolean,
  base: [number, number, number],
  regular: [number, number, number],
  lines: [string, string, string],
  blurbs: [string, string, string],
  images: [string, string, string],
): Product[] {
  const price = early ? base : regular;
  const names = ["Set Cửa", "Set Phòng khách", "Set Cả nhà"] as const;
  const ids: ProductId[] = ["cua", "khach", "nha"];
  const walls = ["Cửa khoảng 1m", "Tường 2–3m", "Cửa + khách + bàn"];
  const includes: string[][] = [
    ["Điểm nhấn cửa", "Móc dán", "Hướng dẫn treo"],
    ["Điểm nhấn góc", "Đèn dây ấm", "Layout 2m và 3m"],
    ["Toàn bộ Set Cửa", "Toàn bộ Set Phòng khách", "Runner bàn"],
  ];
  const bump = [80000, 120000, 180000];
  return ids.map((id, i) =>
    tier(id, names[i], price[i], regular[i] + bump[i], lines[i], blurbs[i], walls[i], includes[i], images[i], id === "khach"),
  );
}

const LUNAR: Record<number, { m1: [number, number]; chap23: [number, number]; d28: [number, number]; trungthu: [number, number]; name: string }> = {
  2026: { m1: [2, 17], chap23: [2, 10], d28: [2, 15], trungthu: [9, 25], name: "Bính Ngọ" },
  2027: { m1: [2, 6], chap23: [1, 30], d28: [2, 4], trungthu: [9, 15], name: "Đinh Mùi" },
  2028: { m1: [1, 26], chap23: [1, 19], d28: [1, 24], trungthu: [10, 3], name: "Mậu Thân" },
};

function lunar(y: number) {
  return (
    LUNAR[y] ?? {
      m1: [2, 6] as [number, number],
      chap23: [1, 30] as [number, number],
      d28: [2, 4] as [number, number],
      trungthu: [9, 15] as [number, number],
      name: "Tết",
    }
  );
}

function stamp(d: Date) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Ho_Chi_Minh", day: "2-digit", month: "2-digit" }).format(d);
}

function buildYear(y: number): Win[] {
  const L = lunar(y);
  const tetM1 = at(y, L.m1[0], L.m1[1]);
  const chap = at(y, L.chap23[0], L.chap23[1], true);
  const d28 = at(y, L.d28[0], L.d28[1], true);
  const tetEarly = new Date(tetM1.getTime() - 22 * 86400000 - 1000);
  const tetFar = new Date(chap.getTime() - 5 * 86400000);
  const chapLabel = stamp(chap);
  const d28Label = stamp(d28);
  const tt = at(y, L.trungthu[0], L.trungthu[1], true);
  const ttLabel = stamp(tt);
  const soon = (name: string, eventLabel: string, ship: string): Win["copy"] => ({
    ticker: [`Giá sớm ${name}`, "COD toàn quốc", "Treo khoảng 20 phút", "Đổi set 48 giờ nếu còn nguyên"],
    kicker: name,
    heroTitle: `${name} năm nay, nhà có một góc đúng dịp.`,
    heroBody: "Ba set. Một màu. Treo một buổi là xong — không phải đi gom từng món.",
    heroImage: "/images/hero.jpg",
    trust: [
      { t: "Kịp đúng ngày", d: ship },
      { t: "Một theme", d: "Cửa và phòng không mỗi nơi một kiểu." },
      { t: "Không khoan", d: "Móc, dán, đặt sàn. Nhà thuê dùng được." },
      { t: "Giá có hạn", d: "Hết ngày lễ là về giá thường, hoặc hết lô." },
    ],
    setKicker: "Ba set",
    setTitle: `Chọn mức ${name}.`,
    setIntro: "Không chắc tường rộng bao nhiêu? Gửi một ảnh phòng.",
    shipTitle: `Trễ ngày ${eventLabel} thì mất dịp.`,
    shipHint: "còn để giữ giá sớm",
    milestones: [
      { t: "Đang giá sớm", d: "Chốt trong hạn này, giữ mức giá đang hiện." },
      { t: `Trước ${eventLabel}`, d: "Giao để nhà kịp treo. Tỉnh xa nên chốt sớm hơn 4 ngày." },
      { t: "Sau ngày lễ", d: "Không nhận đơn hứa kịp. Mình nói thẳng." },
    ],
    faqs: [
      { q: "Giá sớm khác gì giá thường?", a: "Giá sớm chỉ trong hạn ghi trên trang. Qua hạn, về giá gạch ngang hoặc hết lô." },
      ...faqBase,
    ],
    finalTitle: `Một set cho ${name}. Không mua lẻ rồi ráp lệch màu.`,
    finalSub: "Một theme. Một buổi treo. Xong.",
    chatWelcome: `Shop đang mở ${name}. Ba set cửa, phòng khách, cả nhà. COD. Nhà bạn chung cư hay nhà phố?`,
    footerBlurb: `Set ${name} cho chung cư và nhà phố. COD toàn quốc.`,
    shipRules: `Dịp ${name}. Giao trước ${eventLabel}. Tỉnh xa chốt sớm hơn 4 ngày. Sau ngày lễ không hứa kịp.`,
  });

  return [
    {
      id: "valentine",
      name: "Valentine",
      priority: 40,
      sellFrom: at(y, 1, 18),
      earlyEnd: at(y, 2, 7, true),
      event: at(y, 2, 14, true),
      sellUntil: at(y, 2, 14, true),
      products: (early) =>
        simpleProducts(
          early,
          [329000, 549000, 799000],
          [399000, 649000, 949000],
          ["Cửa có một nhánh, không cả vòm hoa.", "Góc sofa cho hai người, đèn thấp.", "Cửa, khách, bàn cùng một màu ấm."],
          ["Ruy băng linen và một nhánh hoa khô. Không bóng bay, không hồng neon.", "Đèn thấp, hoa khô, gối kem. Ban ngày vẫn là phòng khách.", "Một màu đi từ cửa vào bàn. Không mỗi chỗ một kiểu."],
          ["/images/valentine-cua.jpg", "/images/valentine-khach.jpg", "/images/valentine-nha.jpg"],
        ),
      copy: {
        ...soon("Valentine", "14/02", "Chốt trước 14/02 để góc nhà kịp tối hôm đó."),
        heroImage: "/images/valentine-hero.jpg",
        kicker: "Valentine · nhà ở, không quán",
        heroTitle: "Tối 14 nhà có một góc. Không cần biến phòng thành tiệm hoa.",
        heroBody: "Hoa khô, đèn thấp, linen kem. Ba set cho chung cư. Giá sớm chỉ đến 07/02.",
      },
    },
    {
      id: "tet",
      name: "Tết",
      priority: 100,
      sellFrom: at(y, 1, 2),
      earlyEnd: tetEarly,
      event: at(y, L.m1[0], L.m1[1], true),
      sellUntil: chap,
      farCutoff: tetFar,
      hardStop: d28,
      products: () => tetProducts(),
      copy: {
        ticker: [`Đặt trước 23 tháng Chạp (${chapLabel}) để nhà có Tết đúng Tết`, "COD toàn quốc", "Treo khoảng 20 phút", "Đổi set nếu sai size trong 48 giờ"],
        kicker: `Tết ${L.name} · set hiện đại`,
        heroTitle: "Nhà có Tết sau một buổi treo. Không sến. Không phải đi 4 chợ.",
        heroBody: "Set Tết hiện đại cho chung cư và nhà phố. Đỏ son, gỗ, kem — nhìn lên ảnh đẹp, cầm lên không giống đồ chợ.",
        heroImage: "/images/hero.jpg",
        trust: [
          { t: "Giao trước mốc Tết", d: `Chốt 23 tháng Chạp (${chapLabel}) để trang trí đúng Tết.` },
          { t: "Đúng màu như clip", d: "Đỏ son, kem, gỗ. Không đỏ bóng hội chợ." },
          { t: "Treo không cần thợ", d: "Móc / dán có trong hộp. Khoảng 20 phút." },
          { t: "Dùng lại năm sau", d: "Gấp được. Không mua lại cả nhà mỗi Tết." },
        ],
        setKicker: "Bước 2",
        setTitle: "Ba set. Một theme.",
        setIntro: "Không chắc tường rộng bao nhiêu? Gửi 1 ảnh phòng qua Zalo — mình chỉ đúng set.",
        shipTitle: "Đẹp mà tới sau mùng 3 thì không phải Tết.",
        shipHint: "còn để chốt mốc 23 tháng Chạp",
        milestones: [
          { t: `Trước ${chapLabel}`, d: "23 tháng Chạp — nhận để kịp trang trí, gồm tỉnh xa." },
          { t: `Trước ${d28Label}`, d: "28 Tết — còn hàng thì giao, không cam kết mọi tỉnh." },
          { t: "Sau mốc", d: "Mình nói thẳng có kịp hay không. Không nhận đơn rồi im." },
        ],
        faqs: [
          { q: "Mai giả nhìn có giả không?", a: "Dáng gọn, màu hiện đại. Không phải cây hội chợ cắm kín hộp." },
          { q: "Nhà sơn trắng / xám thì có hợp?", a: "Đúng nhà mình làm set này. Đỏ son + kem + gỗ nuốt tường trung tính." },
          ...faqBase,
          { q: "Năm sau dùng lại được không?", a: "Được. Gấp gọn. Đèn và liễn giữ form nếu cất khô." },
        ],
        finalTitle: "Tết năm nay nhà nhìn có chủ ý. Không nhìn như vừa đi siêu thị đồ lễ về.",
        finalSub: "Một set. Một theme. Một buổi treo. Xong.",
        chatWelcome: "Mình là Nhà Có Tết. Ba set: cửa, phòng khách, cả nhà. COD. Nhà bạn chung cư hay nhà phố?",
        footerBlurb: "Set Tết hiện đại cho chung cư và nhà phố. COD toàn quốc.",
        shipRules: `Tết ${L.name}. Tỉnh gần chốt trước ${chapLabel}. Tỉnh xa trước ${stamp(tetFar)}. Sau ${d28Label} không hứa kịp Tết.`,
      },
    },
    {
      id: "women",
      name: "8/3",
      priority: 45,
      sellFrom: at(y, 2, 18),
      earlyEnd: at(y, 3, 1, true),
      event: at(y, 3, 8, true),
      sellUntil: at(y, 3, 8, true),
      products: (early) =>
        simpleProducts(
          early,
          [329000, 549000, 799000],
          [399000, 649000, 949000],
          ["Cửa có một nhánh hoa, không cả cổng hoa.", "Góc mẹ hay ngồi, đèn ấm.", "Cả nhà một màu kem và gỗ."],
          ["Một nhánh đào phai và ruy băng linen. Không cổng hoa.", "Ghế mẹ hay ngồi, đèn ấm, một bình nhỏ. Không bóng bay.", "Cửa, khách, bàn cùng kem và gỗ. Không hồng bóng."],
          ["/images/women-cua.jpg", "/images/women-khach.jpg", "/images/women-nha.jpg"],
        ),
      copy: {
        ...soon("8/3", "08/03", "Chốt trước 08/03."),
        heroImage: "/images/women-hero.jpg",
        kicker: "8/3 · một góc, không cả vườn",
        heroTitle: "8/3 nhà có một góc cho mẹ. Không cần mua cả cổng hoa.",
        heroBody: "Đào phai, kem, gỗ. Ba set. Giá sớm đến 01/03.",
      },
    },
    {
      id: "trungthu",
      name: "Trung thu",
      priority: 60,
      sellFrom: new Date(tt.getTime() - 30 * 86400000),
      earlyEnd: new Date(tt.getTime() - 12 * 86400000),
      event: tt,
      sellUntil: tt,
      products: (early) =>
        simpleProducts(
          early,
          [349000, 599000, 899000],
          [399000, 699000, 999000],
          ["Đèn lồng thấp, không chợ đêm.", "Góc ngồi ăn, ánh đèn ấm.", "Cửa và bàn cùng một màu kem."],
          ["Một đèn lồng thấp ở cửa. Không sạp chợ đêm.", "Hai đèn lồng và khay gỗ. Ánh ấm, không đồ chơi nhựa.", "Cửa, góc ngồi, bàn cùng vàng kem."],
          ["/images/trungthu-cua.jpg", "/images/trungthu-khach.jpg", "/images/trungthu-nha.jpg"],
        ),
      copy: {
        ...soon("Trung thu", ttLabel, "Chốt trước rằm."),
        heroImage: "/images/trungthu-hero.jpg",
        kicker: "Trung thu · trong nhà",
        heroTitle: "Rằm tháng 8, nhà có một góc đèn. Không cần ra chợ đêm.",
        heroBody: "Đèn lồng thấp, kem, gỗ. Ba set cho chung cư. Giá sớm có hạn trước rằm.",
      },
    },
    {
      id: "halloween",
      name: "Halloween",
      priority: 70,
      sellFrom: at(y, 9, 10),
      earlyEnd: at(y, 10, 12, true),
      event: at(y, 10, 31, true),
      sellUntil: at(y, 10, 31, true),
      products: halloweenProducts,
      copy: {
        ticker: ["Giá sớm Halloween đến 12/10", "COD toàn quốc", "Không máu, không đèn nhấp nháy", "Đổi set 48 giờ nếu còn nguyên"],
        kicker: "Halloween · nhà hiện đại",
        heroTitle: "Tối 31 nhà có một góc. Không biến phòng thành quán ma.",
        heroBody: "Đen, kem, hổ phách. Ba set cho chung cư và nhà phố. Treo một buổi, tháo xong không dính keo.",
        heroImage: "/images/halloween-hero.jpg",
        trust: [
          { t: "Kịp 31/10", d: "Chốt trong hạn giá sớm để giữ mức đang hiện." },
          { t: "Không đồ chợ ma", d: "Không máu, không nhện nhựa, không đèn bảy màu." },
          { t: "Không khoan", d: "Móc dán và đặt sàn. Nhà thuê gỡ được." },
          { t: "Một màu cả nhà", d: "Cửa và phòng không mỗi nơi một kiểu." },
        ],
        setKicker: "Ba mức",
        setTitle: "Chọn một set. Đừng mua lẻ rồi ráp lệch.",
        setIntro: "Tường kem hoặc xám nuốt set này tốt. Gửi ảnh phòng nếu không chắc 2m hay 3m.",
        shipTitle: "Đẹp mà tới ngày 1/11 thì hết Halloween.",
        shipHint: "còn trong hạn giá sớm",
        milestones: [
          { t: "Đến 12/10", d: "Giá sớm. Qua ngày này về gần giá gạch ngang." },
          { t: "Trước 27/10", d: "Tỉnh xa nên chốt mốc này để kịp 31/10." },
          { t: "Sau 31/10", d: "Không nhận đơn hứa kịp đêm 31." },
        ],
        faqs: [
          { q: "Nhà có trẻ, có đáng sợ không?", a: "Không. Bí trắng, đèn ấm, không mặt quỷ, không máu." },
          { q: "Ban ngày có tối om không?", a: "Tường vẫn là tường nhà. Đen chỉ là điểm, không sơn lại phòng." },
          ...faqBase,
        ],
        finalTitle: "31/10 nhà nhìn có chủ ý. Không nhìn như sạp đồ chơi.",
        finalSub: "Một set. Một màu. Một buổi treo.",
        chatWelcome: "Shop đang bán set Halloween. Giá trên trang là giá đang chốt. COD. Nhà bạn chung cư hay nhà phố?",
        footerBlurb: "Set Halloween cho chung cư và nhà phố. Đen, kem, hổ phách. COD.",
        shipRules: "Halloween. Giá sớm đến 12/10. Tỉnh xa chốt trước 27/10. Sau 31/10 không hứa kịp.",
      },
    },
    {
      id: "vnwomen",
      name: "20/10",
      priority: 75,
      sellFrom: at(y, 10, 1),
      earlyEnd: at(y, 10, 12, true),
      event: at(y, 10, 20, true),
      sellUntil: at(y, 10, 20, true),
      products: (early) =>
        simpleProducts(
          early,
          [329000, 549000, 829000],
          [399000, 649000, 949000],
          ["Một nhánh ở cửa, không cả cổng hoa.", "Góc bà hay mẹ ngồi.", "Cả nhà kem và gỗ, không hồng bóng."],
          ["Một nhánh hoa khô và ruy băng linen. Không cổng hoa.", "Góc mẹ hay ngồi: đèn ấm, bình gốm, khăn linen.", "Cửa, khách, bàn cùng kem và gỗ."],
          ["/images/vnwomen-cua.jpg", "/images/vnwomen-khach.jpg", "/images/vnwomen-nha.jpg"],
        ),
      copy: {
        ...soon("20/10", "20/10", "Chốt trước 20/10."),
        heroImage: "/images/vnwomen-hero.jpg",
        kicker: "20/10 · góc nhà cho mẹ",
        heroTitle: "20/10 nhà có một góc cho mẹ. Không hồng bóng, không bóng bay.",
        heroBody: "Hoa khô, linen, gỗ. Ba set. Giá sớm đến 12/10.",
      },
    },
    {
      id: "noel",
      name: "Noel",
      priority: 80,
      sellFrom: at(y, 11, 12),
      earlyEnd: at(y, 12, 10, true),
      event: at(y, 12, 24, true),
      sellUntil: at(y, 12, 24, true),
      products: (early) =>
        simpleProducts(
          early,
          [399000, 699000, 999000],
          [469000, 799000, 1149000],
          ["Cửa có một lớp xanh thông và kem.", "Góc cây nhỏ, không che TV.", "Cửa, khách, bàn cùng một Noel."],
          ["Vòng thông ngắn và ruy băng kem. Không cây 2 mét trước cửa.", "Cây bàn, đèn ấm, không che TV.", "Cửa, góc khách, bàn cùng xanh thông và kem."],
          ["/images/noel-cua.jpg", "/images/noel-khach.jpg", "/images/noel-nha.jpg"],
        ),
      copy: {
        ...soon("Noel", "24/12", "Chốt trước 24/12."),
        heroImage: "/images/noel-hero.jpg",
        kicker: "Noel · nhà ở, không quán cafe",
        heroTitle: "Noel trong nhà mình. Không cần cây 2 mét che mất sofa.",
        heroBody: "Xanh thông, kem, gỗ. Ba set cho chung cư. Giá sớm chỉ đến 10/12.",
      },
    },
    {
      id: "newyear",
      name: "Tết Dương",
      priority: 50,
      sellFrom: at(y - 1, 12, 26),
      earlyEnd: at(y - 1, 12, 29, true),
      event: at(y, 1, 1, true),
      sellUntil: at(y, 1, 1, true),
      products: (early) =>
        simpleProducts(
          early,
          [299000, 499000, 749000],
          [359000, 599000, 899000],
          ["Cửa gọn cho đêm giao thừa.", "Góc cụng ly, không bóng bay rẻ.", "Cả nhà một màu sáng."],
          ["Ruy băng linen và một nhánh trắng. Không bóng bay.", "Bàn thấp, hai ly, đèn ấm. Không kim tuyến rẻ.", "Cửa, khách, bàn cùng kem và gỗ sáng."],
          ["/images/newyear-cua.jpg", "/images/newyear-khach.jpg", "/images/newyear-nha.jpg"],
        ),
      copy: {
        ...soon("Tết Dương", "01/01", "Chốt trước giao thừa."),
        heroImage: "/images/newyear-hero.jpg",
        kicker: "Giao thừa · nhà sáng, không bóng bay",
        heroTitle: "Đêm 31 nhà sáng một góc. Không cần bóng bay đầy trần.",
        heroBody: "Kem, gỗ, một nhánh trắng. Ba set. Giá sớm chỉ đến 29/12.",
      },
    },
  ];
}

function allWindows(now: Date): Win[] {
  const y = now.getFullYear();
  return [...buildYear(y - 1), ...buildYear(y), ...buildYear(y + 1)];
}

const PREVIEW_KEY = "nct-season-preview";

export function previewSeasonId() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(PREVIEW_KEY);
}

export function setPreviewSeason(id: string | null) {
  if (id) localStorage.setItem(PREVIEW_KEY, id);
  else localStorage.removeItem(PREVIEW_KEY);
  window.dispatchEvent(new Event("nct-season"));
}

export const SEASON_CHOICES = [
  { id: "tet", label: "Tết" },
  { id: "valentine", label: "Valentine" },
  { id: "women", label: "8/3" },
  { id: "trungthu", label: "Trung thu" },
  { id: "halloween", label: "Halloween" },
  { id: "vnwomen", label: "20/10" },
  { id: "noel", label: "Noel" },
  { id: "newyear", label: "Tết Dương" },
];

function daysUntil(target: Date, now: Date) {
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86400000));
}

function toView(win: Win, now: Date, mode: SeasonMode, next: Win | null): SeasonView {
  const early = now.getTime() <= win.earlyEnd.getTime();
  const farCutoff = win.farCutoff ?? new Date(win.sellUntil.getTime() - 4 * 86400000);
  const hardStop = win.hardStop ?? win.sellUntil;
  return {
    id: win.id,
    name: win.name,
    mode,
    event: win.event,
    sellUntil: win.sellUntil,
    early,
    daysLeft: daysUntil(mode === "open" ? (early ? win.earlyEnd : win.sellUntil) : win.sellFrom, now),
    products: win.products(early || mode === "soon"),
    nextName: next && next.id !== win.id ? next.name : null,
    farCutoff,
    hardStop,
    ...win.copy,
  };
}

export function resolveSeason(now = new Date(), forcedId?: string | null): SeasonView {
  const forced = forcedId !== undefined ? forcedId : previewSeasonId();
  const wins = allWindows(now);
  if (forced) {
    const win = wins
      .filter((w) => w.id === forced && w.sellUntil.getTime() >= now.getTime() - 86400000 * 20)
      .sort((a, b) => a.event.getTime() - b.event.getTime())[0];
    if (win) {
      const open = now >= win.sellFrom && now <= win.sellUntil;
      return toView(win, now, open ? "open" : "soon", null);
    }
  }
  const open = wins
    .filter((w) => now >= w.sellFrom && now <= w.sellUntil)
    .sort((a, b) => a.event.getTime() - b.event.getTime() || b.priority - a.priority);
  const future = wins.filter((w) => w.sellFrom.getTime() > now.getTime()).sort((a, b) => a.sellFrom.getTime() - b.sellFrom.getTime());
  const current = open[0] ?? future[0];
  const next = future.find((w) => w.id !== current?.id) ?? open.find((w) => w.id !== current?.id) ?? null;
  if (!current) {
    const fallback = wins.find((w) => w.id === "tet")!;
    return toView(fallback, now, "soon", null);
  }
  return toView(current, now, open[0] ? "open" : "soon", next);
}

export type PlanItem = {
  id: string;
  name: string;
  state: "open" | "queued" | "soon" | "later";
  fromLabel: string;
  untilLabel: string;
  price: number;
};

export function yearPlan(now = new Date()): PlanItem[] {
  const current = resolveSeason(now);
  const wins = allWindows(now)
    .filter((w) => w.sellUntil.getTime() >= now.getTime() - 86400000)
    .sort((a, b) => a.sellFrom.getTime() - b.sellFrom.getTime() || a.event.getTime() - b.event.getTime());
  const seen = new Set<string>();
  const out: PlanItem[] = [];
  for (const w of wins) {
    if (seen.has(w.id)) continue;
    seen.add(w.id);
    const open = now >= w.sellFrom && now <= w.sellUntil;
    const early = now.getTime() <= w.earlyEnd.getTime();
    const products = w.products(early || now < w.sellFrom);
    const feat = products.find((p) => p.featured) ?? products[0];
    const state: PlanItem["state"] =
      w.id === current.id ? (current.mode === "soon" ? "soon" : "open") : open ? "queued" : "later";
    out.push({
      id: w.id,
      name: w.name,
      state,
      fromLabel: stamp(w.sellFrom),
      untilLabel: stamp(w.sellUntil),
      price: feat.price,
    });
    if (out.length >= 8) break;
  }
  return out;
}

export function useSeason() {
  const [now, setNow] = useState(() => new Date());
  const [, bump] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    const on = () => bump((n) => n + 1);
    window.addEventListener("nct-season", on);
    return () => {
      clearInterval(id);
      window.removeEventListener("nct-season", on);
    };
  }, []);
  return resolveSeason(now);
}

export function seasonProducts(now = new Date()) {
  return resolveSeason(now).products;
}
