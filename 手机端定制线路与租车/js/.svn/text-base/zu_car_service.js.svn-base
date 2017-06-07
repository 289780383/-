/*出行时间*/
var get_lose;
function time(obj){
    $(".getTime").css("bottom","0");
    $(".mask").show();
    $(".go_time").show();
    $(".day_new").hide();
    $(".return").hide();
    $(".sure_").css("visibility","hidden");
    if($(obj).attr("class")=="get_car_time"){
        get_lose="get";
    }else {
        get_lose="lose";
    }
    $(".msg_title").text("请选择时间");
    $(".week_new li").removeClass("sel_dd");
    $(".week_new li").eq(week).addClass("sel_dd");
}
/**选择日期*/
function go_time(){
        $(".day_new").show();
        $(".ri_li,.week_new").show();
        $(".time_warp").hide();
    $(".msg_title").text(GetDateStr2(0));
    $(".go_time").hide();
    $(".today_time").hide();
    $(".cancel").hide();
    $(".return").show();
    $(".sure_").css("visibility","visible");
}
/*取消与确定*/
function get_time_btn() {
    if($(".day_new").css("display")=="block"){
        if($(".time_warp").css("display")=="block"){
            if(get_lose=="get"){
                $(".get_car_time").text(""+$(".msg_title").text()+" "+$(".sel_time").text()+"");
            }else {
                $(".lose_car_time").text(""+$(".msg_title").text()+" "+$(".sel_time").text()+"");
            }

            reset_all();
        }
        $(".ri_li,.week_new").hide();
        $(".time_warp").show();
    }else {
        reset_all();
    }
};
/*确定后关闭所有*/
function reset_all(){
    $(".go_time").show();
    $(".today_time").show();
    $(".cancel").show();
    $(".day_new").hide();
    $(".ri_li,.week_new").show();
    $(".time_warp").hide();
    $(".return").hide();
    $(".sure_").css("visibility","hidden");
    $(".getTime").css("bottom","-50rem");
    $(".mask").hide();
}
function return_t(){
    reset_all();
    time();
}
function today_time(obj){
    var now=new Date();
    var year=now.getFullYear();
    var mouth=now.getMonth()+1;
    var date=now.getDate();
    if(mouth<10){
        mouth="0"+mouth;
    }
    if(date<10){
        date="0"+date;
    }
    if(get_lose=="get"){
        $(".get_car_time").text(year+"-"+mouth+"-"+date+""+$(obj).find("p").text().substring(2));
    }else {
        $(".lose_car_time").text(year+"-"+mouth+"-"+date+""+$(obj).find("p").text().substring(2));
    }
    reset_all();
}
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var d = dd.getDate();
    return d;
}
function GetDateStr2(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    if(m<10){
        m="0"+m;
    }
    if(d<10){
        d="0"+d;
    }
    return y + "-" +m + "-" + d ;
}
var week;
/*这是新的时间*/
$(function(){
    var kk = 12;
    /*可以点击的天数*/
    var dd = new Date();
    week = dd.getDay();

    var str_day = '';
    for (var i = 0; i < 21; i++) {
        str_day += "<li>" + GetDateStr(-week + i) + "</li>";
    }
    $(".week_new").html(str_day);
    for (var j = 0; j < kk; j++) {
        $(".week_new li").eq(week + j).addClass("sel_day").click(function () {
            $(".week_new li").removeClass("sel_dd");
            $(this).addClass("sel_dd");
            $(".msg_title").text(GetDateStr2($(this).index() - week));
        });
    }

        $(".week_new li").eq(week).addClass("sel_dd");

    $(".time_show li").click(function(){
        $(".time_show li").removeClass("sel_time");
        $(this).addClass("sel_time");
    });
});
