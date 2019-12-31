const events=require('events').EventEmitter

let ev=new events();

//1.监听(接受)
ev.on('msg',function (a,b,c){
	console.log('success',a,b,c);
});

//2.发送
ev.emit('msg',1,2,3)