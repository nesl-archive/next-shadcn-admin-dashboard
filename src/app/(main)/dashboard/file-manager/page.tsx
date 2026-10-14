import { Suspense } from "react";

import type { Metadata } from "next";

import { FileManagerContent } from "./_components/file-manager-content";
import { StaticFileManager } from "./_components/static-file-manager";

export const metadata: Metadata = {
  title: "Open Source File Manager with shadcn/ui",
  description:
    "Explore an open source file manager for browsing, organizing, uploading, and viewing files and folders.",
  alternates: {
    canonical: "/dashboard/file-manager",
  },
};

interface PageProps {
  searchParams: Promise<{ view?: string | string[] }>;
}

export default async function Page({ searchParams }: PageProps) {
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
    return (
      <Suspense fallback={<FileManagerContent activeView="grid" />}>
        <StaticFileManager />
      </Suspense>
    );
  }
  const { view } = await searchParams;
  return <FileManagerContent activeView={view === "list" ? "list" : "grid"} />;
}
