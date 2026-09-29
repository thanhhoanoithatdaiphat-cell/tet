import { useEffect, useState } from "react";
import { ShopImg } from "@/components/media/shop-img";
import { minPrice, type Item, type Spot } from "@/lib/catalog";
import { cn, formatVnd } from "@/lib/utils";

export function ProductRail({ spots, onOpen }: { spots: Spot[]; onOpen: (item: Item) => void }) {
  const [reduce, setReduce] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const loop = reduce ? spots : [...spots, ...spots];

  return (
    <div
      className={cn("marquee pb-5", reduce && "overflow-x-auto")}
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onPointerCancel={() => setPaused(false)}
      onPointerLeave={() => setPaused(false)}
    >
      <ul className={cn("flex w-max", !reduce && "animate-marquee", paused && "marquee-paused")}>
        {loop.map((spot, index) => (
          <li key={`${spot.item.id}-${index}`} className="w-[58vw] max-w-60 shrink-0 pr-3 sm:w-72 sm:max-w-none">
            <button type="button" onClick={() => onOpen(spot.item)} className="w-full text-left">
              <span className="relative block overflow-hidden rounded-xl border border-border bg-surface">
                <ShopImg src={spot.item.image} alt={spot.item.name} className="aspect-square w-full object-cover object-top" />
                <span className="absolute top-2 left-2 inline-flex max-w-[calc(100%-1rem)] items-center rounded-full bg-primary px-2 py-0.5 text-xs leading-tight text-primary-foreground">
                  {spot.reason}
                </span>
              </span>
              <span className="mt-2 block line-clamp-2 min-h-10 text-sm leading-snug">{spot.item.name}</span>
              <span className="block text-sm font-medium tabular-nums">{formatVnd(minPrice(spot.item))}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
