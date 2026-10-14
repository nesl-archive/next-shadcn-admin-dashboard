"use client";

import { useEffect, useState } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { getClientCookie } from "@/lib/cookie.client";

export function DashboardSidebarProvider({
  defaultOpen = true,
  ...props
}: React.ComponentProps<typeof SidebarProvider>) {
  const [open, setOpen] = useState(defaultOpen);
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") setOpen(getClientCookie("sidebar_state") !== "false");
  }, []);
  return <SidebarProvider {...props} open={open} onOpenChange={setOpen} />;
}
