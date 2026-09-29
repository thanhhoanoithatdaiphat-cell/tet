import { defineErrorHandler } from "nitro";

function statusOf(error: { status?: number; statusCode?: number }): number {
  const status = Number(error.status || error.statusCode || 500);
  return status >= 400 && status <= 599 ? status : 500;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&")
    .replaceAll("<", "<")
    .replaceAll(">", ">");
}

export default defineErrorHandler((error) => {
  const status = statusOf(error);
  console.error("[petitewoodart]", error);
  if (status === 404) {
    return new Response("Không thấy trang này.", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
  const message = error instanceof Error && error.message ? error.message : "Lỗi máy chủ";
  const body = `<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Petitewoodart</title><body style="font-family:sans-serif;padding:24px;line-height:1.5"><p>Trang chưa mở được.</p><p>${escapeHtml(message)}</p></body></html>`;
  return new Response(body, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
});
