import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SALE_CARDS } from "@/lib/brain";
import { DEFAULT_PIN_HASH, hashPin, isFourDigits } from "@/lib/ops-pin";
import { SHOP } from "@/lib/config";
import { useOps, zaloHref } from "@/lib/ops-store";
import { cn } from "@/lib/utils";

export function YouTab({
  onGoInbox,
  onGoPosts,
  onGoMedia,
}: {
  onGoInbox: () => void;
  onGoPosts: () => void;
  onGoMedia: () => void;
}) {
  const settings = useOps((s) => s.settings);
  const setSettings = useOps((s) => s.setSettings);
  const tasks = useOps((s) => s.tasks);
  const toggleTask = useOps((s) => s.toggleTask);
  const [openId, setOpenId] = useState(tasks.find((t) => !t.done)?.id ?? tasks[0]?.id);
  const [phone, setPhone] = useState(settings.zaloPhone);
  const [fb, setFb] = useState(settings.facebookPage);
  const [tt, setTt] = useState(settings.tiktokUser);

  function saveContact() {
    const zaloPhone = phone.replace(/\D/g, "");
    if (zaloPhone.length < 9) {
      toast.error("Số Zalo chưa đủ.");
      return;
    }
    setSettings({ zaloPhone, facebookPage: fb.trim(), tiktokUser: tt.trim().replace(/^@/, "") });
    if (zaloPhone !== SHOP.phoneTel) {
      const so = useOps.getState().tasks.find((t) => t.id === "so_zalo");
      if (so && !so.done) toggleTask("so_zalo");
    }
    toast.success("Đã lưu số. Nút Zalo trên trang bán dùng số này.");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <h1 className="font-display text-3xl">Phần này bạn phải làm. App không làm hộ được.</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Mình đã dựng bot, cổng chốt 5 điều, lịch bài TikTok/Facebook. Ba việc còn lại nằm ngoài web: tài khoản mạng,
          hàng trong kho, và tay bấm Đăng. Làm theo thứ tự. Tick khi xong.
        </p>

        <section className="mt-6 rounded-xl border border-border bg-surface p-4">
          <h2 className="font-medium">Số thật — làm trước</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Đang {settings.zaloPhone === SHOP.phoneTel ? "là số mẫu, khách nhắn vào số không ai bắt" : `Zalo ${settings.zaloPhone}`}.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div>
              <Label htmlFor="zalo">Số Zalo (10 số)</Label>
              <Input id="zalo" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="fb">Link Page Facebook</Label>
              <Input id="fb" value={fb} onChange={(e) => setFb(e.target.value)} className="mt-1" placeholder="facebook.com/..." />
            </div>
            <div>
              <Label htmlFor="tt">TikTok @</Label>
              <Input id="tt" value={tt} onChange={(e) => setTt(e.target.value)} className="mt-1" placeholder="nhacotet" />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button onClick={saveContact}>Lưu số & kênh</Button>
            <Button variant="secondary" asChild>
              <a href={zaloHref(phone)} target="_blank" rel="noreferrer">
                Thử mở Zalo
              </a>
            </Button>
          </div>
        </section>

        <PinChange />

        <ol className="mt-6 space-y-3">
          {tasks.map((task, i) => (
            <li key={task.id} className="rounded-xl border border-border bg-surface">
              <div className="flex items-start gap-3 p-4">
                <button
                  type="button"
                  aria-pressed={task.done}
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    "mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-md border",
                    task.done ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background",
                  )}
                >
                  {task.done ? <Check className="size-4" /> : <span className="text-sm text-muted-foreground">{i + 1}</span>}
                </button>
                <button type="button" className="flex-1 text-left" onClick={() => setOpenId(openId === task.id ? "" : task.id)}>
                  <p className={cn("font-medium", task.done && "text-muted-foreground line-through")}>{task.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{task.why}</p>
                </button>
              </div>
              {openId === task.id && (
                <div className="border-t border-border px-4 py-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Làm thế nào</p>
                  <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm">
                    {task.steps.map((st) => (
                      <li key={st}>{st}</li>
                    ))}
                  </ol>
                  <p className="mt-3 rounded-md bg-muted px-3 py-2 text-sm text-foreground">
                    App không làm hộ: {task.cannot}
                  </p>
                  {task.id === "duyet" && (
                    <Button className="mt-3" variant="secondary" onClick={onGoPosts}>
                      Mở tab bài
                    </Button>
                  )}
                  {task.id === "clip" && (
                    <Button className="mt-3" variant="secondary" onClick={onGoMedia}>
                      Mở Hình & clip
                    </Button>
                  )}
                  {task.id === "zalo_oa" && (
                    <Button className="mt-3" variant="secondary" onClick={onGoInbox}>
                      Tập bot trong Inbox
                    </Button>
                  )}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      <aside className="space-y-4">
        <div className="rounded-xl border border-border bg-surface p-4">
          <h2 className="font-medium">8 thẻ dán vào Zalo OA / Manychat</h2>
          <p className="mt-1 text-xs text-muted-foreground">Copy nguyên. 30 ngày đầu không cần lập trình.</p>
          <ul className="mt-3 space-y-2">
            {SALE_CARDS.map((c) => (
              <li key={c.title} className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{c.title}</p>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      void navigator.clipboard.writeText(`${c.title}\n${c.body}`);
                      toast.success("Đã copy thẻ " + c.title);
                    }}
                    aria-label={"Copy " + c.title}
                  >
                    <Copy className="size-4" />
                  </button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

function PinChange() {
  const pinHash = useOps((s) => s.settings.pinHash);
  const setSettings = useOps((s) => s.setSettings);
  const [oldPin, setOldPin] = useState("");
  const [next, setNext] = useState("");

  async function save() {
    if (!isFourDigits(oldPin) || !isFourDigits(next)) {
      toast.error("Cả hai ô đủ 4 số.");
      return;
    }
    const got = await hashPin(oldPin);
    const want = pinHash || DEFAULT_PIN_HASH;
    if (got !== want) {
      toast.error("PIN cũ sai.");
      return;
    }
    setSettings({ pinHash: await hashPin(next) });
    setOldPin("");
    setNext("");
    toast.success("Đã đổi PIN. Máy khác dùng mã mới.");
  }

  return (
    <section className="mt-6 rounded-xl border border-border bg-surface p-4">
      <h2 className="font-medium">Đổi PIN 4 số</h2>
      <p className="mt-1 text-sm text-muted-foreground">Khóa trang vận hành. Không khóa trang bán.</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="pin-old">PIN hiện tại</Label>
          <Input
            id="pin-old"
            inputMode="numeric"
            maxLength={4}
            value={oldPin}
            onChange={(e) => setOldPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="pin-new">PIN mới</Label>
          <Input
            id="pin-new"
            inputMode="numeric"
            maxLength={4}
            value={next}
            onChange={(e) => setNext(e.target.value.replace(/\D/g, "").slice(0, 4))}
            className="mt-1"
          />
        </div>
      </div>
      <Button className="mt-3" onClick={() => void save()}>
        Đổi PIN
      </Button>
    </section>
  );
}

