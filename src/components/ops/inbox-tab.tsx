import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { polishCopy } from "@/lib/ai-polish";
import { consultShop } from "@/lib/shop-ai";
import {
  CHANNEL_LABEL,
  detectPhone,
  detectProvince,
  detectSet,
  draftReply,
  evaluateClose,
  type Channel,
} from "@/lib/brain";
import { getProduct } from "@/lib/products";
import { useOps, type Thread } from "@/lib/ops-store";
import { cn, formatVnd } from "@/lib/utils";

export function InboxTab() {
  const threads = useOps((s) => s.threads);
  const activeId = useOps((s) => s.activeThreadId);
  const setActive = useOps((s) => s.setActiveThread);
  const addIncoming = useOps((s) => s.addIncoming);
  const active = threads.find((t) => t.id === activeId) ?? threads[0];

  const [ch, setCh] = useState<Channel>("tiktok");
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const [ingesting, setIngesting] = useState(false);

  async function ingest() {
    if (!text.trim()) {
      toast.error("Dán tin khách.");
      return;
    }
    const id = addIncoming({ channel: ch, customer: name.trim() || "Khách", text: text.trim() });
    setText("");
    setIngesting(true);
    await replyWithAi(id);
    setIngesting(false);
    toast.success("Đã soạn. Copy tin bot, dán sang Zalo/FB/TikTok.");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <div>
        <h1 className="font-display text-2xl">Inbox</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Dán tin từ TikTok / Facebook / Zalo. Bot soạn câu trả. Đủ 5 cổng mới được chốt.
        </p>
        <div className="mt-4 space-y-2 rounded-xl border border-border bg-surface p-3">
          <Label>Kênh tin đến</Label>
          <div className="flex gap-1">
            {(["tiktok", "facebook", "zalo"] as Channel[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCh(c)}
                className={cn(
                  "h-11 flex-1 rounded-md text-xs",
                  ch === c ? "bg-primary text-primary-foreground" : "bg-muted",
                )}
              >
                {CHANNEL_LABEL[c]}
              </button>
            ))}
          </div>
          <Input placeholder="Tên khách" value={name} onChange={(e) => setName(e.target.value)} />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Dán tin nhắn khách..."
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button className="w-full" onClick={() => void ingest()} disabled={ingesting}>
            {ingesting ? "AI đang soạn…" : "AI trả lời"}
          </Button>
        </div>
        <ul className="mt-3 space-y-1">
          {threads.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => setActive(t.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm",
                  (active?.id === t.id ? "bg-muted" : "hover:bg-muted/60"),
                )}
              >
                <span>
                  <span className="font-medium">{t.customer}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{CHANNEL_LABEL[t.channel]}</span>
                </span>
                <span className="text-xs text-muted-foreground">{statusLabel(t.status)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {active ? <ThreadPane key={active.id} thread={active} /> : <p className="text-sm text-muted-foreground">Chưa có hội thoại.</p>}
    </div>
  );
}

function statusLabel(s: Thread["status"]) {
  return { bot: "Bot", cho_duyet: "Chờ chốt", nguoi: "Người", chot: "Đã chốt", bo: "Bỏ" }[s];
}

async function replyWithAi(threadId: string) {
  const ops = useOps.getState();
  const thread = ops.threads.find((t) => t.id === threadId);
  if (!thread) return;
  const history = thread.messages.map((m) => ({
    role: m.from === "khach" ? ("user" as const) : ("assistant" as const),
    content: m.text,
  }));
  const last = [...thread.messages].reverse().find((m) => m.from === "khach")?.text ?? "";
  const rules = draftReply(last, thread.suggestedSet);
  let res;
  try {
    res = await consultShop({ data: { messages: history, stock: ops.stock } });
  } catch {
    res = null;
  }
  const reply = res?.reply ?? rules.reply;
  const setId = res?.suggestedSet ?? detectSet(last) ?? rules.suggestedSet ?? thread.suggestedSet;
  const phone = res?.phone ?? detectPhone(last) ?? thread.phone;
  const province = detectProvince(last);
  const address =
    res?.address ??
    thread.address ??
    (last.length > 20 && detectPhone(last) ? last : province?.name);
  ops.pushMessage(threadId, "bot", reply);
  ops.markThread(threadId, {
    suggestedSet: setId,
    phone,
    address,
    status: res?.escalate || rules.escalate ? "nguoi" : setId && phone ? "cho_duyet" : "bot",
  });
}

function ThreadPane({ thread }: { thread: Thread }) {
  const stock = useOps((s) => s.stock);
  const markThread = useOps((s) => s.markThread);
  const pushMessage = useOps((s) => s.pushMessage);
  const placeFromInbox = useOps((s) => s.placeFromInbox);
  const [phone, setPhone] = useState(thread.phone ?? "");
  const [address, setAddress] = useState(thread.address ?? "");
  const [name, setName] = useState(thread.customer);
  const [setId, setSetId] = useState(thread.suggestedSet);
  const [busy, setBusy] = useState(false);

  const verdict = useMemo(
    () =>
      evaluateClose({
        setId,
        phone: phone.replace(/\D/g, ""),
        address,
        stock,
      }),
    [setId, phone, address, stock],
  );

  function saveFields() {
    markThread(thread.id, {
      phone: phone.replace(/\D/g, "") || undefined,
      address,
      suggestedSet: setId,
      customer: name,
    });
  }

  async function polish() {
    const lastKhach = [...thread.messages].reverse().find((m) => m.from === "khach");
    if (!lastKhach) return;
    setBusy(true);
    const res = await polishCopy({ data: { kind: "inbox", text: lastKhach.text, hint: "Giữ đúng giọng shop, có thể chỉnh từ bản mẫu:\n" + draftReply(lastKhach.text, setId).reply } });
    setBusy(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    pushMessage(thread.id, "bot", res.text);
    toast.success("AI soạn lại.");
  }

  function closeOrder() {
    saveFields();
    const result = placeFromInbox(thread.id, name);
    if ("error" in result) {
      toast.error("Chưa chốt: " + result.error);
      return;
    }
    toast.success("Đơn " + result.id);
  }

  return (
    <div className="rounded-xl border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
        <div>
          <p className="font-medium">{thread.customer}</p>
          <p className="text-xs text-muted-foreground">{CHANNEL_LABEL[thread.channel]} · {statusLabel(thread.status)}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => markThread(thread.id, { status: "nguoi" })}>
            Người trả
          </Button>
          <Button variant="secondary" size="sm" disabled={busy} onClick={() => void polish()}>
            AI soạn lại
          </Button>
        </div>
      </div>
      <div className="max-h-80 space-y-2 overflow-y-auto p-4">
        {thread.messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "max-w-[90%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap",
              m.from === "khach" ? "bg-muted" : "ml-auto bg-primary text-primary-foreground",
            )}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="border-t border-border p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Cổng 5 điều — thiếu 1 điều không tạo đơn</p>
        <ul className="mt-2 grid gap-1 sm:grid-cols-2">
          {verdict.gates.map((g) => (
            <li key={g.id} className={cn("rounded-md px-2 py-1 text-xs", g.ok ? "bg-muted" : "bg-primary/10 text-primary")}>
              {g.ok ? "Đủ" : "Thiếu"} · {g.label}: {g.detail}
            </li>
          ))}
        </ul>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div>
            <Label>Họ tên</Label>
            <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>SĐT</Label>
            <Input className="mt-1" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <Label>Set</Label>
            <div className="mt-1 flex gap-1">
              {(["cua", "khach", "nha"] as const).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSetId(id)}
                  className={cn(
                    "h-11 flex-1 rounded-md text-xs",
                    setId === id ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  {formatVnd(getProduct(id).price).replace("đ", "")}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Label className="mt-2 block">Địa chỉ (có tỉnh)</Label>
        <Input className="mt-1" value={address} onChange={(e) => setAddress(e.target.value)} />
        <div className="mt-3 flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={saveFields}>
            Lưu field
          </Button>
          <Button type="button" disabled={!verdict.canClose} onClick={closeOrder}>
            {verdict.canClose ? "Tự chốt COD" : "Chưa đủ cổng"}
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Câu bot chỉ nằm trong app. Bạn copy tin bot, dán lại Zalo/Messenger/TikTok của khách.
        </p>
      </div>
    </div>
  );
}
