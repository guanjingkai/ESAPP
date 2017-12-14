var nf       = sm("do_Notification");
var app      = sm("do_App");
var page     = sm("do_Page");

var config	 = require("config/config");
var http     = require("util/http");
var edusoho  = require("util/edusoho");

var bannerView = ui('banner_view');
var bannerViewData = mm("do_ListData");
var indexCourse = ui('index_course');
var indexCourseData = mm("do_ListData");
indexCourse.bindItems(indexCourseData);
bannerView.bindItems(bannerViewData);
/**
 * 首页banner
 */
//var testPlayer = ui("test_player");
//testPlayer.add("player", "source://view/course/videoPlayer.ui", 0, 0);

var apiName = "/mapi_v2/School/getSchoolBanner";
http.get(apiName,{},function(data){
	data = JSON.parse(data);
	if(edusoho.isResponseError(data,apiName)){
		bannerViewData.addData(data);
		bannerView.refreshItems();
	}
},{
accept:"v2"
});
bannerView.startLoop({interval : 3000});
/**
 * 首页推荐课程展示
 */
var apiName = "/api/app/channels";
http.get(apiName,{},function(data){
	data = JSON.parse(data);
	if(edusoho.isResponseError(data,apiName)){
		indexCourseData.addData(data[0].data);
		indexCourse.refreshItems();
	}
},{
accept:"v2"
});
indexCourse.on("touch",function(d){
	deviceone.print(JSON.stringify(d));
	app.openPage({
		source: "source://view/course/detail/courseDetial.ui",
		statusBarState: "transparent",
		statusBarFgColor:"white",
		animationType:"slide_r2l",
		data:{
			course:indexCourseData.getOne({index:d}).id,
			cover:indexCourseData.getOne({index:d}).cover.large,
			minCoursePrice:indexCourseData.getOne({index:d}).minCoursePrice
		}
	});
})
//http test
//var apiName = "/api/discovery_columns";
//http.resquestHttp('get',apiName,{},function(data){
//	nf.alert(JSON.stringify(data));
//});
//var video_player = ui("video_player");
//video_player.play(0);
//var video_star = ui("video_star");
//var video_time = 0;
//video_player.setControlVisible(false);
//video_player.on("touch",function(){	
//	nf.alert(1);
//}
//video_star.on("touch",function(){	
//	if(video_time == 0){
//		video_player.play(0);
//	}else{
//		if (video_player.isPlaying()) {
//			video_time = video_player.getCurrentPosition();
//			video_player.pause();
//		}else {
//			video_player.resume();
//		}
//	}
//	nf.alert(video_time);
//});
//videoPlayer.on("error",function(){
//	nf.alert("123");
//});
