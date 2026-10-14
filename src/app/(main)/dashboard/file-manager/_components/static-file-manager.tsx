"use client";

import { useSearchParams } from "next/navigation";

import { FileManagerContent } from "./file-manager-content";

export function StaticFileManager() {
  const searchParams = useSearchParams();
  return <FileManagerContent activeView={searchParams.get("view") === "list" ? "list" : "grid"} />;
}
