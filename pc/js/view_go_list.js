/**
 * Created by Administrator on 2016/10/25 0025.
 */
/**景区直达*/
/**选择出发点*/
function jqzd_point(ev) {
    var e = ev || window.event;
    close_all();
    $(".jqzd_list").show();
    e.stopPropagation();
}
function jqzd_point_end(ev) {
    var e = ev || window.event;
    $(".banner_start").val($(this).find("p").text());
    $(".jqzd_list").hide();
    e.stopPropagation();
}
/**选择景点*/
function jqzd_end(ev) {
    var e = ev || window.event;
    close_all();
    $(".s_p_list").show();
    e.stopPropagation();
}
function jqzd_end_this(ev) {
    var e = ev || window.event;
    $(".banner_end").val($(this).text());
    $(".s_p_list").hide();
    e.stopPropagation();
}
/**文档加载*/
$(function () {
    /**填写信息*/
    $(".banner_end").on("click", jqzd_end);
    $(".s_p_list .point_item").on("click", jqzd_end_this);
    $(".banner_start").on("click", jqzd_point);
    $(".jqzd_list .jqzd_p_end").on("click", jqzd_point_end);
    $(document).on("click", close_all);
    $(".banner_time").val(GetDateStr(0));
    /**人数加减*/
    $(".jian").on("click", peo_jian);
    $(".add").on("click", peo_add);
    /**查询提示*/
    $(".search_btn").on("click",search_btn);
    /**date*/
    date7();
    $(".result_date li").eq(0).addClass("select_time");
    $(".result_date li").on("click", select_time);
    /**弹窗点击不关闭*/
    $(".jqzd_list,.s_p_list").click(function (ev) {
        var e = ev || window.event;
        e.stopPropagation();
    });

});
/**等待拼车的时间*/
function select_time() {
    $(".result_date li").removeClass("select_time");
    $(this).addClass("select_time");
}
/**加载时间*/
function date7() {
    var str = '';
    for (var da = 0; da < 7; da++) {
        str += "<li>" + GetDateStr(da).substring(5) + "</li>"
    }
    $(".result_date").html(str);
}

/**关闭弹窗*/
function close_all() {
    $(".jqzd_list").hide();
    $(".s_p_list").hide();
}
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

/**人数加减*/
function peo_jian() {
    var z = $(this).next(".pin_peo").text().length;
    var k = parseInt($(this).next(".pin_peo").text().substring(0, z));
    if (k <= 1) {
        return;
    }
    $(this).next(".pin_peo").text((k - 1) + "人");
}
function peo_add() {
    var z = $(this).prev(".pin_peo").text().length;
    var k = parseInt($(this).prev(".pin_peo").text().substring(0, z));
    $(this).prev(".pin_peo").text((k + 1) + "人");
}
function search_btn(){
    var jq=$(this).parent().find(".banner_end").val().trim();
    var jq_start=$(this).parent().find(".banner_start").val().trim();
    var time=$(this).parent().find(".banner_time").val().trim();
    var peo=$(this).parent().find(".pin_peo").text();
    if(jq!="您想去哪个景区"&&jq!=""&&jq_start!="您从哪上车"&&jq_start!=""&&time!=""){
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