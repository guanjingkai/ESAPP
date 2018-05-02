var nf       = sm("do_Notification");
var app      = sm("do_App");
var page     = sm("do_Page");

var storage = sm("do_Storage");
var config	 = require("config/config");
//var http     = require("util/http");
var http = mm("do_Http");
var edusoho  = require("util/edusoho");
//http test
var player = ui("do_VideoView_1");

storage.getFiles("data://videoCache/32/244/", function(data, e) {
	deviceone.print(data);
})

http.url = "http://127.0.0.1:2333/123";
http.method   = "get";
http.request();
http.on("result", function(data) {
	deviceone.print("get"+JSON.stringify(data));
}).on("fail",function(data){
	nf.alert("请求失败了"+JSON.stringify(data));
});
//player.path = "data://videoCache/32/244/04ad69dd478e451faa088302e477ce40-051d50b3ade3c67c307704e2db1d365f-hd.m3u8";
player.path = "http://127.0.0.1:2333/123";
player.play();

