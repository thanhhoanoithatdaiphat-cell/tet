import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CHANNEL_LABEL } from "@/lib/brain";
import { getProduct } from "@/lib/products";
import { useOps } from "@/lib/ops-store";
import { formatVnd } from "@/lib/utils";

const NEXT = {
  moi: "xac_nhan",
  xac_nhan: "giao",
  giao: "giao",
  huy: "huy",
} as const;

export function OrdersTab() {
  const orders = useOps((s) => s.orders);
  const stock = useOps((s) => s.stock);
  const setOrderStatus = useOps((s) => s.setOrderStatus);

  return (
    <div>
      <h1 className="font-display text-2xl">Đơn</h1>
      <p className="mt-1 text-sm text-muted-foreground">Landing + inbox chung một sổ. COD. Trừ tồn khi chốt.</p>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {(["cua", "khach", "nha"] as const).map((id) => (
          <Badge key={id} className={stock[id] < 10 ? "border-primary text-primary" : ""}>
            {getProduct(id).name}: còn {stock[id]}
          </Badge>
        ))}
      </div>
      {orders.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">Chưa có đơn. Chốt từ Inbox hoặc trang bán.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {orders.map((o) => (
            <li key={o.id} className="rounded-xl border border-border bg-surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">
                    {o.id} · {getProduct(o.setId).name} × {o.qty}
                  </p>
                  <p className="mt-1 text-sm">
                    {o.name} · {o.phone}
                  </p>
                  <p className="text-sm text-muted-foreground">{o.address}</p>
                  {o.note ? <p className="mt-1 text-xs text-muted-foreground">{o.note}</p> : null}
                </div>
                <div className="text-right">
                  <p className="font-display text-xl">{formatVnd(o.total)}</p>
                  <p className="text-xs text-muted-foreground">
                    {o.source === "landing" ? "Landing" : CHANNEL_LABEL[o.source]} · {o.status}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {o.status !== "huy" && o.status !== "giao" && (
                  <Button size="sm" onClick={() => setOrderStatus(o.id, NEXT[o.status])}>
                    {o.status === "moi" ? "Xác nhận" : "Đã giao"}
                  </Button>
                )}
                {o.status !== "huy" && o.status !== "giao" && (
                  <Button size="sm" variant="secondary" onClick={() => setOrderStatus(o.id, "huy")}>
                    Hủy
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
