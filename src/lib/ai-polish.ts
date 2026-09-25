import { createServerFn } from "@tanstack/react-start";

export const polishCopy = createServerFn({ method: "POST" })
  .validator((input: { kind: "inbox" | "caption"; text: string; hint?: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "AI chưa bật trên máy chủ này." };

    const system =
      data.kind === "inbox"
        ? "Bạn là nhân viên shop Nhà Có Tết. Giọng cụ thể, có số, không sến, không emoji. Chỉ 3 set: cửa 399000, phòng khách 699000, cả nhà 999000. COD. Không hứa giao Tết nếu khách tỉnh xa sau 25/01/2027 hoặc sau 30/01/2027. Trả đúng 1–2 tin ngắn tiếng Việt. Không bịa SKU."
        : "Bạn viết caption TikTok/Facebook cho shop set Tết hiện đại Nhà Có Tết. Tiếng Việt, ngắn, có giá, 1 CTA. Không emoji rải, không nhạc bản quyền, không bịa review. Giữ đúng set và giá trong gợi ý.";

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 400,
          messages: [
            { role: "system", content: system },
            { role: "user", content: (data.hint ? data.hint + "\n\n" : "") + data.text },
          ],
        }),
      });
      if (!res.ok) return { ok: false as const, error: `AI lỗi ${res.status}` };
      const body = (await res.json()) as { choices: { message: { content: string } }[] };
      const text = body.choices[0]?.message.content?.trim() ?? "";
      if (!text) return { ok: false as const, error: "AI trả rỗng" };
      return { ok: true as const, text };
    } catch {
      return { ok: false as const, error: "Không gọi được AI." };
    }
  });
