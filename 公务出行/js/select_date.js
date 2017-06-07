/**
 * Created by Administrator on 2016/10/17 0017.
 */
/**出行时间*/
function time() {
    $(".getTime").show();
    $(".mask").show();
    get_date();
    $(".get_date li").on("click", get_d);
    $(".get_time li").on("click", fn1);
}
/**关闭时间层*/
function close_time() {
    $(".getTime").hide();
    $(".mask").hide();

}
/**点击确定按钮*/
function get_time_sure() {
    var y = new Date().getFullYear();
    $(".select_t span").text("" + y + "-" + $(".sel_li p").text() + " " + $(".sel_time").text() + "");
    close_time();
}
/**拼座*/
function pin_zuo(obj) {
    $(".select_pz p i").removeClass("selected");
    $(obj).find("i").addClass("selected");
    $(".select_pz").find("span").removeClass("sel_span");
    $(obj).find("span").addClass("sel_span");
    com_money();
}
function GetDateStr2(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    if (m < 10) {
        m = "0" + m;
    }
    if (d < 10) {
        d = "0" + d;
    }
    return m + "-" + d;
}
$(function () {
    get_date();
    $(".get_date li").on("click", get_d);
    $(".get_time li").on("click", fn1);
    var y = new Date().getFullYear();
    $(".select_t span").text(""+y+"-"+GetDateStr2(0)+"");
});

/**可预定天数*/
var day_num = 7;
/*得到日期*/
function get_date() {

    $(".get_date").css("width", "" + day_num * $(".get_date li").outerWidth(true) + "px");
    var str = "";
    str += "<li class='sel_li'><p class='sel_p'>" + GetDateStr2(0) + "</p><span>今天</span></li>";
    str += "<li><p class='sel_p'>" + GetDateStr2(1) + "</p><span>明天</span></li>";
    str += "<li><p class='sel_p'>" + GetDateStr2(2) + "</p><span>后天</span></li>";
    for (var i = 3; i < day_num; i++) {
        str += "<li><p>" + GetDateStr2(i) + "</p></li>";
    }
    $(".get_date").html(str);
    time1(GetDateStr2(0));
}
/**点击日期获取具体时间列表*/
function time1(date) {
    $.ajax({
        type: "POST", //GET
        url: "***.action",
        data: {
            select_date: date
        }, //组装参数
        dataType: "json",
        success: function (data) {
            var str = '';
            /*模拟数据为sj*/
            var sj = ["07:20", "08:20", "09:20", "10:20", "11:20", "12:20"];
            str += "<li class='sel_time'>" + sj[0] + "</li>";
            for (var i = 1; i < sj.length; i++) {
                str += "<li>" + sj[i] + "</li>";
            }
            $(".get_time").html(str);
            $(".get_time li").on("click", fn1);
        },
        error: function (data) {
            var str = '';
            /*模拟数据为sj*/
            var sj = ["07:20", "08:20", "09:20", "10:20", "11:20", "12:20"];
            str += "<li class='sel_time'>" + sj[0] + "</li>";
            for (var i = 1; i < sj.length; i++) {
                str += "<li>" + sj[i] + "</li>";
            }
            $(".get_time").html(str);
            $(".get_time li").on("click", fn1);
        }
    });

}
/**选择具体时间*/
function fn1() {
    $(".get_time li").removeClass("sel_time");
    $(this).addClass("sel_time");
}
/**选择日期*/
function get_d() {
    $(".get_date li").removeClass("sel_li");
    $(this).addClass("sel_li");
    var tm = $(this).find("p").text();
    time1(tm);
}
/**点击确认*/
function go_trip() {
    var m_txt = $(".sel_span").text();
    /**钱*/
    var n_txt = $(".select_p span").text();
    /**人*/
    var the_money = m_txt.substring(0, m_txt.indexOf("元"));
    var the_peo = n_txt.substring(0, n_txt.indexOf("人"));
    var pin_or = true;
    /**拼座与否*/
    if ($(".sel_span").parent().attr("class") != "select_pin") {
        pin_or = false;
    }
    /**ajax乘车信息成功后跳转*/
    $.ajax({
        type: "POST", //GET
        url: "***.action",
        data: {
            people_number: the_peo,
            send_time: $(".select_t span").text(),
            pin_or: pin_or,
            pin_money: the_money,
            all_money: $(".all_money span").text()
        }, //线路信息
        dataType: "json",
        success: function (data) {
            window.open("trip.html", "_self", "");
        },
        error: function (data) {
            window.open("trip.html", "_self", "");
        }
    });

}