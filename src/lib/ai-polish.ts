import { createServerFn } from "@tanstack/react-start";
import { resolveSeason } from "./seasons";

export const polishCopy = createServerFn({ method: "POST" })
  .validator((input: { kind: "inbox" | "caption"; text: string; hint?: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "AI chưa bật trên máy chủ này." };

    const season = resolveSeason();
    const prices = season.products.map((p) => `${p.name} ${p.price}`).join(", ");
    const system =
      data.kind === "inbox"
        ? `Bạn là nhân viên shop Nhà Có Tết, dịp ${season.name}. Giọng cụ thể, có số, không sến, không emoji. Chỉ 3 set: ${prices}. COD. ${season.shipRules} Trả đúng 1–2 tin ngắn tiếng Việt. Không bịa SKU.`
        : `Bạn viết caption TikTok/Facebook cho dịp ${season.name} của Nhà Có Tết. Tiếng Việt, ngắn, có giá, 1 CTA. Không emoji rải, không bịa review. Giữ đúng set và giá: ${prices}.`;

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
