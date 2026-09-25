import { i as __toESM } from "../_runtime.mjs";
import { _ as require_jsx_runtime, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createServerFn } from "./ssr.mjs";
import { S as Check, a as Store, b as ClipboardList, d as Package, g as Image, h as Inbox, m as Megaphone, v as Copy } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useMedia, r as useMediaUrl } from "./router-DXUwLKlL.mjs";
import { a as SALE_CARDS, c as cn, d as detectSet, f as draftReply, h as getProduct, l as detectPhone, m as formatVnd, o as SHOP, p as evaluateClose, t as CHANNEL_LABEL, u as detectProvince } from "./brain-GLjzxkm2.mjs";
import { a as consultShop, c as useOps, i as Label, l as zaloHref, n as Button, o as createSsrRpc, r as Input, t as Badge } from "./shop-ai-DSkQrtfE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/van-hanh-CcY1V6X9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SALT = "nct-ops-v1";
var OPS_SESSION_KEY = "nct-ops-ok";
async function hashPin(pin) {
	const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(SALT + pin));
	return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function isFourDigits(pin) {
	return /^\d{4}$/.test(pin);
}
function YouTab({ onGoInbox, onGoPosts, onGoMedia }) {
	const settings = useOps((s) => s.settings);
	const setSettings = useOps((s) => s.setSettings);
	const tasks = useOps((s) => s.tasks);
	const toggleTask = useOps((s) => s.toggleTask);
	const [openId, setOpenId] = (0, import_react.useState)(tasks.find((t) => !t.done)?.id ?? tasks[0]?.id);
	const [phone, setPhone] = (0, import_react.useState)(settings.zaloPhone);
	const [fb, setFb] = (0, import_react.useState)(settings.facebookPage);
	const [tt, setTt] = (0, import_react.useState)(settings.tiktokUser);
	function saveContact() {
		const zaloPhone = phone.replace(/\D/g, "");
		if (zaloPhone.length < 9) {
			toast.error("Số Zalo chưa đủ.");
			return;
		}
		setSettings({
			zaloPhone,
			facebookPage: fb.trim(),
			tiktokUser: tt.trim().replace(/^@/, "")
		});
		if (zaloPhone !== SHOP.phoneTel) {
			const so = useOps.getState().tasks.find((t) => t.id === "so_zalo");
			if (so && !so.done) toggleTask("so_zalo");
		}
		toast.success("Đã lưu số. Nút Zalo trên trang bán dùng số này.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Phần này bạn phải làm. App không làm hộ được."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted-foreground",
				children: "Mình đã dựng bot, cổng chốt 5 điều, lịch bài TikTok/Facebook. Ba việc còn lại nằm ngoài web: tài khoản mạng, hàng trong kho, và tay bấm Đăng. Làm theo thứ tự. Tick khi xong."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 rounded-xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Số thật — làm trước"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							"Đang ",
							settings.zaloPhone === SHOP.phoneTel ? "là số mẫu, khách nhắn vào số không ai bắt" : `Zalo ${settings.zaloPhone}`,
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "zalo",
								children: "Số Zalo (10 số)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "zalo",
								inputMode: "numeric",
								value: phone,
								onChange: (e) => setPhone(e.target.value),
								className: "mt-1"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "fb",
								children: "Link Page Facebook"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "fb",
								value: fb,
								onChange: (e) => setFb(e.target.value),
								className: "mt-1",
								placeholder: "facebook.com/..."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "tt",
								children: "TikTok @"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "tt",
								value: tt,
								onChange: (e) => setTt(e.target.value),
								className: "mt-1",
								placeholder: "nhacotet"
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: saveContact,
							children: "Lưu số & kênh"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: zaloHref(phone),
								target: "_blank",
								rel: "noreferrer",
								children: "Thử mở Zalo"
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinChange, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-6 space-y-3",
				children: tasks.map((task, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-border bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": task.done,
							onClick: () => toggleTask(task.id),
							className: cn("mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-md border", task.done ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"),
							children: task.done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: i + 1
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex-1 text-left",
							onClick: () => setOpenId(openId === task.id ? "" : task.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("font-medium", task.done && "text-muted-foreground line-through"),
								children: task.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: task.why
							})]
						})]
					}), openId === task.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border px-4 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
								children: "Làm thế nào"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-2 list-decimal space-y-2 pl-5 text-sm",
								children: task.steps.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: st }, st))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 rounded-md bg-muted px-3 py-2 text-sm text-foreground",
								children: ["App không làm hộ: ", task.cannot]
							}),
							task.id === "duyet" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-3",
								variant: "secondary",
								onClick: onGoPosts,
								children: "Mở tab bài"
							}),
							task.id === "clip" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-3",
								variant: "secondary",
								onClick: onGoMedia,
								children: "Mở Hình & clip"
							}),
							task.id === "zalo_oa" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-3",
								variant: "secondary",
								onClick: onGoInbox,
								children: "Tập bot trong Inbox"
							})
						]
					})]
				}, task.id))
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "space-y-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "8 thẻ dán vào Zalo OA / Manychat"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Copy nguyên. 30 ngày đầu không cần lập trình."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: SALE_CARDS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-md border border-border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: c.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-muted-foreground hover:text-foreground",
									onClick: () => {
										navigator.clipboard.writeText(`${c.title}\n${c.body}`);
										toast.success("Đã copy thẻ " + c.title);
									},
									"aria-label": "Copy " + c.title,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: c.body
							})]
						}, c.title))
					})
				]
			})
		})]
	});
}
function PinChange() {
	const pinHash = useOps((s) => s.settings.pinHash);
	const setSettings = useOps((s) => s.setSettings);
	const [oldPin, setOldPin] = (0, import_react.useState)("");
	const [next, setNext] = (0, import_react.useState)("");
	async function save() {
		if (!isFourDigits(oldPin) || !isFourDigits(next)) {
			toast.error("Cả hai ô đủ 4 số.");
			return;
		}
		if (await hashPin(oldPin) !== (pinHash || "5ec0a40bae89321d5d6e6b0b529d17f3d1ffea9dccac8f87abf7469284464602")) {
			toast.error("PIN cũ sai.");
			return;
		}
		setSettings({ pinHash: await hashPin(next) });
		setOldPin("");
		setNext("");
		toast.success("Đã đổi PIN. Máy khác dùng mã mới.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6 rounded-xl border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-medium",
				children: "Đổi PIN 4 số"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Khóa trang vận hành. Không khóa trang bán."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "pin-old",
					children: "PIN hiện tại"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "pin-old",
					inputMode: "numeric",
					maxLength: 4,
					value: oldPin,
					onChange: (e) => setOldPin(e.target.value.replace(/\D/g, "").slice(0, 4)),
					className: "mt-1"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "pin-new",
					children: "PIN mới"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "pin-new",
					inputMode: "numeric",
					maxLength: 4,
					value: next,
					onChange: (e) => setNext(e.target.value.replace(/\D/g, "").slice(0, 4)),
					className: "mt-1"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-3",
				onClick: () => void save(),
				children: "Đổi PIN"
			})
		]
	});
}
var polishCopy = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("c75cd1d384fc7b00a8f1273b2d12dac8859d42f100eb67cfcd4ece201ba8acc2"));
function InboxTab() {
	const threads = useOps((s) => s.threads);
	const activeId = useOps((s) => s.activeThreadId);
	const setActive = useOps((s) => s.setActiveThread);
	const addIncoming = useOps((s) => s.addIncoming);
	const active = threads.find((t) => t.id === activeId) ?? threads[0];
	const [ch, setCh] = (0, import_react.useState)("tiktok");
	const [name, setName] = (0, import_react.useState)("");
	const [text, setText] = (0, import_react.useState)("");
	const [ingesting, setIngesting] = (0, import_react.useState)(false);
	async function ingest() {
		if (!text.trim()) {
			toast.error("Dán tin khách.");
			return;
		}
		const id = addIncoming({
			channel: ch,
			customer: name.trim() || "Khách",
			text: text.trim()
		});
		setText("");
		setIngesting(true);
		await replyWithAi(id);
		setIngesting(false);
		toast.success("Đã soạn. Copy tin bot, dán sang Zalo/FB/TikTok.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl",
				children: "Inbox"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Dán tin từ TikTok / Facebook / Zalo. Bot soạn câu trả. Đủ 5 cổng mới được chốt."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-2 rounded-xl border border-border bg-surface p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Kênh tin đến" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1",
						children: [
							"tiktok",
							"facebook",
							"zalo"
						].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCh(c),
							className: cn("h-11 flex-1 rounded-md text-xs", ch === c ? "bg-primary text-primary-foreground" : "bg-muted"),
							children: CHANNEL_LABEL[c]
						}, c))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Tên khách",
						value: name,
						onChange: (e) => setName(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: text,
						onChange: (e) => setText(e.target.value),
						rows: 3,
						placeholder: "Dán tin nhắn khách...",
						className: "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						onClick: () => void ingest(),
						disabled: ingesting,
						children: ingesting ? "AI đang soạn…" : "AI trả lời"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-1",
				children: threads.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setActive(t.id),
					className: cn("flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm", active?.id === t.id ? "bg-muted" : "hover:bg-muted/60"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: t.customer
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-xs text-muted-foreground",
						children: CHANNEL_LABEL[t.channel]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: statusLabel(t.status)
					})]
				}) }, t.id))
			})
		] }), active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThreadPane, { thread: active }, active.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Chưa có hội thoại."
		})]
	});
}
function statusLabel(s) {
	return {
		bot: "Bot",
		cho_duyet: "Chờ chốt",
		nguoi: "Người",
		chot: "Đã chốt",
		bo: "Bỏ"
	}[s];
}
async function replyWithAi(threadId) {
	const ops = useOps.getState();
	const thread = ops.threads.find((t) => t.id === threadId);
	if (!thread) return;
	const history = thread.messages.map((m) => ({
		role: m.from === "khach" ? "user" : "assistant",
		content: m.text
	}));
	const last = [...thread.messages].reverse().find((m) => m.from === "khach")?.text ?? "";
	const rules = draftReply(last, thread.suggestedSet);
	let res;
	try {
		res = await consultShop({ data: {
			messages: history,
			stock: ops.stock
		} });
	} catch {
		res = null;
	}
	const reply = res?.reply ?? rules.reply;
	const setId = res?.suggestedSet ?? detectSet(last) ?? rules.suggestedSet ?? thread.suggestedSet;
	const phone = res?.phone ?? detectPhone(last) ?? thread.phone;
	const province = detectProvince(last);
	const address = res?.address ?? thread.address ?? (last.length > 20 && detectPhone(last) ? last : province?.name);
	ops.pushMessage(threadId, "bot", reply);
	ops.markThread(threadId, {
		suggestedSet: setId,
		phone,
		address,
		status: res?.escalate || rules.escalate ? "nguoi" : setId && phone ? "cho_duyet" : "bot"
	});
}
function ThreadPane({ thread }) {
	const stock = useOps((s) => s.stock);
	const markThread = useOps((s) => s.markThread);
	const pushMessage = useOps((s) => s.pushMessage);
	const placeFromInbox = useOps((s) => s.placeFromInbox);
	const [phone, setPhone] = (0, import_react.useState)(thread.phone ?? "");
	const [address, setAddress] = (0, import_react.useState)(thread.address ?? "");
	const [name, setName] = (0, import_react.useState)(thread.customer);
	const [setId, setSetId] = (0, import_react.useState)(thread.suggestedSet);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const verdict = (0, import_react.useMemo)(() => evaluateClose({
		setId,
		phone: phone.replace(/\D/g, ""),
		address,
		stock
	}), [
		setId,
		phone,
		address,
		stock
	]);
	function saveFields() {
		markThread(thread.id, {
			phone: phone.replace(/\D/g, "") || void 0,
			address,
			suggestedSet: setId,
			customer: name
		});
	}
	async function polish() {
		const lastKhach = [...thread.messages].reverse().find((m) => m.from === "khach");
		if (!lastKhach) return;
		setBusy(true);
		const res = await polishCopy({ data: {
			kind: "inbox",
			text: lastKhach.text,
			hint: "Giữ đúng giọng shop, có thể chỉnh từ bản mẫu:\n" + draftReply(lastKhach.text, setId).reply
		} });
		setBusy(false);
		if (!res.ok) {
			toast.error(res.error);
			return;
		}
		pushMessage(thread.id, "bot", res.text);
		toast.success("AI soạn lại.");
	}
	function closeOrder() {
		saveFields();
		const result = placeFromInbox(thread.id, name);
		if ("error" in result) {
			toast.error("Chưa chốt: " + result.error);
			return;
		}
		toast.success("Đơn " + result.id);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: thread.customer
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						CHANNEL_LABEL[thread.channel],
						" · ",
						statusLabel(thread.status)
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "sm",
						onClick: () => markThread(thread.id, { status: "nguoi" }),
						children: "Người trả"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "sm",
						disabled: busy,
						onClick: () => void polish(),
						children: "AI soạn lại"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-80 space-y-2 overflow-y-auto p-4",
				children: thread.messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("max-w-[90%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap", m.from === "khach" ? "bg-muted" : "ml-auto bg-primary text-primary-foreground"),
					children: m.text
				}, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
						children: "Cổng 5 điều — thiếu 1 điều không tạo đơn"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 grid gap-1 sm:grid-cols-2",
						children: verdict.gates.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: cn("rounded-md px-2 py-1 text-xs", g.ok ? "bg-muted" : "bg-primary/10 text-primary"),
							children: [
								g.ok ? "Đủ" : "Thiếu",
								" · ",
								g.label,
								": ",
								g.detail
							]
						}, g.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-2 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Họ tên" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1",
								value: name,
								onChange: (e) => setName(e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "SĐT" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1",
								inputMode: "numeric",
								value: phone,
								onChange: (e) => setPhone(e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Set" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 flex gap-1",
								children: [
									"cua",
									"khach",
									"nha"
								].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSetId(id),
									className: cn("h-11 flex-1 rounded-md text-xs", setId === id ? "bg-primary text-primary-foreground" : "bg-muted"),
									children: formatVnd(getProduct(id).price).replace("đ", "")
								}, id))
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "mt-2 block",
						children: "Địa chỉ (có tỉnh)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-1",
						value: address,
						onChange: (e) => setAddress(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							onClick: saveFields,
							children: "Lưu field"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							disabled: !verdict.canClose,
							onClick: closeOrder,
							children: verdict.canClose ? "Tự chốt COD" : "Chưa đủ cổng"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Câu bot chỉ nằm trong app. Bạn copy tin bot, dán lại Zalo/Messenger/TikTok của khách."
					})
				]
			})
		]
	});
}
var NEXT = {
	moi: "xac_nhan",
	xac_nhan: "giao",
	giao: "giao",
	huy: "huy"
};
function OrdersTab() {
	const orders = useOps((s) => s.orders);
	const stock = useOps((s) => s.stock);
	const setOrderStatus = useOps((s) => s.setOrderStatus);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl",
			children: "Đơn"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Landing + inbox chung một sổ. COD. Trừ tồn khi chốt."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex flex-wrap gap-2 text-sm",
			children: [
				"cua",
				"khach",
				"nha"
			].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				className: stock[id] < 10 ? "border-primary text-primary" : "",
				children: [
					getProduct(id).name,
					": còn ",
					stock[id]
				]
			}, id))
		}),
		orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-sm text-muted-foreground",
			children: "Chưa có đơn. Chốt từ Inbox hoặc trang bán."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 space-y-2",
			children: orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-medium",
							children: [
								o.id,
								" · ",
								getProduct(o.setId).name,
								" × ",
								o.qty
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm",
							children: [
								o.name,
								" · ",
								o.phone
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: o.address
						}),
						o.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: o.note
						}) : null
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: formatVnd(o.total)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								o.source === "landing" ? "Landing" : CHANNEL_LABEL[o.source],
								" · ",
								o.status
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [o.status !== "huy" && o.status !== "giao" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => setOrderStatus(o.id, NEXT[o.status]),
						children: o.status === "moi" ? "Xác nhận" : "Đã giao"
					}), o.status !== "huy" && o.status !== "giao" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => setOrderStatus(o.id, "huy"),
						children: "Hủy"
					})]
				})]
			}, o.id))
		})
	] });
}
function PostsTab() {
	const posts = useOps((s) => s.posts);
	const stock = useOps((s) => s.stock);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const list = posts.filter((p) => filter === "all" ? true : p.channel === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl",
			children: "Bài lên TikTok và Facebook Page"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 max-w-2xl text-sm text-muted-foreground",
			children: "Không lên Instagram, Zalo feed, hay tự bật ads. App soạn caption + chọn clip. Bạn duyệt, copy, dán trong app TikTok/Facebook, rồi bấm Đã đăng. Token API gắn sau — lúc đó nút Đăng mới lên sóng thật."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex gap-1",
			children: [
				"all",
				"tiktok",
				"facebook"
			].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFilter(f),
				className: cn("h-11 rounded-md px-4 text-sm", filter === f ? "bg-primary text-primary-foreground" : "bg-muted"),
				children: f === "all" ? "Tất cả" : f === "tiktok" ? "TikTok" : "Facebook"
			}, f))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 grid gap-3 md:grid-cols-2",
			children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, {
				post: p,
				lowStock: stock[p.setId] < 10
			}, p.id))
		})
	] });
}
function PostCard({ post, lowStock }) {
	const approvePost = useOps((s) => s.approvePost);
	const markPosted = useOps((s) => s.markPosted);
	const clip = useMediaUrl(post.clip);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [caption, setCaption] = (0, import_react.useState)(post.caption);
	const when = new Date(post.scheduledAt).toLocaleString("vi-VN", {
		weekday: "short",
		hour: "2-digit",
		minute: "2-digit",
		day: "2-digit",
		month: "2-digit"
	});
	async function copyOpen() {
		await navigator.clipboard.writeText(caption);
		const url = post.channel === "tiktok" ? "https://www.tiktok.com/tiktokstudio/upload" : "https://www.facebook.com/";
		window.open(url, "_blank", "noopener");
		toast.success("Đã copy caption. Dán clip + caption, đăng, rồi bấm Đã đăng.");
	}
	async function polish() {
		setBusy(true);
		const res = await polishCopy({ data: {
			kind: "caption",
			text: caption,
			hint: `Kênh ${post.channel}, set ${getProduct(post.setId).name} ${formatVnd(getProduct(post.setId).price)}, hook: ${post.hook}`
		} });
		setBusy(false);
		if (!res.ok) {
			toast.error(res.error);
			return;
		}
		setCaption(res.text);
		toast.success("Đã soạn lại caption.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "overflow-hidden rounded-xl border border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			src: clip,
			className: "aspect-video w-full object-cover",
			muted: true,
			playsInline: true,
			preload: "metadata"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "uppercase tracking-wide",
						children: [
							post.channel,
							" · ",
							getProduct(post.setId).name
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: when })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-medium",
					children: post.hook
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-primary",
					children: post.cta
				}),
				post.status === "khoa" || lowStock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 rounded-md bg-muted px-2 py-1 text-xs",
					children: "Kho set này thấp — khóa đăng để ads không bán âm."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: caption,
					onChange: (e) => setCaption(e.target.value),
					rows: 5,
					className: "mt-3 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						post.status === "cho_duyet" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => approvePost(post.id),
							children: "Duyệt"
						}),
						(post.status === "san_sang" || post.status === "cho_duyet") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => void copyOpen(),
							children: ["Copy & mở ", post.channel === "tiktok" ? "TikTok" : "Facebook"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							disabled: busy,
							onClick: () => void polish(),
							children: "AI viết lại"
						}),
						post.status !== "da_dang" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => markPosted(post.id),
							children: "Đã đăng"
						}),
						post.status === "da_dang" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "self-center text-xs text-muted-foreground",
							children: "Đã lên sóng (do bạn dán tay)"
						})
					]
				})
			]
		})]
	});
}
var MEDIA_SLOTS = [
	{
		path: "/videos/hero.mp4",
		kind: "video",
		group: "Hero",
		label: "Clip hero (8–15s)",
		shoot: "Phòng khách kem, treo xong, camera chậm. Ngang hoặc dọc đều được — trang sẽ cắt giữa.",
		priority: true
	},
	{
		path: "/images/hero.jpg",
		kind: "image",
		group: "Hero",
		label: "Ảnh bìa (khi clip chưa chạy)",
		shoot: "Cùng góc clip, ban ngày. Ngang, tường + sofa vào khung.",
		priority: true
	},
	{
		path: "/images/set-cua.jpg",
		kind: "image",
		group: "3 set",
		label: "Set Cửa — ảnh",
		shoot: "Cửa thật đã treo liễn + đèn. Đứng cách 1.5m.",
		priority: true
	},
	{
		path: "/videos/set-cua.mp4",
		kind: "video",
		group: "3 set",
		label: "Set Cửa — clip",
		shoot: "6–10s, kéo từ tay nắm lên liễn.",
		priority: true
	},
	{
		path: "/images/set-khach.jpg",
		kind: "image",
		group: "3 set",
		label: "Set Phòng khách — ảnh",
		shoot: "Tường 2–3m, mai + đèn. Ban ngày, không flash.",
		priority: true
	},
	{
		path: "/videos/set-khach.mp4",
		kind: "video",
		group: "3 set",
		label: "Set Phòng khách — clip",
		shoot: "8–12s, từ phòng trống… không, chỉ góc đã treo. Khách ads nhìn cái này.",
		priority: true
	},
	{
		path: "/images/set-nha.jpg",
		kind: "image",
		group: "3 set",
		label: "Set Cả nhà — ảnh",
		shoot: "Cửa + một góc khách cùng theme. Một khung hình.",
		priority: true
	},
	{
		path: "/images/space-apt.jpg",
		kind: "image",
		group: "Theo nhà",
		label: "Chung cư",
		shoot: "Phòng khách căn hộ, đã treo set 699."
	},
	{
		path: "/images/space-house.jpg",
		kind: "image",
		group: "Theo nhà",
		label: "Nhà phố / cửa",
		shoot: "Cửa sắt hoặc cửa gỗ + set cửa."
	},
	{
		path: "/images/space-shop.jpg",
		kind: "image",
		group: "Theo nhà",
		label: "Shop nhỏ",
		shoot: "Lối vào quán / shop, set cửa."
	},
	{
		path: "/images/material-linen.jpg",
		kind: "image",
		group: "Cận chất liệu",
		label: "Vải liễn",
		shoot: "Cận tay cầm vải, ban ngày. Thấy sợi, không thấy chữ in."
	},
	{
		path: "/images/material-lantern.jpg",
		kind: "image",
		group: "Cận chất liệu",
		label: "Đèn",
		shoot: "Cận đèn đang bật, nền tối vừa."
	},
	{
		path: "/images/material-mai.jpg",
		kind: "image",
		group: "Cận chất liệu",
		label: "Mai dáng gọn",
		shoot: "Cận cành + chậu, cửa sổ trời. Để khách soi «mai giả»."
	},
	{
		path: "/images/material-wood.jpg",
		kind: "image",
		group: "Cận chất liệu",
		label: "Đế / móc / dây",
		shoot: "Đổ phụ kiện ra khay gỗ. Thấy móc dán."
	},
	{
		path: "/images/before-room.jpg",
		kind: "image",
		group: "Trước / sau",
		label: "Trước — phòng trống",
		shoot: "Cùng một góc, chưa treo. Giữ chân máy.",
		priority: true
	},
	{
		path: "/images/after-room.jpg",
		kind: "image",
		group: "Trước / sau",
		label: "Sau — đã treo",
		shoot: "Đúng góc ảnh trước. Khác mỗi set trên tường.",
		priority: true
	},
	{
		path: "/images/step-unbox.jpg",
		kind: "image",
		group: "3 bước treo",
		label: "Mở hộp",
		shoot: "Hộp thật, nắp mở, đồ còn trong khay."
	},
	{
		path: "/images/step-hang.jpg",
		kind: "image",
		group: "3 bước treo",
		label: "Treo",
		shoot: "Tay đang móc/dán. Thấy tường nhà ở, không studio."
	},
	{
		path: "/images/step-lights.jpg",
		kind: "image",
		group: "3 bước treo",
		label: "Bật đèn",
		shoot: "Đèn dây đã bật, tối vừa."
	},
	{
		path: "/images/ugc-studio.jpg",
		kind: "image",
		group: "Ảnh khách / showroom",
		label: "Góc 4 (UGC)",
		shoot: "Khi có khách thật: xin 1 ảnh tường. Thay góc demo."
	}
];
var MEDIA_GROUPS = [...new Set(MEDIA_SLOTS.map((s) => s.group))];
function MediaTab() {
	const urls = useMedia((s) => s.urls);
	const replaced = MEDIA_SLOTS.filter((s) => urls[s.path]).length;
	const need = MEDIA_SLOTS.filter((s) => s.priority).length;
	const havePri = MEDIA_SLOTS.filter((s) => s.priority && urls[s.path]).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl",
			children: "Đổi ảnh & clip demo"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm text-muted-foreground",
			children: "Bấm ô, chọn file từ điện thoại hoặc máy. Trang bán đổi ngay. Ảnh tự nén. Clip MP4 tối đa 40MB."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl rounded-md bg-muted px-3 py-2 text-sm",
			children: "File nằm trên trình duyệt này. Khách vào trang published vẫn thấy demo cho đến khi bạn gửi file trong chat Grok (ghi rõ ô: hero / set cửa / set khách…) để mình gắn vào bản phát hành — hoặc bạn mở trang bán trên cùng máy vừa tải lên."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-sm",
			children: [
				"Ưu tiên: ",
				havePri,
				"/",
				need,
				" ô quan trọng · Tổng ",
				replaced,
				"/",
				MEDIA_SLOTS.length
			]
		}),
		MEDIA_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-medium",
				children: g
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: MEDIA_SLOTS.filter((s) => s.group === g).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotCard, { slot: s }, s.path + s.label))
			})]
		}, g))
	] });
}
function SlotCard({ slot }) {
	const input = (0, import_react.useRef)(null);
	const url = useMediaUrl(slot.path);
	const custom = useMedia((s) => Boolean(s.urls[slot.path]));
	const put = useMedia((s) => s.put);
	const clear = useMedia((s) => s.clear);
	const toggleTask = useOps((s) => s.toggleTask);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onFile(file) {
		if (!file) return;
		const okImg = slot.kind === "image" && file.type.startsWith("image/");
		const okVid = slot.kind === "video" && file.type.startsWith("video/");
		if (!okImg && !okVid) {
			toast.error(slot.kind === "video" ? "Chọn file MP4/WebM." : "Chọn file ảnh.");
			return;
		}
		setBusy(true);
		try {
			await put(slot.path, file);
			toast.success("Đã gắn «" + slot.label + "». Xem Trang bán.");
			const pri = MEDIA_SLOTS.filter((s) => s.priority);
			const urls = useMedia.getState().urls;
			if (pri.every((s) => urls[s.path])) {
				const clip = useOps.getState().tasks.find((t) => t.id === "clip");
				if (clip && !clip.done) toggleTask("clip");
			}
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Không nhận file.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "overflow-hidden rounded-xl border border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "relative block aspect-4/3 w-full bg-muted",
			onClick: () => input.current?.click(),
			children: [slot.kind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src: url,
				className: "size-full object-cover",
				muted: true,
				playsInline: true,
				preload: "metadata"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: url,
				alt: "",
				className: "size-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs", custom ? "bg-primary text-primary-foreground" : "bg-foreground/70 text-surface"),
				children: custom ? "Hàng thật" : "Demo"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: slot.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: slot.shoot
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: input,
					type: "file",
					accept: slot.kind === "video" ? "video/mp4,video/webm,video/quicktime" : "image/*",
					className: "sr-only",
					onChange: (e) => void onFile(e.target.files?.[0])
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						disabled: busy,
						onClick: () => input.current?.click(),
						children: busy ? "Đang nén…" : "Chọn file"
					}), custom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => void clear(slot.path),
						children: "Về demo"
					})]
				})
			]
		})]
	});
}
function PinGate({ children }) {
	const pinHash = useOps((s) => s.settings.pinHash);
	const [ok, setOk] = (0, import_react.useState)(false);
	const [pin, setPin] = (0, import_react.useState)("");
	const [fails, setFails] = (0, import_react.useState)(0);
	const [lockUntil, setLockUntil] = (0, import_react.useState)(0);
	const [now, setNow] = (0, import_react.useState)(Date.now());
	(0, import_react.useEffect)(() => {
		if (sessionStorage.getItem("nct-ops-ok") === "1") setOk(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (lockUntil <= Date.now()) return;
		const t = setInterval(() => setNow(Date.now()), 250);
		return () => clearInterval(t);
	}, [lockUntil]);
	const locked = lockUntil > now;
	async function submit(e) {
		e.preventDefault();
		if (locked) return;
		if (!isFourDigits(pin)) {
			toast.error("PIN đủ 4 số.");
			return;
		}
		if (await hashPin(pin) !== (pinHash || "5ec0a40bae89321d5d6e6b0b529d17f3d1ffea9dccac8f87abf7469284464602")) {
			const n = fails + 1;
			setFails(n);
			setPin("");
			if (n >= 5) {
				setLockUntil(Date.now() + 2e4);
				setFails(0);
				toast.error("Sai 5 lần. Chờ 20 giây.");
				return;
			}
			toast.error("Sai PIN.");
			return;
		}
		sessionStorage.setItem(OPS_SESSION_KEY, "1");
		setOk(true);
		setPin("");
		setFails(0);
	}
	if (ok) return children;
	const wait = Math.max(0, Math.ceil((lockUntil - now) / 1e3));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => void submit(e),
			className: "w-full max-w-sm rounded-2xl border border-border bg-surface p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: "Vận hành shop"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Nhập PIN 4 số. Trang bán không cần mã này."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					autoFocus: true,
					inputMode: "numeric",
					autoComplete: "one-time-code",
					maxLength: 4,
					value: pin,
					onChange: (e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4)),
					className: "mt-6 h-14 w-full rounded-md border border-border bg-background text-center font-display text-3xl tracking-[0.4em] outline-none focus-visible:ring-2 focus-visible:ring-ring",
					"aria-label": "PIN 4 số"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "mt-4 w-full",
					disabled: locked || pin.length !== 4,
					children: locked ? `Chờ ${wait}s` : "Vào"
				})
			]
		})
	});
}
function lockOps() {
	sessionStorage.removeItem(OPS_SESSION_KEY);
}
var TABS = [
	{
		id: "ban",
		label: "Việc của bạn",
		icon: ClipboardList
	},
	{
		id: "inbox",
		label: "Inbox",
		icon: Inbox
	},
	{
		id: "don",
		label: "Đơn",
		icon: Package
	},
	{
		id: "bai",
		label: "Bài TikTok/FB",
		icon: Megaphone
	},
	{
		id: "hinh",
		label: "Hình & clip",
		icon: Image
	}
];
function OpsApp() {
	const seedIfEmpty = useOps((s) => s.seedIfEmpty);
	const tasks = useOps((s) => s.tasks);
	const threads = useOps((s) => s.threads);
	const posts = useOps((s) => s.posts);
	const orders = useOps((s) => s.orders);
	const [tab, setTab] = (0, import_react.useState)("ban");
	(0, import_react.useEffect)(() => {
		seedIfEmpty();
	}, [seedIfEmpty]);
	const openTasks = tasks.filter((t) => !t.done).length;
	const waiting = threads.filter((t) => t.status === "cho_duyet" || t.unread).length;
	const pendingPosts = posts.filter((p) => p.status === "cho_duyet" || p.status === "san_sang").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-border bg-surface",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl leading-none",
							children: "Nhà Có Tết"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 hidden text-xs text-muted-foreground sm:block",
							children: "Bàn vận hành · bot tư vấn · chốt cổng 5 điều · lịch bài"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "text-sm text-muted-foreground hover:text-foreground",
								children: "Trang bán"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-sm text-muted-foreground hover:text-foreground",
								onClick: () => {
									lockOps();
									window.location.assign("/van-hanh");
								},
								children: "Khóa"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-6xl grid-cols-2 gap-2 px-4 pb-3 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Việc bạn chưa xong",
								value: openTasks,
								warn: openTasks > 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Inbox cần nhìn",
								value: waiting,
								warn: waiting > 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Đơn",
								value: orders.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Bài chờ đăng",
								value: pendingPosts
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mx-auto hidden max-w-6xl gap-1 overflow-x-auto px-4 pb-2 md:flex",
						children: TABS.map((t) => {
							const Icon = t.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setTab(t.id),
								className: cn("flex h-11 shrink-0 items-center gap-2 rounded-md px-3 text-sm", tab === t.id ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), t.label]
							}, t.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-4 py-6 pb-24 md:pb-6",
				children: [
					tab === "ban" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YouTab, {
						onGoInbox: () => setTab("inbox"),
						onGoPosts: () => setTab("bai"),
						onGoMedia: () => setTab("hinh")
					}),
					tab === "inbox" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InboxTab, {}),
					tab === "don" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersTab, {}),
					tab === "bai" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostsTab, {}),
					tab === "hinh" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaTab, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mx-auto hidden max-w-6xl items-center gap-2 px-4 pb-8 text-xs text-muted-foreground md:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-3.5" }), "Bot được nói 24/7. Bot chỉ tự tạo đơn khi đủ 5 cổng. Đăng bài: bạn duyệt, app không tự lên TikTok/Facebook."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-surface md:hidden",
				style: { paddingBottom: "env(safe-area-inset-bottom)" },
				children: TABS.map((t) => {
					const Icon = t.icon;
					const short = {
						ban: "Việc",
						inbox: "Inbox",
						don: "Đơn",
						bai: "Bài",
						hinh: "Hình"
					}[t.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTab(t.id),
						className: cn("flex h-14 flex-col items-center justify-center gap-0.5 text-[11px]", tab === t.id ? "text-primary" : "text-muted-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), short]
					}, t.id);
				})
			})
		]
	});
}
function Stat({ label, value, warn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-lg border border-border bg-background px-3 py-2", warn && "border-primary/40"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl",
			children: value
		})]
	});
}
function OpsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpsApp, {}) });
}
//#endregion
export { OpsPage as component };
