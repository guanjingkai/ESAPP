var d = require("deviceone");
var common = require("common");
var nf = d.sm("do_Notification");
var config = require("config");
var datacache= d.sm("do_DataCache");
var alipay= d.sm("do_Alipay1");
var weixin= d.sm("do_TencentWX");
var serverUrl = config.serivceUrl;
module.exports.getaway = getaway;

function getaway(payType,title, sn, total_amount){
	if(payType == "alipay"){
		alipay_app(title, sn, total_amount);
	}
}
function alipay_app(title,sn,total_amount){	
	var payParam = "app_id="+config.aliAppID+
		"&method=alipay.trade.app.pay"+
		"&charset=utf-8"+
		"&sign_type=MD5"+
		"&sign="+
		"&timestamp="+common.formatDate(new Date())+
		"&version=1.0"+
		"&notify_url="+
		"&biz_content="+
		"&subject="+title+
		"&out_trade_no="+sn+
		"&total_amount="+total_amount+
		"&product_code=QUICK_MSECURITY_PAY";

	alipay.pay({
		orderStr:payParam
	},function(data){
		data = JSON.parse(data);
		nf.alert(data);
	})
}
function weixin_app(title,sn,total_amount){	
	weixin.pay({
		appId:config.wxAppID,
		partnerId:config.partnerId,
		package:"",
		noncestr:"",
		timestamp:"",
		sign:""
	},function(data){
		data = JSON.parse(data);
		nf.alert(data);
	})
}