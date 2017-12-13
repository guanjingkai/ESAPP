var d = require("deviceone");
var common = require("common");
var nf = d.sm("do_Notification");
var config = require("config");
var datacache= d.sm("do_DataCache");
var alipay= d.sm("do_Alipay1");
var weixin= d.sm("do_TencentWX");
var serverUrl = config.serivceUrl;
module.exports.getaway = getaway;

function getaway(payType,payParam){
	if(payType == "alipay"){
		alipay_app(payParam);
	}
}
function alipay_app(payParam){	
	alipay.pay({
		orderStr:payParam['orderStr']
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
var jsonToRaw = function(param) {
	var str = ""
	for(var i in param){
		str = str+i+"="+param[i]+"&";
		d.print(i);
		d.print(param[i]);
	 }
	d.print(str.substr(0,str.length-1));
    return str.substr(0,str.length-1);
};