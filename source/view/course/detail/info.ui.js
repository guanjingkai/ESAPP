/**
 * related to info.ui
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

var courseID = "";
var vipLevelId = "";
var rootView = ui("$");
var courseTitle = ui("course_title");
var studentNum = ui("student_num");
var courseSubtitle = ui("course_subtitle");
var courseInfo = ui("course_info");
var lessonNum = ui("lesson_num");
var courseLevel = ui("course_level");
rootView.on("dataRefreshed",function(d){
	courseID = d.courseID;
	vipLevelId = d.courseInfo.vipLevelId;
	setMapping(d.courseInfo);
	
})
var setMapping = function(data){
	courseTitle.text = data.courseSet.title;
	studentNum.text = data.courseSet.studentNum;
	courseSubtitle.text = data.courseSet.subtitle;
	lessonNum.text = "课时:"+data.publishedTaskNum;
	courseLevel.text = "难度:中级";
	courseInfo.loadString(data.courseSet.summary);
}
var getCourseInfo = function(){
	var apiName = "/api/course_set/"+courseID+"/courses";
	http.get(apiName,{},function(data){
		data = JSON.parse(data);
		if(edusoho.isResponseError(data,apiName)){
			setMapping(data[0]);
		}
	},{
		accept:"v2"
	});
}
var couponGrid = ui('coupon_grid');
var couponGridData = mm("do_ListData");
couponGrid.bindItems(couponGridData);

var setMapping2 = function(data){
	indexCourseData.addData(data[0].data);
	indexCourse.refreshItems();
}
var apiName = "/marketing/targetCoupon";
http.get(apiName,{
	targetType:"course",
	targetId:courseID
},function(data){
		data = JSON.parse(data);
		if(edusoho.isResponseError(data,apiName)){
			http.get(apiName,{
				targetType:"vip",
				targetId:vipLevelId
			},function(data2){
					data2 = JSON.parse(data2);
					if(edusoho.isResponseError(data2,apiName)){
						
					}
			},{
				server:"esp"
			});
		}
},{
	server:"esp"
});