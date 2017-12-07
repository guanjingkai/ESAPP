var app, page, nf, InitData;
nf = sm("do_Notification");
app = sm("do_App");
page = sm("do_Page");
InitData = sm("do_InitData")
dataCache = sm("do_DataCache")
/*********************************************************/
//dataCache.removeAll("data://videoPlayer.html");
//InitData.copyFile("initdata://videoPlayer.html","data://videoPlayer.html", function(data, e) {})
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
