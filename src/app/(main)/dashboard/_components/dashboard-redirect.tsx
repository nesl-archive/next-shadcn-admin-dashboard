"use client";

import { useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function DashboardRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/default");
  }, [router]);
  return <Link href="/dashboard/default">Open dashboard</Link>;
}
