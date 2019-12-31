const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
	fs.readFile(`www${req.url}`, (err, date) => {
		if (err) {
			res.writeHeader(404);
			res.write('not found');
		} else {
			res.write(date);
		}
		res.end();				// 因为这里的readFile是一个异步的操作，所以把res.end放在函数里
	});
})
server.listen(8090);
