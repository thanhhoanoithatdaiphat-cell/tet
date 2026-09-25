import { useRef, useState } from "react";
import { useMediaUrl } from "@/lib/media-store";
import { cn } from "@/lib/utils";

export function BeforeAfter({
  before,
  after,
  beforeLabel = "Trước",
  afterLabel = "Sau",
  className,
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(52);
  const dragging = useRef(false);
  const beforeUrl = useMediaUrl(before);
  const afterUrl = useMediaUrl(after);

  function setFromEvent(clientX: number, target: HTMLElement) {
    const r = target.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    setPos(Math.round(x * 100));
  }

  return (
    <div
      className={cn(
        "relative aspect-4/3 w-full cursor-ew-resize overflow-hidden rounded-xl bg-muted select-none",
        className,
      )}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromEvent(e.clientX, e.currentTarget);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        setFromEvent(e.clientX, e.currentTarget);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
    >
      <img src={afterUrl} alt="Sau khi treo set" className="absolute inset-0 size-full object-cover" />
      <img
        src={beforeUrl}
        alt="Phòng trước khi treo"
        className="absolute inset-0 size-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <div className="absolute inset-y-0 w-0.5 bg-surface" style={{ left: `${pos}%` }} />
      <div
        className="absolute top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-[10px] font-medium text-foreground"
        style={{ left: `${pos}%` }}
      >
        kéo
      </div>
      <span className="absolute left-3 top-3 rounded-full bg-foreground/70 px-2 py-0.5 text-xs text-surface">
        {beforeLabel}
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-foreground/70 px-2 py-0.5 text-xs text-surface">
        {afterLabel}
      </span>
    </div>
  );
}
