const http = require('http');
const urlLib = require('url');
const querystring = require('querystring');

http.createServer((req, res) => {

	if (req.headers['origin'].startsWith("http://127.0.0.1:8848")) {
		res.setHeader('Access-Control-Allow-Origin', '*'); // 这里*的意思是允许一切域来访问我，但是一般都会写跨我的域名
	}

	let {
		pathname,
		query
	} = urlLib.parse(req.url, true);

	let arr = [];

	req.on('data', data => {
		arr.push(data);
	});

	req.on('end', () => {
		let post = querystring.parse(Buffer.concat(arr).toString());

		console.log(pathname, query, post);
		res.write('OKOKOK');
		res.end();
	});

}).listen(8010)
