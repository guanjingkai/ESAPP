/**
 * related to login.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-01-22
 */
var nf       = sm("do_Notification");
var app      = sm("do_App");
var page     = sm("do_Page");
var config	 = require("config");
var http     = require("http_util");
var weixin   = sm("do_TencentWX");
var btnClose    = ui("btn_close");
var btnLogin    = ui("btn_login");
var btnRegister = ui("btn_register");
var showerMain  = ui("shower_main");
var weixinLogin = ui("weixin_login");
showerMain.addViews([
	{id:"login",path:"source://view/user/login_login.ui"},
	{id:"register",path:"source://view/user/login_register.ui"}
]);
showerMain.showView("login");

btnClose.on("touch",function(){
	app.closePage();
});
btnLogin.on("touch",function(){
	btnLogin.bgColor = "FFFFFFFF";
	btnRegister.bgColor = "FCB60DFF"
	btnLogin.fontColor = "FCB60DFF";
	btnRegister.fontColor = "FFFFFFFF";
	showerMain.showView("login");
});
btnRegister.on("touch",function(){
	btnLogin.bgColor = "FCB60DFF";
	btnRegister.bgColor = "FFFFFFFF"
	btnLogin.fontColor = "FFFFFFFF";
	btnRegister.fontColor = "FCB60DFF";
	showerMain.showView("register");
});
//获取slideview，绑定listdata
var slideMain = ui("slide_main");
var slideMainListData = mm("do_ListData");
slideMain.bindItems(slideMainListData);
var slideMainData = [
	{template: 0,name:"登录"},
	{template: 1,name:"注册"}
];
slideMainListData.addData(slideMainData);
slideMain.refreshItems();

page.on("back", function() {
    app.closePage();
});
//微信支付
weixinLogin.on("touch",function(){
	weixin.login(config.wxAppID, function(data, e) {
		nf.alert(data);
	})
})