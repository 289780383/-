var n = 1;
/**banner背景图序号*/
var xsj = 0;
/**向下的箭头开关*/
var banner_time;
/**banner定时器*/
$(function () {
    /**初始化*/
    $(".send_time,.pin_time").val(GetDateStr(0));
    $(".next_day").text(GetDateStr(2).substring(5));
    /**banner背景切换*/
    $(".banner_nav li").mouseover(player);
    $(".banner_nav li").mouseout(function () {
        fn1();
    });
    /**banner背景自动切换*/
    fn1();

    /**trip*/
    $(".trip_left .trip_item").click(function () {
        for (var i = 0; i < $(".trip_item").length; i++) {
            $(".trip_item").eq(i).find("img").attr("src", "images/trip_" + (i + 1) + ".png");
        }
        $(".trip_right>li").hide();
        var k = $(this).index();
        if (k == 0) {
            $(".qcp").show();
        }
        if (k == 1) {
            $(".yzc").show();
            $(".yzc>div").hide();
            $(".yzc>div").eq(0).show();
            $(".yzc_type span").removeClass("select_yzc");
            $(".yzc_type span").eq(0).addClass("select_yzc");
        }
        if (k == 2) {
            $(".dzbx").show();
        }
        if (k == 3) {
            $(".jqzd").show();
        }
        $(".trip_item").removeClass("trip_active");
        var n = $(this).index() + 1;
        $(this).find("img").attr("src", "images/trip" + n + ".png");
        $(this).addClass("trip_active");
    });
    /**约租车*/
    $(".yzc_type span").click(function () {
        $(".yzc>div").hide();
        $(".yzc_type span").removeClass("select_yzc");
        $(this).addClass("select_yzc");
        var n = $(this).index();
        if (n == 0 || n == 1) {
            if(n==0){
                pin_bao("pin");
            }else if(n==1){
                pin_bao("bao");
            }
            $(".yzc>div").eq(0).show();
        } else {
            $(".yzc>div").eq(1).show();
        }
    });
    /**点击出发地*/

    $(".start_point").click(function (ev) {
        var e = ev || window.event;
        if (xsj == 0) {
            close_all();
            $(this).parent().find(".s_p_list").show();
            $(this).css("background-image", "url('images/xsj_up.png')");
            $(this).parent().find(".e_p_box").hide();
            xsj = 1;
        } else {
            $(this).parent().find(".s_p_list").hide();
            $(this).css("background-image", "url('images/xsj_down.png')");
            xsj = 0;

        }
        e.stopPropagation();
    });
    /**关闭窗口*/
    $(document).on("click", close_all);
    $(".dzbx_point_start,.s_p_list,.e_p_box,.e_p_box2,.yzc_c_list,.yzc_e_list,.yzc_d_list,.yzc_f_list,.yzc_z1l_list,.yzc_z2l_list,.yzc_z1r_list,.yzc_z2r_list").click(function (ev) {
        var e = ev || window.event;
        e.stopPropagation();
    });

    $(".start_point").blur(function () {
        if ($(this).val().trim() == "") {
            $(this).val("全部");
        }
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
    /**日期时间*/
    $( "input.text-box" ).datetimepicker({
        currentText: "现在",
        closeText: '确定',
        timeFormat: "HH:00",
        dateFormat: "yy-mm-dd",
        hourText: '出发时间',
        showTime: false,
        showButtonPanel: false,
        minDate: 0,
        maxDate: 30
    });


    /**点击目的地*/
    $(".end_point").click(function (ev) {
        var e = ev || window.event;
        $(".e_p_box2").hide();
        $(this).val("");
        $(this).parent().find(".e_p_box").show();
        $(".end_point").keyup(function(){
            $(this).parent().find(".e_p_box").hide();
            $(".e_p_box2").show();
            $(".e_p_box2 .yzc_p_item").on("click",e_p_box2);
        });
        e.stopPropagation();
    });
    $(".end_point").blur(function () {
        if ($(this).val().trim() == "") {
            $(this).val("中文/拼音/简拼");
        }
    });

    /**填值*/
    $(".point_item").on("click", start_city);
    $(".e_p_box span").on("click", end_city);
    /**点击英文分类*/
    $(".letter_group li").click(function () {
        $(".letter_group li").removeClass("letter-active");
        $(this).addClass("letter-active");
    });
    /**拼车包车*/
    $(".city_sel_go").on("click", select_city);
    $(".yzc_c_list .yzc_p_item").on("click", city_go);
    $(".pin_start").on("click", select_point);
    $(".yzc_d_list .yzc_p_end").on("click", point_go);
    $(".city_sel_to").on("click", select_city2);
    $(".yzc_e_list .yzc_p_item").on("click", city_to);
    $(".pin_end").on("click", select_point2);
    $(".yzc_f_list .yzc_p_end").on("click", point_to);
    /**租车*/
    $(".city_zl_go").on("click", select_city_zl);
    $(".yzc_z1l_list .yzc_p_item").on("click", city_go_zl);
    $(".pin_start_zr").on("click", select_point_zr);
    $(".yzc_z1r_list .yzc_p_end").on("click", point_go_zr);
    $(".city_zl_to").on("click", select_city2_zl);
    $(".yzc_z2l_list .yzc_p_item").on("click", city_to_zl);
    $(".pin_end_zr").on("click", select_point2_zr);
    $(".yzc_z2r_list .yzc_p_end").on("click", point_to_zr);

    /**定制班线*/
    $(".dzbx_point_start").on("click", dzbx_point1);
    $(".dzbx_point").on("click", dzbx_point);
    $(".s_p_list .dzbx_p_end").on("click", dzbx_point_start);
    $(".dzbx_list .dzbx_p_end").on("click", dzbx_point_end);
    /**景区直达*/
    $(".jqzd_point").on("click", jqzd_point);
    $(".jqzd_list .jqzd_p_end").on("click", jqzd_point_end);

    /**人数加减*/
    $(".jian").on("click", peo_jian);
    $(".add").on("click", peo_add);

});
/**文档加载完毕*/
/**焦点图*/
function fn1() {
    clearTimeout(banner_time);
    $(".banner_nav li").removeClass("banner_active");
    $(".banner_nav li").eq(n - 1).addClass("banner_active");
    $(".banner").css("background-image", "url('images/" + n + ".jpg')");
    if (n >= 4) {
        n = 0;
    }
    n++;
    banner_time = setTimeout(fn1, 3000);
}
/**点击最近行程*/
function near(obj) {
    var all = $(obj).text().split("—");
    $(".start_point").val("" + all[0] + "");
    $(".end_point").val("" + all[1] + "");
    $(".s_p_list").hide();
    $(".start_point").css("background-image", "url('images/xsj_down.png')");
    xsj = 0;
}
/**点击选择城市*/
function start_city() {
    $(this).parent().closest("li").find(".start_point").val("" + $(this).text() + "");
    $(this).parent().closest("li").find(".start_point").val("" + $(this).text() + "");
    $(this).parent().closest("li").find(".s_p_list").hide();
    $(this).parent().closest("li").find(".start_point").css("background-image", "url('images/xsj_down.png')");
    xsj = 0;

}
function end_city() {
    $(this).parent().parent().closest("li").find(".end_point").val("" + $(this).text() + "");
    $(this).parent().parent().closest("li").find(".e_p_box").hide();
}
/**明天后天*/
function get_date(obj) {
    var key = $(obj).text();
    if (key == "今天") {
        $(".send_time").val(GetDateStr(0));
    } else if (key == "明天") {
        $(".send_time").val(GetDateStr(1));
    } else{
        $(".send_time").val(GetDateStr(2));
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
/**关闭所有*/
function close_all() {
    xsj = 0;
    $(".s_p_list").hide();
    $(".e_p_box").hide();
    $(".e_p_box2").hide();
    $(".start_point").css("background-image", "url('images/xsj_down.png')");
    $(".yzc_c_list").hide();
    $(".city_sel_go").css("background-image", "url('images/xsj_down.png')");
    $(".yzc_d_list").hide();
    $(".yzc_e_list").hide();
    $(".city_sel_to").css("background-image", "url('images/xsj_down.png')");
    $(".yzc_f_list").hide();
    $(".yzc_z1l_list").hide();
    $(".city_zl_go").css("background-image", "url('images/xsj_down.png')");
    $(".yzc_z1r_list").hide();
    $(".yzc_z2l_list").hide();
    $(".city_zl_to").css("background-image", "url('images/xsj_down.png')");
    $(".yzc_z2r_list").hide();
    $(".dzbx_list").hide();
    $(".jqzd_list").hide();
}
/**点击选测城市*/
function select_city(ev) {
    var e = ev || window.event;

    if (xsj == 0) {
        close_all();
        $(this).css("background-image", "url('images/xsj_up.png')");
        $(this).parents(".pin_car").find(".yzc_c_list").show();
        xsj = 1;
    } else {
        $(this).css("background-image", "url('images/xsj_down.png')");
        $(this).parents(".pin_car").find(".yzc_c_list").hide();
        xsj = 0;
    }
    e.stopPropagation();
}
function select_city2(ev) {
    var e = ev || window.event;

    if (xsj == 0) {
        close_all();
        $(this).css("background-image", "url('images/xsj_up.png')");
        $(this).parents(".pin_car").find(".yzc_e_list").show();
        xsj = 1;
    } else {
        $(this).css("background-image", "url('images/xsj_down.png')");
        $(this).parents(".pin_car").find(".yzc_e_list").hide();
        xsj = 0;
    }
    e.stopPropagation();
}
function select_city_zl(ev) {
    var e = ev || window.event;

    if (xsj == 0) {
        close_all();
        $(this).css("background-image", "url('images/xsj_up.png')");
        $(this).parents(".zu_car").find(".yzc_z1l_list").show();
        xsj = 1;
    } else {
        $(this).css("background-image", "url('images/xsj_down.png')");
        $(this).parents(".zu_car").find(".yzc_z1l_list").hide();
        xsj = 0;
    }
    e.stopPropagation();
}
function select_city2_zl(ev) {
    var e = ev || window.event;
    if (xsj == 0) {
        close_all();
        $(this).css("background-image", "url('images/xsj_up.png')");
        $(this).parents(".zu_car").find(".yzc_z2l_list").show();
        xsj = 1;
    } else {
        $(this).css("background-image", "url('images/xsj_down.png')");
        $(this).parents(".zu_car").find(".yzc_z2l_list").hide();
        xsj = 0;
    }
    e.stopPropagation();
}

/**将选好的城市填入*/
function city_go(ev) {
    var e = ev || window.event;
    $(".city_sel_go").text($(this).text());
    $(".yzc_c_list").hide();
    $(".city_sel_go").css("background-image", "url('images/xsj_down.png')");
    xsj = 0;
    e.stopPropagation();
}
function city_to(ev) {
    var e = ev || window.event;
    $(".city_sel_to").text($(this).text());
    $(".yzc_e_list").hide();
    $(".city_sel_to").css("background-image", "url('images/xsj_down.png')");
    xsj = 0;
    e.stopPropagation();
}
function city_go_zl(ev) {
    var e = ev || window.event;
    $(".city_zl_go").text($(this).text());
    $(".yzc_z1l_list").hide();
    $(".city_zl_go").css("background-image", "url('images/xsj_down.png')");
    xsj = 0;
    e.stopPropagation();
}
function city_to_zl(ev) {
    var e = ev || window.event;
    $(".city_zl_to").text($(this).text());
    $(".yzc_z2l_list").hide();
    $(".city_zl_to").css("background-image", "url('images/xsj_down.png')");
    xsj = 0;
    e.stopPropagation();
}

/**选择点*/
function select_point(ev) {
    var e = ev || window.event;
    close_all();
    $(this).parents(".pin_car").find(".yzc_d_list").show();
    e.stopPropagation();
}
function select_point2(ev) {
    var e = ev || window.event;
    close_all();
    $(this).parents(".pin_car").find(".yzc_f_list").show();
    e.stopPropagation();
}
function select_point_zr(ev) {
    var e = ev || window.event;
    close_all();
    $(this).parents(".zu_car").find(".yzc_z1r_list").show();
    e.stopPropagation();
}
function select_point2_zr(ev) {
    var e = ev || window.event;
    close_all();
    $(this).parents(".zu_car").find(".yzc_z2r_list").show();
    e.stopPropagation();
}

/**填写点*/
function point_go(ev) {
    var e = ev || window.event;
    $(".pin_start").val($(this).find("p").text());
    $(".yzc_d_list").hide();
    e.stopPropagation();
}
function point_to(ev) {
    var e = ev || window.event;
    $(".pin_end").val($(this).find("p").text());
    $(".yzc_f_list").hide();
    e.stopPropagation();
}
function point_go_zr(ev) {
    var e = ev || window.event;
    $(".pin_start_zr").val($(this).find("p").text());
    $(".yzc_z1r_list").hide();
    e.stopPropagation();
}
function point_to_zr(ev) {
    var e = ev || window.event;
    $(".pin_end_zr").val($(this).find("p").text());
    $(".yzc_z2r_list").hide();
    e.stopPropagation();
}
/**定制班线*/
function dzbx_point1(ev) {
    var e = ev || window.event;
    close_all();
    $(this).parents(".dzbx").find(".s_p_list").show();
    e.stopPropagation();
}
function dzbx_point(ev) {
    var e = ev || window.event;
    close_all();
    $(this).parents(".dzbx").find(".dzbx_list").show();
    e.stopPropagation();
}
function dzbx_point_start(ev) {
    var e = ev || window.event;
    $(".dzbx_point_start").val($(this).find("p").text());
    $(".s_p_list").hide();
    e.stopPropagation();
}
function dzbx_point_end(ev) {
    var e = ev || window.event;
    $(".dzbx_point").val($(this).find("p").text());
    $(".dzbx_list").hide();
    e.stopPropagation();
}
/**景区直达*/
function jqzd_point(ev) {
    var e = ev || window.event;
    close_all();
    $(this).parents(".jqzd").find(".jqzd_list").show();
    e.stopPropagation();
}
function jqzd_point_end(ev) {
    var e = ev || window.event;
    $(".jqzd_point").val($(this).find("p").text());
    $(".jqzd_list").hide();
    e.stopPropagation();
}
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

/**查询*/
/**汽车票*/
$(function () {
    $(".search_qcp").on("click", search_qcp);
    $(".search_pin_bao").on("click", search_pin_bao);
    $(".search_zu").on("click", search_zu);
    $(".search_dzbx").on("click", search_dzbx);
    $(".search_jqzd").on("click", search_jqzd);

});
/**汽车票*/
function search_qcp() {
    var start = $(this).parent().find(".start_point").val().trim();
    var end = $(this).parent().find(".end_point").val().trim();
    var time = $(this).parent().find(".send_time").val().trim();
    if (start != "" && start != "全部" && end != "" && end != "中文/拼音/简拼" && time != "") {
        /**发送ajax请求跳转*/
        $.ajax({
            type: "POST", //GET
            url: "***.action",
            data: {}, //组装参数
            dataType: "json",
            success: function (data) {
            },
            error: function (data) {

            }
        });
    } else {
        $(this).append("<span class='msg_btn'>您填写的信息有误</span>")
        $(".search_qcp").off("click", search_qcp);
        setTimeout(function () {
            $(".msg_btn").remove();
            $(".search_qcp").on("click", search_qcp);
        }, 2000)
    }
}
var start_point,end_point,send_time,distance;
/**拼车包车*/
function search_pin_bao() {
    if($(this).hasClass("search_pin")){
        start_point = $(this).parent().find(".pin_start").val().trim();
        end_point = $(this).parent().find(".pin_end").val().trim();
        send_time = $(this).parent().find(".end-li").val().trim();
    }else {
         start_point = $(this).parent().find(".pin_start_b").val().trim();
         end_point = $(this).parent().find(".pin_end_b").val().trim();
         send_time = $(this).parent().find(".text-box").val().trim();
        distance=km;
    }
    var pin_or = $(".select_yzc").text();
    var start_city = $(this).parent().find(".city_sel_go").text();
    var end_city = $(this).parent().find(".city_sel_to").text();
    var peo = $(this).parent().find(".pin_peo").text();
    if (start_point != "" && start_point != "您从哪上车" && end_point != "" && end_point != "您从哪下车" && send_time != "") {
        /**ajax*/
    } else {
        $(this).append("<span class='msg_btn'>您填写的信息有误</span>");
        $(".search_pin_bao").off("click", search_pin_bao);
        setTimeout(function () {
            $(".msg_btn").remove();
            $(".search_pin_bao").on("click", search_pin_bao);
        },2000)
    }
}
/**租车*/
function search_zu() {
    var pin_or = $(".select_yzc").text();
    var start_city = $(this).parent().find(".city_zl_go").text();
    var start_point = $(this).parent().find(".pin_start_zr").val().trim();
    var end_city = $(this).parent().find(".city_zl_to").text();
    var end_point = $(this).parent().find(".pin_end_zr").val().trim();
    var time1 = $(this).parent().find(".pin_time").eq(0).val().trim();
    var time2 = $(this).parent().find(".pin_time").eq(1).val().trim();
    if (start_point != "" && start_point != "您从哪取车" && end_point != "" && end_point != "您从哪还车" && time1 != "" && time2 != "") {

    } else {
        $(this).append("<span class='msg_btn'>您填写的信息有误</span>");
        $(".search_zu").off("click", search_zu);
        setTimeout(function () {
            $(".msg_btn").remove();
            $(".search_zu").on("click", search_zu);
        }, 2000)
    }
}
/**定制班线*/
function search_dzbx(){
    var dz_start= $(this).parent().find(".dzbx_point_start").val().trim();
    var dz_end= $(this).parent().find(".dzbx_point").val().trim();
    var time= $(this).parent().find(".pin_time").val().trim();
    var peo= $(this).parent().find(".pin_peo").text();
    if(dz_start!="您从哪上车"&&dz_start!=""&&dz_end!="您从哪下车"&&jq_end!=""&&time!=""){

    }else {
        $(this).append("<span class='msg_btn'>您填写的信息有误</span>");
        $(".search_dzbx").off("click", search_dzbx);
        setTimeout(function () {
            $(".msg_btn").remove();
            $(".search_dzbx").on("click", search_dzbx);
        }, 2000)

    }
}
/**景区直达*/
function search_jqzd(){
    var jq= $(this).parent().find(".start_point").val().trim();
    var jq_start= $(this).parent().find(".jqzd_point").val().trim();
    var time= $(this).parent().find(".pin_time").val().trim();
    var peo= $(this).parent().find(".pin_peo").text();
    if(jq!="您要去哪个景区"&&jq!=""&&jq_start!="您要从哪乘车"&&jq_start!=""&&time!=""){

    }else {
        $(this).append("<span class='msg_btn'>您填写的信息有误</span>");
        $(".search_jqzd").off("click", search_jqzd);
        setTimeout(function () {
            $(".msg_btn").remove();
            $(".search_jqzd").on("click", search_jqzd);
        }, 2000)

    }
}
function e_p_box2(ev){
    var e = ev || window.event;
    $(".end_point").val($(this).text());
    $(".e_p_box2").hide();
    e.stopPropagation();
}
/**拼车还是包车*/
function pin_bao(a){
    if(a=="pin"){
        $(".pin_start_b,.pin_end_b,.pin_car .text-box,.search_bao").hide();
        $(".pin_start,.pin_end,.pin_car .end-li,.city_sel_to,.search_pin").show();
        $("#pin_end_b").css("width","170px");
    }else if(a=="bao") {
        $(".pin_start_b,.pin_end_b,.pin_car .text-box,.search_bao").show();
        $(".pin_start,.pin_end,.pin_car .end-li,.city_sel_to,.search_pin").hide();
        $("#pin_end_b").css("width","90%");
    }
}

/**输入高德*/
function city_(obj){
    $(obj).val("");
    var city=$(obj).parent().find("p").text();
    var city_id=$(obj).attr("class");
    tishi(city,city_id);
    $("body .amap-sug-result").css("margin-left" ,"-98px");

}
function city_2(obj){
    $(obj).val("");
    var city="全国";
    var city_id=$(obj).attr("class");
    tishi(city,city_id);
    $("body .amap-sug-result").css("margin-left" ,"0");

}

/**定义行程距离*/
var km=1,j_w1=[],j_w2=[];
/**输入提示**/
function tishi(c,i){
   AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
        var autoOptions = {
            city: c, //城市，默认全国
            citylimit:true,
            input: i//使用联想输入的input的id
        };
        autocomplete= new AMap.Autocomplete(autoOptions);
        var placeSearch = new AMap.PlaceSearch({
            city:c,
        });
      AMap.event.addListener(autocomplete, "select", function(e){

          if(autoOptions.city=="全国"){
             j_w2=[];
              j_w2.push(e.poi.location.getLng());
              j_w2.push(e.poi.location.getLat());

          }else {
              j_w1=[];
              j_w1.push(e.poi.location.getLng());
              j_w1.push(e.poi.location.getLat());

          }
          if(j_w1.length==2&&j_w2.length==2){
              com_distance();
          }
          $("body .amap-sug-result").remove();
            //TODO 针对选中的poi实现自己的功能
            placeSearch.search(e.poi.name)
        });
    });
}
/**计算公里数*/
var driving = new AMap.Driving({});
function com_distance(){
    driving.search(new AMap.LngLat(j_w1[0],j_w1[1]), new AMap.LngLat(j_w2[0],j_w2[1]),
    function(status,result){
        km=Math.round((new Number(result.routes[0].distance))/1000);
        }
    );
}
