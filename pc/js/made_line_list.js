/**
 * Created by Administrator on 2016/11/21 0021.
 */
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
    $(".banner_end").val($(this).find("p").text());
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
    /**人数加减*/
    $(".jian").on("click", peo_jian);
    $(".add").on("click", peo_add);
    /**查询提示*/
    $(".search_btn").on("click", search_btn);
    /**date*/
    date7();
    $(".result_date li").eq(0).addClass("select_time");
    $(".result_date li").on("click", select_time);
    /**弹窗点击不关闭*/
    $(".jqzd_list,.s_p_list").click(function (ev) {
        var e = ev || window.event;
        e.stopPropagation();
    });

    /**开通or招募*/
    $(".result_title").on("click", result_title);

    /**排序*/
    $(".result1_title span").on("click", pai_xu);

    /**高德提示*/
    tishi("new_start");
    tishi("new_end");
    $("#new_start,#new_end").focus(function () {
        if ($(this).val() == "请输入出发地" || $(this).val() == "请输入目的地") {
            var msg = $(this).val();
            $(this).val("");
        }
        $(this).blur(function () {
            if ($(this).val().trim() == "") {
                $(this).val(msg);
            }
        });
    });
    /**点击div让input获得焦点*/
    $(".msg_warp p").click(function () {
        $(this).find("input").focus();
    });
    /**日期时间*/
    $(".dan_time").datetimepicker({
        timeOnlyTitle: '滑动选择时间',
        showButtonPanel: false,
        closeText: '确定',
        timeOnly: true,
        hourText: '小时',
        minuteText: '分钟',
        showTime: false,
        showMinute: true,
        stepMinute: 30
    });
    /**提交与重填*/
    $(".submit_btn").on("click", submit_btn);
    $(".reset_btn").on("click", reset_btn);
    /**初始化显示哪一个*/
    show_one("开通");
});
/**初始化显示哪一个*/
function show_one(k) {
    if (k == "开通") {
        $(".result_old1").show();
        $(".result_new").hide();
    } else {
        $(".result_old1").hide();
        $(".result_new").show();
    }
}

/**排序*/
function pai_xu() {
    $(".result1_title span").removeClass("sel_pai");
    $(this).addClass("sel_pai");
    if ($(this).text() == "按发车时间排序") {

        function d(a) {
            var l = $(a).find(".trip_time").text().split(":");
            var m = parseInt(l[0] * 60) + parseInt(l[1]);
            return m;
        }

        var asc = function (a, b) {
            return d(a) > d(b) ? 1 : -1;
        };
    } else {
        var asc = function (a, b) {
            return parseInt($(a).find('.trip_money>span').text()) > parseInt($(b).find('.trip_money>span').text()) ? 1 : -1;
        };
    }
    var sortByInput = function (sortBy) {
        var sortEle = $('.result_old1 .result1_item').sort(sortBy);
        $('.result_old1 .result1_main').empty().append(sortEle);

    };
    sortByInput(asc);

}

/**开通or发起*/
function result_title() {
    $(".result_title").removeClass("result_title_active");
    $(this).addClass("result_title_active");
    if ($(this).index() == 0) {
        /**处理事件*/
        $(".result_old1").show();
        $(".result_new").hide();
    } else {
        $(".result_old1").hide();
        $(".result_new").show();
    }
}
/**重填按钮*/
function reset_btn() {
    $(".msg_warp i").text("");
    $("#new_start").val("请输入出发地");
    $("#new_end").val("请输入目的地");
    $(".new_start_time").val("08:30");
    $(".new_end_time").val("17:30");
}
/**提交按钮*/
function submit_btn() {
    var start = $("#new_start").prev("i").text().trim() + $("#new_start").val().trim();
    var end = $("#new_end").prev("i").text().trim() + $("#new_end").val().trim();
    var start_time = $(".new_start_time").val().trim();
    var end_time = $(".new_end_time").val().trim();
    if (start != ""&&start != "请输入出发地"&& end != "" &&end != "请输入目的地" && start_time != "" && end_time != "") {
        var str = "<div class='mask'></div>";
        str += "<div class='mask2'>";
        str += "<img src='images/sure__03.png'>";
        str += "<p>定制信息提交成功！</p>";
        str += "<span>若线路开通，我们将第一时间通知您！</span>";
        str += "</div>";
        $("body").append(str);
        $(".mask").show();
        setTimeout(function () {
            $(".mask,.mask2").remove();
        }, 3000);
    }else {
        $(".submit_btn").append("<i>信息填写有误</i>");
        setTimeout(function () {
            $(".submit_btn i").remove();
        }, 3000);


    }
}
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
function search_btn() {
    var jq = $(this).parent().find(".banner_start").val().trim();
    var jq_start = $(this).parent().find(".banner_end").val().trim();
    var time = $(this).parent().find(".banner_time").val().trim();
    var peo = $(this).parent().find(".pin_peo").text();
    if (jq != "您从哪上车" && jq != "" && jq_start != "您从哪下车" && jq_start != "" && time != "") {
        /**ajax*/
    } else {
        $(this).append("<span class='msg_btn'>您填写的信息有误</span>");
        $(".search_btn").off("click", search_btn);
        setTimeout(function () {
            $(".msg_btn").remove();
            $(".search_btn").on("click", search_btn);
        }, 2000)

    }
}
/**高德提示*/
function tishi(i) {
    AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
        var autoOptions = {
            city: "滨州|烟台|威海|济南", //城市，默认全国
            citylimit: true,
            input: i//使用联想输入的input的id
        };
        autocomplete = new AMap.Autocomplete(autoOptions);
        AMap.event.addListener(autocomplete, "select", function (e) {
            $("#" + i + "").bind('input propertychange', function () {    ////*用于监听input的输入事件
                if ($(this).val() == "") {
                    $("#" + i + "").prev("i").text("");
                }
            });
            var str = e.poi.district;
            if ((str.indexOf("市")) > 0) {
                var my_city = str.substr(str.indexOf("省") + 1, str.indexOf("市") - 2);
                if (str.indexOf("省") == "-1") {
                    my_city = str.substr(0, str.indexOf("市") + 1);
                }
                $("#" + i + "").prev("i").text(my_city + " ·");
            } else {
                $("#" + i + "").prev("i").text("");
            }
            //TODO 针对选中的poi实现自己的功能
        });
    });
}
