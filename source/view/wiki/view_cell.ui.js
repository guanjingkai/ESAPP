/**
 * related to view_cell.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-01-22
 */
var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");
var InitData = sm("do_InitData");
var dataCache = sm("do_DataCache");

var config	 = require("config/config");
var http     = require("util/http");
var edusoho  = require("util/edusoho");
var rootView = ui("$");

var thisPage = 1;
var wikiList = ui('wiki_list');
var wikiListData = mm("do_ListData");
wikiList.bindItems(wikiListData);
//rootView.setMapping({
//    "do_Label_1.text" : "name"
//});
rootView.on("dataRefreshed",function(d){
	var apiName = "/article/page/"+thisPage;
	http.post(apiName,{
		categoryId:d.id
	},function(data){
		data = JSON.parse(data);
		wikiListData.addData(data);
		wikiList.refreshItems();
	},{
		server:"esp"
	});
})