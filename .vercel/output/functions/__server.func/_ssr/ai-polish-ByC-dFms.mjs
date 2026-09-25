import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-polish-ByC-dFms.js
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
	const system = data.kind === "inbox" ? "Bạn là nhân viên shop Nhà Có Tết. Giọng cụ thể, có số, không sến, không emoji. Chỉ 3 set: cửa 399000, phòng khách 699000, cả nhà 999000. COD. Không hứa giao Tết nếu khách tỉnh xa sau 25/01/2027 hoặc sau 30/01/2027. Trả đúng 1–2 tin ngắn tiếng Việt. Không bịa SKU." : "Bạn viết caption TikTok/Facebook cho shop set Tết hiện đại Nhà Có Tết. Tiếng Việt, ngắn, có giá, 1 CTA. Không emoji rải, không nhạc bản quyền, không bịa review. Giữ đúng set và giá trong gợi ý.";
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
