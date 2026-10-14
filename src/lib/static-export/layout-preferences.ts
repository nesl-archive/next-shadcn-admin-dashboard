import { PREFERENCE_DEFAULTS } from "@/lib/preferences/preferences-config";

export async function getDashboardPreferences() {
  return {
    defaultOpen: true,
    variant: PREFERENCE_DEFAULTS.sidebar_variant,
    collapsible: PREFERENCE_DEFAULTS.sidebar_collapsible,
  };
}
