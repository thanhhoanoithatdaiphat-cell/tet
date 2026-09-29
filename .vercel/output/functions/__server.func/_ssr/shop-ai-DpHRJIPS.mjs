import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { r as resolveSeason } from "./seasons-t_J3k4e-.mjs";
import { a as catalogPriceTokens, c as detectPhone, d as draftReply, f as evaluateClose, l as detectProvince, m as formatVnd, o as catalogReply, t as CATALOG, u as detectSet } from "./brain-B76nEHmp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-ai-DpHRJIPS.js
function catalogBlock() {
	return CATALOG.map((p) => p.sizes ? `${p.name}: ${p.sizes.map((s) => `${s.label} ${formatVnd(s.price)}`).join(" hoặc ")}` : `${p.name}: ${formatVnd(p.price)}/${p.unit}`).join("\n");
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
	const allowed = catalogPriceTokens();
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
	stock: input.stock,
	seasonId: typeof input.seasonId === "string" ? input.seasonId : null
})).handler(consultShop_createServerFn_handler, async ({ data }) => {
	const season = resolveSeason(/* @__PURE__ */ new Date(), data.seasonId);
	const lastUser = [...data.messages].reverse().find((m) => m.role === "user")?.content ?? "";
	const rules = draftReply(lastUser, void 0, season);
	const phone = detectPhone(data.messages.map((m) => m.content).join("\n"));
	const province = detectProvince(lastUser) ?? detectProvince(data.messages.map((m) => m.content).join("\n"));
	const setFromText = detectSet(lastUser, season.products) ?? rules.suggestedSet;
	const addressHint = province ? lastUser.length > 16 ? lastUser : province.name : void 0;
	const fallback = () => {
		const suggestedSet = setFromText;
		const verdict = evaluateClose({
			setId: suggestedSet,
			phone,
			address: addressHint,
			stock: data.stock,
			season
		});
		return {
			ok: true,
			source: "rules",
			reply: catalogReply(lastUser),
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
		content: `Bạn là nhân viên Petitewoodart, xưởng đồ gỗ cắt laser. Trả JSON thuần, không markdown.
Giọng: tiếng Việt, cụ thể, có số, không sến, không emoji. Tối đa 70 từ. Không bịa món. Không nói giá ngoài danh sách.

DANH SÁCH GIÁ BÁN LẺ:
${catalogBlock()}

COD, không chuyển khoản trước. Giao toàn quốc. Từ 20 cái có giá sỉ, bảo khách nhắn Zalo, không tự tính phần trăm.
Muốn mua: bảo bấm đúng món trên trang rồi Thêm vào giỏ.

JSON:
{"reply":"string","suggestedSet":null,"phone":"10 số hoặc null","address":"string hoặc null","name":"string hoặc null","escalate":false}`
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
			stock: data.stock,
			season
		});
		return {
			ok: true,
			source: useAi ? "ai" : "rules",
			reply: useAi ? aiReply : catalogReply(lastUser),
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
