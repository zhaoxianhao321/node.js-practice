const http=require('http');
const fs=require('fs');
const zilb=require('zlib');

let server=http.createServer((req,res)=>{
	let rs=fs.createReadStream('www'+req.url);
	// rs.pipe(res);

	res.setHeader('Content-encoding','Gzip'); // 告诉相应头这是一个压缩文件
	
	let gz=zilb.createGzip();
	rs.pipe(gz).pipe(res);
	
	rs.on('error',err=>{
		res.writeHeader(404);
		res.write('not found');
		res.end();
	})
})

server.listen(8010); 