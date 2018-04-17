var nf       = sm("do_Notification");
var app      = sm("do_App");
var page     = sm("do_Page");
var dataCache = sm("do_DataCache");
var config	 = require("util/config");
//http test

/***********************************************************/
//获取segmentview，绑定listdata
var wiki_tab = ui("wiki_tab");
var wiki_tab_listdata = mm("do_ListData");
wiki_tab.bindItems(wiki_tab_listdata);
//获取slideview，绑定listdata
var wiki_view = ui("wiki_view");
var wiki_view_listdata = mm("do_ListData");
wiki_view.bindItems(wiki_view_listdata);
/***********************************************************/
//segmentview数据
var wiki_data = [
              {template: 0,name: "首页",id:0,fontColor : "FFB2C1FF", lb:false},
           	  {template: 0,name: "Wiki",id:9999,fontColor : "FFB2C1FF", lb:false}
];
//slideview数据
var wiki_view_data = [
	{template: 0,name: "首页",id:0},
	{template: 0,name: "Wiki",id:9999}                   
];
/***********************************************************/
var articleCategory = dataCache.loadData("articleCategory")
articleCategory.forEach(function(v,k) { 
    //nf.alert(v); //这样就会分别将name遍历出来
	wiki_data.push({
    	template: 0,
    	name:v.name,
    	id:v.id,
    	fontColor:"FFB2C1FF",
    	lb:false
    });
	wiki_view_data.push({
    	template: 0,
    	name:v.name,
    	id:v.id
    });
});
/***********************************************************/
var change_tab = function(index){
	for(var item in wiki_data){
		wiki_data[item].fontColor = "FFB2C1FF",
		wiki_data[item].lb = false;
	}
	wiki_data[index].fontColor = "FFFFFFFF";
	wiki_data[index].lb = true;
	return wiki_data;	
}
/***********************************************************/
//segmentview绑定数据
wiki_tab_listdata.addData(change_tab(0));
wiki_tab.refreshItems();
//slideview绑定数据
wiki_view_listdata.addData(wiki_view_data);
wiki_view.refreshItems();
/***********************************************************/
//当segmentview的index变化时,读取
wiki_tab.on("indexChanged", function(index){
	wiki_tab_listdata.removeAll();
	wiki_tab_listdata.addData(change_tab(index));
	wiki_tab.refreshItems();
	wiki_view.set({index: index});
	wiki_view.refreshItems({});
});
wiki_view.on("indexChanged", function(index){
	wiki_tab.index = index;
 });
var wiki_set = ui("wiki_set");
wiki_set.on("touch",function(){
	sm("do_Notification").alert("123");
});
