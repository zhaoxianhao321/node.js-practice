const http = require('http');
const fs = require('fs');
const url = require('url');


const server = http.createServer((req, res) => {
	let {
		pathname
	} = url.parse(req.url);

	// 获取文件的日期
	fs.stat('www' + pathname, (err, stat) => {
		if (err) { // 这里的判断只是一时的，有可能文件读取一半就终止了
			res.writeHeader(404);
			res.write('not found');
			res.end();
		} else {
			if (req.headers['if-modified-since']) {
				
				let newDate = new Date(req.headers['if-modified-since']);
				let time_client = Math.floor(newDate.getTime()/1000);
				let time_server = Math.floor(stat.mtime.getTime()/1000);
				if (time_client < time_server) { // 服务器文件的时候大于客户端文件时间的版本
					sendMsg();
				} else {
					res.writeHeader(304);
					res.write('not modified');
					res.end();
				}
			} else {
				console.log('1：'+req.headers['if-modified-since']);
				sendMsg();
			}

		}
		function sendMsg() {
			// 发送
			let rs = fs.createReadStream('www' + pathname);
			res.setHeader('Last-Modified', stat.mtime.toGMTString());
			res.setHeader('Cache-Control','no-cache');			// 加上头告诉不允许缓存
			// 输出
			rs.pipe(res);

			rs.on("error", err => { // 这里的判断是持续的
				res.writeHeader(404);
				res.write('not found');
				res.end();
			})
		}
	})



}).listen(8080)
