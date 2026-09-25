import { useState } from "react";
import { Check, Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShopImg } from "@/components/media/shop-img";
import { SHOP } from "@/lib/config";
import { getProduct, ZALO_PRESET } from "@/lib/products";
import { cartTotal, useShop } from "@/lib/store";
import { zaloHref, useOps } from "@/lib/ops-store";
import { formatVnd } from "@/lib/utils";

export function CheckoutDrawer() {
  const { cart, checkoutOpen, closeCheckout, setQty, remove, placeOrder } = useShop();
  const [done, setDone] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const total = cartTotal(cart);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!cart.length) {
      toast.error("Chưa có set trong giỏ.");
      return;
    }
    if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 9 || address.trim().length < 8) {
      toast.error("Điền họ tên, SĐT và địa chỉ giao hàng.");
      return;
    }
    const order = placeOrder({ name: name.trim(), phone: phone.trim(), address: address.trim(), note: note.trim() });
    setDone(order.id);
    toast.success("Đã nhận đơn COD. Mình báo ngày giao ngay.");
  }

  function zaloOrder() {
    const first = cart[0]?.id;
    const text = encodeURIComponent(
      ZALO_PRESET(first) +
        (name ? `\nTên: ${name}` : "") +
        (phone ? `\nSĐT: ${phone}` : "") +
        (address ? `\nGiao: ${address}` : ""),
    );
    const phoneZalo = useOps.getState().settings.zaloPhone || SHOP.phoneTel;
    window.open(`${zaloHref(phoneZalo)}?text=${text}`, "_blank", "noopener");
  }

  return (
    <Drawer
      open={checkoutOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeCheckout();
          setDone(null);
        }
      }}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{done ? "Đơn đã ghi nhận" : "Đặt COD"}</DrawerTitle>
          <DrawerDescription>
            {done
              ? "Mình liên hệ xác nhận trong ngày. Thanh toán khi nhận hàng."
              : "Giao theo mốc Tết. Không cần chuyển khoản trước."}
          </DrawerDescription>
        </DrawerHeader>

        <div className="overflow-y-auto px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          {done ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-5" />
              </div>
              <p className="font-display text-2xl">{done}</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Giữ mã này. Tết này nhà bạn đã có lớp decor — mình báo ngày giao ngay.
              </p>
              <Button className="w-full" onClick={() => { closeCheckout(); setDone(null); }}>
                Tiếp tục xem set
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-5">
              <ul className="divide-y divide-border rounded-xl border border-border bg-background">
                {cart.length === 0 ? (
                  <li className="px-4 py-6 text-sm text-muted-foreground">
                    Giỏ trống. Chọn một set 399k / 699k / 999k.
                  </li>
                ) : (
                  cart.map((line) => {
                    const p = getProduct(line.id);
                    return (
                      <li key={line.id} className="flex items-center gap-3 p-3">
                        <ShopImg
                          src={p.image}
                          alt=""
                          className="size-14 rounded-md object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{p.name}</p>
                          <p className="text-sm tabular-nums text-muted-foreground">
                            {formatVnd(p.price)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="size-8"
                            onClick={() => setQty(line.id, line.qty - 1)}
                            aria-label="Giảm"
                          >
                            <Minus className="size-3.5" />
                          </Button>
                          <span className="w-5 text-center text-sm tabular-nums">{line.qty}</span>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="size-8"
                            onClick={() => setQty(line.id, line.qty + 1)}
                            aria-label="Tăng"
                          >
                            <Plus className="size-3.5" />
                          </Button>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="size-8"
                            onClick={() => remove(line.id)}
                            aria-label="Xóa"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>

              <div className="grid gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="name">Họ tên</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="address">Địa chỉ nhận (ghi tỉnh/thành)</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    autoComplete="street-address"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="note">Ghi chú tường / size (không bắt buộc)</Label>
                  <Input
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ví dụ: tường kem 2.4m, nhà thuê không khoan"
                  />
                </div>
              </div>

              <div className="sticky bottom-0 -mx-5 border-t border-border bg-surface px-5 pt-3">
                <div className="flex items-end justify-between">
                  <span className="text-sm text-muted-foreground">Tạm tính · COD</span>
                  <span className="font-display text-2xl tabular-nums">{formatVnd(total)}</span>
                </div>
                <div className="mt-3 grid gap-2">
                  <Button type="submit" size="lg" className="w-full" disabled={!cart.length}>
                    Đặt hàng COD
                  </Button>
                  <Button type="button" size="lg" variant="secondary" className="w-full" onClick={zaloOrder}>
                    Gửi ảnh phòng qua Zalo
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
