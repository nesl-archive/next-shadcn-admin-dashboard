import { getClientCookie } from "@/lib/cookie.client";
import {
  PREFERENCE_DEFAULTS,
  type PreferenceKey,
  type PreferenceValueMap,
  parsePreference,
} from "@/lib/preferences/preferences-config";

// This adapter replaces Server Actions at build time. No server endpoint is emitted.
export async function getValueFromCookie(key: string): Promise<string | undefined> {
  return typeof document === "undefined" ? undefined : getClientCookie(key);
}

export async function setValueToCookie(
  key: string,
  value: string,
  options: { path?: string; maxAge?: number } = {},
): Promise<void> {
  // biome-ignore lint/suspicious/noDocumentCookie: Static hosting persists preferences in the browser.
  document.cookie = `${key}=${value}; path=${options.path ?? "/"}; max-age=${options.maxAge ?? 60 * 60 * 24 * 7}; SameSite=Lax`;
}

export async function getPreference<K extends PreferenceKey>(key: K): Promise<PreferenceValueMap[K]> {
  return typeof document === "undefined" ? PREFERENCE_DEFAULTS[key] : parsePreference(key, getClientCookie(key));
}
