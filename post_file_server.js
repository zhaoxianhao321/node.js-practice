const http=require('http');
const split=require('./common/common.js');
const fs=require('fs');
const uuid=require('uuid/v4');
let server=http.createServer((req,res)=>{
	let arr=[];
	req.on('data',data=>{
		arr.push(data);
	});
	let post=[];
	let files=[];
	req.on('end',()=>{
		let data=Buffer.concat(arr);			// 将data中的每个小buffer连接成一个大buffer
		let str=req.headers['content-type'].split('; ')[1];
		if(str){
			let boundary='--'+str.split('=')[1];
			let arr=data.split(boundary);
			arr.shift();
			arr.pop();
			arr=arr.map(buffer=>buffer.slice(2,buffer.length-2));
			arr.forEach(buffer=>{
				let n=buffer.indexOf('\r\n\r\n');
				let Disposition=buffer.slice(0,n);
				let Content=buffer.slice(n+4);
				// console.log(Disposition.toString(),"||||",Content.toString());
				if(Disposition.indexOf('\r\n')==-1){
					// console.log('普通数据:'+Content.toString());
					let name=Disposition.split(';')[1].split('=')[1].split('"')[1];
					post[name]=Content.toString();
				}else{
					// console.log('文件数据');
					let [line1,line2]=Disposition.toString().split('\r\n');
					let [,name,filename]=line1.split(';');
					let type=line2.split(':')[1];
					console.log(name,filename,type);
					fs.writeFile('upload/'+uuid().replace(/\-/g,''),Content,err=>{
						if(err){
							console.log('文件写入失败');
						}else{
							console.log('文件写入成功');
						}
					})
				}
			}
			);
			console.log(post);
		}
		res.end();
	});
});

server.listen(8010);
