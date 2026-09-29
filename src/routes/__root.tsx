import { useEffect } from "react";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { PAGE_DESCRIPTION, PAGE_TITLE } from "@/lib/config";
import { useMedia } from "@/lib/media-store";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

function MediaHydrator() {
  useEffect(() => {
    void useMedia.getState().hydrate();
  }, []);
  return null;
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:locale", content: "vi_VN" },
      { name: "theme-color", content: "#8F2D2D" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="vi" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <MediaHydrator />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            className: "font-sans",
          }}
        />
        <Scripts />
      </body>
    </html>
  ),
});
