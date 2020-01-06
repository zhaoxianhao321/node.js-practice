const http = require('http');
const io = require('socket.io');

let httpServer = http.createServer().listen(8010);

let wsServer = io.listen(httpServer);

wsServer.on('connection', sock => {  // 服务器监听一下得到一个sock
	// 发送
	setInterval(function() {
		sock.emit('t', new Date().getTime());
	}, 1000)

	// 接收
	sock.on('aa', function(a, b, c) {
		console.log(a, b, c);
	})
})
