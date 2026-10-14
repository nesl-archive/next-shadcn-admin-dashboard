import { getPreference, getValueFromCookie } from "@/server/server-actions";

export async function getDashboardPreferences() {
  const [sidebarState, variant, collapsible] = await Promise.all([
    getValueFromCookie("sidebar_state"),
    getPreference("sidebar_variant"),
    getPreference("sidebar_collapsible"),
  ]);
  return { defaultOpen: sidebarState !== "false", variant, collapsible };
}
