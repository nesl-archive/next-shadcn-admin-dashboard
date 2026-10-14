import { fileURLToPath } from "node:url";

const isStaticExport = process.env.BUILD_MODE === "csr";
const basePath = isStaticExport ? (process.env.PAGES_BASE_PATH ?? "").replace(/\/$/, "") : "";
const staticAliases = {
  "@/server/server-actions": "./src/lib/static-export/server-actions.ts",
  "@/server/layout-preferences": "./src/lib/static-export/layout-preferences.ts",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  basePath,
  env: {
    NEXT_PUBLIC_STATIC_EXPORT: String(isStaticExport),
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL:
      process.env.PAGES_SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://studio-admin.arhamkhnz.com",
  },
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
        turbopack: { resolveAlias: staticAliases },
        webpack(config) {
          for (const [name, target] of Object.entries(staticAliases)) {
            config.resolve.alias[`${name}$`] = fileURLToPath(new URL(target, import.meta.url));
          }
          return config;
        },
      }
    : {
        distDir: ".next-ssr",
        async redirects() {
          return [{ source: "/dashboard", destination: "/dashboard/default", permanent: false }];
        },
      }),
  compiler: { removeConsole: process.env.NODE_ENV === "production" },
};

export default nextConfig;
