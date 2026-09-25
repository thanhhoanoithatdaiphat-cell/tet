export type MediaKind = "image" | "video";

export type MediaSlot = {
  path: string;
  kind: MediaKind;
  group: string;
  label: string;
  shoot: string;
  priority?: boolean;
};

export const MEDIA_SLOTS: MediaSlot[] = [
  {
    path: "/videos/hero.mp4",
    kind: "video",
    group: "Hero",
    label: "Clip hero (8–15s)",
    shoot: "Phòng khách kem, treo xong, camera chậm. Ngang hoặc dọc đều được — trang sẽ cắt giữa.",
    priority: true,
  },
  {
    path: "/images/hero.jpg",
    kind: "image",
    group: "Hero",
    label: "Ảnh bìa (khi clip chưa chạy)",
    shoot: "Cùng góc clip, ban ngày. Ngang, tường + sofa vào khung.",
    priority: true,
  },
  {
    path: "/images/set-cua.jpg",
    kind: "image",
    group: "3 set",
    label: "Set Cửa — ảnh",
    shoot: "Cửa thật đã treo liễn + đèn. Đứng cách 1.5m.",
    priority: true,
  },
  {
    path: "/videos/set-cua.mp4",
    kind: "video",
    group: "3 set",
    label: "Set Cửa — clip",
    shoot: "6–10s, kéo từ tay nắm lên liễn.",
    priority: true,
  },
  {
    path: "/images/set-khach.jpg",
    kind: "image",
    group: "3 set",
    label: "Set Phòng khách — ảnh",
    shoot: "Tường 2–3m, mai + đèn. Ban ngày, không flash.",
    priority: true,
  },
  {
    path: "/videos/set-khach.mp4",
    kind: "video",
    group: "3 set",
    label: "Set Phòng khách — clip",
    shoot: "8–12s, từ phòng trống… không, chỉ góc đã treo. Khách ads nhìn cái này.",
    priority: true,
  },
  {
    path: "/images/set-nha.jpg",
    kind: "image",
    group: "3 set",
    label: "Set Cả nhà — ảnh",
    shoot: "Cửa + một góc khách cùng theme. Một khung hình.",
    priority: true,
  },
  {
    path: "/images/space-apt.jpg",
    kind: "image",
    group: "Theo nhà",
    label: "Chung cư",
    shoot: "Phòng khách căn hộ, đã treo set 699.",
  },
  {
    path: "/images/space-house.jpg",
    kind: "image",
    group: "Theo nhà",
    label: "Nhà phố / cửa",
    shoot: "Cửa sắt hoặc cửa gỗ + set cửa.",
  },
  {
    path: "/images/space-shop.jpg",
    kind: "image",
    group: "Theo nhà",
    label: "Shop nhỏ",
    shoot: "Lối vào quán / shop, set cửa.",
  },
  {
    path: "/images/material-linen.jpg",
    kind: "image",
    group: "Cận chất liệu",
    label: "Vải liễn",
    shoot: "Cận tay cầm vải, ban ngày. Thấy sợi, không thấy chữ in.",
  },
  {
    path: "/images/material-lantern.jpg",
    kind: "image",
    group: "Cận chất liệu",
    label: "Đèn",
    shoot: "Cận đèn đang bật, nền tối vừa.",
  },
  {
    path: "/images/material-mai.jpg",
    kind: "image",
    group: "Cận chất liệu",
    label: "Mai dáng gọn",
    shoot: "Cận cành + chậu, cửa sổ trời. Để khách soi «mai giả».",
  },
  {
    path: "/images/material-wood.jpg",
    kind: "image",
    group: "Cận chất liệu",
    label: "Đế / móc / dây",
    shoot: "Đổ phụ kiện ra khay gỗ. Thấy móc dán.",
  },
  {
    path: "/images/before-room.jpg",
    kind: "image",
    group: "Trước / sau",
    label: "Trước — phòng trống",
    shoot: "Cùng một góc, chưa treo. Giữ chân máy.",
    priority: true,
  },
  {
    path: "/images/after-room.jpg",
    kind: "image",
    group: "Trước / sau",
    label: "Sau — đã treo",
    shoot: "Đúng góc ảnh trước. Khác mỗi set trên tường.",
    priority: true,
  },
  {
    path: "/images/step-unbox.jpg",
    kind: "image",
    group: "3 bước treo",
    label: "Mở hộp",
    shoot: "Hộp thật, nắp mở, đồ còn trong khay.",
  },
  {
    path: "/images/step-hang.jpg",
    kind: "image",
    group: "3 bước treo",
    label: "Treo",
    shoot: "Tay đang móc/dán. Thấy tường nhà ở, không studio.",
  },
  {
    path: "/images/step-lights.jpg",
    kind: "image",
    group: "3 bước treo",
    label: "Bật đèn",
    shoot: "Đèn dây đã bật, tối vừa.",
  },
  {
    path: "/images/ugc-studio.jpg",
    kind: "image",
    group: "Ảnh khách / showroom",
    label: "Góc 4 (UGC)",
    shoot: "Khi có khách thật: xin 1 ảnh tường. Thay góc demo.",
  },
];

export const MEDIA_GROUPS = [...new Set(MEDIA_SLOTS.map((s) => s.group))];
