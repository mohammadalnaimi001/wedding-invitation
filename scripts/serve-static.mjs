import { createServer } from "node:http";
import { existsSync, createReadStream, statSync } from "node:fs";
import { resolve, extname, sep } from "node:path";
const root = resolve(existsSync("out/index.html") ? "out" : "dist/client");
if (!existsSync(resolve(root, "index.html")))
  throw new Error("Build first: pnpm build:next");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".mp3": "audio/mpeg",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
};
createServer((req, res) => {
  try {
    let file = resolve(
      root,
      "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname),
    );
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(403).end();
      return;
    }
    if (existsSync(file) && statSync(file).isDirectory())
      file = resolve(file, "index.html");
    if (!existsSync(file) || !statSync(file).isFile()) {
      res.writeHead(404).end("Not found");
      return;
    }
    res.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "Content-Length": statSync(file).size,
    });
    if (req.method === "HEAD") res.end();
    else createReadStream(file).pipe(res);
  } catch {
    res.writeHead(400).end("Bad request");
  }
}).listen(Number(process.env.PORT) || 3000, () =>
  console.log("Invitation: http://localhost:" + (process.env.PORT || 3000)),
);
