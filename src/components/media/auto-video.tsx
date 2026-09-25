import { useEffect, useRef } from "react";
import { useMediaUrl } from "@/lib/media-store";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  poster: string;
  className?: string;
  alt?: string;
};

export function AutoVideo({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const video = useMediaUrl(src);
  const posterUrl = useMediaUrl(poster);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video]);

  return (
    <video
      key={video}
      ref={ref}
      className={cn("h-full w-full object-cover", className)}
      poster={posterUrl}
      src={video}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
    />
  );
}
