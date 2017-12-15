/**
 * related to login_login.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-01-28
 */
var nf       = sm("do_Notification");
var app      = sm("do_App");
var page     = sm("do_Page");

var config	 = require("config/config");
var http     = require("util/http");
var edusoho  = require("util/edusoho");

var datacache = sm("do_DataCache");
/*********************************************************/
var inputTel       = ui("input_tel");
var titleTel       = ui("title_tel");
var layoutTel      = ui("layout_tel");
var lineTel        = ui("line_tel");

var inputPassword  = ui("input_password");
var titlePassword  = ui("title_password");
var layoutPassword = ui("layout_password");
var linePassword   = ui("line_password");

var btnLogin       = ui("btn_login");
/*********************************************************/
inputTel.on("textChanged",function(){
	if(inputTel.text.length > 0 && !titleTel.visible){
		titleTel.show("slide_b2t",300)
	}
});
inputTel.on("focusOut",function(){
	if(inputTel.text.length <= 0){
		titleTel.visible = false;
		inputTel.hint = "手机号";
	}
	layoutTel.visible = true;
	lineTel.visible = false;
});
/*********************************************************/
inputPassword.on("textChanged",function(){
	if(inputPassword.text.length > 0 && !titlePassword.visible){
		titlePassword.show("slide_b2t",300)
	}
});
inputPassword.on("focusOut",function(){
	if(inputPassword.text.length <= 0){
		titlePassword.visible = false;
		inputPassword.hint = "密码";
	}
	layoutPassword.visible = true;
	linePassword.visible = false;
});
/*********************************************************/
layoutTel.on("touch",function(){
	inputTel.setFocus(true);
	layoutTel.visible = false;
	lineTel.show("slide_l2r",300);
	if(!titleTel.visible){
		titleTel.show("slide_b2t",300);
		inputTel.hint = "";
	}
});
layoutPassword.on("touch",function(){
	inputPassword.setFocus(true);
	layoutPassword.visible = false;
	linePassword.show("slide_l2r",300);
	if(!titlePassword.visible){
		titlePassword.show("slide_b2t",300);
		inputPassword.hint = "";
	}
});
/*********************************************************/
btnLogin.on("touch",function(){
	var apiName = "/mapi_v2/User/login";
	var postData = {
			_username : "gjk1992@sina.com",//inputTel.text,
			_password : "123456"//inputPassword.text
	};
	http.resquestHttp('post',apiName,postData,function(data){
		data = JSON.parse(data);
		if(edusoho.isResponseError(data,apiName)){
			datacache.removeData("user");
			datacache.removeData("token");
			datacache.saveData("user", {
				id:data.user.id,
				nickname:data.user.nickname,
				title:data.user.title,
				avatar:data.user.largeAvatar,
				job:data.user.job
			});
			datacache.saveData("token", data.token);
			page.fire("closeLoginUi");
			app.fire("refreshUser");
		}
	},"");
});