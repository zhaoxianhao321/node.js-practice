const fs = require('fs');

let rs=fs.createReadStream('1.jpg');
let ws=fs.createWriteStream('2.jpg');

rs.pipe(ws);

rs.on('error',err=>{
	console.log('读取失败');
})

ws.on('finish',()=>{
	console.log('写入完成');
})