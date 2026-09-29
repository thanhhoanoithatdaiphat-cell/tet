import { i as seasonProducts, r as resolveSeason } from "./seasons-t_J3k4e-.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/brain-B76nEHmp.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatVnd(n) {
	return new Intl.NumberFormat("vi-VN").format(n) + "đ";
}
var CATEGORIES = [
	{
		id: "tet",
		label: "Tag Tết"
	},
	{
		id: "cua",
		label: "Cửa & decor"
	},
	{
		id: "thuphap",
		label: "Thư pháp"
	},
	{
		id: "lich",
		label: "Lịch"
	},
	{
		id: "trungthu",
		label: "Trung thu"
	},
	{
		id: "halloween",
		label: "Halloween"
	},
	{
		id: "noel",
		label: "Noel"
	},
	{
		id: "ngayphu",
		label: "8/3 · 20/10"
	},
	{
		id: "valentine",
		label: "Valentine"
	},
	{
		id: "hoa",
		label: "Giỏ hoa"
	},
	{
		id: "party",
		label: "Chữ & hộp quà"
	}
];
var tagSizes = [{
	id: "8",
	label: "8cm",
	price: 12e3
}, {
	id: "10",
	label: "10cm có vải",
	price: 16e3
}];
function tag(id, name, image) {
	return {
		id,
		name,
		price: 12e3,
		unit: "cái",
		category: "tet",
		seasons: ["tet"],
		image,
		sizes: tagSizes,
		blurb: "MDF cắt laser, dây treo và tua rua. Bản 8cm không lớp vải. Bản 10cm có lớp vải kháng nước. Khắc logo theo yêu cầu khi đặt từ 100 cái."
	};
}
var CATALOG = [
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
		blurb: "Size lớn 18–22cm. MDF phủ melamine hoặc sơn màu, dây treo và tua rua."
	},
	{
		id: "tag-30",
		name: "Tag 30cm 1 lớp",
		price: 38e3,
		unit: "cái",
		category: "tet",
		seasons: ["tet"],
		image: "/images/catalog/tag-30.jpg",
		blurb: "Bộ chữ và thần tài, mặt 30cm, 1 lớp gỗ, vải kháng nước. Giá bán lẻ catalogue."
	},
	{
		id: "tag-vip",
		name: "Tag 30cm 2 lớp VIP",
		price: 25e3,
		unit: "cái",
		category: "tet",
		seasons: ["tet"],
		image: "/images/catalog/tag-vip.jpg",
		blurb: "Hai lớp MDF nổi, vải kháng nước, mặt 30cm. Dùng treo cửa, cây mai, showroom."
	},
	{
		id: "decor-xuan",
		name: "Bộ decor Tết – Xuân",
		price: 268e3,
		unit: "bộ",
		category: "cua",
		seasons: ["tet"],
		image: "/images/catalog/decor-xuan.jpg",
		blurb: "Liễn gỗ khắc laser, sơn màu, dây treo và tua. Dài khoảng 80cm. Treo cửa, tường, phòng khách."
	},
	{
		id: "day-chu",
		name: "Dây chữ treo cửa",
		price: 368e3,
		unit: "bộ 2 dây",
		category: "cua",
		seasons: ["tet"],
		image: "/images/catalog/day-chu.jpg",
		blurb: "Một bộ hai dây đối xứng, cao khoảng 1,5m, ngang mỗi dây khoảng 80cm. Chữ Vạn, Phúc, Lộc hoặc chữ yêu cầu."
	},
	{
		id: "phoi-5",
		name: "Combo 5 thẻ phôi thư pháp",
		price: 46e3,
		unit: "bộ",
		category: "thuphap",
		seasons: ["tet"],
		image: "/images/catalog/phoi.jpg",
		blurb: "Phôi gỗ nhiều dáng, tua đỏ. Dành cho thầy đồ, shop hoa, workshop. Chưa viết chữ."
	},
	{
		id: "tomau-tet-25",
		name: "Bộ tô màu Tết 25 hình",
		price: 56800,
		unit: "bộ",
		category: "tet",
		seasons: ["tet"],
		image: "/images/catalog/tomau-tet.jpg",
		blurb: "Gỗ MDF cắt laser, kèm cọ, màu và dây treo. Cho bé, workshop, lớp học."
	},
	{
		id: "tomau-tet-50",
		name: "Bộ tô màu Tết 50 hình",
		price: 96800,
		unit: "bộ",
		category: "tet",
		seasons: ["tet"],
		image: "/images/catalog/tomau-tet.jpg",
		blurb: "50 hình gỗ Tết, màu và dây treo. Cùng mẫu catalogue, khác số lượng hình."
	},
	{
		id: "tomau-tet-100",
		name: "Bộ tô màu Tết 100 hình",
		price: 178800,
		unit: "bộ",
		category: "tet",
		seasons: ["tet"],
		image: "/images/catalog/tomau-tet.jpg",
		blurb: "100 hình gỗ Tết, màu và dây treo. Hợp lớp học và sự kiện."
	},
	{
		id: "lich-ban",
		name: "Lịch để bàn cơ bản",
		price: 25e3,
		unit: "cái",
		category: "lich",
		seasons: ["tet", "newyear"],
		image: "/images/catalog/lich-ban.jpg",
		blurb: "Lịch gỗ để bàn. Mẫu đa giác, ngôi nhà, giá đỡ điện thoại báo giá riêng theo số lượng."
	},
	{
		id: "lich-tuong",
		name: "Lịch treo tường",
		price: 35e4,
		unit: "bộ",
		category: "lich",
		seasons: ["tet", "newyear"],
		image: "/images/catalog/lich-tuong.jpg",
		blurb: "Bloc lịch 30×20cm, in 4 màu, hộp kraft, khắc logo. Quà tặng doanh nghiệp."
	},
	{
		id: "tranh-20",
		name: "Tranh thư pháp 20×37cm",
		price: 98600,
		unit: "bức",
		category: "thuphap",
		seasons: ["tet"],
		image: "/images/catalog/tranh.jpg",
		blurb: "Chữ Việt khắc laser trên MDF. Treo nhà, văn phòng, làm quà."
	},
	{
		id: "tranh-30",
		name: "Tranh thư pháp 30×55cm",
		price: 148600,
		unit: "bức",
		category: "thuphap",
		seasons: ["tet"],
		image: "/images/catalog/tranh.jpg",
		blurb: "Size chuẩn catalogue. Khắc chữ theo yêu cầu khi đặt số lượng."
	},
	{
		id: "tranh-40",
		name: "Tranh thư pháp 40×74cm",
		price: 228600,
		unit: "bức",
		category: "thuphap",
		seasons: ["tet"],
		image: "/images/catalog/tranh.jpg",
		blurb: "Cỡ lớn, điểm nhấn phòng khách hoặc sảnh."
	},
	{
		id: "long-den",
		name: "Kit lồng đèn gỗ Trung thu",
		price: 38800,
		unit: "bộ",
		category: "trungthu",
		seasons: ["trungthu"],
		image: "/images/catalog/longden.jpg",
		blurb: "Gồm hộp, 2 mặt đèn, dây, nến LED, màu. Bé tự lắp."
	},
	{
		id: "tomau-tt",
		name: "Bộ tô màu Trung thu",
		price: 25e3,
		unit: "bộ",
		category: "trungthu",
		seasons: ["trungthu"],
		image: "/images/catalog/tomau-tt.jpg",
		blurb: "10 hình gỗ Trung thu, màu nước, cọ và dây treo."
	},
	{
		id: "den-hw",
		name: "Đèn bí Halloween",
		price: 41800,
		unit: "bộ",
		category: "halloween",
		seasons: ["halloween"],
		image: "/images/catalog/den-hw.jpg",
		blurb: "Mặt đèn MDF 3mm, băng dính LED, dây treo, set màu 6 màu. Bé tô rồi thắp."
	},
	{
		id: "tomau-hw-20",
		name: "Bộ tô màu Halloween 20 hình",
		price: 45e3,
		unit: "bộ",
		category: "halloween",
		seasons: ["halloween"],
		image: "/images/catalog/tomau-hw.jpg",
		blurb: "20 hình gỗ, màu và dây treo."
	},
	{
		id: "tomau-hw-50",
		name: "Bộ tô màu Halloween 50 hình",
		price: 98e3,
		unit: "bộ",
		category: "halloween",
		seasons: ["halloween"],
		image: "/images/catalog/tomau-hw.jpg",
		blurb: "50 hình gỗ Halloween, màu và dây treo."
	},
	{
		id: "tomau-hw-100",
		name: "Bộ tô màu Halloween 100 hình",
		price: 168e3,
		unit: "bộ",
		category: "halloween",
		seasons: ["halloween"],
		image: "/images/catalog/tomau-hw.jpg",
		blurb: "100 hình gỗ Halloween, màu và dây treo."
	},
	{
		id: "shadow-hw",
		name: "Halloween shadow",
		price: 38600,
		unit: "bộ",
		category: "halloween",
		seasons: ["halloween"],
		image: "/images/catalog/shadow-hw.jpg",
		blurb: "Bóng gỗ cắt laser, thắp đèn phía sau thành hình bí ngô, ma, nhà."
	},
	{
		id: "ornament-1",
		name: "Quả treo Noel",
		price: 22600,
		unit: "quả",
		category: "noel",
		seasons: ["noel"],
		image: "/images/catalog/ornament.jpg",
		blurb: "Gỗ MDF dày 3mm, cắt laser. Treo cây thông, cửa sổ, tường."
	},
	{
		id: "ornament-6",
		name: "Combo 6 quả Noel",
		price: 112800,
		unit: "bộ",
		category: "noel",
		seasons: ["noel"],
		image: "/images/catalog/ornament.jpg",
		blurb: "Sáu mẫu quả treo trong catalogue. Rẻ hơn mua lẻ từng quả."
	},
	{
		id: "tomau-noel",
		name: "Bộ tô màu Noel 15 hình",
		price: 38e3,
		unit: "bộ",
		category: "noel",
		seasons: ["noel"],
		image: "/images/catalog/tomau-noel.jpg",
		blurb: "15 hình gỗ, màu và cọ, dây treo."
	},
	{
		id: "thiep-hoa",
		name: "Thiệp hoa gỗ tô màu",
		price: 12600,
		unit: "bộ",
		category: "ngayphu",
		seasons: [
			"women",
			"vnwomen",
			"valentine"
		],
		image: "/images/catalog/thiep-hoa.jpg",
		blurb: "Thiệp gỗ có đế, tự tô. Không kèm màu. Dùng 8/3, 20/10, bàn làm việc."
	},
	{
		id: "nang-tho",
		name: "Tô màu nàng thơ có đế",
		price: 16800,
		unit: "bộ",
		category: "ngayphu",
		seasons: ["women", "vnwomen"],
		image: "/images/catalog/nang-tho.jpg",
		blurb: "Hình đứng, đế gỗ. Không kèm màu. Tô theo màu áo mình thích."
	},
	{
		id: "hoa-hong",
		name: "Hoa hồng gỗ",
		price: 38e3,
		unit: "bông",
		category: "ngayphu",
		seasons: [
			"women",
			"vnwomen",
			"valentine"
		],
		image: "/images/catalog/hoa-hong.jpg",
		blurb: "Hoa hồng cắt laser, cắm được. Quà 8/3, 20/10, Valentine."
	},
	{
		id: "hop-hoa",
		name: "Hộp đựng hoa",
		price: 38e3,
		unit: "hộp",
		category: "ngayphu",
		seasons: [
			"women",
			"vnwomen",
			"valentine"
		],
		image: "/images/catalog/hoa-hong.jpg",
		blurb: "Hộp gỗ đựng hoa hồng. Giá catalogue 38.000đ/hộp, chưa gồm hoa."
	},
	{
		id: "thiep-be",
		name: "Thiệp bé cầm hoa kèm khung",
		price: 13800,
		unit: "bộ",
		category: "ngayphu",
		seasons: [
			"women",
			"vnwomen",
			"valentine"
		],
		image: "/images/catalog/thiep-be.jpg",
		blurb: "Khung ảnh, trái tim và đế. Không kèm màu. Khắc chữ khi đặt số lượng."
	},
	{
		id: "gio-love",
		name: "Giỏ chữ Love",
		price: 69e3,
		unit: "cái",
		category: "valentine",
		seasons: ["valentine"],
		image: "/images/catalog/gio-love.jpg",
		blurb: "MDF 3mm, chưa tô màu. Đựng hoa hoặc quà."
	},
	{
		id: "gio-tim",
		name: "Giỏ trái tim",
		price: 69e3,
		unit: "cái",
		category: "valentine",
		seasons: ["valentine"],
		image: "/images/catalog/gio-tim.jpg",
		blurb: "Hai mẫu trái tim trong catalogue, cùng giá 69.000đ/cái."
	},
	{
		id: "hop-tim",
		name: "Hộp gỗ hình trái tim",
		price: 69e3,
		unit: "cái",
		category: "valentine",
		seasons: ["valentine"],
		image: "/images/catalog/hop-tim.jpg",
		blurb: "Hộp nắp khắc hoa, chưa tô màu."
	},
	{
		id: "hop-chu",
		name: "Hộp chữ và số",
		price: 69e3,
		unit: "cái",
		category: "valentine",
		seasons: ["valentine", "women"],
		image: "/images/catalog/hop-chu.jpg",
		blurb: "Chữ MOM hoặc số. Ghi mẫu cần dùng trong ghi chú đơn. 69.000đ/cái."
	},
	{
		id: "set-love",
		name: "Sét 20 chữ Love",
		price: 38e3,
		unit: "bộ",
		category: "valentine",
		seasons: ["valentine"],
		image: "/images/catalog/set-love.jpg",
		blurb: "Chữ gỗ nhỏ rải bàn, hộp quà, backdrop."
	},
	{
		id: "set-tim",
		name: "Sét 9 trái tim",
		price: 27e3,
		unit: "bộ",
		category: "valentine",
		seasons: ["valentine"],
		image: "/images/catalog/set-tim.jpg",
		blurb: "Chín trái tim gỗ, mix đặc và rỗng. Tự tô."
	},
	{
		id: "gio-1",
		name: "Giỏ hoa For You",
		price: 12e4,
		unit: "giỏ",
		category: "hoa",
		seasons: [
			"valentine",
			"women",
			"vnwomen"
		],
		image: "/images/catalog/gio-1.jpg",
		blurb: "Giỏ gỗ MDF 3mm, chưa gồm hoa tươi. Mẫu For You."
	},
	{
		id: "gio-2",
		name: "Giỏ hoa Thank You",
		price: 12e4,
		unit: "giỏ",
		category: "hoa",
		seasons: [
			"valentine",
			"women",
			"vnwomen"
		],
		image: "/images/catalog/gio-2.jpg",
		blurb: "Giỏ gỗ, mặt trái tim Thank You. Chưa gồm hoa."
	},
	{
		id: "gio-3",
		name: "Giỏ hoa nắp vòm",
		price: 12e4,
		unit: "giỏ",
		category: "hoa",
		seasons: ["valentine", "women"],
		image: "/images/catalog/gio-3.jpg",
		blurb: "Quai gỗ, mặt trước nan. Chưa gồm hoa."
	},
	{
		id: "gio-4",
		name: "Giỏ hoa họa tiết vàng",
		price: 12e4,
		unit: "giỏ",
		category: "hoa",
		seasons: ["valentine", "women"],
		image: "/images/catalog/gio-4.jpg",
		blurb: "Mặt khắc hoa vàng đen. Chưa gồm hoa."
	},
	{
		id: "gio-5",
		name: "Giỏ hoa hình học",
		price: 12e4,
		unit: "giỏ",
		category: "hoa",
		seasons: ["valentine", "women"],
		image: "/images/catalog/gio-5.jpg",
		blurb: "Mặt khắc hình học. Chưa gồm hoa. Cùng giá 120.000đ/giỏ."
	},
	{
		id: "chu-block",
		name: "Chữ block đèn",
		price: 8e4,
		unit: "chữ",
		category: "party",
		seasons: [
			"valentine",
			"newyear",
			"noel"
		],
		image: "/images/catalog/chu-block.jpg",
		blurb: "30×30×30cm, gỗ cắt laser, có thể gắn đèn. Ghi chữ hoặc số cần dùng khi đặt."
	},
	{
		id: "hop-wedding",
		name: "Hộp tiền mừng Wedding",
		price: 12e4,
		unit: "cái",
		category: "party",
		seasons: ["valentine"],
		image: "/images/catalog/hop-wedding.jpg",
		blurb: "20×20×15cm. Khắc Wedding. Đựng tiền mừng."
	},
	{
		id: "hop-birthday",
		name: "Hộp tiền mừng Birthday",
		price: 12e4,
		unit: "cái",
		category: "party",
		seasons: ["newyear"],
		image: "/images/catalog/hop-birthday.jpg",
		blurb: "20×20×15cm. Mặt Happy Birthday."
	},
	{
		id: "hop-love",
		name: "Hộp tiền mừng Love",
		price: 12e4,
		unit: "cái",
		category: "party",
		seasons: ["valentine"],
		image: "/images/catalog/hop-love.jpg",
		blurb: "20×20×15cm. Mặt Love. Cùng giá các hộp tiền mừng."
	},
	{
		id: "loi-tim",
		name: "Lời chúc trái tim",
		price: 5e4,
		unit: "cái",
		category: "party",
		seasons: ["valentine", "tet"],
		image: "/images/catalog/loi-tim.jpg",
		blurb: "18×18cm. Chúc mừng hạnh phúc. Cắm bàn tiệc."
	},
	{
		id: "loi-bd",
		name: "Lời chúc Happy Birthday",
		price: 5e4,
		unit: "cái",
		category: "party",
		seasons: ["newyear"],
		image: "/images/catalog/loi-bd.jpg",
		blurb: "20×15cm. Chữ Happy Birthday để bàn."
	}
];
function fold(s) {
	return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
}
function minPrice(item) {
	if (!item.sizes?.length) return item.price;
	return Math.min(...item.sizes.map((s) => s.price));
}
function resolveSku(cartId) {
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
		blurb: item.blurb
	};
}
function filterCatalog(query, category, seasonId) {
	const q = fold(query.trim());
	return CATALOG.filter((item) => {
		if (category === "mua" && !item.seasons.includes(seasonId)) return false;
		if (category !== "all" && category !== "mua" && item.category !== category) return false;
		if (!q) return true;
		const hay = fold(`${item.name} ${item.blurb} ${item.category}`);
		return q.split(/\s+/).every((w) => w.length < 2 || hay.includes(w));
	});
}
function catalogReply(text) {
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
	return `${pool.slice(0, 4).map((i) => {
		if (i.sizes) return `${i.name}: ${i.sizes.map((s) => `${s.label} ${formatVnd(s.price)}`).join(" hoặc ")}`;
		return `${i.name}: ${formatVnd(i.price)}/${i.unit}`;
	}).join("\n")}\nGiá bán lẻ catalogue. Bấm Thêm ở đúng món. COD, không chuyển khoản trước.`;
}
function catalogPriceTokens() {
	const nums = /* @__PURE__ */ new Set();
	for (const item of CATALOG) {
		const values = item.sizes?.map((s) => s.price) ?? [item.price];
		for (const n of values) {
			nums.add(String(n));
			nums.add(formatVnd(n).replace("đ", "").trim());
		}
	}
	return nums;
}
var BANNERS = {
	halloween: {
		title: "Đèn bí và bóng gỗ.",
		line: "Tô một buổi, thắp tối 31.",
		hero: "den-hw"
	},
	tet: {
		title: "Tag cửa và dây chữ.",
		line: "Treo một buổi. Sỉ từ 20 cái.",
		hero: "day-chu"
	},
	noel: {
		title: "Quả treo và bộ tô Noel.",
		line: "Combo 6 quả rẻ hơn mua từng quả.",
		hero: "ornament-1"
	},
	trungthu: {
		title: "Lồng đèn gỗ tự lắp.",
		line: "Có mặt đèn, màu và nến LED.",
		hero: "long-den"
	},
	women: {
		title: "Hoa hồng gỗ và thiệp tô.",
		line: "Quà 8/3, giá bán lẻ.",
		hero: "hoa-hong"
	},
	vnwomen: {
		title: "Quà gỗ cho 20/10.",
		line: "Thiệp, nàng thơ, hoa hồng.",
		hero: "hoa-hong"
	},
	valentine: {
		title: "Giỏ, hộp tim, chữ Love.",
		line: "Gỗ chưa tô. Giỏ và hộp 69.000đ.",
		hero: "gio-love"
	},
	newyear: {
		title: "Chữ đèn và hộp quà.",
		line: "Block 30cm, lời chúc để bàn.",
		hero: "chu-block"
	}
};
function seasonBanner(seasonId) {
	return BANNERS[seasonId] ?? {
		title: "Đồ gỗ cắt laser.",
		line: "Giá bán lẻ catalogue.",
		hero: CATALOG[0]?.id ?? ""
	};
}
function bundleSave(item) {
	if (item.id !== "ornament-6") return 0;
	const one = CATALOG.find((i) => i.id === "ornament-1");
	if (!one) return 0;
	return Math.max(0, one.price * 6 - item.price);
}
function spotlight(seasonId) {
	const rows = CATALOG.filter((item) => item.seasons.includes(seasonId)).map((item) => ({
		item,
		price: minPrice(item)
	}));
	if (!rows.length) return [];
	const cheapest = Math.min(...rows.map((row) => row.price));
	return rows.sort((a, b) => a.price - b.price).map(({ item, price }) => {
		const save = bundleSave(item);
		if (save > 0) return {
			item,
			reason: `Rẻ hơn mua lẻ ${formatVnd(save)}`
		};
		if (/100 hình|50 hình/.test(item.name)) return {
			item,
			reason: "Cho lớp, sự kiện"
		};
		if (price === cheapest) return {
			item,
			reason: "Giá thấp trong dịp"
		};
		if (price <= 5e4) return {
			item,
			reason: "Dưới 50.000đ"
		};
		return {
			item,
			reason: "Đang mùa"
		};
	});
}
var PRODUCTS = [
	{
		id: "cua",
		name: "Set Cửa",
		price: 399e3,
		compareAt: 49e4,
		tagline: "Khách vừa tới đã thấy Tết.",
		blurb: "Cửa sắt, cửa gỗ, cửa kính chung cư — một lớp liễn vải, đèn và dây treo. Không chiếm sàn.",
		wall: "Cửa / tường rộng khoảng 1–1.2m",
		includes: [
			"Liễn vải linen hiện đại (không chữ in sẵn)",
			"Đèn lồng hình học đỏ son",
			"Dây treo + phụ kiện móc/dán",
			"Thảm nhỏ trước cửa"
		],
		image: "/images/set-cua.jpg",
		video: "/videos/set-cua.mp4",
		saveVsRetail: 91e3
	},
	{
		id: "khach",
		name: "Set Phòng khách",
		price: 699e3,
		compareAt: 89e4,
		tagline: "Góc nhà lên ảnh Tết được luôn.",
		blurb: "Cây mai dáng gọn, đèn dây, 2–3 món điểm nhấn. Ban ngày hiện đại, tối có chiều sâu.",
		featured: true,
		wall: "Phòng khách tường 2–3m",
		includes: [
			"Cây mai / bình hoa điểm nhấn",
			"Đèn dây ấm",
			"Đèn lồng + decor kệ",
			"Layout mẫu tường 2m và 3m",
			"Clip hướng dẫn treo"
		],
		image: "/images/set-khach.jpg",
		video: "/videos/set-khach.mp4",
		saveVsRetail: 191e3
	},
	{
		id: "nha",
		name: "Set Cả nhà",
		price: 999e3,
		compareAt: 129e4,
		tagline: "Cửa + khách + bàn. Xong việc.",
		blurb: "Một theme xuyên suốt: không cửa một kiểu, phòng một kiểu. Hợp người không muốn nghĩ tiếp.",
		wall: "Cửa + phòng khách + bàn ăn",
		includes: [
			"Toàn bộ Set Cửa",
			"Toàn bộ Set Phòng khách",
			"Runner bàn + lồng đèn thấp",
			"Đồng bộ màu đỏ son / kem / gỗ"
		],
		image: "/images/set-nha.jpg",
		saveVsRetail: 291e3
	}
];
function listProducts() {
	return seasonProducts();
}
function getProduct(id) {
	const sku = resolveSku(id);
	if (sku) return {
		id: sku.cartId,
		name: sku.name,
		price: sku.price,
		tagline: sku.unit,
		blurb: sku.blurb,
		wall: sku.unit,
		includes: [],
		image: sku.image,
		saveVsRetail: 0
	};
	return listProducts().find((p) => p.id === id) ?? PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];
}
var ZALO_PRESET = (id) => {
	const p = id ? getProduct(id) : void 0;
	return p ? `Mình muốn đặt ${p.name} (${p.price.toLocaleString("vi-VN")}đ).` : "Mình muốn xem đồ gỗ Petitewoodart. Nhờ báo món này ạ.";
};
var PROVINCES = [
	{
		name: "Hà Nội",
		aliases: [
			"ha noi",
			"hà nội",
			"hn"
		],
		far: false
	},
	{
		name: "Hồ Chí Minh",
		aliases: [
			"hcm",
			"tphcm",
			"sài gòn",
			"sai gon",
			"tp hcm",
			"hồ chí minh"
		],
		far: false
	},
	{
		name: "Đà Nẵng",
		aliases: ["da nang", "đà nẵng"],
		far: false
	},
	{
		name: "Hải Phòng",
		aliases: ["hai phong", "hải phòng"],
		far: false
	},
	{
		name: "Cần Thơ",
		aliases: ["can tho", "cần thơ"],
		far: false
	},
	{
		name: "Thanh Hóa",
		aliases: [
			"thanh hoa",
			"thanh hoá",
			"sầm sơn",
			"sam son"
		],
		far: false
	},
	{
		name: "Nghệ An",
		aliases: [
			"nghe an",
			"nghệ an",
			"vinh"
		],
		far: false
	},
	{
		name: "Huế",
		aliases: ["hue", "thừa thiên"],
		far: false
	},
	{
		name: "Nha Trang",
		aliases: [
			"nha trang",
			"khánh hòa",
			"khanh hoa"
		],
		far: false
	},
	{
		name: "Bình Dương",
		aliases: ["binh duong", "bình dương"],
		far: false
	},
	{
		name: "Đồng Nai",
		aliases: [
			"dong nai",
			"đồng nai",
			"biên hòa"
		],
		far: false
	},
	{
		name: "Bà Rịa Vũng Tàu",
		aliases: [
			"vũng tàu",
			"vung tau",
			"bà rịa"
		],
		far: false
	},
	{
		name: "Hải Dương",
		aliases: ["hai duong", "hải dương"],
		far: false
	},
	{
		name: "Nam Định",
		aliases: ["nam dinh", "nam định"],
		far: false
	},
	{
		name: "Ninh Bình",
		aliases: ["ninh binh", "ninh bình"],
		far: false
	},
	{
		name: "Quảng Ninh",
		aliases: [
			"ha long",
			"hạ long",
			"quảng ninh"
		],
		far: false
	},
	{
		name: "Bắc Ninh",
		aliases: ["bac ninh", "bắc ninh"],
		far: false
	},
	{
		name: "Hưng Yên",
		aliases: ["hung yen", "hưng yên"],
		far: false
	},
	{
		name: "Hà Giang",
		aliases: ["ha giang", "hà giang"],
		far: true
	},
	{
		name: "Cao Bằng",
		aliases: ["cao bang", "cao bằng"],
		far: true
	},
	{
		name: "Lai Châu",
		aliases: ["lai chau", "lai châu"],
		far: true
	},
	{
		name: "Điện Biên",
		aliases: ["dien bien", "điện biên"],
		far: true
	},
	{
		name: "Sơn La",
		aliases: ["son la", "sơn la"],
		far: true
	},
	{
		name: "Lào Cai",
		aliases: [
			"lao cai",
			"lào cai",
			"sapa",
			"sa pa"
		],
		far: true
	},
	{
		name: "Yên Bái",
		aliases: ["yen bai", "yên bái"],
		far: true
	},
	{
		name: "Kon Tum",
		aliases: ["kon tum"],
		far: true
	},
	{
		name: "Gia Lai",
		aliases: ["gia lai", "pleiku"],
		far: true
	},
	{
		name: "Đắk Lắk",
		aliases: [
			"dak lak",
			"đắk lắk",
			"buon ma thuot"
		],
		far: true
	},
	{
		name: "Đắk Nông",
		aliases: ["dak nong", "đắk nông"],
		far: true
	},
	{
		name: "Lâm Đồng",
		aliases: [
			"lam dong",
			"đà lạt",
			"da lat"
		],
		far: true
	},
	{
		name: "Cà Mau",
		aliases: ["ca mau", "cà mau"],
		far: true
	},
	{
		name: "Kiên Giang",
		aliases: [
			"kien giang",
			"kiên giang",
			"phú quốc",
			"phu quoc"
		],
		far: true
	},
	{
		name: "An Giang",
		aliases: ["an giang"],
		far: true
	}
];
function detectPhone(text) {
	const m = text.replace(/[.\s-]/g, " ").match(/(?:\+?84|0)(?:3|5|7|8|9)\d{8}/);
	if (!m) return void 0;
	let p = m[0].replace(/\D/g, "");
	if (p.startsWith("84")) p = "0" + p.slice(2);
	return p.length === 10 ? p : void 0;
}
function detectProvince(text) {
	const n = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	for (const p of PROVINCES) for (const a of [p.name, ...p.aliases]) {
		const na = a.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		if (n.includes(na)) return p;
	}
}
function detectSet(text, products = resolveSeason().products) {
	const t = text.toLowerCase();
	if (/cả nhà|ca nha|full nhà|full nha|combo nhà|set nhà|set nha/.test(t)) return "nha";
	if (/phòng khách|phong khach|set khách|set khach/.test(t)) return "khach";
	if (/set cửa|set cua|cửa ra vào|cua ra vao/.test(t)) return "cua";
	const compact = t.replace(/[\s.]/g, "");
	for (const p of [...products].sort((a, b) => b.price - a.price)) {
		const k = String(Math.round(p.price / 1e3));
		if (k.length >= 3 && new RegExp(`(?:^|\\D)${k}(?:\\D|$)`).test(compact)) return p.id;
	}
	if (/cửa|cua/.test(t) && !/cửa sổ|cua so/.test(t)) return "cua";
}
function classifyIntent(text) {
	const t = text.toLowerCase();
	if (/đặt|dat hang|chốt|chot|lấy set|lay set|mua luôn|mua luon|ok chốt/.test(t) && detectPhone(t)) return "chot";
	if (/đặt|chốt|mua|lấy/.test(t) && (detectSet(t) || detectPhone(t))) return "chot";
	if (/giá|gia bao|bao nhiêu|bao nhieu|bn\b|price/.test(t)) return "gia";
	if (/mai giả|mai gia|nhìn rẻ|nhin re|hội chợ|hoi cho|giả trông/.test(t)) return "mai_gia";
	if (/nhà thuê|nha thue|khoan|dán tường|dan tuong|chung cư thuê/.test(t)) return "thue";
	if (/ship|giao|kịp tết|kip tet|tỉnh|tinh |bao lâu|bao lau/.test(t)) return "giao";
	if (/giảm|giam gia|bớt|bot gia|rẻ hơn|re hon|mặc cả/.test(t)) return "giam";
	if (/ảnh|anh phòng|gui anh|gửi ảnh|hình nhà/.test(t)) return "anh";
	if (/đổi|doi set|sai size|hoàn/.test(t)) return "doi";
	if (/chung cư|chung cu|nhà phố|nha pho|căn hộ|can ho|70m|80m|phòng khách|cửa/.test(t)) return "nha";
	return "khac";
}
function setLine(id, season) {
	const p = season.products.find((x) => x.id === id) ?? getProduct(id);
	return `${p.name} ${formatVnd(p.price)} — ${p.tagline}`;
}
function draftReply(text, suggestedFromThread, season = resolveSeason()) {
	const intent = classifyIntent(text);
	const set = detectSet(text, season.products) ?? suggestedFromThread;
	const province = detectProvince(text);
	const t = text.toLowerCase();
	const prices = season.products.map((p) => formatVnd(p.price)).join(" / ");
	if (intent === "gia") return {
		intent,
		suggestedSet: set ?? "khach",
		reply: [
			`Ba set ${season.name}, không mix lẻ:`,
			`· ${setLine("cua", season)} — tường cửa ~1m.`,
			`· ${setLine("khach", season)} — phòng khách tường 2–3m. Bán chạy nhất.`,
			`· ${setLine("nha", season)} — cửa + khách + bàn.`,
			"Nhà bạn chung cư hay nhà phố? Gửi 1 ảnh tường mình chỉ đúng 1 set."
		].join("\n")
	};
	if (intent === "nha") {
		const apt = /chung cư|chung cu|căn hộ|can ho|70m|80m/.test(t);
		const house = /nhà phố|nha pho|biệt thự|biet thu/.test(t);
		return {
			intent,
			suggestedSet: house ? "nha" : "khach",
			reply: apt ? `Chung cư tường 2–3m thường lấy ${setLine("khach", season)}. Cửa hẹp thì thêm ${setLine("cua", season)}. Gửi ảnh phòng khách — mình đo ước lượng, không bán dư.` : house ? `Nhà phố hợp ${setLine("nha", season)} vì có cửa + khách cùng một theme. Nếu chỉ muốn một góc: ${setLine("khach", season)}. Gửi ảnh cửa và phòng khách.` : `Mình chỉ đúng 1 set theo tường, không bán rải. Chung cư thường ${setLine("khach", season)}. Nhà phố thường ${setLine("nha", season)}. Gửi 1 ảnh phòng khách.`
		};
	}
	if (intent === "mai_gia") return {
		intent,
		suggestedSet: "khach",
		reply: `Đồ trong set là dáng gọn, không hàng hội chợ. ${setLine("khach", season)}. Mình gửi cận ban ngày — nếu trông rẻ, đừng mua.`
	};
	if (intent === "thue") return {
		intent,
		suggestedSet: set ?? "khach",
		reply: "Nhà thuê: trong hộp có móc dán. Đồ đặt sàn, không khoan. Tường sơn bong thì nói mình — mình chỉ vị trí, không dán. Gửi ảnh tường."
	};
	if (intent === "giao") {
		const far = province?.far;
		const name = province?.name ?? "tỉnh bạn";
		const now = /* @__PURE__ */ new Date();
		if (now > season.hardStop) return {
			intent,
			escalate: true,
			escalateReason: `Đã qua hạn giao ${season.name}.`,
			reply: `Mốc giao ${season.name} đã khép. Mình không nhận đơn hứa kịp nữa.`
		};
		if (far && now > season.farCutoff) return {
			intent,
			escalate: true,
			escalateReason: `${name} là tỉnh xa, đã qua mốc giao sớm.`,
			reply: `${name} mình không dám hứa kịp ${season.name} nếu chốt hôm nay. Muốn giữ hàng giao sau thì nói — không nhận rồi im.`
		};
		return {
			intent,
			suggestedSet: set,
			reply: province ? `${name}: ${season.shipRules} COD. Gửi SĐT + địa chỉ có tỉnh để chốt.` : `${season.shipRules} Bạn ở tỉnh nào?`
		};
	}
	if (intent === "giam") return {
		intent,
		suggestedSet: set ?? "khach",
		reply: `Giá set niêm yết, không mặc cả. Có thể tặng thêm móc nếu đơn hôm nay. Mức mình giữ: ${setLine(set ?? "khach", season)}. Chốt SĐT + địa chỉ thì mình giữ hàng.`
	};
	if (intent === "anh") return {
		intent,
		suggestedSet: set ?? "khach",
		reply: "Gửi 1 ảnh tường phòng khách (rộng ~2–3m là đẹp). Mình chọn đúng 1 set, không đẩy combo. Ảnh tối vẫn đọc được."
	};
	if (intent === "doi") return {
		intent,
		escalate: true,
		escalateReason: "Đổi/hoàn — luôn người xử lý.",
		reply: "Đổi set trong 48 giờ nếu hàng còn nguyên hộp. Mình chuyển người cầm đơn — bạn giữ SĐT lúc đặt."
	};
	if (intent === "chot") return {
		intent,
		suggestedSet: set,
		reply: set ? `Chốt ${setLine(set, season)}, COD. Gửi: họ tên, SĐT, địa chỉ có tỉnh. Mình xác nhận mã đơn ngay — không chuyển khoản trước.` : `Mình chốt đúng 1 set: ${prices}. Bạn lấy set nào? Gửi SĐT + địa chỉ có tỉnh.`
	};
	return {
		intent,
		suggestedSet: set ?? "khach",
		escalate: /mắng|lừa|scam|kiện|luật sư|hàng giả/.test(t),
		escalateReason: /mắng|lừa|scam|kiện|hàng giả/.test(t) ? "Khiếu nại / nghi ngờ — người trả." : void 0,
		reply: `Mình bán 3 set ${season.name}: ${prices}. Gửi ảnh phòng hoặc nói chung cư/nhà phố — mình chỉ 1 set, không nhồi.`
	};
}
function evaluateClose(input) {
	const now = input.now ?? /* @__PURE__ */ new Date();
	const season = input.season ?? resolveSeason(now);
	const province = (input.provinceName ? PROVINCES.find((p) => p.name === input.provinceName) : void 0) ?? (input.address ? detectProvince(input.address) : void 0);
	const phone = input.phone && input.phone.replace(/\D/g, "").length === 10 ? input.phone : void 0;
	const chosen = input.setId ? season.products.find((p) => p.id === input.setId) ?? getProduct(input.setId) : void 0;
	const gates = [
		{
			id: "set",
			label: "Đúng 1 set",
			ok: Boolean(input.setId),
			detail: chosen ? chosen.name : `Chưa chọn set ${season.name}`
		},
		{
			id: "phone",
			label: "SĐT 10 số",
			ok: Boolean(phone),
			detail: phone ?? "Thiếu số điện thoại Việt Nam"
		},
		{
			id: "province",
			label: "Địa chỉ có tỉnh",
			ok: Boolean(province) || Boolean(input.address && input.address.trim().length >= 12),
			detail: province?.name ?? (input.address?.trim() ? "Có địa chỉ — kiểm tra tỉnh" : "Thiếu tỉnh/thành")
		},
		{
			id: "stock",
			label: "Còn hàng",
			ok: input.setId ? (input.stock[input.setId] ?? 0) > 0 : false,
			detail: input.setId ? `Tồn ${chosen?.name ?? input.setId}: ${input.stock[input.setId]}` : "Chưa gắn set"
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
			})()
		}
	];
	if (!province && input.address && input.address.trim().length >= 12) {
		const g = gates.find((x) => x.id === "province");
		g.ok = true;
		g.detail = "Địa chỉ đủ dài — tỉnh chưa nhận diện được, người nên xem lại";
	}
	const failReasons = gates.filter((g) => !g.ok).map((g) => g.detail);
	return {
		canClose: failReasons.length === 0,
		gates,
		failReasons
	};
}
function saleCards() {
	const s = resolveSeason();
	const line = (id) => {
		const p = s.products.find((x) => x.id === id) ?? getProduct(id);
		return `${p.name} ${formatVnd(p.price)}`;
	};
	return [
		{
			title: "Giá",
			body: `3 set ${s.name}: ${line("cua")} · ${line("khach")} · ${line("nha")}. Không mix lẻ. Hỏi loại nhà rồi chỉ 1 set.`
		},
		{
			title: "Chung cư",
			body: `Tường 2–3m → ${line("khach")}. Cửa hẹp → ${line("cua")}. Xin ảnh phòng.`
		},
		{
			title: "Nhà phố",
			body: `Cửa + khách → ${line("nha")}. Chỉ muốn một góc → ${line("khach")}.`
		},
		{
			title: "Nhìn rẻ?",
			body: "Dáng gọn, cận ban ngày. Không hội chợ. Không đẹp thì đừng mua."
		},
		{
			title: "Nhà thuê",
			body: "Móc dán có trong hộp. Đồ đặt sàn. Không khoan."
		},
		{
			title: `Giao ${s.name}`,
			body: s.shipRules
		},
		{
			title: "Xin giảm",
			body: "Không mặc cả set. Có thể tặng phụ kiện nhỏ. Giữ giá, đẩy chốt."
		},
		{
			title: "Gửi ảnh",
			body: "Đo ước lượng → đúng 1 set → mời COD hoặc SĐT."
		}
	];
}
var CHANNEL_LABEL = {
	zalo: "Zalo",
	facebook: "Facebook",
	tiktok: "TikTok"
};
//#endregion
export { resolveSku as _, catalogPriceTokens as a, spotlight as b, detectPhone as c, draftReply as d, evaluateClose as f, minPrice as g, getProduct as h, ZALO_PRESET as i, detectProvince as l, formatVnd as m, CATEGORIES as n, catalogReply as o, filterCatalog as p, CHANNEL_LABEL as r, cn as s, CATALOG as t, detectSet as u, saleCards as v, seasonBanner as y };
