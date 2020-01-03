const cluster = require('cluster');
const os = require('os');
const http = require('http');
const process = require('process');
if (cluster.isMaster) {
	for (let i = 0; i < os.cpus().length; i++) {
		cluster.fork();
	}
	console.log('我是主进程');
} else {
	// console.log('我是子进程');
	console.log(process.pid);		// 通过process.pid可以得到子进程的号码
	let server=http.createServer((req,res)=>{
		res.write('aa');
		res.end();
	}).listen(8080);
	console.log("服务开好了");
}

