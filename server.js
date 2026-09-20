/**
 * SmartTour360 Native Node.js Server & REST API
 * Zero-dependency native Node.js server (runs immediately without npm install)
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.jsx': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // Health
  if (url.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'active',
      app: 'SmartTour360',
      version: '2.0.0',
      modules: [
        'Budget Spine',
        'Stays & Eco-Transit',
        'Hidden Heritage',
        'Safety SOS (Offline PWA)',
        'Multilingual Chatbot (EN, HI, TA, KN)',
        'Group Splitwise',
        'GPS Crowd Alert & Rerouting',
        'Ancient Inscription Plaque Scanner & TTS',
        'Government Tourism Admin Dashboard'
      ]
    }));
    return;
  }

  // Emergency Cache
  if (url.pathname === '/api/emergency') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      helpline: '112',
      touristHelpline: '1363',
      policeJaipur: '0141-2601934',
      smsHospitalTrauma: '0141-2518224',
      offlineCacheReady: true
    }));
    return;
  }

  // File serving
  let filePath = path.join(__dirname, url.pathname === '/' ? 'index.html' : url.pathname);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'public', url.pathname);
  }
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'standalone.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`[SmartTour360] Server active on http://localhost:${PORT}`);
});
