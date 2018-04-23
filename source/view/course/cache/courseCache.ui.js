/**
 * related to courseCache.ui
 * 
 * @Author : and
 * @Timestamp : 2018-04-02
 */
var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");
var config = require("config/config");
var http     = require("util/http");
var edusoho  = require("util/edusoho");
var btnClose = ui("btn_close");

page.on("back", function() {
	app.closePage();
});
btnClose.on("touch", function() {
	app.closePage();
});

var itemData = "";
var rootView = ui("$");
var catalogData = mm("do_ListData");
var catalogList = ui("catalog_list");
var data = page.getData();
var courseID = data.courseID;
var setMapping = function(data){
    catalogData.addData(data);
    catalogList.refreshItems();
}
catalogList.bindItems(catalogData);
itemData = data.itemData;
for(var i = 0; i < itemData.length; i++){
	itemData[i].courseID = courseID;
}
setMapping(itemData);
