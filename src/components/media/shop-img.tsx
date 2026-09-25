import type { ComponentProps } from "react";
import { useMediaUrl } from "@/lib/media-store";

export function ShopImg({ src, ...props }: ComponentProps<"img"> & { src: string }) {
  const url = useMediaUrl(src);
  return <img src={url} {...props} />;
}
