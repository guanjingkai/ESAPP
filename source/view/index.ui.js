var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");
var InitData = sm("do_InitData");
var dataCache = sm("do_DataCache");
var socketServer = sm("do_SocketServer");
var config	 = require("config/config");
var http     = require("util/http");
var edusoho  = require("util/edusoho");
/*********************************************************/
if(!dataCache.hasData("videoCache")){
	var videoCache = {
			videoNum:0,
			videoSize:0,
			videoData:[]
	}
	dataCache.saveData("videoCache",videoCache);
}
if(!dataCache.hasData("articleCategory")){
	var articleCategory = [];
	dataCache.saveData("articleCategory",articleCategory);
}
/*********************************************************/
var apiName = "/article/category";
http.post(apiName,{},function(data){
	data = JSON.parse(data);
	dataCache.saveData("articleCategory",data);
},{
	server:"esp",
	cache:0
});
//dataCache.removeAll("data://player.html");
InitData.copyFile("initdata://player.html","data://player.html", function(data, e) {})

/*********************************************************/
socketServer.startListen(2333);
socketServer.on("listen", function(data, e) {
	deviceone.print(JSON.stringify(data));
	return 123;
})
socketServer.on("error", function(data, e) {
	deviceone.print("error");
})
/*********************************************************/
var main_shower = ui("main_shower");
var tabbarIndex = ui("index");
var tabbarWiki = ui("wiki");
var tabbarSns = ui("sns");
var tabbarMy = ui("my");

var tabbarIndexIcon = ui("tabbar_index_icon");
var tabbarWikiIcon = ui("tabbar_wiki_icon");
var tabbarSnsIcon = ui("tabbar_sns_icon");
var tabbarMyIcon = ui("tabbar_my_icon");

var tabbarIndexLabel = ui("tabbar_index_label");
var tabbarWikiLabel = ui("tabbar_wiki_label");
var tabbarSnsLabel = ui("tabbar_sns_label");
var tabbarMyLabel = ui("tabbar_my_label");

main_shower.addViews([
    {id : "index", path : "source://view/main/index.ui"},
    {id : "wiki", path : "source://view/main/wiki.ui"},
    {id : "sns", path : "source://view/main/sns.ui"},
    {id : "my", path : "source://view/main/my.ui"}
]);

/*********************************************************/
tabbarIndex.on("touch", function() {
	tabbarIndexIcon.iconColor = "FF3C62FF";
	tabbarWikiIcon.iconColor = "C0C0C0FF";
	tabbarSnsIcon.iconColor = "C0C0C0FF";
	tabbarMyIcon.iconColor = "C0C0C0FF";
	tabbarIndexLabel.fontColor = "FF3C62FF";
	tabbarWikiLabel.fontColor = "C0C0C0FF";
	tabbarSnsLabel.fontColor = "C0C0C0FF";
	tabbarMyLabel.fontColor = "C0C0C0FF";
	main_shower.showView("index");
});

tabbarWiki.on("touch", function() {
	tabbarIndexIcon.iconColor = "C0C0C0FF";
	tabbarWikiIcon.iconColor = "FF3C62FF";
	tabbarSnsIcon.iconColor = "C0C0C0FF";
	tabbarMyIcon.iconColor = "C0C0C0FF";
	tabbarIndexLabel.fontColor = "C0C0C0FF";
	tabbarWikiLabel.fontColor = "FF3C62FF";
	tabbarSnsLabel.fontColor = "C0C0C0FF";
	tabbarMyLabel.fontColor = "C0C0C0FF";
	main_shower.showView("wiki");
});

tabbarSns.on("touch", function() {
	tabbarIndexIcon.iconColor = "C0C0C0FF";
	tabbarWikiIcon.iconColor = "C0C0C0FF";
	tabbarSnsIcon.iconColor = "FF3C62FF";
	tabbarMyIcon.iconColor = "C0C0C0FF";
	tabbarIndexLabel.fontColor = "C0C0C0FF";
	tabbarWikiLabel.fontColor = "C0C0C0FF";
	tabbarSnsLabel.fontColor = "FF3C62FF";
	tabbarMyLabel.fontColor = "C0C0C0FF";
	main_shower.showView("sns");
});

tabbarMy.on("touch", function() {
	tabbarIndexIcon.iconColor = "C0C0C0FF";
	tabbarWikiIcon.iconColor = "C0C0C0FF";
	tabbarSnsIcon.iconColor = "C0C0C0FF";
	tabbarMyIcon.iconColor = "FF3C62FF";
	tabbarIndexLabel.fontColor = "C0C0C0FF";
	tabbarWikiLabel.fontColor = "C0C0C0FF";
	tabbarSnsLabel.fontColor = "C0C0C0FF";
	tabbarMyLabel.fontColor = "FF3C62FF";
	main_shower.showView("my");
});

page.on("loaded", function() {
    main_shower.showView("index");
});
page.on("back", function() {
    app.closePage();
});

/*********************************************************/
