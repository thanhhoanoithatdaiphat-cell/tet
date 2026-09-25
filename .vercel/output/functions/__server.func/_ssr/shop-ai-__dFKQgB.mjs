import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { d as detectSet, f as draftReply, h as getProduct, l as detectPhone, m as formatVnd, p as evaluateClose, u as detectProvince } from "./brain-GLjzxkm2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-ai-__dFKQgB.js
var SETS = [
	"cua",
	"khach",
	"nha"
];
function catalogBlock() {
	return SETS.map((id) => {
		const p = getProduct(id);
		return `${id}: ${p.name} ${formatVnd(p.price)} — ${p.tagline}. ${p.blurb} Gồm: ${p.includes.join("; ")}.`;
	}).join("\n");
}
function extractJson(raw) {
	const stripped = raw.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
	try {
		return JSON.parse(stripped);
	} catch {
		const m = stripped.match(/\{[\s\S]*\}/);
		if (!m) return null;
		try {
			return JSON.parse(m[0]);
		} catch {
			return null;
		}
	}
}
function priceSafe(text) {
	const hits = text.match(/\d{1,3}(?:[.\s]\d{3})+/g) ?? [];
	const allowed = /* @__PURE__ */ new Set([
		"399.000",
		"699.000",
		"999.000",
		"399000",
		"699000",
		"999000"
	]);
	return hits.every((h) => allowed.has(h.replace(/\s/g, "")));
}
function asSet(v) {
	return v === "cua" || v === "khach" || v === "nha" ? v : void 0;
}
async function callGrok(messages, apiKey) {
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 420,
			temperature: .4,
			messages
		})
	});
	if (!res.ok) throw new Error(String(res.status));
	return (await res.json()).choices[0]?.message.content?.trim() ?? "";
}
var consultShop_createServerFn_handler = createServerRpc({
	id: "c5de040a13e53003262cdbcc05f38b093b20bfddc7f2144a9c89969a8c8f94c8",
	name: "consultShop",
	filename: "src/lib/shop-ai.ts"
}, (opts) => consultShop.__executeServer(opts));
var consultShop = createServerFn({ method: "POST" }).validator((input) => ({
	messages: input.messages.slice(-10),
	stock: input.stock
})).handler(consultShop_createServerFn_handler, async ({ data }) => {
	const lastUser = [...data.messages].reverse().find((m) => m.role === "user")?.content ?? "";
	const rules = draftReply(lastUser);
	const phone = detectPhone(data.messages.map((m) => m.content).join("\n"));
	const province = detectProvince(lastUser) ?? detectProvince(data.messages.map((m) => m.content).join("\n"));
	const setFromText = detectSet(lastUser) ?? rules.suggestedSet;
	const addressHint = province ? lastUser.length > 16 ? lastUser : province.name : void 0;
	const fallback = () => {
		const suggestedSet = setFromText;
		const verdict = evaluateClose({
			setId: suggestedSet,
			phone,
			address: addressHint,
			stock: data.stock
		});
		return {
			ok: true,
			source: "rules",
			reply: rules.reply,
			suggestedSet,
			phone,
			address: addressHint,
			escalate: Boolean(rules.escalate),
			verdict
		};
	};
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey || data.messages.filter((m) => m.role === "user").length > 12) return fallback();
	const grokMessages = [{
		role: "system",
		content: `Bạn là nhân viên shop Nhà Có Tết. Trả JSON thuần, không markdown.
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
{"reply":"string","suggestedSet":"cua"|"khach"|"nha"|null,"phone":"10 số hoặc null","address":"string hoặc null","name":"string hoặc null","escalate":false}`
	}, ...data.messages.map((m) => ({
		role: m.role,
		content: m.content
	}))];
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
		const aiPhone = typeof parsed?.phone === "string" ? detectPhone(parsed.phone) : void 0;
		const mergedPhone = phone ?? aiPhone;
		const mergedAddress = addressHint ?? (typeof parsed?.address === "string" && parsed.address.length > 8 ? parsed.address : void 0);
		const name = typeof parsed?.name === "string" && parsed.name.length > 1 ? parsed.name : void 0;
		const escalate = Boolean(rules.escalate) || parsed?.escalate === true;
		const verdict = evaluateClose({
			setId: suggestedSet,
			phone: mergedPhone,
			address: mergedAddress,
			stock: data.stock
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
			verdict
		};
	} catch {
		return fallback();
	}
});
//#endregion
export { consultShop_createServerFn_handler };
