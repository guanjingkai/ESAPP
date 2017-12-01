/**
 * related to login_login.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-01-28
 */
var nf       = sm("do_Notification");
var app      = sm("do_App");
var page     = sm("do_Page");
var config	 = require("config");
var http     = require("http_util");
/*********************************************************/
var inputTel       = ui("input_tel");
var titleTel       = ui("title_tel");
var layoutTel      = ui("layout_tel");
var lineTel        = ui("line_tel");

var inputPassword  = ui("input_password");
var titlePassword  = ui("title_password");
var layoutPassword = ui("layout_password");
var linePassword   = ui("line_password");
/*********************************************************/
inputTel.on("textChanged",function(){
	if(inputTel.text.length > 0 && !titleTel.visible){
		titleTel.show("slide_b2t",300)
	}else if(inputTel.text.length <= 0){
		titleTel.visible = false;
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
	}else if(titlePassword.text.length <= 0){
		titlePassword.visible = false;
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