import { notFound } from "next/navigation";

export default function DashboardNotFound() {
  notFound();
}

// Static hosting uses the exported 404.html for unknown paths.
export function generateStaticParams() {
  return [{ "not-found": ["404"] }];
}
