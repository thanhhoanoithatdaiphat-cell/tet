import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ClipboardList,
  ImageIcon,
  Inbox,
  Megaphone,
  Package,
  Store,
} from "lucide-react";
import { useOps } from "@/lib/ops-store";
import { cn } from "@/lib/utils";
import { YouTab } from "./you-tab";
import { InboxTab } from "./inbox-tab";
import { OrdersTab } from "./orders-tab";
import { PostsTab } from "./posts-tab";
import { MediaTab } from "./media-tab";
import { lockOps } from "./pin-gate";

const TABS = [
  { id: "ban", label: "Việc của bạn", icon: ClipboardList },
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "don", label: "Đơn", icon: Package },
  { id: "bai", label: "Bài TikTok/FB", icon: Megaphone },
  { id: "hinh", label: "Hình & clip", icon: ImageIcon },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function OpsApp() {
  const seedIfEmpty = useOps((s) => s.seedIfEmpty);
  const tasks = useOps((s) => s.tasks);
  const threads = useOps((s) => s.threads);
  const posts = useOps((s) => s.posts);
  const orders = useOps((s) => s.orders);
  const [tab, setTab] = useState<TabId>("ban");

  useEffect(() => {
    seedIfEmpty();
  }, [seedIfEmpty]);

  const openTasks = tasks.filter((t) => !t.done).length;
  const waiting = threads.filter((t) => t.status === "cho_duyet" || t.unread).length;
  const pendingPosts = posts.filter((p) => p.status === "cho_duyet" || p.status === "san_sang").length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="font-display text-xl leading-none">Nhà Có Tết</p>
            <p className="mt-1 hidden text-xs text-muted-foreground sm:block">Bàn vận hành · bot tư vấn · chốt cổng 5 điều · lịch bài</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Trang bán
            </Link>
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => {
                lockOps();
                window.location.assign("/van-hanh");
              }}
            >
              Khóa
            </button>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-4 pb-3 sm:grid-cols-4">
          <Stat label="Việc bạn chưa xong" value={openTasks} warn={openTasks > 0} />
          <Stat label="Inbox cần nhìn" value={waiting} warn={waiting > 0} />
          <Stat label="Đơn" value={orders.length} />
          <Stat label="Bài chờ đăng" value={pendingPosts} />
        </div>
        <nav className="mx-auto hidden max-w-6xl gap-1 overflow-x-auto px-4 pb-2 md:flex">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex h-11 shrink-0 items-center gap-2 rounded-md px-3 text-sm",
                  tab === t.id ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                )}
              >
                <Icon className="size-4" />
                {t.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 pb-24 md:pb-6">
        {tab === "ban" && (
          <YouTab
            onGoInbox={() => setTab("inbox")}
            onGoPosts={() => setTab("bai")}
            onGoMedia={() => setTab("hinh")}
          />
        )}
        {tab === "inbox" && <InboxTab />}
        {tab === "don" && <OrdersTab />}
        {tab === "bai" && <PostsTab />}
        {tab === "hinh" && <MediaTab />}
      </main>

      <p className="mx-auto hidden max-w-6xl items-center gap-2 px-4 pb-8 text-xs text-muted-foreground md:flex">
        <Store className="size-3.5" />
        Bot được nói 24/7. Bot chỉ tự tạo đơn khi đủ 5 cổng. Đăng bài: bạn duyệt, app không tự lên TikTok/Facebook.
      </p>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-surface md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {TABS.map((t) => {
          const Icon = t.icon;
          const short = { ban: "Việc", inbox: "Inbox", don: "Đơn", bai: "Bài", hinh: "Hình" }[t.id];
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "flex h-14 flex-col items-center justify-center gap-0.5 text-[11px]",
                tab === t.id ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="size-4" />
              {short}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function Stat({ label, value, warn }: { label: string; value: number; warn?: boolean }) {
  return (
    <div className={cn("rounded-lg border border-border bg-background px-3 py-2", warn && "border-primary/40")}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-display text-2xl">{value}</p>
    </div>
  );
}
