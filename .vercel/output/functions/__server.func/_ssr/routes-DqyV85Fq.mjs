import { i as __toESM } from "../_runtime.mjs";
import { _ as require_jsx_runtime, a as Trigger2, i as Root2, n as Header$1, r as Item, t as Content2, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { S as Check, _ as House, c as Send, d as Package, f as Minus, i as Trash2, l as Ruler, n as Truck, o as Sparkles, p as MessageCircle, s as ShoppingBag, t as X, u as Plus, x as ChevronDown, y as Clock3 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useMediaUrl } from "./router-DXUwLKlL.mjs";
import { c as cn, h as getProduct, i as PRODUCTS, m as formatVnd, n as DEADLINE_23, o as SHOP, r as DEADLINE_28, s as ZALO_PRESET } from "./brain-GLjzxkm2.mjs";
import { a as consultShop, c as useOps, i as Label, l as zaloHref, n as Button, r as Input, t as Badge } from "./shop-ai-DSkQrtfE.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DqyV85Fq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Root2;
function AccordionItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		className: cn("border-b border-border", className),
		...props
	});
}
function AccordionTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header$1, {
		className: "flex",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
			className: cn("flex flex-1 items-center justify-between gap-4 py-4 text-left text-base font-medium transition-colors hover:text-primary [&[data-state=open]>svg]:rotate-180", className),
			...props,
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 text-muted-foreground transition-transform duration-(--motion-fast)" })]
		})
	});
}
function AccordionContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		className: "overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("pb-4 leading-relaxed", className),
			children
		})
	});
}
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
			id: "NCT-" + Date.now().toString(36).toUpperCase(),
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
		import("./shop-ai-DSkQrtfE.mjs").then((n) => n.s).then((n) => n.s).then(({ useOps }) => {
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
			toast.error("Chưa có set trong giỏ.");
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerTitle, { children: done ? "Đơn đã ghi nhận" : "Đặt COD" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerDescription, { children: done ? "Mình liên hệ xác nhận trong ngày. Thanh toán khi nhận hàng." : "Giao theo mốc Tết. Không cần chuyển khoản trước." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
						children: "Giữ mã này. Tết này nhà bạn đã có lớp decor — mình báo ngày giao ngay."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						onClick: () => {
							closeCheckout();
							setDone(null);
						},
						children: "Tiếp tục xem set"
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
							children: "Giỏ trống. Chọn một set 399k / 699k / 999k."
						}) : cart.map((line) => {
							const p = getProduct(line.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopImg, {
										src: p.image,
										alt: "",
										className: "size-14 rounded-md object-cover"
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
									children: "Ghi chú tường / size (không bắt buộc)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "note",
									value: note,
									onChange: (e) => setNote(e.target.value),
									placeholder: "Ví dụ: tường kem 2.4m, nhà thuê không khoan"
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
								children: "Gửi ảnh phòng qua Zalo"
							})]
						})]
					})
				]
			})
		})] })
	});
}
var SETS = [
	"cua",
	"khach",
	"nha"
];
var WELCOME = "Mình là Nhà Có Tết. Ba set cố định: cửa 399.000đ, phòng khách 699.000đ, cả nhà 999.000đ. COD. Nhà bạn chung cư hay nhà phố?";
var CHIPS = [
	"Chung cư ~70m²",
	"Nhà phố",
	"Giá 3 set",
	"Kịp Tết không?",
	"Nhà thuê, không khoan"
];
function ShopChat({ lift, onOpenChange }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [lines, setLines] = (0, import_react.useState)([{
		id: "w",
		from: "bot",
		text: WELCOME
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
				stock
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
	function submitCod(e) {
		e.preventDefault();
		if (!setId) {
			toast.error("Chọn set 399 / 699 / 999.");
			return;
		}
		if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 9 || address.trim().length < 8) {
			toast.error("Điền họ tên, SĐT, địa chỉ có tỉnh.");
			return;
		}
		const shop = useShop.getState();
		shop.clearCart();
		shop.add(setId);
		const order = shop.placeOrder({
			name: name.trim(),
			phone: phone.trim(),
			address: address.trim(),
			note: "Chốt từ chat trang bán"
		});
		setDoneId(order.id);
		setLines((s) => [...s, {
			id: crypto.randomUUID(),
			from: "bot",
			text: `Đã ghi ${order.id}. ${getProduct(setId).name} ${formatVnd(getProduct(setId).price)}, COD. Mình báo ngày giao. Không chuyển khoản trước.`
		}]);
	}
	function openZalo() {
		const t = encodeURIComponent(ZALO_PRESET(setId) + " (từ chat trang bán)");
		const p = useOps.getState().settings.zaloPhone || SHOP.phoneTel;
		window.open(`${zaloHref(p)}?text=${t}`, "_blank", "noopener");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setOpenSafe(true),
		"aria-label": "Hỏi set nhà bạn",
		className: cn("fixed right-3 z-50 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg md:right-4 md:bottom-6 md:h-12 md:w-auto md:gap-2 md:px-4", lift ? "bottom-[calc(4.75rem+env(safe-area-inset-bottom))]" : "bottom-[max(0.75rem,env(safe-area-inset-bottom))]"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-5 md:size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden text-sm md:inline",
			children: "Hỏi set nhà bạn"
		})]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-x-0 bottom-0 z-50 flex h-[min(100dvh,36rem)] max-h-[100dvh] flex-col overflow-hidden rounded-t-2xl border border-border bg-surface shadow-xl sm:inset-x-auto sm:right-4 sm:bottom-4 sm:h-auto sm:max-h-[min(36rem,85dvh)] sm:w-[24rem] sm:rounded-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg leading-none",
					children: "Hỏi shop"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "AI nói chuyện · giá và mốc giao khóa cứng"
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
						className: cn("max-w-[90%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap", l.from === "khach" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted text-foreground"),
						children: l.text
					}, l.id)),
					busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-fit rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground",
						children: "Đang xem nhà bạn…"
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
			setId && !doneId && !codOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border px-3 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					className: "w-full",
					size: "sm",
					onClick: () => setCodOpen(true),
					children: [
						"Lấy ",
						getProduct(setId).name,
						" ",
						formatVnd(getProduct(setId).price),
						" · COD"
					]
				})
			}),
			setId && !doneId && codOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submitCod,
				className: "border-t border-border px-3 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Gợi ý: ",
							getProduct(setId).name,
							" ",
							formatVnd(getProduct(setId).price)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-3 gap-1",
						children: SETS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSetId(id),
							className: cn("h-9 rounded-md text-xs", setId === id ? "bg-primary text-primary-foreground" : "bg-muted"),
							children: formatVnd(getProduct(id).price).replace("đ", "")
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "c-name",
								className: "sr-only",
								children: "Tên"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "c-name",
								placeholder: "Họ tên",
								value: name,
								onChange: (e) => setName(e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "SĐT",
								inputMode: "numeric",
								value: phone,
								onChange: (e) => setPhone(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Địa chỉ có tỉnh",
								value: address,
								onChange: (e) => setAddress(e.target.value)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "mt-2 w-full",
						size: "sm",
						children: canClose ? "Chốt COD" : "Gửi đặt COD"
					})
				]
			}),
			doneId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "border-t border-border px-3 py-3 text-sm",
				children: [
					"Đơn ",
					doneId,
					". Có ảnh phòng thì",
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
					placeholder: "Nhắn: chung cư / giá / tỉnh…",
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
function AutoVideo({ src, poster, className }) {
	const ref = (0, import_react.useRef)(null);
	const video = useMediaUrl(src);
	const posterUrl = useMediaUrl(poster);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) el.play().catch(() => {});
			else el.pause();
		}, { threshold: .35 });
		io.observe(el);
		return () => io.disconnect();
	}, [video]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		ref,
		className: cn("h-full w-full object-cover", className),
		poster: posterUrl,
		src: video,
		muted: true,
		loop: true,
		playsInline: true,
		preload: "metadata",
		"aria-hidden": true
	}, video);
}
function BeforeAfter({ before, after, beforeLabel = "Trước", afterLabel = "Sau", className }) {
	const [pos, setPos] = (0, import_react.useState)(52);
	const dragging = (0, import_react.useRef)(false);
	const beforeUrl = useMediaUrl(before);
	const afterUrl = useMediaUrl(after);
	function setFromEvent(clientX, target) {
		const r = target.getBoundingClientRect();
		const x = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
		setPos(Math.round(x * 100));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative aspect-4/3 w-full cursor-ew-resize overflow-hidden rounded-xl bg-muted select-none", className),
		onPointerDown: (e) => {
			dragging.current = true;
			e.currentTarget.setPointerCapture(e.pointerId);
			setFromEvent(e.clientX, e.currentTarget);
		},
		onPointerMove: (e) => {
			if (!dragging.current) return;
			setFromEvent(e.clientX, e.currentTarget);
		},
		onPointerUp: () => {
			dragging.current = false;
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: afterUrl,
				alt: "Sau khi treo set",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: beforeUrl,
				alt: "Phòng trước khi treo",
				className: "absolute inset-0 size-full object-cover",
				style: { clipPath: `inset(0 ${100 - pos}% 0 0)` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-y-0 w-0.5 bg-surface",
				style: { left: `${pos}%` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-[10px] font-medium text-foreground",
				style: { left: `${pos}%` },
				children: "kéo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-3 top-3 rounded-full bg-foreground/70 px-2 py-0.5 text-xs text-surface",
				children: beforeLabel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute right-3 top-3 rounded-full bg-foreground/70 px-2 py-0.5 text-xs text-surface",
				children: afterLabel
			})
		]
	});
}
function zalo(id) {
	const t = encodeURIComponent(ZALO_PRESET(id));
	const phone = useOps.getState().settings.zaloPhone || SHOP.phoneTel;
	window.open(`${zaloHref(phone)}?text=${t}`, "_blank", "noopener");
}
function useCountdown(target) {
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setNow(Date.now()), 1e3);
		return () => clearInterval(id);
	}, []);
	const diff = Math.max(0, target.getTime() - now);
	return {
		days: Math.floor(diff / 864e5),
		hours: Math.floor(diff % 864e5 / 36e5),
		mins: Math.floor(diff % 36e5 / 6e4),
		expired: diff === 0
	};
}
function LandingPage() {
	const shop = useShop();
	const count = cartCount(shop.cart);
	const { days } = useCountdown(DEADLINE_23);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [chatOpen, setChatOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 420);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-[calc(4.75rem+env(safe-area-inset-bottom))] text-foreground md:pb-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#sets",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:bg-surface focus:px-3 focus:py-2",
				children: "Tới combo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticker, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
				count,
				onCart: () => shop.openCheckout()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { onBuy: () => shop.openCheckout("khach") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trust, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spaces, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sets, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Materials, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeforeSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Steps, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Proof, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shipping, { days }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Faq, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCta, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 px-3 py-2.5 backdrop-blur-md transition-transform duration-(--motion-fast) md:hidden", scrolled && !chatOpen ? "translate-y-0" : "translate-y-full"),
				style: { paddingBottom: "max(0.6rem, env(safe-area-inset-bottom))" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-lg gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "flex-1",
						onClick: () => shop.openCheckout("khach"),
						children: "Mua set 699k"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "flex-1",
						onClick: () => zalo("khach"),
						children: "Zalo"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutDrawer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopChat, {
				lift: scrolled,
				onOpenChange: setChatOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoModal, {})
		]
	});
}
function Ticker() {
	const items = [
		"Đặt trước 23 tháng Chạp (30/01) để nhà có Tết đúng Tết",
		"COD toàn quốc",
		"Treo khoảng 20 phút",
		"Đổi set nếu sai size trong 48 giờ"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden border-b border-border bg-primary text-primary-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "animate-marquee flex w-max gap-16 py-2 pr-16 text-[11px] tracking-[0.14em] uppercase",
			children: [...items, ...items].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "px-2",
				children: t
			}, i))
		})
	});
}
function Header({ count, onCart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#top",
					className: "font-display text-lg tracking-tight",
					children: "Nhà Có Tết"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-6 text-sm text-muted-foreground md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#spaces",
							className: "hover:text-foreground",
							children: "Theo nhà"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#sets",
							className: "hover:text-foreground",
							children: "Combo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#giao",
							className: "hover:text-foreground",
							children: "Giao Tết"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#faq",
							className: "hover:text-foreground",
							children: "Hỏi đáp"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						className: "hidden sm:inline-flex",
						onClick: () => zalo(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {}), "Zalo"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: onCart,
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {}),
							"Giỏ",
							count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-surface text-[10px] font-medium text-primary",
								children: count
							})
						]
					})]
				})
			]
		})
	});
}
function Hero({ onBuy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "top",
		className: "relative isolate",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex w-full flex-col justify-end bg-foreground md:h-[70vh] md:min-h-[32.5rem] md:max-h-[40rem] md:overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopImg, {
						src: "/images/hero.jpg",
						alt: "",
						className: "absolute inset-0 size-full object-cover object-[center_40%] md:object-[center_65%]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoVideo, {
						src: "/videos/hero.mp4",
						poster: "/images/hero.jpg",
						className: "absolute inset-0 object-[center_40%] md:object-[center_65%]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-foreground/45 md:bg-foreground/40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/35 to-foreground/15" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto w-full max-w-6xl px-4 pt-36 pb-5 text-surface md:pt-24 md:pb-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-[11px] tracking-[0.16em] uppercase text-surface/80 sm:mb-3 sm:text-xs sm:tracking-[0.2em]",
						children: "Tết Đinh Mùi · set hiện đại"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "max-w-xl font-display text-[1.85rem] leading-[1.12] text-balance sm:text-5xl",
						children: "Nhà có Tết sau một buổi treo. Không sến. Không phải đi 4 chợ."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-md text-sm leading-relaxed text-pretty text-surface/90 sm:mt-3 sm:text-base",
						children: "Set Tết hiện đại cho chung cư và nhà phố. Đỏ son, gỗ, kem — nhìn lên ảnh đẹp, cầm lên không giống đồ chợ."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-display text-2xl tabular-nums",
						children: ["Set phòng khách ", formatVnd(699e3)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-surface/80",
						children: [
							"Set cửa ",
							formatVnd(399e3),
							" · Cả nhà ",
							formatVnd(999e3)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "xl",
							className: "w-full bg-surface text-foreground hover:bg-surface/90 sm:w-auto",
							onClick: onBuy,
							children: "Chọn set 699k"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "xl",
							variant: "outline",
							className: "h-auto min-h-14 w-full whitespace-normal border-surface/40 bg-transparent py-3 text-surface hover:bg-surface/10 sm:h-14 sm:w-auto sm:whitespace-nowrap",
							onClick: () => zalo("khach"),
							children: "Gửi ảnh tường qua Zalo"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-surface/75",
						children: "Giao theo mốc Tết · Đổi set nếu sai size · Có clip hướng dẫn treo"
					})
				]
			})]
		})
	});
}
function Trust() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid max-w-6xl gap-px bg-border sm:grid-cols-2 lg:grid-cols-4",
			children: [
				{
					icon: Truck,
					t: "Giao trước mốc Tết",
					d: "Chốt 23 tháng Chạp để trang trí đúng Tết."
				},
				{
					icon: Sparkles,
					t: "Đúng màu như clip",
					d: "Đỏ son, kem, gỗ. Không đỏ bóng hội chợ."
				},
				{
					icon: House,
					t: "Treo không cần thợ",
					d: "Móc / dán có trong hộp. Khoảng 20 phút."
				},
				{
					icon: Package,
					t: "Dùng lại năm sau",
					d: "Gấp được. Không mua lại cả nhà mỗi Tết."
				}
			].map(({ icon: Icon, t, d }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-background px-5 py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mb-3 size-5 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: t
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: d
					})
				]
			}, t))
		})
	});
}
function Spaces() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "spaces",
		className: "mx-auto max-w-6xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.18em] uppercase text-muted-foreground",
				children: "Bước 1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 max-w-lg font-display text-3xl leading-tight text-balance sm:text-4xl",
				children: "Nhà bạn đang trống chỗ nào?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-lg text-sm text-muted-foreground",
				children: "Bấm để xem đúng set — không phải xem 40 món lẻ."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-3",
				children: [
					{
						img: "/images/space-apt.jpg",
						title: "Chung cư / studio",
						body: "Phòng khách nhỏ, sofa sẵn, chỉ thiếu điểm nhấn.",
						hint: "Set 399k hoặc 699k",
						href: "#set-khach"
					},
					{
						img: "/images/space-house.jpg",
						title: "Nhà phố",
						body: "Cửa ra vào + phòng khách — khách tới nhìn thấy ngay.",
						hint: "Set 699k hoặc 999k",
						href: "#set-nha"
					},
					{
						img: "/images/space-shop.jpg",
						title: "Shop / văn phòng",
						body: "Góc chụp khai xuân, không biến mặt bằng thành hội chợ.",
						hint: "Set cửa 399k",
						href: "#set-cua"
					}
				].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: c.href,
					className: "group overflow-hidden rounded-2xl border border-border bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-4/3 overflow-hidden md:aspect-3/4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopImg, {
							src: c.img,
							alt: c.title,
							className: "size-full object-cover transition-transform duration-(--motion-slow) group-hover:scale-[1.03]"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl",
								children: c.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: c.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm font-medium text-primary",
								children: c.hint
							})
						]
					})]
				}, c.title))
			})
		]
	});
}
function Sets() {
	const openCheckout = useShop((s) => s.openCheckout);
	const openVideo = useShop((s) => s.openVideo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "sets",
		className: "border-y border-border bg-muted/50 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] uppercase text-muted-foreground",
					children: "Bước 2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl leading-tight sm:text-4xl",
					children: "Ba set. Một theme."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-sm text-muted-foreground",
					children: "Không chắc tường rộng bao nhiêu? Gửi 1 ảnh phòng qua Zalo — mình chỉ đúng set, không nhồi thêm đồ."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-6 lg:grid-cols-3",
					children: PRODUCTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						id: `set-${p.id}`,
						className: cn("flex flex-col overflow-hidden rounded-2xl border bg-surface", p.featured ? "border-primary shadow-[0_0_0_1px_var(--color-primary)]" : "border-border"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-4/3 overflow-hidden",
							children: [p.video ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoVideo, {
								src: p.video,
								poster: p.image
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopImg, {
								src: p.image,
								alt: p.name,
								className: "size-full object-cover"
							}), p.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "absolute left-3 top-3 border-0 bg-primary text-primary-foreground",
								children: "Hay chọn nhất"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl",
									children: p.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: p.tagline
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-display text-3xl tabular-nums",
									children: formatVnd(p.price)
								}),
								p.compareAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "line-through",
											children: formatVnd(p.compareAt)
										}),
										" · ",
										"tiết kiệm ",
										formatVnd(p.saveVsRetail),
										" so với gom lẻ"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed",
									children: p.blurb
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 flex items-center gap-2 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ruler, { className: "size-3.5" }),
										" ",
										p.wall
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 space-y-1.5 text-sm",
									children: p.includes.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1 shrink-0 rounded-full bg-primary" }), item]
									}, item))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex flex-col gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "lg",
										onClick: () => openCheckout(p.id),
										children: [
											"Mua ",
											p.name,
											" ",
											formatVnd(p.price)
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "secondary",
											onClick: () => zalo(p.id),
											children: "Zalo set này"
										}), p.video ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											onClick: () => openVideo(p.video),
											children: "Xem clip 15s"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "#chatlieu",
												children: "Xem chất liệu"
											})
										})]
									})]
								})
							]
						})]
					}, p.id))
				})
			]
		})
	});
}
function Materials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "chatlieu",
		className: "mx-auto max-w-6xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl leading-tight sm:text-4xl",
				children: "Clip cho thấy không khí. Ảnh này cho thấy đồ thật."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-sm text-muted-foreground",
				children: "699k không phải giá đồ chợ. Nên mình không gửi đồ chợ."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					{
						img: "/images/material-linen.jpg",
						t: "Vải liễn",
						d: "Dày, treo thẳng, không võng chữ."
					},
					{
						img: "/images/material-lantern.jpg",
						t: "Đèn",
						d: "Vàng ấm, không nháy bảy sắc."
					},
					{
						img: "/images/material-mai.jpg",
						t: "Mai dáng gọn",
						d: "Để góc tường, không che TV."
					},
					{
						img: "/images/material-wood.jpg",
						t: "Đế, móc, dây",
						d: "Cầm chắc tay. Có sẵn trong hộp."
					}
				].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "overflow-hidden rounded-xl border border-border bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopImg, {
						src: x.img,
						alt: x.t,
						className: "aspect-4/3 w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
						className: "p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: x.t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: x.d
						})]
					})]
				}, x.t))
			})
		]
	});
}
function BeforeSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-border bg-muted/40 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl leading-tight sm:text-4xl",
					children: "Cùng một phòng. Chỉ thiếu lớp Tết."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-muted-foreground",
					children: "Tường kem, sofa xám — thiếu đúng một set 699k. Không cần cải tạo. Kéo để xem trước / sau."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-6 space-y-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Cửa nhà phố — khoảng 8 phút với Set Cửa." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Góc 1.5m: đủ chụp ảnh, không vướng lối đi." })]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeforeAfter, {
				before: "/images/before-room.jpg",
				after: "/images/after-room.jpg"
			})]
		})
	});
}
function Steps() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl leading-tight sm:text-4xl",
				children: "Mở hộp. Treo. Bật đèn. Chụp ảnh."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "Không cần đi mua thêm keo."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-3",
				children: [
					{
						n: "01",
						img: "/images/step-unbox.jpg",
						t: "Mở hộp",
						d: "Căn theo layout mẫu 2m / 3m trong hộp."
					},
					{
						n: "02",
						img: "/images/step-hang.jpg",
						t: "Treo",
						d: "Móc hoặc dán. Phụ kiện có sẵn. Không cần thợ."
					},
					{
						n: "03",
						img: "/images/step-lights.jpg",
						t: "Bật đèn, chụp ảnh",
						d: "Chỉnh 2–3 vị trí là xong."
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "overflow-hidden rounded-2xl border border-border bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopImg, {
						src: s.img,
						alt: s.t,
						className: "aspect-4/3 w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-widest text-muted-foreground",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-xl",
								children: s.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: s.d
							})
						]
					})]
				}, s.n))
			})
		]
	});
}
function Proof() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-border py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl leading-tight sm:text-4xl",
					children: "Nhà mẫu, đúng set bạn nhận."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-sm text-muted-foreground",
					children: "Góc setup showroom — không phải phòng chụp mãi một góc. Khi có khách thật, mình thay bằng ảnh nhà họ."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "-mx-4 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2",
					children: [
						{
							img: "/images/space-apt.jpg",
							c: "Chung cư 70m² · Set 699k"
						},
						{
							img: "/images/space-house.jpg",
							c: "Cửa sắt nhà phố · Set 399k"
						},
						{
							img: "/images/space-shop.jpg",
							c: "Shop nhỏ · Set cửa + cây"
						},
						{
							img: "/images/ugc-studio.jpg",
							c: "Studio · Set 399k"
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "w-[78vw] shrink-0 snap-center sm:w-72",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopImg, {
							src: s.img,
							alt: s.c,
							className: "aspect-3/4 w-full rounded-xl object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
							className: "mt-2 text-sm text-muted-foreground",
							children: s.c
						})]
					}, s.c))
				})
			]
		})
	});
}
function Shipping({ days }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "giao",
		className: "mx-auto max-w-6xl px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl bg-primary px-5 py-10 text-primary-foreground sm:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-primary-foreground/70",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-4" }), " Mốc giao"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 max-w-lg font-display text-3xl leading-tight sm:text-4xl",
					children: "Đẹp mà tới sau mùng 3 thì không phải Tết."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 font-display text-5xl tabular-nums",
					children: [days, " ngày"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-primary-foreground/75",
					children: "còn để chốt mốc 23 tháng Chạp (30/01/2027)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-8 grid gap-4 text-sm sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl bg-primary-foreground/10 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "Trước 30/01"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-primary-foreground/80",
								children: "23 tháng Chạp — nhận để kịp trang trí, gồm tỉnh xa."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl bg-primary-foreground/10 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "Trước 04/02"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-primary-foreground/80",
								children: "28 Tết — còn hàng thì giao, không cam kết mọi tỉnh."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl bg-primary-foreground/10 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "Sau mốc"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-primary-foreground/80",
								children: "Mình nói thẳng có kịp hay không. Không nhận đơn rồi im."
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-primary-foreground/75",
					children: "COD. Đóng hộp riêng đèn / hoa. Hết lô theme này là hết."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "sr-only",
					children: ["Mốc phụ 28 Tết ", DEADLINE_28.toISOString()]
				})
			]
		})
	});
}
function Faq() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "faq",
		className: "mx-auto max-w-3xl px-4 py-8 pb-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl",
			children: "Hỏi trước khi inbox"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
			type: "single",
			collapsible: true,
			className: "mt-6",
			children: [
				{
					q: "Mai giả nhìn có “giả” không?",
					a: "Dáng gọn, màu hiện đại. Có ảnh cận ban ngày trên trang. Không phải cây hội chợ cắm kín hộp."
				},
				{
					q: "Nhà sơn trắng / xám thì có hợp?",
					a: "Đúng nhà mình làm set này. Đỏ son + kem + gỗ nuốt tường trung tính tốt hơn đỏ bóng."
				},
				{
					q: "Có phải khoan tường không?",
					a: "Set cửa và phần lớn set 699k treo móc/dán. Cây đặt sàn. Nhà thuê vẫn dùng được."
				},
				{
					q: "Sai size thì sao?",
					a: "Zalo gửi ảnh tường trước khi chốt. Nhận sai set / sai size: đổi trong 48 giờ, hàng còn nguyên."
				},
				{
					q: "Năm sau dùng lại được không?",
					a: "Được. Gấp gọn. Đèn và liễn giữ form nếu cất khô."
				},
				{
					q: "Ở tỉnh, sợ trễ?",
					a: "Chọn mốc 23 tháng Chạp. Để muộn, mình nói thẳng có kịp hay không."
				}
			].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
				value: `q${i}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, { children: x.q }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, { children: x.a })]
			}, x.q))
		})]
	});
}
function FinalCta() {
	const openCheckout = useShop((s) => s.openCheckout);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopImg, {
				src: "/images/hero.jpg",
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-foreground/70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-3xl px-4 py-20 text-center text-surface",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl leading-tight text-balance sm:text-4xl",
						children: "Tết năm nay nhà nhìn có chủ ý. Không nhìn như vừa đi siêu thị đồ lễ về."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-surface/80",
						children: "Một set. Một theme. Một buổi treo. Xong."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-2 sm:grid-cols-3",
						children: PRODUCTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "lg",
							className: "bg-surface text-foreground hover:bg-surface/90",
							onClick: () => openCheckout(p.id),
							children: [
								p.name,
								" ",
								formatVnd(p.price)
							]
						}, p.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "lg",
						className: "mt-3 w-full border-surface/40 bg-transparent text-surface hover:bg-surface/10 sm:w-auto",
						onClick: () => zalo(),
						children: "Gửi ảnh phòng qua Zalo"
					})
				]
			})
		]
	});
}
function Footer() {
	const phone = useOps((s) => s.settings.zaloPhone) || SHOP.phoneTel;
	const display = phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border bg-background pb-24 pt-10 md:pb-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl",
				children: "Nhà Có Tết"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-xs text-sm text-muted-foreground",
				children: "Set Tết hiện đại cho chung cư và nhà phố. COD toàn quốc."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Zalo / gọi:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "text-foreground",
							href: `tel:${phone}`,
							children: display
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: SHOP.email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3",
						children: "Đổi set 48 giờ · Hàng còn nguyên"
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
			})]
		})
	});
}
function VideoModal() {
	const src = useShop((s) => s.videoId);
	const close = useShop((s) => s.closeVideo);
	const url = useMediaUrl(src ?? "");
	if (!src) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-4",
		onClick: close,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute right-4 top-4 rounded-full bg-surface p-2 text-foreground",
			onClick: close,
			"aria-label": "Đóng",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			src: url,
			className: "max-h-[80vh] w-full max-w-3xl rounded-xl",
			controls: true,
			autoPlay: true,
			muted: true,
			playsInline: true,
			onClick: (e) => e.stopPropagation()
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPage, {});
}
//#endregion
export { Home as component };
