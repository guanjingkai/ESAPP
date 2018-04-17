/**
 * related to article.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-12-10
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

rootView.setMapping({
    "title.text" : "title"
});