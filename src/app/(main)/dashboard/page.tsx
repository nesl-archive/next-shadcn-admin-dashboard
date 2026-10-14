import { permanentRedirect } from "next/navigation";

import { DashboardRedirect } from "./_components/dashboard-redirect";

export default function Page() {
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") return <DashboardRedirect />;
  permanentRedirect("/dashboard/default");
}
