function pay_way(obj) {
    $(".way_list span,.why_main span").removeClass("selected");
    $(obj).find("span").toggleClass("selected", '');
}
$(function(){
    /**r人数减*/
$(".peo_jian").on("click",peo_jian);
    /**人数加*/
$(".peo_add").on("click",peo_add);
    /**初始化金币*/
    money_init();
});
function money_init(){
    var num=$(".the_peo_num").text().trim();
    num=num.substr(0,num.length-1);
    var price=$(".the_price").text().trim();
    $(".the_money").text(num*price);
}
/**人数减*/
function peo_jian(){
    var num=$(this).parent().find("span").text().trim();
    num=num.substr(0,num.length-1);
    var price=$(".the_price").text().trim();
    if(num>1){
        num--;
        $(".peo_add").removeClass("peo_off");
        $(".the_money").text(num*price);
    }else {
        $(this).addClass("peo_off");
        return;
    }
    $(this).parent().find("span").text(num+"人");
}
/**人数上限*/
var max_peo=5;
/**人数加*/
function peo_add(){
    var num=$(this).parent().find("span").text().trim();
    num=num.substr(0,num.length-1);
    var price=$(".the_price").text().trim();
    if(num<max_peo){
        num++;
        $(".the_money").text(num*price);
        $(".peo_jian").removeClass("peo_off");
    }else {
        $(this).addClass("peo_off");
        return;
    }
    $(this).parent().find("span").text(num+"人");
}
/**日期选择*/
$(function () {
    var currYear = (new Date()).getFullYear();
    var opt = {};
    opt.date = {preset: 'date'};
    opt.datetime = {preset: 'datetime'};
    opt.time = {preset: 'time'};
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear, //开始年份
        endYear: currYear + 10 //结束年份
    };
    $(".the_day").mobiscroll($.extend(opt['date'], opt['default']));
});
