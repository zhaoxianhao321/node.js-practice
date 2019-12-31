const url=require('url');
// 后面加true意思是解析query
let obj= url.parse('https://www.baidu.com/s?wd=a%27aaa&rsv_spt=1&rsv_iqid=0xeca6b45100004f61&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=0&rsv_dl=tb&rsv_sug3=4&rsv_sug1=1&rsv_sug7=100&inputT=1096&rsv_sug4=1258',true);

console.log(obj);