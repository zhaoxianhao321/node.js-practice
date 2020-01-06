const http = require('http');
const io = require('socket.io');

const httpServer=http.createServer((req,res)=>{
	
}).listen(8010);

let wsServer = io.listen(httpServer);

let aSock=[];

wsServer.on('connection', sock =>{
	
	aSock.push(sock);
	
	// 断开连接
	sock.on('disconnect',()=>{
		let n = aSock.indexOf(sock);
		
		if(n!=-1){
			aSock.splice(n,1);
		}
	})
	
	sock.on('msg',str=>{
		
		aSock.forEach(s=>{
			if(s!=sock){
				s.emit('msg',str);
			}
		})
		
	} )
	
});