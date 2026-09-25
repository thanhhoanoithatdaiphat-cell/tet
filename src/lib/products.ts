export type ProductId = "cua" | "khach" | "nha";

export type Product = {
  id: ProductId;
  name: string;
  price: number;
  compareAt?: number;
  tagline: string;
  blurb: string;
  featured?: boolean;
  wall: string;
  includes: string[];
  image: string;
  video?: string;
  saveVsRetail: number;
};

export const PRODUCTS: Product[] = [
  {
    id: "cua",
    name: "Set Cửa",
    price: 399000,
    compareAt: 490000,
    tagline: "Khách vừa tới đã thấy Tết.",
    blurb:
      "Cửa sắt, cửa gỗ, cửa kính chung cư — một lớp liễn vải, đèn và dây treo. Không chiếm sàn.",
    wall: "Cửa / tường rộng khoảng 1–1.2m",
    includes: [
      "Liễn vải linen hiện đại (không chữ in sẵn)",
      "Đèn lồng hình học đỏ son",
      "Dây treo + phụ kiện móc/dán",
      "Thảm nhỏ trước cửa",
    ],
    image: "/images/set-cua.jpg",
    video: "/videos/set-cua.mp4",
    saveVsRetail: 91000,
  },
  {
    id: "khach",
    name: "Set Phòng khách",
    price: 699000,
    compareAt: 890000,
    tagline: "Góc nhà lên ảnh Tết được luôn.",
    blurb:
      "Cây mai dáng gọn, đèn dây, 2–3 món điểm nhấn. Ban ngày hiện đại, tối có chiều sâu.",
    featured: true,
    wall: "Phòng khách tường 2–3m",
    includes: [
      "Cây mai / bình hoa điểm nhấn",
      "Đèn dây ấm",
      "Đèn lồng + decor kệ",
      "Layout mẫu tường 2m và 3m",
      "Clip hướng dẫn treo",
    ],
    image: "/images/set-khach.jpg",
    video: "/videos/set-khach.mp4",
    saveVsRetail: 191000,
  },
  {
    id: "nha",
    name: "Set Cả nhà",
    price: 999000,
    compareAt: 1290000,
    tagline: "Cửa + khách + bàn. Xong việc.",
    blurb:
      "Một theme xuyên suốt: không cửa một kiểu, phòng một kiểu. Hợp người không muốn nghĩ tiếp.",
    wall: "Cửa + phòng khách + bàn ăn",
    includes: [
      "Toàn bộ Set Cửa",
      "Toàn bộ Set Phòng khách",
      "Runner bàn + lồng đèn thấp",
      "Đồng bộ màu đỏ son / kem / gỗ",
    ],
    image: "/images/set-nha.jpg",
    saveVsRetail: 291000,
  },
];

export function getProduct(id: ProductId) {
  return PRODUCTS.find((p) => p.id === id)!;
}

export const ZALO_PRESET = (id?: ProductId) => {
  const p = id ? getProduct(id) : undefined;
  const line = p
    ? `Mình muốn đặt ${p.name} (${p.price.toLocaleString("vi-VN")}đ). Gửi ảnh phòng này ạ.`
    : "Mình gửi ảnh phòng, nhờ chỉ set Tết phù hợp.";
  return line;
};
