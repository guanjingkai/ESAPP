/**
 * related to grid.ui
 * 
 * @Author : 18810151774
 * @Timestamp : 2017-11-26
 */
var page = sm("do_Page");

var app      = sm("do_App");
var rootView = ui("$");
var courseImage = ui("course_image");
var courseTitle = ui("course_title");
var courseInfo = ui("course_info");
var coursePrice = ui("course_price");
var goCourse = ui("go_course");

rootView.on("dataRefreshed",function(d){
	courseImage.source = d.cover.large;
	courseTitle.text = d.title;
	courseInfo.text = d.studentNum + "人已购买";
	if(d.minCoursePrice > 0 ){
		coursePrice.text = "￥"+d.minCoursePrice;
		coursePrice.fontColor = "FF3C62FF";
	}else{
		coursePrice.text = "免费";
		coursePrice.fontColor = "37ECBBFF";
	}
	goCourse.on("touch",function(){
			deviceone.print("打开了课程");
			app.openPage({
				source: "source://view/course/detail/courseDetial.ui",
				statusBarState: "transparent",
				statusBarFgColor:"white",
				animationType:"slide_r2l",
				data:{
					course:d.id,
					cover:d.cover.large,
					minCoursePrice:d.minCoursePrice
				}
			});
	});
})
var getMS = function(times){
	var mm = Math.floor(times / 60);
	var ss = ('00'+Math.floor(times % 60)).slice(-2);
	if((mm + "").length < 2){
		mm = ('00'+mm).slice(-2)
	}
	return mm+":"+ss;
}