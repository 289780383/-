/**文档加载*/
$(function () {
    var today = new Date();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    var x = today.getDay();
    if (m < 10) {
        m = "0" + m;
    }
    if (d < 10) {
        d = "0" + d;
    }
    if (x == 0) {
        x = "星期日";
    } else if (x == 1) {
        x = "星期一";
    } else if (x == 2) {
        x = "星期二";
    } else if (x == 3) {
        x = "星期三";
    } else if (x == 4) {
        x = "星期四";
    } else if (x == 5) {
        x = "星期五";
    } else if (x == 6) {
        x = "星期六";
    }
    $(".top p").text("" + m + "月" + d + "日 " + x + "");
    go_on();

});
/**关闭新闻消息*/
function close_news(obj) {
    $(obj).parent().remove();
}
/**我的排班*/
function today_ban(obj) {
    $.ajax({
        type: "POST", //GET
        url: "***.action",
        data: {
            today_date: $(".top p").text()
        }, //组装参数
        dataType: "json",
        success: function (data) {
            window.open("plan.html", "_self", "");
        },
        error: function (data) {
            /**待删除*/
            window.open("plan.html", "_self", "");
        }
    });

}
/**需要的方法*/
function go_off() {
    $(".car_out").css({backgroundColor: "#c7c7c7"})
}
function go_on() {
    $(".car_out").css({backgroundColor: "#ff4f00"});
    $(".car_out").click(function () {
       window.open("gogo.html","_self","");
    });
}
function go_over() {
$(".car_out").css({backgroundColor: "#ff4f00"});
$(".car_out").text("完成");
$(".car_out").click(function () {
    alert("完成");
});
}
/**点击我的*/
function show_mine(){
    $(".my_home").show();
    $(".mask").show();
}
/**退出我的*/
function go_out(){
    $(".close_trip").show();
    $(".mask2").show();
}
function close_no(){
    $(".close_trip").hide();
    $(".mask2").hide();
}
function close_yes(){
    $(".close_trip").hide();
    $(".mask2").hide();
    $(".my_home").hide();
    $(".mask").hide();
    window.open("index.html","_self","");
}
/**页面跳转*/
function open_new(n){
    window.open(""+n+".html","_self","");
}