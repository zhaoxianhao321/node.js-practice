const queryString=require('querystring');

let obj=queryString.parse('returnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dzcp-erp%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A9200%252Fauthentication%252Fcallback%26response_type%3Did_token%2520token%26scope%3Dopenid%2520profile%2520zcp-erp-api%26state%3Ddc6542097b3141e1b9470b8f5d66bb72%26nonce%3Db9a23c8a34824faf8852e329cc6b7220');

console.log(obj);