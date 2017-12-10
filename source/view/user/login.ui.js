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
var edusoho  = require("edusoho_util");
var datacache = sm("do_DataCache");
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
	//获取Code
	weixin.login(config.wxAppID, function(data, e) {
		if(data.errCode == 0){
			//通过Code获取AccessToken OpenId
			var apiName = "https://api.weixin.qq.com/sns/oauth2/access_token?appid="+config.wxAppID+"&secret="+config.wxAppSecret+"&code="+data.code+"&grant_type=authorization_code";
			http.get(apiName,{},function(data2){
				data2 = JSON.parse(data2);
				
					var apiName = "/api/tokens";
					http.post(apiName,{
						access_token:data2.access_token,
						openid:data2.openid,
						type:"weixinweb"
					},function(data4){
						data4 = JSON.parse(data4);
						if(edusoho.isResponseError(data4,apiName)){
							datacache.removeData("user");
							datacache.removeData("token");
							datacache.saveData("user", {
								id:data4.user.id,
								nickname:data4.user.nickname,
								title:data4.user.title,
								avatar:data4.user.avatar.large,
								job:data4.user.job
							});
							datacache.saveData("token", data4.token);

							app.fire("refreshUser");
							app.closePage();
						}		
					},{accept:"v2"});
				
			},{});
		}else if (data.errCode == -2) {
			nf.alert("用户取消授权")
		}else if (data.errCode == -4) {
			nf.alert("用户拒绝授权")
		}
		
	})
})
page.on("closeLoginUi",function(){
	app.closePage();
});