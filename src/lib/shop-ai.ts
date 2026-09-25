import { createServerFn } from "@tanstack/react-start";
import {
  detectPhone,
  detectProvince,
  detectSet,
  draftReply,
  evaluateClose,
  type CloseVerdict,
} from "./brain";
import { getProduct, type ProductId } from "./products";
import { formatVnd } from "./utils";

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type ConsultResult = {
  ok: true;
  source: "ai" | "rules";
  reply: string;
  suggestedSet?: ProductId;
  phone?: string;
  address?: string;
  name?: string;
  escalate: boolean;
  verdict: CloseVerdict;
};

const SETS: ProductId[] = ["cua", "khach", "nha"];

function catalogBlock() {
  return SETS.map((id) => {
    const p = getProduct(id);
    return `${id}: ${p.name} ${formatVnd(p.price)} — ${p.tagline}. ${p.blurb} Gồm: ${p.includes.join("; ")}.`;
  }).join("\n");
}

function extractJson(raw: string): Record<string, unknown> | null {
  const stripped = raw.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  try {
    return JSON.parse(stripped) as Record<string, unknown>;
  } catch {
    const m = stripped.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try {
      return JSON.parse(m[0]) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
}

function priceSafe(text: string) {
  const hits = text.match(/\d{1,3}(?:[.\s]\d{3})+/g) ?? [];
  const allowed = new Set(["399.000", "699.000", "999.000", "399000", "699000", "999000"]);
  return hits.every((h) => allowed.has(h.replace(/\s/g, "")));
}

function asSet(v: unknown): ProductId | undefined {
  return v === "cua" || v === "khach" || v === "nha" ? v : undefined;
}

async function callGrok(messages: { role: string; content: string }[], apiKey: string) {
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-4.5",
      max_tokens: 420,
      temperature: 0.4,
      messages,
    }),
  });
  if (!res.ok) throw new Error(String(res.status));
  const body = (await res.json()) as { choices: { message: { content: string } }[] };
  return body.choices[0]?.message.content?.trim() ?? "";
}

export const consultShop = createServerFn({ method: "POST" })
  .validator((input: { messages: ChatTurn[]; stock: Record<ProductId, number> }) => ({
    messages: input.messages.slice(-10),
    stock: input.stock,
  }))
  .handler(async ({ data }): Promise<ConsultResult> => {
    const lastUser = [...data.messages].reverse().find((m) => m.role === "user")?.content ?? "";
    const rules = draftReply(lastUser);
    const phone = detectPhone(data.messages.map((m) => m.content).join("\n"));
    const province = detectProvince(lastUser) ?? detectProvince(data.messages.map((m) => m.content).join("\n"));
    const setFromText = detectSet(lastUser) ?? rules.suggestedSet;
    const addressHint = province ? (lastUser.length > 16 ? lastUser : province.name) : undefined;

    const fallback = (): ConsultResult => {
      const suggestedSet = setFromText;
      const verdict = evaluateClose({
        setId: suggestedSet,
        phone,
        address: addressHint,
        stock: data.stock,
      });
      return {
        ok: true,
        source: "rules",
        reply: rules.reply,
        suggestedSet,
        phone,
        address: addressHint,
        escalate: Boolean(rules.escalate),
        verdict,
      };
    };

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey || data.messages.filter((m) => m.role === "user").length > 12) {
      return fallback();
    }

    const system = `Bạn là nhân viên shop Nhà Có Tết. Trả JSON thuần, không markdown.
Giọng: tiếng Việt, cụ thể, có số, không sến, không emoji. Tối đa 60 từ, 2–4 câu. Không nói số tồn kho. Luôn kết bằng 1 câu hỏi chốt (ảnh tường / loại nhà / SĐT).

CHỈ 3 SET — cấm bịa SKU, cấm giá khác:
${catalogBlock()}

COD, không chuyển khoản trước.
Mốc giao Tết Đinh Mùi 06/02/2027:
- Tỉnh gần: chốt trước 30/01/2027 (23 Chạp).
- Tỉnh xa (miền núi, Tây Nguyên, ĐBSCL xa): trước 25/01/2027.
- Sau 04/02/2027: không nhận đơn hứa Tết.
Không khoan: móc dán + cây đặt sàn.
Đổi 48h hàng còn nguyên.
Mai dáng gọn, không hội chợ.
Tồn hiện tại: cửa ${data.stock.cua}, khách ${data.stock.khach}, nhà ${data.stock.nha}. Hết thì không bán set đó.
Khiếu nại / nghi lừa → escalate true, không cãi.

JSON:
{"reply":"string","suggestedSet":"cua"|"khach"|"nha"|null,"phone":"10 số hoặc null","address":"string hoặc null","name":"string hoặc null","escalate":false}`;

    const grokMessages = [
      { role: "system", content: system },
      ...data.messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    try {
      let raw = "";
      try {
        raw = await callGrok(grokMessages, apiKey);
      } catch {
        raw = await callGrok(grokMessages, apiKey);
      }
      const parsed = extractJson(raw);
      const aiReply = typeof parsed?.reply === "string" ? parsed.reply.trim() : raw;
      const useAi = Boolean(aiReply) && priceSafe(aiReply);
      const suggestedSet = setFromText ?? asSet(parsed?.suggestedSet);
      const aiPhone = typeof parsed?.phone === "string" ? detectPhone(parsed.phone) : undefined;
      const mergedPhone = phone ?? aiPhone;
      const mergedAddress =
        addressHint ?? (typeof parsed?.address === "string" && parsed.address.length > 8 ? parsed.address : undefined);
      const name = typeof parsed?.name === "string" && parsed.name.length > 1 ? parsed.name : undefined;
      const escalate = Boolean(rules.escalate) || parsed?.escalate === true;
      const verdict = evaluateClose({
        setId: suggestedSet,
        phone: mergedPhone,
        address: mergedAddress,
        stock: data.stock,
      });
      return {
        ok: true,
        source: useAi ? "ai" : "rules",
        reply: useAi ? aiReply : rules.reply,
        suggestedSet,
        phone: mergedPhone,
        address: mergedAddress,
        name,
        escalate,
        verdict,
      };
    } catch {
      return fallback();
    }
  });
