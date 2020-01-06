const http = require('http');
const urllib = require('url');			// 解析get数据
const querystring = require('querystring'); // 解析post数据

http.createServer((req,res)=>{
	let {pathname : url,query : get}=urllib.parse(req.url,true);
	
	let arr=[];
	req.on('data',data=>{
		arr.push(data);
	});
	req.on('end',()=>{
		let post = querystring.parse(Buffer.concat(arr).toString());
		
		console.log(url,get,post);
	});
}).listen(8010);