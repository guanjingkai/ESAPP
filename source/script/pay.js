var d = require("deviceone");
var nf = d.sm("do_Notification");
var config = require("config");
var datacache= d.sm("do_DataCache");
var datacache= d.sm("do_Alipay1");

var serverUrl = config.serivceUrl;
module.exports.pay = getaway;

function getaway(payType,title, sn, total_amount){
	if(payType == "alipay"){
		alipay_app(title, sn, total_amount);
	}
}
function alipay_app(title,sn,total_amount){
	var payP = {
		app_id:"",
		method:"alipay.trade.app.pay",
		charset:"utf-8",
		sign_type:"RSA",
		sign:"",
		timestamp:"",
		version:"1.0",
		notify_url:"",
		biz_content:"",
		subject:title,
		out_trade_no:sn,
		total_amount:total_amount,
		product_code:"QUICK_MSECURITY_PAY"
	}
}