const http=require('node:http');const fs=require('node:fs');const path=require('node:path');
const root=__dirname;
http.createServer(async(req,res)=>{
 if(req.url==='/api/analyze'){
   const chunks=[];let size=0;
   for await (const c of req){size+=c.length;if(size>4_000_000){res.writeHead(413);return res.end('Too large')}chunks.push(c)}
   try{req.body=JSON.parse(Buffer.concat(chunks).toString('utf8'))}catch{res.writeHead(400);return res.end('Invalid JSON')}
   res.status=n=>{res.statusCode=n;return res};res.json=x=>res.end(JSON.stringify(x));
   return require('./api/analyze.js')(req,res);
 }
 if(req.url==='/'||req.url==='/index.html'){res.setHeader('Content-Type','text/html; charset=utf-8');return fs.createReadStream(path.join(root,'index.html')).pipe(res)}
 res.writeHead(404);res.end('Not found');
}).listen(process.env.PORT||3000,()=>console.log('Gym running on http://localhost:'+(process.env.PORT||3000)));
