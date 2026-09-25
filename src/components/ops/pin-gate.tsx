import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DEFAULT_PIN_HASH, OPS_SESSION_KEY, hashPin, isFourDigits } from "@/lib/ops-pin";
import { useOps } from "@/lib/ops-store";

export function PinGate({ children }: { children: React.ReactNode }) {
  const pinHash = useOps((s) => s.settings.pinHash);
  const [ok, setOk] = useState(false);
  const [pin, setPin] = useState("");
  const [fails, setFails] = useState(0);
  const [lockUntil, setLockUntil] = useState(0);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (sessionStorage.getItem(OPS_SESSION_KEY) === "1") setOk(true);
  }, []);

  useEffect(() => {
    if (lockUntil <= Date.now()) return;
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, [lockUntil]);

  const locked = lockUntil > now;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (locked) return;
    if (!isFourDigits(pin)) {
      toast.error("PIN đủ 4 số.");
      return;
    }
    const got = await hashPin(pin);
    const want = pinHash || DEFAULT_PIN_HASH;
    if (got !== want) {
      const n = fails + 1;
      setFails(n);
      setPin("");
      if (n >= 5) {
        setLockUntil(Date.now() + 20000);
        setFails(0);
        toast.error("Sai 5 lần. Chờ 20 giây.");
        return;
      }
      toast.error("Sai PIN.");
      return;
    }
    sessionStorage.setItem(OPS_SESSION_KEY, "1");
    setOk(true);
    setPin("");
    setFails(0);
  }

  if (ok) return children;

  const wait = Math.max(0, Math.ceil((lockUntil - now) / 1000));

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <form onSubmit={(e) => void submit(e)} className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6">
        <p className="font-display text-2xl">Vận hành shop</p>
        <p className="mt-2 text-sm text-muted-foreground">Nhập PIN 4 số. Trang bán không cần mã này.</p>
        <input
          autoFocus
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
          className="mt-6 h-14 w-full rounded-md border border-border bg-background text-center font-display text-3xl tracking-[0.4em] outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="PIN 4 số"
        />
        <Button type="submit" className="mt-4 w-full" disabled={locked || pin.length !== 4}>
          {locked ? `Chờ ${wait}s` : "Vào"}
        </Button>
      </form>
    </div>
  );
}

export function lockOps() {
  sessionStorage.removeItem(OPS_SESSION_KEY);
}
