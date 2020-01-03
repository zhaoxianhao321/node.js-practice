const http = rquire('http');
const io = require('socket.io');

let httpServer=http.createServer().listen(8010);

let wsServer=io.listen(httpServer);

wsServer.on('connection',sock=>{
	// 发送
	sock.emit
	// 接收
	sock.on
})
