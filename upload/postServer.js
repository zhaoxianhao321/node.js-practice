const http = require('http');
const url=require('url');
const queryString=require('querystring');

let server=http.createServer((req,res)=>{
	let str='';
	
	req.on('data',data=>{
		str+=data;
	});
	
	req.on('end',()=>{
		let str2=queryString.parse(str)
		console.log(str2);
	});
	res.end();
});

server.listen(8010);