import { getProduct, type ProductId } from "./products";
import { resolveSeason, type SeasonView } from "./seasons";
import { formatVnd } from "./utils";

export type Channel = "zalo" | "facebook" | "tiktok";
export type Intent =
  | "gia"
  | "nha"
  | "mai_gia"
  | "thue"
  | "giao"
  | "giam"
  | "anh"
  | "chot"
  | "doi"
  | "khac";

export type CloseGate = {
  id: "set" | "phone" | "province" | "stock" | "deadline";
  label: string;
  ok: boolean;
  detail: string;
};

export type CloseVerdict = {
  canClose: boolean;
  gates: CloseGate[];
  failReasons: string[];
};

export type DraftReply = {
  intent: Intent;
  reply: string;
  suggestedSet?: ProductId;
  escalate?: boolean;
  escalateReason?: string;
};

export type StockMap = Record<ProductId, number>;

type Province = { name: string; aliases: string[]; far: boolean };

export const PROVINCES: Province[] = [
  { name: "Hà Nội", aliases: ["ha noi", "hà nội", "hn"], far: false },
  { name: "Hồ Chí Minh", aliases: ["hcm", "tphcm", "sài gòn", "sai gon", "tp hcm", "hồ chí minh"], far: false },
  { name: "Đà Nẵng", aliases: ["da nang", "đà nẵng"], far: false },
  { name: "Hải Phòng", aliases: ["hai phong", "hải phòng"], far: false },
  { name: "Cần Thơ", aliases: ["can tho", "cần thơ"], far: false },
  { name: "Thanh Hóa", aliases: ["thanh hoa", "thanh hoá", "sầm sơn", "sam son"], far: false },
  { name: "Nghệ An", aliases: ["nghe an", "nghệ an", "vinh"], far: false },
  { name: "Huế", aliases: ["hue", "thừa thiên"], far: false },
  { name: "Nha Trang", aliases: ["nha trang", "khánh hòa", "khanh hoa"], far: false },
  { name: "Bình Dương", aliases: ["binh duong", "bình dương"], far: false },
  { name: "Đồng Nai", aliases: ["dong nai", "đồng nai", "biên hòa"], far: false },
  { name: "Bà Rịa Vũng Tàu", aliases: ["vũng tàu", "vung tau", "bà rịa"], far: false },
  { name: "Hải Dương", aliases: ["hai duong", "hải dương"], far: false },
  { name: "Nam Định", aliases: ["nam dinh", "nam định"], far: false },
  { name: "Ninh Bình", aliases: ["ninh binh", "ninh bình"], far: false },
  { name: "Quảng Ninh", aliases: ["ha long", "hạ long", "quảng ninh"], far: false },
  { name: "Bắc Ninh", aliases: ["bac ninh", "bắc ninh"], far: false },
  { name: "Hưng Yên", aliases: ["hung yen", "hưng yên"], far: false },
  { name: "Hà Giang", aliases: ["ha giang", "hà giang"], far: true },
  { name: "Cao Bằng", aliases: ["cao bang", "cao bằng"], far: true },
  { name: "Lai Châu", aliases: ["lai chau", "lai châu"], far: true },
  { name: "Điện Biên", aliases: ["dien bien", "điện biên"], far: true },
  { name: "Sơn La", aliases: ["son la", "sơn la"], far: true },
  { name: "Lào Cai", aliases: ["lao cai", "lào cai", "sapa", "sa pa"], far: true },
  { name: "Yên Bái", aliases: ["yen bai", "yên bái"], far: true },
  { name: "Kon Tum", aliases: ["kon tum"], far: true },
  { name: "Gia Lai", aliases: ["gia lai", "pleiku"], far: true },
  { name: "Đắk Lắk", aliases: ["dak lak", "đắk lắk", "buon ma thuot"], far: true },
  { name: "Đắk Nông", aliases: ["dak nong", "đắk nông"], far: true },
  { name: "Lâm Đồng", aliases: ["lam dong", "đà lạt", "da lat"], far: true },
  { name: "Cà Mau", aliases: ["ca mau", "cà mau"], far: true },
  { name: "Kiên Giang", aliases: ["kien giang", "kiên giang", "phú quốc", "phu quoc"], far: true },
  { name: "An Giang", aliases: ["an giang"], far: true },
];

export function detectPhone(text: string): string | undefined {
  const digits = text.replace(/[.\s-]/g, " ");
  const m = digits.match(/(?:\+?84|0)(?:3|5|7|8|9)\d{8}/);
  if (!m) return undefined;
  let p = m[0].replace(/\D/g, "");
  if (p.startsWith("84")) p = "0" + p.slice(2);
  return p.length === 10 ? p : undefined;
}

export function detectProvince(text: string): Province | undefined {
  const n = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  for (const p of PROVINCES) {
    for (const a of [p.name, ...p.aliases]) {
      const na = a
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      if (n.includes(na)) return p;
    }
  }
  return undefined;
}

export function detectSet(text: string, products = resolveSeason().products): ProductId | undefined {
  const t = text.toLowerCase();
  if (/cả nhà|ca nha|full nhà|full nha|combo nhà|set nhà|set nha/.test(t)) return "nha";
  if (/phòng khách|phong khach|set khách|set khach/.test(t)) return "khach";
  if (/set cửa|set cua|cửa ra vào|cua ra vao/.test(t)) return "cua";
  const compact = t.replace(/[\s.]/g, "");
  for (const p of [...products].sort((a, b) => b.price - a.price)) {
    const k = String(Math.round(p.price / 1000));
    if (k.length >= 3 && new RegExp(`(?:^|\\D)${k}(?:\\D|$)`).test(compact)) return p.id;
  }
  if (/cửa|cua/.test(t) && !/cửa sổ|cua so/.test(t)) return "cua";
  return undefined;
}

export function classifyIntent(text: string): Intent {
  const t = text.toLowerCase();
  if (/đặt|dat hang|chốt|chot|lấy set|lay set|mua luôn|mua luon|ok chốt/.test(t) && detectPhone(t))
    return "chot";
  if (/đặt|chốt|mua|lấy/.test(t) && (detectSet(t) || detectPhone(t))) return "chot";
  if (/giá|gia bao|bao nhiêu|bao nhieu|bn\b|price/.test(t)) return "gia";
  if (/mai giả|mai gia|nhìn rẻ|nhin re|hội chợ|hoi cho|giả trông/.test(t)) return "mai_gia";
  if (/nhà thuê|nha thue|khoan|dán tường|dan tuong|chung cư thuê/.test(t)) return "thue";
  if (/ship|giao|kịp tết|kip tet|tỉnh|tinh |bao lâu|bao lau/.test(t)) return "giao";
  if (/giảm|giam gia|bớt|bot gia|rẻ hơn|re hon|mặc cả/.test(t)) return "giam";
  if (/ảnh|anh phòng|gui anh|gửi ảnh|hình nhà/.test(t)) return "anh";
  if (/đổi|doi set|sai size|hoàn/.test(t)) return "doi";
  if (/chung cư|chung cu|nhà phố|nha pho|căn hộ|can ho|70m|80m|phòng khách|cửa/.test(t))
    return "nha";
  return "khac";
}

function setLine(id: ProductId, season: SeasonView) {
  const p = season.products.find((x) => x.id === id) ?? getProduct(id);
  return `${p.name} ${formatVnd(p.price)} — ${p.tagline}`;
}

export function draftReply(text: string, suggestedFromThread?: ProductId, season: SeasonView = resolveSeason()): DraftReply {
  const intent = classifyIntent(text);
  const set = detectSet(text, season.products) ?? suggestedFromThread;
  const province = detectProvince(text);
  const t = text.toLowerCase();
  const prices = season.products.map((p) => formatVnd(p.price)).join(" / ");

  if (intent === "gia") {
    return {
      intent,
      suggestedSet: set ?? "khach",
      reply: [
        `Ba set ${season.name}, không mix lẻ:`,
        `· ${setLine("cua", season)} — tường cửa ~1m.`,
        `· ${setLine("khach", season)} — phòng khách tường 2–3m. Bán chạy nhất.`,
        `· ${setLine("nha", season)} — cửa + khách + bàn.`,
        "Nhà bạn chung cư hay nhà phố? Gửi 1 ảnh tường mình chỉ đúng 1 set.",
      ].join("\n"),
    };
  }

  if (intent === "nha") {
    const apt = /chung cư|chung cu|căn hộ|can ho|70m|80m/.test(t);
    const house = /nhà phố|nha pho|biệt thự|biet thu/.test(t);
    const pick: ProductId = house ? "nha" : "khach";
    return {
      intent,
      suggestedSet: pick,
      reply: apt
        ? `Chung cư tường 2–3m thường lấy ${setLine("khach", season)}. Cửa hẹp thì thêm ${setLine("cua", season)}. Gửi ảnh phòng khách — mình đo ước lượng, không bán dư.`
        : house
          ? `Nhà phố hợp ${setLine("nha", season)} vì có cửa + khách cùng một theme. Nếu chỉ muốn một góc: ${setLine("khach", season)}. Gửi ảnh cửa và phòng khách.`
          : `Mình chỉ đúng 1 set theo tường, không bán rải. Chung cư thường ${setLine("khach", season)}. Nhà phố thường ${setLine("nha", season)}. Gửi 1 ảnh phòng khách.`,
    };
  }

  if (intent === "mai_gia") {
    return {
      intent,
      suggestedSet: "khach",
      reply: `Đồ trong set là dáng gọn, không hàng hội chợ. ${setLine("khach", season)}. Mình gửi cận ban ngày — nếu trông rẻ, đừng mua.`,
    };
  }

  if (intent === "thue") {
    return {
      intent,
      suggestedSet: set ?? "khach",
      reply: "Nhà thuê: trong hộp có móc dán. Đồ đặt sàn, không khoan. Tường sơn bong thì nói mình — mình chỉ vị trí, không dán. Gửi ảnh tường.",
    };
  }

  if (intent === "giao") {
    const far = province?.far;
    const name = province?.name ?? "tỉnh bạn";
    const now = new Date();
    if (now > season.hardStop) {
      return {
        intent,
        escalate: true,
        escalateReason: `Đã qua hạn giao ${season.name}.`,
        reply: `Mốc giao ${season.name} đã khép. Mình không nhận đơn hứa kịp nữa.`,
      };
    }
    if (far && now > season.farCutoff) {
      return {
        intent,
        escalate: true,
        escalateReason: `${name} là tỉnh xa, đã qua mốc giao sớm.`,
        reply: `${name} mình không dám hứa kịp ${season.name} nếu chốt hôm nay. Muốn giữ hàng giao sau thì nói — không nhận rồi im.`,
      };
    }
    return {
      intent,
      suggestedSet: set,
      reply: province
        ? `${name}: ${season.shipRules} COD. Gửi SĐT + địa chỉ có tỉnh để chốt.`
        : `${season.shipRules} Bạn ở tỉnh nào?`,
    };
  }

  if (intent === "giam") {
    return {
      intent,
      suggestedSet: set ?? "khach",
      reply: `Giá set niêm yết, không mặc cả. Có thể tặng thêm móc nếu đơn hôm nay. Mức mình giữ: ${setLine(set ?? "khach", season)}. Chốt SĐT + địa chỉ thì mình giữ hàng.`,
    };
  }

  if (intent === "anh") {
    return {
      intent,
      suggestedSet: set ?? "khach",
      reply: "Gửi 1 ảnh tường phòng khách (rộng ~2–3m là đẹp). Mình chọn đúng 1 set, không đẩy combo. Ảnh tối vẫn đọc được.",
    };
  }

  if (intent === "doi") {
    return {
      intent,
      escalate: true,
      escalateReason: "Đổi/hoàn — luôn người xử lý.",
      reply: "Đổi set trong 48 giờ nếu hàng còn nguyên hộp. Mình chuyển người cầm đơn — bạn giữ SĐT lúc đặt.",
    };
  }

  if (intent === "chot") {
    return {
      intent,
      suggestedSet: set,
      reply: set
        ? `Chốt ${setLine(set, season)}, COD. Gửi: họ tên, SĐT, địa chỉ có tỉnh. Mình xác nhận mã đơn ngay — không chuyển khoản trước.`
        : `Mình chốt đúng 1 set: ${prices}. Bạn lấy set nào? Gửi SĐT + địa chỉ có tỉnh.`,
    };
  }

  return {
    intent,
    suggestedSet: set ?? "khach",
    escalate: /mắng|lừa|scam|kiện|luật sư|hàng giả/.test(t),
    escalateReason: /mắng|lừa|scam|kiện|hàng giả/.test(t) ? "Khiếu nại / nghi ngờ — người trả." : undefined,
    reply: `Mình bán 3 set ${season.name}: ${prices}. Gửi ảnh phòng hoặc nói chung cư/nhà phố — mình chỉ 1 set, không nhồi.`,
  };
}

export type CloseInput = {
  setId?: ProductId;
  phone?: string;
  address?: string;
  provinceName?: string;
  stock: StockMap;
  now?: Date;
  season?: SeasonView;
};

export function evaluateClose(input: CloseInput): CloseVerdict {
  const now = input.now ?? new Date();
  const season = input.season ?? resolveSeason(now);
  const province =
    (input.provinceName ? PROVINCES.find((p) => p.name === input.provinceName) : undefined) ??
    (input.address ? detectProvince(input.address) : undefined);
  const phone = input.phone && input.phone.replace(/\D/g, "").length === 10 ? input.phone : undefined;
  const chosen = input.setId ? (season.products.find((p) => p.id === input.setId) ?? getProduct(input.setId)) : undefined;

  const gates: CloseGate[] = [
    {
      id: "set",
      label: "Đúng 1 set",
      ok: Boolean(input.setId),
      detail: chosen ? chosen.name : `Chưa chọn set ${season.name}`,
    },
    {
      id: "phone",
      label: "SĐT 10 số",
      ok: Boolean(phone),
      detail: phone ?? "Thiếu số điện thoại Việt Nam",
    },
    {
      id: "province",
      label: "Địa chỉ có tỉnh",
      ok: Boolean(province) || Boolean(input.address && input.address.trim().length >= 12),
      detail: province?.name ?? (input.address?.trim() ? "Có địa chỉ — kiểm tra tỉnh" : "Thiếu tỉnh/thành"),
    },
    {
      id: "stock",
      label: "Còn hàng",
      ok: input.setId ? (input.stock[input.setId] ?? 0) > 0 : false,
      detail: input.setId
        ? `Tồn ${chosen?.name ?? input.setId}: ${input.stock[input.setId]}`
        : "Chưa gắn set",
    },
    {
      id: "deadline",
      label: "Còn trong mốc giao",
      ok: (() => {
        if (now > season.hardStop) return false;
        if (province?.far && now > season.farCutoff) return false;
        if (now > season.sellUntil) return false;
        return true;
      })(),
      detail: (() => {
        if (now > season.hardStop) return season.id === "tet" ? "Đã qua 28 Tết" : `Đã qua ngày ${season.name}`;
        if (province?.far && now > season.farCutoff) return `${province.name}: tỉnh xa, đã qua mốc giao sớm`;
        if (now > season.sellUntil) return season.id === "tet" ? "Đã qua 23 tháng Chạp" : `Đã qua hạn giao ${season.name}`;
        return province?.far ? `${province.name}: kịp nếu chốt sớm` : `Còn trong hạn ${season.name}`;
      })(),
    },
  ];

  // Soft province: address long enough counts as ok for gate, but far-deadline still uses detected province
  if (!province && input.address && input.address.trim().length >= 12) {
    const g = gates.find((x) => x.id === "province")!;
    g.ok = true;
    g.detail = "Địa chỉ đủ dài — tỉnh chưa nhận diện được, người nên xem lại";
  }

  const failReasons = gates.filter((g) => !g.ok).map((g) => g.detail);
  return { canClose: failReasons.length === 0, gates, failReasons };
}

export function saleCards() {
  const s = resolveSeason();
  const line = (id: ProductId) => {
    const p = s.products.find((x) => x.id === id) ?? getProduct(id);
    return `${p.name} ${formatVnd(p.price)}`;
  };
  return [
    { title: "Giá", body: `3 set ${s.name}: ${line("cua")} · ${line("khach")} · ${line("nha")}. Không mix lẻ. Hỏi loại nhà rồi chỉ 1 set.` },
    { title: "Chung cư", body: `Tường 2–3m → ${line("khach")}. Cửa hẹp → ${line("cua")}. Xin ảnh phòng.` },
    { title: "Nhà phố", body: `Cửa + khách → ${line("nha")}. Chỉ muốn một góc → ${line("khach")}.` },
    { title: "Nhìn rẻ?", body: "Dáng gọn, cận ban ngày. Không hội chợ. Không đẹp thì đừng mua." },
    { title: "Nhà thuê", body: "Móc dán có trong hộp. Đồ đặt sàn. Không khoan." },
    { title: `Giao ${s.name}`, body: s.shipRules },
    { title: "Xin giảm", body: "Không mặc cả set. Có thể tặng phụ kiện nhỏ. Giữ giá, đẩy chốt." },
    { title: "Gửi ảnh", body: "Đo ước lượng → đúng 1 set → mời COD hoặc SĐT." },
  ];
}

export const CHANNEL_LABEL: Record<Channel, string> = {
  zalo: "Zalo",
  facebook: "Facebook",
  tiktok: "TikTok",
};
