// Next Link/router apply basePath themselves; native browser URLs need it explicitly.
export function withBasePath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
