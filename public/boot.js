// Why FinTree — zero-dependency static server for the hosting runtime.
// The platform starts the app with: node dist/boot.js
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url)); // dist/
const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf'
};

function send(res, status, body, type) {
  res.writeHead(status, {
    'Content-Type': type || 'application/octet-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(body);
}

http.createServer((req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (urlPath === '/' || urlPath === '') urlPath = '/index.html';
    const file = path.normalize(path.join(ROOT, urlPath));
    if (!file.startsWith(ROOT)) { send(res, 403, 'Forbidden', 'text/plain'); return; }

    fs.readFile(file, (err, data) => {
      if (err) {
        // fall back to index.html for unknown paths (single-page site)
        fs.readFile(path.join(ROOT, 'index.html'), (e2, html) => {
          if (e2) { send(res, 404, 'Not found', 'text/plain'); return; }
          send(res, 200, html, MIME['.html']);
        });
        return;
      }
      send(res, 200, data, MIME[path.extname(file).toLowerCase()]);
    });
  } catch (e) {
    send(res, 500, 'Server error', 'text/plain');
  }
}).listen(PORT, '0.0.0.0', () => {
  console.log('Why FinTree site serving on port ' + PORT);
});
