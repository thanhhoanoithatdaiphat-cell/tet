import { useEffect, useRef, useState } from "react";
import { CATALOG, minPrice, type Item } from "@/lib/catalog";
import { formatVnd } from "@/lib/utils";

const CLIPS = [
  {
    id: "tomau-hw-20",
    src: "/videos/to-mau.mp4",
    poster: "/videos/to-mau.jpg",
    line: "Ngồi tô từng nét.",
  },
  {
    id: "den-hw",
    src: "/videos/thap-den.mp4",
    poster: "/videos/thap-den.jpg",
    line: "Tô xong, treo lên cửa.",
  },
  {
    id: "shadow-hw",
    src: "/videos/bong-tuong.mp4",
    poster: "/videos/bong-tuong.jpg",
    line: "Giơ ra nắng, bóng lên tường.",
  },
] as const;

export function MomentCards({ seasonId, onOpen }: { seasonId: string; onOpen: (item: Item) => void }) {
  const moments = CLIPS.flatMap((clip) => {
    const item = CATALOG.find((entry) => entry.id === clip.id);
    if (!item || !item.seasons.includes(seasonId)) return [];
    return [{ ...clip, item }];
  });
  if (moments.length === 0) return null;

  return (
    <section className="border-b border-border py-4 sm:py-6">
      <div className="mx-auto max-w-6xl">
        <div className="px-4">
          <p className="text-xs tracking-wide text-primary uppercase">Nhìn một buổi</p>
          <h2 className="mt-1 font-display text-2xl leading-tight">Bé tô, rồi chơi.</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Cảnh minh họa.
            <span className="sm:hidden"> Vuốt ngang để xem tiếp.</span>
          </p>
        </div>
        <ul className="moment-row mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible">
          {moments.map((moment) => (
            <li key={moment.id} className="w-[84vw] shrink-0 snap-center sm:w-auto">
              <Clip moment={moment} onOpen={onOpen} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Clip({
  moment,
  onOpen,
}: {
  moment: (typeof CLIPS)[number] & { item: Item };
  onOpen: (item: Item) => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el || reduce) return;
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.5 },
    );
    seen.observe(el);
    return () => seen.disconnect();
  }, [reduce]);

  return (
    <button
      type="button"
      onClick={() => onOpen(moment.item)}
      aria-label={`${moment.line} ${moment.item.name}`}
      className="w-full text-left"
    >
      <span className="relative block overflow-hidden rounded-2xl bg-muted">
        {reduce ? (
          <img src={moment.poster} alt="" className="aspect-[4/5] w-full object-cover object-[center_30%]" />
        ) : (
          <video
            ref={video}
            src={moment.src}
            poster={moment.poster}
            muted
            playsInline
            loop
            preload="metadata"
            className="aspect-[4/5] w-full object-cover object-[center_30%]"
          />
        )}
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-3 pt-12 pb-3 text-white">
          <span className="block font-display text-xl leading-tight">{moment.line}</span>
          <span className="mt-1 block text-sm leading-snug">{moment.item.name}</span>
          <span className="mt-0.5 block text-sm font-medium tabular-nums">{formatVnd(minPrice(moment.item))}</span>
        </span>
      </span>
    </button>
  );
}
