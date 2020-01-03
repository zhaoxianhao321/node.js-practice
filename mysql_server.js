const http = require('http');
const mysql = require('mysql');
const fs = require('fs');
const url = require('url');
const zlib = require('zlib');
const crypto=require('crypto');

const _key="assss";

function md5(str){
	let obj=crypto.createHash('md5');
	
	obj.update(str);
	
	return  obj.digest('base64')
}

function md5_2(str){
	
	return md5(md5(str+_key));
}

let db = mysql.createPool({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '',
	database: '202012'
});

let server = http.createServer((req, res) => {
	let {
		pathname,
		query
	} = url.parse(req.url, true);
	let {
		user,
		pass
	} = query;
	switch (pathname) {
		// 接口
		case '/reg':

			console.log(url.parse(req.url));
			console.log(user);
			console.log(pass);
			// 校验
			if (!user) {
				res.write('{"err":"1","msg":"user can not null"}');
				res.end();
			} else if (!pass) {
				res.write('{"err":"1","pass can not null"}');
				res.end();
			} else {
				db.query("SELECT * FROM user WHERE name='" + user + "'", (err, data) => {
					if (err) {
						res.write('{"err":"1","msg":"database is error"}');
						res.end();
					} else if (data.length > 0) {
						res.write('{"err":"1","msg":"name is had"}');
						res.end();
					} else {
						db.query("INSERT INTO user (ID , name ,pass) VALUES (0,'" + user + "','" + md5(pass) + "' )", (err, data) => {
							if (err) {
								res.write('{"err":"1","msg":"db is error"}');
								res.end();
							} else {
								res.write('{"err":"0","msg":"success"}');
								res.end();
							}
						})
					}
				})
			}
			break;
		case 'login':

			break;
		default:

			// 静态文件数据
			let rs = fs.createReadStream('www' + pathname);
			let gz = zlib.createGzip();

			res.setHeader('content-encoding', 'gzip');

			rs.pipe(gz).pipe(res);
			rs.on('error', err => {
				res.writeHeader(404);
				res.write('not found');
				res.end();
			})
	}
}).listen(8010);
