var nf       = sm("do_Notification");
var app      = sm("do_App");
var page     = sm("do_Page");

var config	 = require("config/config");
var http     = require("util/http");
var edusoho  = require("util/edusoho");
//http test

/***********************************************************/
//获取segmentview，绑定listdata
var videoPlayer = ui("player");
var playButton = ui("play");
/***********************************************************/
playButton.on("touch",function(){
	if(videoPlayer.isPlaying()){
		videoPlayer.pause();
		playButton.text = "开始";
	}else{
		videoPlayer.play();
		playButton.text = "暂停";
	}
});