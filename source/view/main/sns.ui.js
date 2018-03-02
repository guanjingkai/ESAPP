var nf       = sm("do_Notification");
var app      = sm("do_App");
var page     = sm("do_Page");

var config	 = require("util/config");
//http test

/***********************************************************/
//获取segmentview，绑定listdata
var videoPlayer = ui("do_VideoView_1");
var playButton = ui("do_Button_1");
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
