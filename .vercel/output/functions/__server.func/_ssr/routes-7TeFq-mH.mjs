import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as useSeason } from "./seasons-t_J3k4e-.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { _ as Check, a as ShoppingBag, c as Plus, d as MessageCircle, o as Send, r as Trash2, s as Search, t as X, u as Minus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useMediaUrl } from "./router-B0Jatq2T.mjs";
import { _ as resolveSku, b as spotlight, g as minPrice, h as getProduct, i as ZALO_PRESET, m as formatVnd, n as CATEGORIES, p as filterCatalog, s as cn, t as CATALOG, y as seasonBanner } from "./brain-B76nEHmp.mjs";
import { a as consultShop, c as useOps, i as SHOP, l as zaloHref, n as Input, r as Label, t as Button } from "./shop-ai-BKYKjlq5.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-7TeFq-mH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Drawer$1 = Drawer.Root;
Drawer.Trigger;
Drawer.Close;
var DrawerPortal = Drawer.Portal;
function DrawerOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, {
		className: cn("fixed inset-0 z-50 bg-foreground/40", className),
		...props
	});
}
function DrawerContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
		className: cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[92vh] flex-col rounded-t-2xl bg-surface text-foreground outline-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1 w-12 rounded-full bg-border" }), children]
	})] });
}
function DrawerHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid gap-1 p-5 pb-2", className),
		...props
	});
}
function DrawerTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
		className: cn("font-display text-xl font-medium", className),
		...props
	});
}
function DrawerDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Description, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function ShopImg({ src, ...props }) {
	const url = useMediaUrl(src);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: url,
		...props
	});
}
var useShop = create()(persist((set, get) => ({
	cart: [],
	orders: [],
	checkoutOpen: false,
	videoId: null,
	add: (id) => set((s) => {
		if (s.cart.find((l) => l.id === id)) return { cart: s.cart.map((l) => l.id === id ? {
			...l,
			qty: l.qty + 1
		} : l) };
		return { cart: [...s.cart, {
			id,
			qty: 1
		}] };
	}),
	setQty: (id, qty) => set((s) => ({ cart: qty <= 0 ? s.cart.filter((l) => l.id !== id) : s.cart.map((l) => l.id === id ? {
		...l,
		qty
	} : l) })),
	remove: (id) => set((s) => ({ cart: s.cart.filter((l) => l.id !== id) })),
	clearCart: () => set({ cart: [] }),
	openCheckout: (id) => {
		if (id) {
			if (!get().cart.some((l) => l.id === id)) get().add(id);
		}
		set({ checkoutOpen: true });
	},
	closeCheckout: () => set({ checkoutOpen: false }),
	openVideo: (src) => set({ videoId: src }),
	closeVideo: () => set({ videoId: null }),
	placeOrder: (input) => {
		const items = get().cart;
		const total = items.reduce((sum, l) => sum + getProduct(l.id).price * l.qty, 0);
		const order = {
			id: "PW-" + Date.now().toString(36).toUpperCase(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			payment: "cod",
			items,
			total,
			...input
		};
		set((s) => ({
			orders: [order, ...s.orders],
			cart: []
		}));
		import("./shop-ai-BKYKjlq5.mjs").then((n) => n.s).then((n) => n.o).then(({ useOps }) => {
			const ops = useOps.getState();
			for (const line of items) ops.consumeStock(line.id, line.qty);
			const first = items[0];
			if (first) ops.addLandingOrder({
				id: order.id,
				createdAt: order.createdAt,
				name: order.name,
				phone: order.phone,
				address: order.address,
				note: order.note,
				setId: first.id,
				qty: first.qty,
				total: order.total,
				source: "landing"
			});
		});
		return order;
	}
}), {
	name: "nha-co-tet-shop",
	partialize: (s) => ({
		cart: s.cart,
		orders: s.orders
	})
}));
function cartCount(cart) {
	return cart.reduce((n, l) => n + l.qty, 0);
}
function cartTotal(cart) {
	return cart.reduce((n, l) => n + getProduct(l.id).price * l.qty, 0);
}
function CheckoutDrawer() {
	const { cart, checkoutOpen, closeCheckout, setQty, remove, placeOrder } = useShop();
	const [done, setDone] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const total = cartTotal(cart);
	function submit(e) {
		e.preventDefault();
		if (!cart.length) {
			toast.error("Giỏ đang trống.");
			return;
		}
		if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 9 || address.trim().length < 8) {
			toast.error("Điền họ tên, SĐT và địa chỉ giao hàng.");
			return;
		}
		const order = placeOrder({
			name: name.trim(),
			phone: phone.trim(),
			address: address.trim(),
			note: note.trim()
		});
		setDone(order.id);
		toast.success("Đã nhận đơn COD. Mình báo ngày giao ngay.");
	}
	function zaloOrder() {
		const first = cart[0]?.id;
		const text = encodeURIComponent(ZALO_PRESET(first) + (name ? `\nTên: ${name}` : "") + (phone ? `\nSĐT: ${phone}` : "") + (address ? `\nGiao: ${address}` : ""));
		const phoneZalo = useOps.getState().settings.zaloPhone || SHOP.phoneTel;
		window.open(`${zaloHref(phoneZalo)}?text=${text}`, "_blank", "noopener");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
		open: checkoutOpen,
		onOpenChange: (open) => {
			if (!open) {
				closeCheckout();
				setDone(null);
			}
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: done ? "Đơn đã ghi nhận" : "Đặt COD" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerDescription, { children: done ? "Mình liên hệ xác nhận trong ngày. Thanh toán khi nhận hàng." : "Giao toàn quốc. Không cần chuyển khoản trước." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-y-auto px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]",
			children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-4 py-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: done
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-sm text-muted-foreground",
						children: "Giữ mã này. Mình xác nhận đơn và báo ngày giao."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						onClick: () => {
							closeCheckout();
							setDone(null);
						},
						children: "Tiếp tục xem hàng"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "flex flex-col gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border rounded-xl border border-border bg-background",
						children: cart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "px-4 py-6 text-sm text-muted-foreground",
							children: "Giỏ trống. Chọn món ở trang rồi thêm vào giỏ."
						}) : cart.map((line) => {
							const p = getProduct(line.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopImg, {
										src: p.image,
										alt: "",
										className: "size-14 rounded-md object-cover object-top"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-medium",
											children: p.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm tabular-nums text-muted-foreground",
											children: formatVnd(p.price)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												size: "icon",
												variant: "ghost",
												className: "size-8",
												onClick: () => setQty(line.id, line.qty - 1),
												"aria-label": "Giảm",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-5 text-center text-sm tabular-nums",
												children: line.qty
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												size: "icon",
												variant: "ghost",
												className: "size-8",
												onClick: () => setQty(line.id, line.qty + 1),
												"aria-label": "Tăng",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												size: "icon",
												variant: "ghost",
												className: "size-8",
												onClick: () => remove(line.id),
												"aria-label": "Xóa",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
											})
										]
									})
								]
							}, line.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "name",
									children: "Họ tên"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "name",
									value: name,
									onChange: (e) => setName(e.target.value),
									autoComplete: "name"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "phone",
									children: "Số điện thoại"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "phone",
									inputMode: "tel",
									value: phone,
									onChange: (e) => setPhone(e.target.value),
									autoComplete: "tel"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "address",
									children: "Địa chỉ nhận (ghi tỉnh/thành)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "address",
									value: address,
									onChange: (e) => setAddress(e.target.value),
									autoComplete: "street-address"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "note",
									children: "Ghi chú (mẫu chữ, số lượng)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "note",
									value: note,
									onChange: (e) => setNote(e.target.value),
									placeholder: "Ví dụ: tag 10cm, chữ Phúc, lấy 30 cái"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky bottom-0 -mx-5 border-t border-border bg-surface px-5 pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: "Tạm tính · COD"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl tabular-nums",
								children: formatVnd(total)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "lg",
								className: "w-full",
								disabled: !cart.length,
								children: "Đặt hàng COD"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "lg",
								variant: "secondary",
								className: "w-full",
								onClick: zaloOrder,
								children: "Nhắn Zalo đơn này"
							})]
						})]
					})
				]
			})
		})] })
	});
}
var CHIPS = [
	"Tag Tết giá bao nhiêu?",
	"Dây chữ treo cửa",
	"Đèn Halloween",
	"Lịch treo tường",
	"Giỏ hoa"
];
function ShopChat({ lift, onOpenChange }) {
	const season = useSeason();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [lines, setLines] = (0, import_react.useState)([{
		id: "w",
		from: "bot",
		text: "Petitewoodart. Giá trên trang là giá bán lẻ catalogue. Bạn đang tìm tag, dây chữ, lịch hay đồ lễ?"
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [setId, setSetId] = (0, import_react.useState)();
	const [phone, setPhone] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [canClose, setCanClose] = (0, import_react.useState)(false);
	const [turns, setTurns] = (0, import_react.useState)(0);
	const [codOpen, setCodOpen] = (0, import_react.useState)(false);
	const [doneId, setDoneId] = (0, import_react.useState)(null);
	const bottom = (0, import_react.useRef)(null);
	const stock = useOps((s) => s.stock);
	function setOpenSafe(next) {
		setOpen(next);
		onOpenChange?.(next);
	}
	(0, import_react.useEffect)(() => {
		bottom.current?.scrollIntoView({ behavior: "smooth" });
	}, [
		lines,
		busy,
		open
	]);
	async function send(text) {
		const msg = text.trim();
		if (!msg || busy) return;
		if (turns >= 12) {
			setLines((s) => [...s, {
				id: crypto.randomUUID(),
				from: "bot",
				text: "Mình chuyển Zalo cho nhanh — gửi 1 ảnh tường, mình chỉ đúng 1 set."
			}]);
			return;
		}
		setInput("");
		setLines((s) => [...s, {
			id: crypto.randomUUID(),
			from: "khach",
			text: msg
		}]);
		setBusy(true);
		const history = [...lines.filter((l) => l.id !== "w").map((l) => ({
			role: l.from === "khach" ? "user" : "assistant",
			content: l.text
		})), {
			role: "user",
			content: msg
		}];
		try {
			const res = await consultShop({ data: {
				messages: history,
				stock,
				seasonId: season.id
			} });
			setTurns((n) => n + 1);
			setLines((s) => [...s, {
				id: crypto.randomUUID(),
				from: "bot",
				text: res.reply
			}]);
			if (res.suggestedSet) setSetId(res.suggestedSet);
			if (res.phone) setPhone(res.phone);
			if (res.address) setAddress(res.address);
			if (res.name) setName(res.name);
			if (res.verdict.canClose) setCodOpen(true);
			setCanClose(res.verdict.canClose || Boolean(res.suggestedSet));
		} catch {
			toast.error("Lỗi mạng. Thử lại hoặc Zalo.");
		} finally {
			setBusy(false);
		}
	}
	function openZalo() {
		const t = encodeURIComponent(ZALO_PRESET(setId) + ` (${season.name})`);
		const p = useOps.getState().settings.zaloPhone || SHOP.phoneTel;
		window.open(`${zaloHref(p)}?text=${t}`, "_blank", "noopener");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setOpenSafe(true),
		"aria-label": "Hỏi giá",
		className: cn("fixed right-3 z-50 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg md:right-4 md:bottom-6 md:h-12 md:w-auto md:gap-2 md:px-4", lift ? "bottom-[calc(4.75rem+env(safe-area-inset-bottom))]" : "bottom-[max(0.75rem,env(safe-area-inset-bottom))]"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-5 md:size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden text-sm md:inline",
			children: "Hỏi giá"
		})]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-x-0 bottom-0 z-50 flex h-[min(100dvh,36rem)] max-h-[100dvh] flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-xl sm:inset-x-auto sm:right-4 sm:bottom-4 sm:h-auto sm:max-h-[min(36rem,85dvh)] sm:w-[24rem] sm:rounded-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-lg leading-none",
					children: ["Hỏi shop · ", season.name]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "Giá đúng như trên trang. Hỏi tên món là được."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex size-11 items-center justify-center rounded-md hover:bg-muted",
					onClick: () => setOpenSafe(false),
					"aria-label": "Đóng",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-3",
				children: [
					lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("max-w-[90%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap", l.from === "khach" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"),
						children: l.text
					}, l.id)),
					busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-fit rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground",
						children: "Đang xem giá…"
					}),
					lines.length === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5 pt-1",
						children: CHIPS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-9 rounded-full border border-border bg-background px-3 text-xs",
							onClick: () => void send(c),
							children: c
						}, c))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: bottom })
				]
			}),
			doneId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "border-t border-border px-3 py-3 text-sm",
				children: [
					"Đơn ",
					doneId,
					". Ảnh phòng thì",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "underline",
						onClick: openZalo,
						children: "gửi Zalo"
					}),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 border-t border-border p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "h-11 flex-1 rounded-md border border-border bg-background px-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring",
					placeholder: "Nhắn tên món hoặc hỏi giá…",
					value: input,
					onChange: (e) => setInput(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") send(input);
					},
					disabled: busy
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon",
					disabled: busy || !input.trim(),
					onClick: () => void send(input),
					"aria-label": "Gửi",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {})
				})]
			})
		]
	})] });
}
function ProductRail({ spots, onOpen }) {
	const [reduce, setReduce] = (0, import_react.useState)(false);
	const [paused, setPaused] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => setReduce(mq.matches);
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);
	const loop = reduce ? spots : [...spots, ...spots];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("marquee pb-5", reduce && "overflow-x-auto"),
		onPointerDown: () => setPaused(true),
		onPointerUp: () => setPaused(false),
		onPointerCancel: () => setPaused(false),
		onPointerLeave: () => setPaused(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: cn("flex w-max", !reduce && "animate-marquee", paused && "marquee-paused"),
			children: loop.map((spot, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "w-44 shrink-0 pr-3 sm:w-72",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onOpen(spot.item),
					className: "w-full text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative block overflow-hidden rounded-xl border border-border bg-surface",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopImg, {
								src: spot.item.image,
								alt: "",
								className: "aspect-square w-full object-cover object-top"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute top-2 left-2 inline-flex min-h-6 items-center rounded-full bg-primary px-2 text-xs text-primary-foreground",
								children: spot.reason
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 block line-clamp-2 min-h-10 text-sm leading-snug",
							children: spot.item.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium tabular-nums",
							children: formatVnd(minPrice(spot.item))
						})
					]
				})
			}, `${spot.item.id}-${index}`))
		})
	});
}
var CLIPS = [
	{
		id: "tomau-hw-20",
		src: "/videos/to-mau.mp4",
		poster: "/videos/to-mau.jpg",
		line: "Ngồi tô từng nét."
	},
	{
		id: "den-hw",
		src: "/videos/thap-den.mp4",
		poster: "/videos/thap-den.jpg",
		line: "Tô xong, treo lên cửa."
	},
	{
		id: "shadow-hw",
		src: "/videos/bong-tuong.mp4",
		poster: "/videos/bong-tuong.jpg",
		line: "Giơ ra nắng, bóng lên tường."
	}
];
function MomentCards({ seasonId, onOpen }) {
	const moments = CLIPS.flatMap((clip) => {
		const item = CATALOG.find((entry) => entry.id === clip.id);
		if (!item || !item.seasons.includes(seasonId)) return [];
		return [{
			...clip,
			item
		}];
	});
	if (moments.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-border py-4 sm:py-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-wide text-primary uppercase",
						children: "Nhìn một buổi"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl leading-tight",
						children: "Bé tô, rồi chơi."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: ["Cảnh minh họa.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sm:hidden",
							children: " Vuốt ngang để xem tiếp."
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "moment-row mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible",
				children: moments.map((moment) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "w-[84vw] shrink-0 snap-center sm:w-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clip, {
						moment,
						onOpen
					})
				}, moment.id))
			})]
		})
	});
}
function Clip({ moment, onOpen }) {
	const video = (0, import_react.useRef)(null);
	const [reduce, setReduce] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => setReduce(mq.matches);
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);
	(0, import_react.useEffect)(() => {
		const el = video.current;
		if (!el || reduce) return;
		const seen = new IntersectionObserver(([entry]) => {
			if (entry?.isIntersecting) el.play().catch(() => {});
			else el.pause();
		}, { threshold: .5 });
		seen.observe(el);
		return () => seen.disconnect();
	}, [reduce]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => onOpen(moment.item),
		"aria-label": `${moment.line} ${moment.item.name}`,
		className: "w-full text-left",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative block overflow-hidden rounded-2xl bg-muted",
			children: [reduce ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: moment.poster,
				alt: "",
				className: "aspect-[4/5] w-full object-cover object-[center_30%]"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: video,
				src: moment.src,
				poster: moment.poster,
				muted: true,
				playsInline: true,
				loop: true,
				preload: "metadata",
				className: "aspect-[4/5] w-full object-cover object-[center_30%]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-3 pt-12 pb-3 text-white",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-display text-xl leading-tight",
						children: moment.line
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-sm leading-snug",
						children: moment.item.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block text-sm font-medium tabular-nums",
						children: formatVnd(minPrice(moment.item))
					})
				]
			})]
		})
	});
}
var PLACEHOLDER_PHONE = "0901234567";
function dayMonth(d) {
	return new Intl.DateTimeFormat("en-GB", {
		timeZone: "Asia/Ho_Chi_Minh",
		day: "2-digit",
		month: "2-digit"
	}).format(d);
}
function LandingPage() {
	const season = useSeason();
	const shop = useShop();
	const count = cartCount(shop.cart);
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)("all");
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const [sizeId, setSizeId] = (0, import_react.useState)(null);
	const [chatOpen, setChatOpen] = (0, import_react.useState)(false);
	const phone = useOps((s) => s.settings.zaloPhone);
	const tel = !phone || phone === PLACEHOLDER_PHONE ? SHOP.phoneTel : phone;
	const items = (0, import_react.useMemo)(() => filterCatalog(q, cat, season.id), [
		q,
		cat,
		season.id
	]);
	const spots = (0, import_react.useMemo)(() => spotlight(season.id), [season.id]);
	const rail = (0, import_react.useMemo)(() => {
		const heroId = seasonBanner(season.id).hero;
		return [...spots].sort((a, b) => {
			if (a.item.id === heroId) return -1;
			if (b.item.id === heroId) return 1;
			return minPrice(a.item) - minPrice(b.item);
		});
	}, [spots, season.id]);
	const banner = seasonBanner(season.id);
	const fromPrice = spots.length ? Math.min(...spots.map((s) => minPrice(s.item))) : 0;
	const showSpot = !q.trim() && (cat === "all" || cat === "mua") && spots.length > 0;
	const open = items.find((i) => i.id === openId) ?? spots.find((s) => s.item.id === openId)?.item ?? null;
	function show(item) {
		setOpenId(item.id);
		setSizeId(item.sizes?.[0]?.id ?? null);
	}
	function addPlain(item) {
		if (item.sizes?.length) {
			show(item);
			return;
		}
		shop.add(item.id);
		toast.success(`Đã thêm ${item.name}`);
	}
	function zalo(id) {
		const text = encodeURIComponent(ZALO_PRESET(id));
		window.open(`${zaloHref(tel)}?text=${text}`, "_blank", "noopener");
	}
	const chips = [
		{
			id: "all",
			label: "Tất cả"
		},
		{
			id: "mua",
			label: "Đang mùa"
		},
		...CATEGORIES
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-season": season.id,
		className: "min-h-screen bg-background pb-[calc(4.5rem+env(safe-area-inset-bottom))] text-foreground md:pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex h-14 max-w-6xl items-center gap-3 px-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#hang",
								className: "font-display text-lg leading-none tracking-tight",
								children: SHOP.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hidden text-sm text-muted-foreground sm:block",
								children: "Đồ gỗ cắt laser"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ml-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: () => shop.openCheckout(),
									className: "relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {}),
										"Giỏ",
										count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-surface text-xs font-medium text-primary",
											children: count
										})
									]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-6xl px-4 pb-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex h-11 items-center gap-2 rounded-lg border border-border bg-surface px-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: q,
								onChange: (e) => {
									setQ(e.target.value);
									if (e.target.value.trim()) setCat("all");
								},
								placeholder: "Tìm tag, dây chữ, lịch, giỏ hoa…",
								"aria-label": "Tìm món",
								className: "h-full w-full bg-transparent text-base outline-none"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 overflow-x-auto px-4 pb-3",
						children: chips.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setCat(c.id);
								setQ("");
							},
							className: cn("h-10 shrink-0 rounded-full px-3 text-sm", cat === c.id ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"),
							children: c.label
						}, c.id))
					})
				]
			}),
			showSpot && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-b border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 bg-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl px-4 pt-4 pb-4 sm:pt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs tracking-wide text-primary uppercase",
									children: [
										season.name,
										" · ",
										season.mode === "soon" ? "Mở" : "Đến",
										" ",
										dayMonth(season.mode === "soon" ? season.event : season.sellUntil)
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "shrink-0 text-sm underline-offset-4 hover:underline",
									onClick: () => {
										setCat("mua");
										document.getElementById("hang")?.scrollIntoView({ behavior: "smooth" });
									},
									children: "Xem hết"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 max-w-2xl font-display text-3xl leading-tight sm:text-5xl",
								children: banner.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 max-w-md text-sm text-muted-foreground",
								children: [
									banner.line,
									" Từ ",
									formatVnd(fromPrice),
									"."
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductRail, {
						spots: rail,
						onOpen: show
					})
				]
			}),
			showSpot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MomentCards, {
				seasonId: season.id,
				onOpen: show
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "hang",
				className: "mx-auto max-w-6xl px-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [items.length, " món · trả khi nhận hàng"]
					}),
					items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-16 text-center text-sm text-muted-foreground",
						children: "Không có món khớp. Thử từ khác hoặc chọn Tất cả."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4",
						children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => show(item),
								className: "block w-full text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopImg, {
									src: item.image,
									alt: "",
									className: "aspect-square w-full bg-muted object-cover object-top"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: CATEGORIES.find((c) => c.id === item.category)?.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "mt-0.5 line-clamp-2 min-h-10 text-sm leading-snug",
											children: item.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-sm font-medium tabular-nums",
											children: [
												item.sizes ? "Từ " : "",
												formatVnd(minPrice(item)),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-normal text-muted-foreground",
													children: [" / ", item.unit]
												})
											]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-auto px-3 pb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "w-full",
									size: "sm",
									onClick: () => addPlain(item),
									children: item.sizes?.length ? "Chọn size" : "Thêm"
								})
							})]
						}) }, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "mt-12 border-t border-border py-8 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg text-foreground",
								children: SHOP.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 max-w-md",
								children: "Xưởng cắt laser trên gỗ. Giá trên trang là giá bán lẻ. Đại lý lấy từ 20 cái, nhắn Zalo để nhận bảng sỉ."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3",
								children: [
									"Zalo / gọi:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										className: "text-foreground",
										href: `tel:${tel}`,
										children: tel.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: "Facebook Petitewoodart - Home Decor · TikTok Petitewoodart"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "/van-hanh",
									className: "text-foreground underline-offset-4 hover:underline",
									children: "Vận hành shop"
								})
							})
						]
					})
				]
			}),
			count > 0 && !chatOpen && !open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface px-3 py-2.5 md:hidden",
				style: { paddingBottom: "max(0.6rem, env(safe-area-inset-bottom))" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "w-full",
					onClick: () => shop.openCheckout(),
					children: [
						"Giỏ ",
						count,
						" món · ",
						formatVnd(cartTotal(shop.cart))
					]
				})
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 sm:items-center",
				onClick: () => setOpenId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-surface sm:rounded-2xl",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-wide text-muted-foreground uppercase",
								children: CATEGORIES.find((c) => c.id === open.category)?.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setOpenId(null),
								"aria-label": "Đóng",
								className: "flex size-10 items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopImg, {
							src: open.image,
							alt: "",
							className: "mx-auto aspect-square w-full bg-muted object-cover object-top"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl leading-tight",
									children: open.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed",
									children: open.blurb
								}),
								open.sizes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 flex gap-2",
									children: open.sizes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										"data-size": s.id,
										onClick: () => setSizeId(s.id),
										className: cn("min-h-11 flex-1 rounded-lg px-2 py-2 text-sm", sizeId === s.id ? "bg-primary text-primary-foreground" : "bg-muted"),
										children: [
											s.label,
											" · ",
											formatVnd(s.price)
										]
									}, s.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-4 font-display text-3xl tabular-nums",
									children: [formatVnd(resolveSku(open.sizes?.length && sizeId ? `${open.id}--${sizeId}` : open.id)?.price ?? open.price), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-1 font-sans text-base text-muted-foreground",
										children: ["/ ", open.unit]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "Giá bán lẻ. Từ 20 cái có giá sỉ, nhắn Zalo."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "lg",
										onClick: () => {
											const id = open.sizes?.length && sizeId ? `${open.id}--${sizeId}` : open.id;
											shop.add(id);
											toast.success("Đã thêm vào giỏ");
											setOpenId(null);
										},
										children: "Thêm vào giỏ"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "lg",
										variant: "secondary",
										onClick: () => zalo(open.sizes?.length && sizeId ? `${open.id}--${sizeId}` : open.id),
										children: "Nhắn Zalo món này"
									})]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutDrawer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopChat, {
				lift: count > 0,
				onOpenChange: setChatOpen
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPage, {});
}
//#endregion
export { Home as component };
