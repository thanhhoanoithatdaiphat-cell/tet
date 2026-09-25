const SALT = "nct-ops-v1";
export const DEFAULT_PIN_HASH =
  "5ec0a40bae89321d5d6e6b0b529d17f3d1ffea9dccac8f87abf7469284464602";
export const OPS_SESSION_KEY = "nct-ops-ok";

export async function hashPin(pin: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(SALT + pin));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function isFourDigits(pin: string) {
  return /^\d{4}$/.test(pin);
}
