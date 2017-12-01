/**
 * related to videoPlayer.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-11-03
 */
var nf       = sm("do_Notification");
var app      = sm("do_App");
var page     = sm("do_Page");
var config	 = require("config");
var http     = require("http_util");
var edusoho  = require("edusoho_util");
var datacache= sm("do_DataCache");
var doDevice = sm("do_Device");
//假设课程内容
var lessonID = "/api/lessons/244";
var start = ui("start");
var fullScreen= ui("full_screen");
var videoPlayer = ui("video_player");
var videoAction = ui("video_action");
var videoMask   = ui("video_mask");
var allTime = ui("all_time");
var nowTime = ui("now_time");
videoMask.on("touch",function(){
	videoAction.visible = true;
})
videoAction.on("touch",function(){
	videoAction.visible = false;
})
fullScreen.on("touch",function(){
	videoPlayer.eval("fullScreenX()");
})
start.on("touch",function(){
	//获取课程详情
	videoPlayer.eval("paused()", function(data, e) {
		if(data == "false"){
			videoPlayer.eval("pause()");
		}else{
			videoPlayer.eval("play()");
		}
	})
});
var startVideo = function(){
	var apiName = lessonID;
	http.get(apiName,{},function(data){
		data = JSON.parse(data);

		
		if(edusoho.isResponseError(data)){
			//当前视频时长
			allTime.text = getMS(data.length);
			//当前播放时间
			getNowTime();
			//拿到当前视频的m3u8地址
			var mediaUri = data.mediaUri;
			http.get(data.mediaUri,{},function(data2){
				data2 = JSON.parse(data2);
				if(edusoho.isResponseError(data2)){
					//拿到当前视频的m3u8地址
					var videoList = {
							sd:data2[0].src,
							hd:data2[1].src,
							sh:data2[2].src
					}
					var arr=videoList.sh.split("?");
					videoPlayer.eval("init('"+arr[0]+"')");
					
				}
			},"");
		}
	},"");
}
var getMS = function(times){
	return Math.floor((times / 60))+":"+Math.floor((times % 60));
}
var getNowTime = function(){
	var times = 100;
	nowTime.text = getMS(Math.floor(100/1000));
}

startVideo();