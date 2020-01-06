const http = require('http');
const net = require('net');   // 启用tcp操作的库,也就是原生的socket
const crypto = require('crypto');

// 1
// let httpServer = http.createServer((req,res)=>{
// 	console.log('连接')
// }).listen(8010);

let server = net.createServer(sock=>{
	console.log('连接');
	
	// 有数据过来了 -- 握手只有一次
	sock.onec('data',data=>{
		console.log('hand shake start...');
		
		let str=data.toString();
		let lines=str.split('\r\n');
		lines=lines.slice(1,lines.length-2);
		
		// 切开
		let headers={};
		lines.forEach(line=>{
			let [key,val]=line.split(': ');
			
			headers[key.toLowerCase()]=val;
		});
		
		if(headers['upgrade']!=='websocket'){
			console.log('其它协议',headers['upgrade'])
			sock.end();
		}else{
			let key = headers['sec-websocket-key'];
			let mask = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
			// sha1(key+mask);
			
			let hash=crypto.createHash('sha1');
			hash.update(key+mask);
			let key2=hash.digest('base64');
			
			sock.write('返回给客户端的key');  // 完成握手
			
			console.log('hand shake end...');
			
		}
		console.log(headers);
	});
	
	// 断开了
	sock.on('end',()=>{});
	
}).listen(8010);