// Simple static file server for development
// Usage: node dev-server.js [--port 9001]
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const args = process.argv.slice(2);
let port = 9001;
for (let i=0;i<args.length;i++){
  if(args[i]==='--port' || args[i]==='-p'){ port = parseInt(args[i+1]) || port; }
}

const root = process.cwd();
const mime = {
  '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.json':'application/json',
  '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml', '.ico':'image/x-icon'
};

function sendError(res, code){
  res.statusCode = code;
  res.setHeader('Content-Type','text/plain');
  res.end(http.STATUS_CODES[code] || 'Error');
}

function serveFile(filePath, res){
  fs.stat(filePath, (err, stats) => {
    if(err) return sendError(res, 404);
    if(stats.isDirectory()){
      const index = path.join(filePath,'index.html');
      fs.access(index, fs.constants.R_OK, (e) => {
        if(e) return sendError(res, 403);
        streamFile(index, res);
      });
    } else {
      streamFile(filePath, res);
    }
  });
}

function streamFile(fp, res){
  const ext = path.extname(fp).toLowerCase();
  const type = mime[ext] || 'application/octet-stream';
  res.statusCode = 200;
  res.setHeader('Content-Type', type);
  // Use modern API res.getHeaders/res.setHeader only
  const stream = fs.createReadStream(fp);
  stream.on('error', ()=> sendError(res, 500));
  stream.pipe(res);
}

const server = http.createServer((req,res)=>{
  const parsed = url.parse(req.url);
  let pathname = decodeURIComponent(parsed.pathname);
  if(pathname.includes('..')){ sendError(res, 400); return; }
  if(pathname === '/') pathname = '/index.html';
  const filePath = path.join(root, pathname);
  console.log(new Date().toISOString(), 'GET', pathname);
  serveFile(filePath, res);
});

server.listen(port, '127.0.0.1', ()=>{
  console.log(`Dev server running at http://127.0.0.1:${port} (root: ${root})`);
});

server.on('error', (err)=>{
  console.error('Server error:', err.message);
});
