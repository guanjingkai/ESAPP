/**
 * @Author : 18810151774
 * @Timestamp : 2017-01-20
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");

app.on("loaded", function () {
    app.openPage({
    	source: "source://view/index.ui",
    	statusBarState: "show",
    	statusBarFgColor:"white",
    	statusBarBgColor:"FF3C62FF"
    });
});
