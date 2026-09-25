import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { polishCopy } from "@/lib/ai-polish";
import { getProduct } from "@/lib/products";
import { useMediaUrl } from "@/lib/media-store";
import { useOps, type SocialPost } from "@/lib/ops-store";
import { cn, formatVnd } from "@/lib/utils";

export function PostsTab() {
  const posts = useOps((s) => s.posts);
  const stock = useOps((s) => s.stock);
  const [filter, setFilter] = useState<"all" | "tiktok" | "facebook">("all");
  const list = posts.filter((p) => (filter === "all" ? true : p.channel === filter));

  return (
    <div>
      <h1 className="font-display text-2xl">Bài lên TikTok và Facebook Page</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        Không lên Instagram, Zalo feed, hay tự bật ads. App soạn caption + chọn clip. Bạn duyệt, copy, dán trong app
        TikTok/Facebook, rồi bấm Đã đăng. Token API gắn sau — lúc đó nút Đăng mới lên sóng thật.
      </p>
      <div className="mt-4 flex gap-1">
        {(["all", "tiktok", "facebook"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "h-11 rounded-md px-4 text-sm",
              filter === f ? "bg-primary text-primary-foreground" : "bg-muted",
            )}
          >
            {f === "all" ? "Tất cả" : f === "tiktok" ? "TikTok" : "Facebook"}
          </button>
        ))}
      </div>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {list.map((p) => (
          <PostCard key={p.id} post={p} lowStock={stock[p.setId] < 10} />
        ))}
      </ul>
    </div>
  );
}

function PostCard({ post, lowStock }: { post: SocialPost; lowStock: boolean }) {
  const approvePost = useOps((s) => s.approvePost);
  const markPosted = useOps((s) => s.markPosted);
  const clip = useMediaUrl(post.clip);
  const [busy, setBusy] = useState(false);
  const [caption, setCaption] = useState(post.caption);
  const when = new Date(post.scheduledAt).toLocaleString("vi-VN", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });

  async function copyOpen() {
    await navigator.clipboard.writeText(caption);
    const url = post.channel === "tiktok" ? "https://www.tiktok.com/tiktokstudio/upload" : "https://www.facebook.com/";
    window.open(url, "_blank", "noopener");
    toast.success("Đã copy caption. Dán clip + caption, đăng, rồi bấm Đã đăng.");
  }

  async function polish() {
    setBusy(true);
    const res = await polishCopy({
      data: {
        kind: "caption",
        text: caption,
        hint: `Kênh ${post.channel}, set ${getProduct(post.setId).name} ${formatVnd(getProduct(post.setId).price)}, hook: ${post.hook}`,
      },
    });
    setBusy(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    setCaption(res.text);
    toast.success("Đã soạn lại caption.");
  }

  return (
    <li className="overflow-hidden rounded-xl border border-border bg-surface">
      <video src={clip} className="aspect-video w-full object-cover" muted playsInline preload="metadata" />
      <div className="p-4">
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="uppercase tracking-wide">
            {post.channel} · {getProduct(post.setId).name}
          </span>
          <span>{when}</span>
        </div>
        <p className="mt-2 font-medium">{post.hook}</p>
        <p className="mt-1 text-xs text-primary">{post.cta}</p>
        {post.status === "khoa" || lowStock ? (
          <p className="mt-2 rounded-md bg-muted px-2 py-1 text-xs">Kho set này thấp — khóa đăng để ads không bán âm.</p>
        ) : null}
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={5}
          className="mt-3 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {post.status === "cho_duyet" && (
            <Button size="sm" onClick={() => approvePost(post.id)}>
              Duyệt
            </Button>
          )}
          {(post.status === "san_sang" || post.status === "cho_duyet") && (
            <Button size="sm" variant="secondary" onClick={() => void copyOpen()}>
              Copy & mở {post.channel === "tiktok" ? "TikTok" : "Facebook"}
            </Button>
          )}
          <Button size="sm" variant="ghost" disabled={busy} onClick={() => void polish()}>
            AI viết lại
          </Button>
          {post.status !== "da_dang" && (
            <Button size="sm" variant="secondary" onClick={() => markPosted(post.id)}>
              Đã đăng
            </Button>
          )}
          {post.status === "da_dang" && <span className="self-center text-xs text-muted-foreground">Đã lên sóng (do bạn dán tay)</span>}
        </div>
      </div>
    </li>
  );
}
