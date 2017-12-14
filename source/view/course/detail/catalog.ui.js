/**
 * related to catalog.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-11-09
 */
var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");

var config = require("config/config");
var http     = require("util/http");
var edusoho  = require("util/edusoho");

var itemData = "";
var rootView = ui("$");
var catalogData = mm("do_ListData");
var catalogList = ui("catalog_list");
catalogList.bindItems(catalogData);

rootView.on("dataRefreshed",function(d){
	itemData = d.itemData;
	setMapping(itemData);
	
})
var setMapping = function(data){
    catalogData.addData(data);
    catalogList.refreshItems();
}