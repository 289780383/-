/**
 * Created by Administrator on 2016/10/22 0022.
 */

/**汽车票*/
/**选择出发点*/
function jqzd_point(ev) {
    var e = ev || window.event;
    close_all();
    $(".jqzd_list").show();
    e.stopPropagation();
}
function jqzd_point_end(ev) {
    var e = ev || window.event;
    $(".banner_end").val($(this).find("p").text());
    $(".jqzd_list").hide();
    e.stopPropagation();
}
/**选择点*/
function jqzd_end(ev) {
    var e = ev || window.event;
    close_all();
    $(".s_p_list").show();
    e.stopPropagation();
}
function jqzd_end_start(ev) {
    var e = ev || window.event;
    $(".banner_start").val($(this).find("p").text());
    $(".s_p_list").hide();
    e.stopPropagation();
}
/**文档加载*/
$(function () {
    /**填写信息*/
    $(".banner_start").on("click", jqzd_end);
    $(".s_p_list .jqzd_p_end").on("click", jqzd_end_start);
    $(".banner_end").on("click", jqzd_point);
    $(".jqzd_list .jqzd_p_end").on("click", jqzd_point_end);
    $(document).on("click", close_all);
    $(".banner_time").val(GetDateStr(0));
    /**查询提示*/
    $(".search_btn").on("click",search_btn);

});
/**关闭弹窗*/
function close_all() {
    $(".jqzd_list").hide();
    $(".s_p_list").hide();
}
/**弹窗点击不关闭*/
$(".jqzd_list,.s_p_list").click(function (ev) {
    var e = ev || window.event;
    e.stopPropagation();
});
/**双日历*/
var bookLimitdays = 12;
var currDate = '2016-10-24';
$(function ($) {
    $(".startDay").datepicker({
        //defaultDate: currDate,
        //changeMonth: false,

        nextText: '>',
        prevText: '<',
        numberOfMonths: 2,
        dateFormat: 'yy-mm-dd',
        minDate: "+0w",
        maxDate: '+' + bookLimitdays + 'd',
        onSelect: function (dateText, inst) {
            var date1 = new Date(Date.parse(dateText.replace(/-/g, "/"))); //转换成Data();
            $("#showWeek").html($.datepicker.formatDate("DD", date1));
        }
    });
    var date = new Date(Date.parse(currDate.replace(/-/g, "/"))); //转换成Data();


    $("#showWeek").html($.datepicker.formatDate("DD", date));

});

function search_btn(){
    var jq=$(this).parent().find(".banner_start").val().trim();
    var jq_start=$(this).parent().find(".banner_end").val().trim();
    var time=$(this).parent().find(".banner_time").val().trim();
    if(jq!="您从哪上车"&&jq!=""&&jq_start!="您从哪下车"&&jq_start!=""&&time!=""){
        /**ajax*/
    }else {
        $(this).append("<span class='msg_btn'>您填写的信息有误</span>");
        $(".search_btn").off("click", search_btn);
        setTimeout(function () {
            $(".msg_btn").remove();
            $(".search_btn").on("click",search_btn);
        }, 2000)

    }
}
/**新闻公告*/
function news(obj) {
    var msg = $(obj).text();
    $(".m_r_top p,.m_r_top span").css({"background-color": "#fff", "color": "#363636"});
    $(obj).css({"background-color": "#fd4f00", "color": "#fff"});
    if (msg == "新闻") {

    } else {

    }
}
