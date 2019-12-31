let a=new Buffer('aaaa');
let b=new Buffer('bbb');

let c=Buffer.concat([a,b]);

console.log(c);