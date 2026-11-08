// Tiny zero-dependency local server for UKGhar.
// Run:  npm start   (or)   node server.js
// Then open http://localhost:3000
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff2": "font/woff2"
};

// --- Live reload: browser refreshes automatically when you save a file ---
const clients = new Set();
let timer = null;
fs.watch(ROOT, { recursive: true }, (evt, name) => {
  if (!name || /node_modules|\.git|\.vercel/.test(name)) return;
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log(`  changed: ${name}  -> reloading browser`);
    for (const c of clients) c.write("data: reload\n\n");
  }, 100);
});
const RELOAD_SNIPPET =
  '<script>(function(){var es=new EventSource("/__livereload");es.onmessage=function(){location.reload()};})();</script>';

http
  .createServer((req, res) => {
    if (req.url === "/__livereload") {
      res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });
      res.write(": connected\n\n");
      clients.add(res);
      req.on("close", () => clients.delete(res));
      return;
    }
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath.endsWith("/")) urlPath += "index.html";
    const file = path.normalize(path.join(ROOT, urlPath));
    if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end("Forbidden"); }

    fs.stat(file, (err, stat) => {
      if (err || !stat.isFile()) {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        return res.end('<h1>Page not found</h1><p><a href="/">Back to UKGhar</a></p>');
      }
      const type = TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";

      // Support range requests so videos can be seeked
      const range = req.headers.range;
      if (range && type.startsWith("video/")) {
        const [s, e] = range.replace("bytes=", "").split("-");
        const start = parseInt(s, 10) || 0;
        const end = e ? parseInt(e, 10) : stat.size - 1;
        res.writeHead(206, {
          "Content-Type": type,
          "Content-Range": `bytes ${start}-${end}/${stat.size}`,
          "Accept-Ranges": "bytes",
          "Content-Length": end - start + 1
        });
        return fs.createReadStream(file, { start, end }).pipe(res);
      }
      if (type.startsWith("text/html")) {
        return fs.readFile(file, "utf8", (e2, html) => {
          if (e2) { res.writeHead(500); return res.end("Error"); }
          html = html.includes("</body>") ? html.replace("</body>", RELOAD_SNIPPET + "</body>") : html + RELOAD_SNIPPET;
          res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-cache" });
          res.end(html);
        });
      }
      res.writeHead(200, { "Content-Type": type, "Content-Length": stat.size, "Cache-Control": "no-cache" });
      fs.createReadStream(file).pipe(res);
    });
  })
  .listen(PORT, () => console.log(`\n  UKGhar is running at  http://localhost:${PORT}\n  Live reload is ON: save any file and the browser refreshes.\n  Press Ctrl+C to stop.\n`));
