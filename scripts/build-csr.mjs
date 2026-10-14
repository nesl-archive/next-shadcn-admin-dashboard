import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const child = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "build", ...process.argv.slice(2)], {
  stdio: "inherit",
  env: { ...process.env, BUILD_MODE: "csr" },
});
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("error", (error) => {
  console.error(error);
  process.exitCode = 1;
});
child.on("exit", async (code) => {
  process.exitCode = code ?? 1;
  if (code === 0) {
    try {
      await writeFile("out/.nojekyll", "");
    } catch (error) {
      console.error(error);
      process.exitCode = 1;
    }
  }
});
