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
    $("#send_date").mobiscroll($.extend(opt['date'], opt['default']));
    $("#receive_date").mobiscroll($.extend(opt['date'], opt['default']));
    /**初始化*/
    $(".main_nav p").eq(0).addClass("sel_nav");
    $(".send_info").eq(0).show();
    /**导航按钮*/
    $(".main_nav p").on("click", main_nav);
    /**发货点击提交*/
    $(".send_btn").on("click",send_btn);
    /**点击酒店返回按钮*/
    $(".close_mask").on("click",close_mask);

});
function main_nav() {
    $(".main_nav p").removeClass("sel_nav");
    $(this).addClass("sel_nav");
    $(".send_info,.receive_info").hide();
    if($(this).index()==0){
        $(".send_info").show();
    }else {
        $(".receive_info").show();
    }
}
function send_btn(){
    $(".submit_end").show();
}
function close_mask(){
    $(this).parent().parent().hide();
}

