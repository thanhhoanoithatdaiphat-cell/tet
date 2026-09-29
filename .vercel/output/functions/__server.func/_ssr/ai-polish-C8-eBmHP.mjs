import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { r as resolveSeason } from "./seasons-t_J3k4e-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-polish-C8-eBmHP.js
var polishCopy_createServerFn_handler = createServerRpc({
	id: "c75cd1d384fc7b00a8f1273b2d12dac8859d42f100eb67cfcd4ece201ba8acc2",
	name: "polishCopy",
	filename: "src/lib/ai-polish.ts"
}, (opts) => polishCopy.__executeServer(opts));
var polishCopy = createServerFn({ method: "POST" }).validator((input) => input).handler(polishCopy_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI chưa bật trên máy chủ này."
	};
	const season = resolveSeason();
	const prices = season.products.map((p) => `${p.name} ${p.price}`).join(", ");
	const system = data.kind === "inbox" ? `Bạn là nhân viên shop Nhà Có Tết, dịp ${season.name}. Giọng cụ thể, có số, không sến, không emoji. Chỉ 3 set: ${prices}. COD. ${season.shipRules} Trả đúng 1–2 tin ngắn tiếng Việt. Không bịa SKU.` : `Bạn viết caption TikTok/Facebook cho dịp ${season.name} của Nhà Có Tết. Tiếng Việt, ngắn, có giá, 1 CTA. Không emoji rải, không bịa review. Giữ đúng set và giá: ${prices}.`;
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				max_tokens: 400,
				messages: [{
					role: "system",
					content: system
				}, {
					role: "user",
					content: (data.hint ? data.hint + "\n\n" : "") + data.text
				}]
			})
		});
		if (!res.ok) return {
			ok: false,
			error: `AI lỗi ${res.status}`
		};
		const text = (await res.json()).choices[0]?.message.content?.trim() ?? "";
		if (!text) return {
			ok: false,
			error: "AI trả rỗng"
		};
		return {
			ok: true,
			text
		};
	} catch {
		return {
			ok: false,
			error: "Không gọi được AI."
		};
	}
});
//#endregion
export { polishCopy_createServerFn_handler };
