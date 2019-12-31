const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

let users = {

}

const server = http.createServer((req, res) => {
	// 拿到get数据
	let {
		pathname,
		query
	} = url.parse(req.url, true);
	console.log(req.url);
	// 拿到post数据
	let str = '';
	req.on('data', data => {
		str += data;
	});
	console.log(str);
	req.on('end', () => {
		let post = querystring.parse(str);
		let {
			user,
			pass
		} = query;
		switch (pathname) {
			case '/reg':
				if (!user) {
					res.write('{"err":1,"msg":"user is must have"}');
				} else if (!pass) {
					res.write('{"err":1,"msg":"pass is must have"}');
				} else if (users[user]) { //?????????????????????????????????????????
					res.write('{"err":1,"msg":"user is reged"}');
				} else {
					users[user] = pass;
					res.write('{"err":0,"msg":"reg sucess"}');
				}
				res.end();
				break;
			case '/login':
				if (!user) {
					res.write('{"err":1,"msg":"user is must have"}');
				} else if (!pass) {
					res.write('{"err":1,"msg":"pass is must have"}');
				} else if (!users[user]) { //?????????????????????????????????????????
					res.write('{"err":1,"msg":"user is no found"}');
				} else if (users[user] !== pass) { //?????????????????????????????????????????
					res.write('{"err":1,"msg":"pass is worry"}');
				} else {
					res.write('{"err":0,"msg":"login success"}');
				}
				res.end();
				break;
			default:
				fs.readFile(`wampWWW${pathname}`, (err, data) => {
					if (err) {
						res.writeHeader(404);
						res.write('not found');
					} else {
						res.write(data);
					}
					res.end();
				});
		}
	});

});

server.listen(8010);
