import { formatVnd } from "./utils";

export type SizeOpt = { id: string; label: string; price: number };

export type Item = {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  seasons: string[];
  blurb: string;
  image: string;
  sizes?: SizeOpt[];
};

export const CATEGORIES: { id: string; label: string }[] = [
  { id: "tet", label: "Tag Tết" },
  { id: "cua", label: "Cửa & decor" },
  { id: "thuphap", label: "Thư pháp" },
  { id: "lich", label: "Lịch" },
  { id: "trungthu", label: "Trung thu" },
  { id: "halloween", label: "Halloween" },
  { id: "noel", label: "Noel" },
  { id: "ngayphu", label: "8/3 · 20/10" },
  { id: "valentine", label: "Valentine" },
  { id: "hoa", label: "Giỏ hoa" },
  { id: "party", label: "Chữ & hộp quà" },
];

const tagSizes: SizeOpt[] = [
  { id: "8", label: "8cm", price: 12000 },
  { id: "10", label: "10cm có vải", price: 16000 },
];

function tag(id: string, name: string, image: string): Item {
  return {
    id,
    name,
    price: 12000,
    unit: "cái",
    category: "tet",
    seasons: ["tet"],
    image,
    sizes: tagSizes,
    blurb: "MDF cắt laser, dây treo và tua rua. Bản 8cm không lớp vải. Bản 10cm có lớp vải kháng nước. Khắc logo theo yêu cầu khi đặt từ 100 cái.",
  };
}

export const CATALOG: Item[] = [
  tag("tag-doanvien", "Tag Tết Đoàn Viên", "/images/catalog/tag-8.jpg"),
  tag("tag-phucloc", "Tag Phúc – Lộc – Phát", "/images/catalog/tag-10.jpg"),
  tag("tag-binhan", "Tag Bình An", "/images/catalog/tag-binhan.jpg"),
  tag("tag-vansu", "Tag Vạn Sự Như Ý", "/images/catalog/tag-vansu.jpg"),
  tag("tag-chucmung", "Tag Chúc Mừng Năm Mới", "/images/catalog/tag-chucmung.jpg"),
  {
    id: "tag-thantai",
    name: "Tag thần tài / đầu lân",
    price: 20800,
    unit: "cái",
    category: "tet",
    seasons: ["tet"],
    image: "/images/catalog/tag-lon.jpg",
    blurb: "Size lớn 18–22cm. MDF phủ melamine hoặc sơn màu, dây treo và tua rua.",
  },
  {
    id: "tag-30",
    name: "Tag 30cm 1 lớp",
    price: 38000,
    unit: "cái",
    category: "tet",
    seasons: ["tet"],
    image: "/images/catalog/tag-30.jpg",
    blurb: "Bộ chữ và thần tài, mặt 30cm, 1 lớp gỗ, vải kháng nước. Giá bán lẻ catalogue.",
  },
  {
    id: "tag-vip",
    name: "Tag 30cm 2 lớp VIP",
    price: 25000,
    unit: "cái",
    category: "tet",
    seasons: ["tet"],
    image: "/images/catalog/tag-vip.jpg",
    blurb: "Hai lớp MDF nổi, vải kháng nước, mặt 30cm. Dùng treo cửa, cây mai, showroom.",
  },
  {
    id: "decor-xuan",
    name: "Bộ decor Tết – Xuân",
    price: 268000,
    unit: "bộ",
    category: "cua",
    seasons: ["tet"],
    image: "/images/catalog/decor-xuan.jpg",
    blurb: "Liễn gỗ khắc laser, sơn màu, dây treo và tua. Dài khoảng 80cm. Treo cửa, tường, phòng khách.",
  },
  {
    id: "day-chu",
    name: "Dây chữ treo cửa",
    price: 368000,
    unit: "bộ 2 dây",
    category: "cua",
    seasons: ["tet"],
    image: "/images/catalog/day-chu.jpg",
    blurb: "Một bộ hai dây đối xứng, cao khoảng 1,5m, ngang mỗi dây khoảng 80cm. Chữ Vạn, Phúc, Lộc hoặc chữ yêu cầu.",
  },
  {
    id: "phoi-5",
    name: "Combo 5 thẻ phôi thư pháp",
    price: 46000,
    unit: "bộ",
    category: "thuphap",
    seasons: ["tet"],
    image: "/images/catalog/phoi.jpg",
    blurb: "Phôi gỗ nhiều dáng, tua đỏ. Dành cho thầy đồ, shop hoa, workshop. Chưa viết chữ.",
  },
  {
    id: "tomau-tet-25",
    name: "Bộ tô màu Tết 25 hình",
    price: 56800,
    unit: "bộ",
    category: "tet",
    seasons: ["tet"],
    image: "/images/catalog/tomau-tet.jpg",
    blurb: "Gỗ MDF cắt laser, kèm cọ, màu và dây treo. Cho bé, workshop, lớp học.",
  },
  {
    id: "tomau-tet-50",
    name: "Bộ tô màu Tết 50 hình",
    price: 96800,
    unit: "bộ",
    category: "tet",
    seasons: ["tet"],
    image: "/images/catalog/tomau-tet.jpg",
    blurb: "50 hình gỗ Tết, màu và dây treo. Cùng mẫu catalogue, khác số lượng hình.",
  },
  {
    id: "tomau-tet-100",
    name: "Bộ tô màu Tết 100 hình",
    price: 178800,
    unit: "bộ",
    category: "tet",
    seasons: ["tet"],
    image: "/images/catalog/tomau-tet.jpg",
    blurb: "100 hình gỗ Tết, màu và dây treo. Hợp lớp học và sự kiện.",
  },
  {
    id: "lich-ban",
    name: "Lịch để bàn cơ bản",
    price: 25000,
    unit: "cái",
    category: "lich",
    seasons: ["tet", "newyear"],
    image: "/images/catalog/lich-ban.jpg",
    blurb: "Lịch gỗ để bàn. Mẫu đa giác, ngôi nhà, giá đỡ điện thoại báo giá riêng theo số lượng.",
  },
  {
    id: "lich-tuong",
    name: "Lịch treo tường",
    price: 350000,
    unit: "bộ",
    category: "lich",
    seasons: ["tet", "newyear"],
    image: "/images/catalog/lich-tuong.jpg",
    blurb: "Bloc lịch 30×20cm, in 4 màu, hộp kraft, khắc logo. Quà tặng doanh nghiệp.",
  },
  {
    id: "tranh-20",
    name: "Tranh thư pháp 20×37cm",
    price: 98600,
    unit: "bức",
    category: "thuphap",
    seasons: ["tet"],
    image: "/images/catalog/tranh.jpg",
    blurb: "Chữ Việt khắc laser trên MDF. Treo nhà, văn phòng, làm quà.",
  },
  {
    id: "tranh-30",
    name: "Tranh thư pháp 30×55cm",
    price: 148600,
    unit: "bức",
    category: "thuphap",
    seasons: ["tet"],
    image: "/images/catalog/tranh.jpg",
    blurb: "Size chuẩn catalogue. Khắc chữ theo yêu cầu khi đặt số lượng.",
  },
  {
    id: "tranh-40",
    name: "Tranh thư pháp 40×74cm",
    price: 228600,
    unit: "bức",
    category: "thuphap",
    seasons: ["tet"],
    image: "/images/catalog/tranh.jpg",
    blurb: "Cỡ lớn, điểm nhấn phòng khách hoặc sảnh.",
  },
  {
    id: "long-den",
    name: "Kit lồng đèn gỗ Trung thu",
    price: 38800,
    unit: "bộ",
    category: "trungthu",
    seasons: ["trungthu"],
    image: "/images/catalog/longden.jpg",
    blurb: "Gồm hộp, 2 mặt đèn, dây, nến LED, màu. Bé tự lắp.",
  },
  {
    id: "tomau-tt",
    name: "Bộ tô màu Trung thu",
    price: 25000,
    unit: "bộ",
    category: "trungthu",
    seasons: ["trungthu"],
    image: "/images/catalog/tomau-tt.jpg",
    blurb: "10 hình gỗ Trung thu, màu nước, cọ và dây treo.",
  },
  {
    id: "den-hw",
    name: "Đèn bí Halloween",
    price: 41800,
    unit: "bộ",
    category: "halloween",
    seasons: ["halloween"],
    image: "/images/catalog/den-hw.jpg",
    blurb: "Mặt đèn MDF 3mm, băng dính LED, dây treo, set màu 6 màu. Bé tô rồi thắp.",
  },
  {
    id: "tomau-hw-20",
    name: "Bộ tô màu Halloween 20 hình",
    price: 45000,
    unit: "bộ",
    category: "halloween",
    seasons: ["halloween"],
    image: "/images/catalog/tomau-hw.jpg",
    blurb: "20 hình gỗ, màu và dây treo.",
  },
  {
    id: "tomau-hw-50",
    name: "Bộ tô màu Halloween 50 hình",
    price: 98000,
    unit: "bộ",
    category: "halloween",
    seasons: ["halloween"],
    image: "/images/catalog/tomau-hw.jpg",
    blurb: "50 hình gỗ Halloween, màu và dây treo.",
  },
  {
    id: "tomau-hw-100",
    name: "Bộ tô màu Halloween 100 hình",
    price: 168000,
    unit: "bộ",
    category: "halloween",
    seasons: ["halloween"],
    image: "/images/catalog/tomau-hw.jpg",
    blurb: "100 hình gỗ Halloween, màu và dây treo.",
  },
  {
    id: "shadow-hw",
    name: "Halloween shadow",
    price: 38600,
    unit: "bộ",
    category: "halloween",
    seasons: ["halloween"],
    image: "/images/catalog/shadow-hw.jpg",
    blurb: "Bóng gỗ cắt laser, thắp đèn phía sau thành hình bí ngô, ma, nhà.",
  },
  {
    id: "ornament-1",
    name: "Quả treo Noel",
    price: 22600,
    unit: "quả",
    category: "noel",
    seasons: ["noel"],
    image: "/images/catalog/ornament.jpg",
    blurb: "Gỗ MDF dày 3mm, cắt laser. Treo cây thông, cửa sổ, tường.",
  },
  {
    id: "ornament-6",
    name: "Combo 6 quả Noel",
    price: 112800,
    unit: "bộ",
    category: "noel",
    seasons: ["noel"],
    image: "/images/catalog/ornament.jpg",
    blurb: "Sáu mẫu quả treo trong catalogue. Rẻ hơn mua lẻ từng quả.",
  },
  {
    id: "tomau-noel",
    name: "Bộ tô màu Noel 15 hình",
    price: 38000,
    unit: "bộ",
    category: "noel",
    seasons: ["noel"],
    image: "/images/catalog/tomau-noel.jpg",
    blurb: "15 hình gỗ, màu và cọ, dây treo.",
  },
  {
    id: "thiep-hoa",
    name: "Thiệp hoa gỗ tô màu",
    price: 12600,
    unit: "bộ",
    category: "ngayphu",
    seasons: ["women", "vnwomen", "valentine"],
    image: "/images/catalog/thiep-hoa.jpg",
    blurb: "Thiệp gỗ có đế, tự tô. Không kèm màu. Dùng 8/3, 20/10, bàn làm việc.",
  },
  {
    id: "nang-tho",
    name: "Tô màu nàng thơ có đế",
    price: 16800,
    unit: "bộ",
    category: "ngayphu",
    seasons: ["women", "vnwomen"],
    image: "/images/catalog/nang-tho.jpg",
    blurb: "Hình đứng, đế gỗ. Không kèm màu. Tô theo màu áo mình thích.",
  },
  {
    id: "hoa-hong",
    name: "Hoa hồng gỗ",
    price: 38000,
    unit: "bông",
    category: "ngayphu",
    seasons: ["women", "vnwomen", "valentine"],
    image: "/images/catalog/hoa-hong.jpg",
    blurb: "Hoa hồng cắt laser, cắm được. Quà 8/3, 20/10, Valentine.",
  },
  {
    id: "hop-hoa",
    name: "Hộp đựng hoa",
    price: 38000,
    unit: "hộp",
    category: "ngayphu",
    seasons: ["women", "vnwomen", "valentine"],
    image: "/images/catalog/hoa-hong.jpg",
    blurb: "Hộp gỗ đựng hoa hồng. Giá catalogue 38.000đ/hộp, chưa gồm hoa.",
  },
  {
    id: "thiep-be",
    name: "Thiệp bé cầm hoa kèm khung",
    price: 13800,
    unit: "bộ",
    category: "ngayphu",
    seasons: ["women", "vnwomen", "valentine"],
    image: "/images/catalog/thiep-be.jpg",
    blurb: "Khung ảnh, trái tim và đế. Không kèm màu. Khắc chữ khi đặt số lượng.",
  },
  {
    id: "gio-love",
    name: "Giỏ chữ Love",
    price: 69000,
    unit: "cái",
    category: "valentine",
    seasons: ["valentine"],
    image: "/images/catalog/gio-love.jpg",
    blurb: "MDF 3mm, chưa tô màu. Đựng hoa hoặc quà.",
  },
  {
    id: "gio-tim",
    name: "Giỏ trái tim",
    price: 69000,
    unit: "cái",
    category: "valentine",
    seasons: ["valentine"],
    image: "/images/catalog/gio-tim.jpg",
    blurb: "Hai mẫu trái tim trong catalogue, cùng giá 69.000đ/cái.",
  },
  {
    id: "hop-tim",
    name: "Hộp gỗ hình trái tim",
    price: 69000,
    unit: "cái",
    category: "valentine",
    seasons: ["valentine"],
    image: "/images/catalog/hop-tim.jpg",
    blurb: "Hộp nắp khắc hoa, chưa tô màu.",
  },
  {
    id: "hop-chu",
    name: "Hộp chữ và số",
    price: 69000,
    unit: "cái",
    category: "valentine",
    seasons: ["valentine", "women"],
    image: "/images/catalog/hop-chu.jpg",
    blurb: "Chữ MOM hoặc số. Ghi mẫu cần dùng trong ghi chú đơn. 69.000đ/cái.",
  },
  {
    id: "set-love",
    name: "Sét 20 chữ Love",
    price: 38000,
    unit: "bộ",
    category: "valentine",
    seasons: ["valentine"],
    image: "/images/catalog/set-love.jpg",
    blurb: "Chữ gỗ nhỏ rải bàn, hộp quà, backdrop.",
  },
  {
    id: "set-tim",
    name: "Sét 9 trái tim",
    price: 27000,
    unit: "bộ",
    category: "valentine",
    seasons: ["valentine"],
    image: "/images/catalog/set-tim.jpg",
    blurb: "Chín trái tim gỗ, mix đặc và rỗng. Tự tô.",
  },
  {
    id: "gio-1",
    name: "Giỏ hoa For You",
    price: 120000,
    unit: "giỏ",
    category: "hoa",
    seasons: ["valentine", "women", "vnwomen"],
    image: "/images/catalog/gio-1.jpg",
    blurb: "Giỏ gỗ MDF 3mm, chưa gồm hoa tươi. Mẫu For You.",
  },
  {
    id: "gio-2",
    name: "Giỏ hoa Thank You",
    price: 120000,
    unit: "giỏ",
    category: "hoa",
    seasons: ["valentine", "women", "vnwomen"],
    image: "/images/catalog/gio-2.jpg",
    blurb: "Giỏ gỗ, mặt trái tim Thank You. Chưa gồm hoa.",
  },
  {
    id: "gio-3",
    name: "Giỏ hoa nắp vòm",
    price: 120000,
    unit: "giỏ",
    category: "hoa",
    seasons: ["valentine", "women"],
    image: "/images/catalog/gio-3.jpg",
    blurb: "Quai gỗ, mặt trước nan. Chưa gồm hoa.",
  },
  {
    id: "gio-4",
    name: "Giỏ hoa họa tiết vàng",
    price: 120000,
    unit: "giỏ",
    category: "hoa",
    seasons: ["valentine", "women"],
    image: "/images/catalog/gio-4.jpg",
    blurb: "Mặt khắc hoa vàng đen. Chưa gồm hoa.",
  },
  {
    id: "gio-5",
    name: "Giỏ hoa hình học",
    price: 120000,
    unit: "giỏ",
    category: "hoa",
    seasons: ["valentine", "women"],
    image: "/images/catalog/gio-5.jpg",
    blurb: "Mặt khắc hình học. Chưa gồm hoa. Cùng giá 120.000đ/giỏ.",
  },
  {
    id: "chu-block",
    name: "Chữ block đèn",
    price: 80000,
    unit: "chữ",
    category: "party",
    seasons: ["valentine", "newyear", "noel"],
    image: "/images/catalog/chu-block.jpg",
    blurb: "30×30×30cm, gỗ cắt laser, có thể gắn đèn. Ghi chữ hoặc số cần dùng khi đặt.",
  },
  {
    id: "hop-wedding",
    name: "Hộp tiền mừng Wedding",
    price: 120000,
    unit: "cái",
    category: "party",
    seasons: ["valentine"],
    image: "/images/catalog/hop-wedding.jpg",
    blurb: "20×20×15cm. Khắc Wedding. Đựng tiền mừng.",
  },
  {
    id: "hop-birthday",
    name: "Hộp tiền mừng Birthday",
    price: 120000,
    unit: "cái",
    category: "party",
    seasons: ["newyear"],
    image: "/images/catalog/hop-birthday.jpg",
    blurb: "20×20×15cm. Mặt Happy Birthday.",
  },
  {
    id: "hop-love",
    name: "Hộp tiền mừng Love",
    price: 120000,
    unit: "cái",
    category: "party",
    seasons: ["valentine"],
    image: "/images/catalog/hop-love.jpg",
    blurb: "20×20×15cm. Mặt Love. Cùng giá các hộp tiền mừng.",
  },
  {
    id: "loi-tim",
    name: "Lời chúc trái tim",
    price: 50000,
    unit: "cái",
    category: "party",
    seasons: ["valentine", "tet"],
    image: "/images/catalog/loi-tim.jpg",
    blurb: "18×18cm. Chúc mừng hạnh phúc. Cắm bàn tiệc.",
  },
  {
    id: "loi-bd",
    name: "Lời chúc Happy Birthday",
    price: 50000,
    unit: "cái",
    category: "party",
    seasons: ["newyear"],
    image: "/images/catalog/loi-bd.jpg",
    blurb: "20×15cm. Chữ Happy Birthday để bàn.",
  },
];

export function fold(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

export function minPrice(item: Item) {
  if (!item.sizes?.length) return item.price;
  return Math.min(...item.sizes.map((s) => s.price));
}

export function resolveSku(cartId: string): { cartId: string; name: string; price: number; unit: string; image: string; blurb: string } | null {
  const [base, sizeId] = cartId.split("--");
  const item = CATALOG.find((p) => p.id === base);
  if (!item) return null;
  const size = item.sizes?.find((s) => s.id === sizeId);
  return {
    cartId: size ? `${item.id}--${size.id}` : item.id,
    name: size ? `${item.name} · ${size.label}` : item.name,
    price: size?.price ?? item.price,
    unit: item.unit,
    image: item.image,
    blurb: item.blurb,
  };
}

export function filterCatalog(query: string, category: string, seasonId: string) {
  const q = fold(query.trim());
  return CATALOG.filter((item) => {
    if (category === "mua" && !item.seasons.includes(seasonId)) return false;
    if (category !== "all" && category !== "mua" && item.category !== category) return false;
    if (!q) return true;
    const hay = fold(`${item.name} ${item.blurb} ${item.category}`);
    return q.split(/\s+/).every((w) => w.length < 2 || hay.includes(w));
  });
}

export function catalogReply(text: string) {
  const q = fold(text);
  let pool = CATALOG;
  if (/halloween|bi ngo|bong ma/.test(q)) pool = CATALOG.filter((i) => i.category === "halloween");
  else if (/noel|giang sinh|thong/.test(q)) pool = CATALOG.filter((i) => i.category === "noel");
  else if (/trung thu|long den/.test(q)) pool = CATALOG.filter((i) => i.category === "trungthu");
  else if (/8\/3|20\/10|hoa hong|me|phu nu/.test(q)) pool = CATALOG.filter((i) => i.category === "ngayphu");
  else if (/valentine|love|trai tim/.test(q)) pool = CATALOG.filter((i) => i.category === "valentine" || i.category === "hoa");
  else if (/gio hoa|gio dung/.test(q)) pool = CATALOG.filter((i) => i.category === "hoa");
  else if (/lich/.test(q)) pool = CATALOG.filter((i) => i.category === "lich");
  else if (/thu phap|tranh/.test(q)) pool = CATALOG.filter((i) => i.category === "thuphap");
  else if (/day chu|treo cua|decor tet|lien/.test(q)) pool = CATALOG.filter((i) => i.category === "cua");
  else if (/tag|the go/.test(q)) pool = CATALOG.filter((i) => i.id.startsWith("tag"));
  else if (/hop tien|chu block|sinh nhat|birthday/.test(q)) pool = CATALOG.filter((i) => i.category === "party");
  else {
    const words = q.split(/\s+/).filter((w) => w.length > 2);
    const hits = CATALOG.filter((i) => words.some((w) => fold(i.name).includes(w)));
    if (hits.length) pool = hits;
  }
  const lines = pool.slice(0, 4).map((i) => {
    if (i.sizes) return `${i.name}: ${i.sizes.map((s) => `${s.label} ${formatVnd(s.price)}`).join(" hoặc ")}`;
    return `${i.name}: ${formatVnd(i.price)}/${i.unit}`;
  });
  return `${lines.join("\n")}\nGiá bán lẻ catalogue. Bấm Thêm ở đúng món. COD, không chuyển khoản trước.`;
}

export function catalogPriceTokens() {
  const nums = new Set<string>();
  for (const item of CATALOG) {
    const values = item.sizes?.map((s) => s.price) ?? [item.price];
    for (const n of values) {
      nums.add(String(n));
      nums.add(formatVnd(n).replace("đ", "").trim());
    }
  }
  return nums;
}

const BANNERS: Record<string, { title: string; line: string; hero: string }> = {
  halloween: {
    title: "Đèn bí và bóng gỗ.",
    line: "Tô một buổi, thắp tối 31.",
    hero: "den-hw",
  },
  tet: {
    title: "Tag cửa và dây chữ.",
    line: "Treo một buổi. Sỉ từ 20 cái.",
    hero: "day-chu",
  },
  noel: {
    title: "Quả treo và bộ tô Noel.",
    line: "Combo 6 quả rẻ hơn mua từng quả.",
    hero: "ornament-1",
  },
  trungthu: {
    title: "Lồng đèn gỗ tự lắp.",
    line: "Có mặt đèn, màu và nến LED.",
    hero: "long-den",
  },
  women: {
    title: "Hoa hồng gỗ và thiệp tô.",
    line: "Quà 8/3, giá bán lẻ.",
    hero: "hoa-hong",
  },
  vnwomen: {
    title: "Quà gỗ cho 20/10.",
    line: "Thiệp, nàng thơ, hoa hồng.",
    hero: "hoa-hong",
  },
  valentine: {
    title: "Giỏ, hộp tim, chữ Love.",
    line: "Gỗ chưa tô. Giỏ và hộp 69.000đ.",
    hero: "gio-love",
  },
  newyear: {
    title: "Chữ đèn và hộp quà.",
    line: "Block 30cm, lời chúc để bàn.",
    hero: "chu-block",
  },
};

export function seasonBanner(seasonId: string) {
  return (
    BANNERS[seasonId] ?? {
      title: "Đồ gỗ cắt laser.",
      line: "Giá bán lẻ catalogue.",
      hero: CATALOG[0]?.id ?? "",
    }
  );
}

export function bundleSave(item: Item) {
  if (item.id !== "ornament-6") return 0;
  const one = CATALOG.find((i) => i.id === "ornament-1");
  if (!one) return 0;
  return Math.max(0, one.price * 6 - item.price);
}

export type Spot = { item: Item; reason: string };

export function spotlight(seasonId: string): Spot[] {
  const rows = CATALOG.filter((item) => item.seasons.includes(seasonId)).map((item) => ({
    item,
    price: minPrice(item),
  }));
  if (!rows.length) return [];
  const cheapest = Math.min(...rows.map((row) => row.price));
  return rows
    .sort((a, b) => a.price - b.price)
    .map(({ item, price }) => {
      const save = bundleSave(item);
      if (save > 0) return { item, reason: `Rẻ hơn mua lẻ ${formatVnd(save)}` };
      if (/100 hình|50 hình/.test(item.name)) return { item, reason: "Cho lớp, sự kiện" };
      if (price === cheapest) return { item, reason: "Giá thấp trong dịp" };
      if (price <= 50000) return { item, reason: "Dưới 50.000đ" };
      return { item, reason: "Đang mùa" };
    });
}
