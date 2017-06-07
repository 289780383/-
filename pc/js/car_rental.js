/**
 * Created by Administrator on 2016/10/25 0025.
 */
function hot_item_over() {
    $(this).stop(true);
    $(this).addClass("item_img");
    if ("IE" == mb) {
        $(this).animate({"zoom": "1.1", left: "-10px", top: "-15px"}, 500);
    }
}
function hot_item_out() {
    $(this).stop(true);
    $(this).removeClass("item_img");
    if ("IE" == mb) {
        $(this).animate({"zoom": "1", left: "0", top: "0"}, 500);
    }
}
/**文档加载*/
$(function () {
    /**初始化*/
    $(".yzc_type span").eq(0).addClass("select_type");
    $(".pin_car").show();
    /**date*/
    date7();
    $(".wait_date li").eq(0).addClass("select_time");
    $(".wait_date li").on("click", select_time);
    /**车型*/
    $(".show_type li").eq(0).addClass("sel_show_type");
    $(".show_type  li").on("click", sel_show_type);
    /**select_city*/
    $(".out_city li").on("click", sel_out_city);
    /**绑定图片的移入移出动画*/
    $(".item_top img").on("mouseenter", hot_item_over);
    $(".item_top img").on("mouseleave", hot_item_out);
    /**填写信息*/
    $(document).on("click", close_all);
    /**人数加减*/
    $(".jian").on("click", peo_jian);
    $(".add").on("click", peo_add);
    /**查询提示*/
    $(".search_pin_bao").on("click", search_pin_bao);
    $(".search_btn_zu").on("click", search_btn_zu);
    /**拼包车*/
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

    /**弹窗点击不关闭*/
    $(".yzc_c_list,.yzc_e_list,.yzc_d_list,.yzc_f_list,.yzc_z1l_list,.yzc_z2l_list,.yzc_z1r_list,.yzc_z2r_list").click(function (ev) {
        var e = ev || window.event;
        e.stopPropagation();
    });
    $(".yzc_type span").click(function () {
        $(".yzc_type span").removeClass("select_type");
        $(this).addClass("select_type");
        var n=$(this).index();
        if (n < 2) {
                if(n==0){
                    pin_bao("pin");
                }else if(n==1){
                    pin_bao("bao");
                }

                $(".zu_car").hide();
            $(".pin_car").show();
        } else {
            $(".zu_car").show();
            $(".pin_car").hide();
        }
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

});
/**等待拼车的时间*/
function select_time() {
    $(".wait_date li").removeClass("select_time");
    $(this).addClass("select_time");
}
/**选择乘车种类*/
function sel_show_type() {
    $(".show_type li").removeClass("sel_show_type");
    $(this).addClass("sel_show_type");
}
/**选城市*/
function sel_out_city() {
    $(".out_city li").removeClass("sel_out_city");
    $(this).addClass("sel_out_city");
}
/**加载时间*/
function date7() {
    var str = '';
    for (var da = 0; da < 7; da++) {
        str += "<li>" + GetDateStr(da).substring(5) + "</li>"
    }
    $(".wait_date").html(str);
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
    if (star_point != "您从哪上车" && star_point != "" && end_point != "您从哪下车" && end_point != "" && time != "约定时间" && time != "") {
        /**ajax*/
    } else {
        $(this).append("<span class='msg_btn'>您填写的信息有误</span>");
        $(".search_pin_bao").off("click", search_pin_bao);
        setTimeout(function () {
            $(".msg_btn").remove();
            $(".search_pin_bao").on("click", search_pin_bao);
        }, 2000)
    }
}
function search_btn_zu() {
    var yzc_type = $(".select_type").text();
    var start_city = $(this).parent().find(".city_zl_go").text();
    var star_point = $(this).parent().find(".pin_start_zr").val().trim();
    var end_city = $(this).parent().find(".city_zl_to").text();
    var end_point = $(this).parent().find(".pin_end_zr").val().trim();
    var time1 = $(this).parent().find(".banner_time").eq(0).val().trim();
    var time2 = $(this).parent().find(".banner_time").eq(1).val().trim();
    if (star_point != "您从哪取车" && star_point != "" && end_point != "您从哪还车" && end_point != "" && time1 != "取车时间" && time1 != "" && time2 != "还车时间" && time2 != "") {
        /**ajax*/
    } else {
        $(this).append("<span class='msg_btn'>您填写的信息有误</span>");
        $(".search_btn_zu").off("click", search_btn_zu);
        setTimeout(function () {
            $(".msg_btn").remove();
            $(".search_btn_zu").on("click", search_btn_zu);
        }, 2000)
    }
}
/**关闭所有*/
var xsj = 0;
function close_all() {
    xsj = 0;
    $(".yzc_c_list").hide();
    $(".city_sel_go").css("background-image", "url('images/xsj_down.png')");
    $(".yzc_d_list").hide();
    $(".yzc_e_list").hide();
    $(".city_sel_to").css("background-image", "url('images/xsj_down.png')");
    $(".yzc_f_list").hide();
    /**租车*/
    $(".yzc_z1l_list").hide();
    $(".city_zl_go").css("background-image", "url('images/xsj_down.png')");
    $(".yzc_z1r_list").hide();
    $(".yzc_z2l_list").hide();
    $(".city_zl_to").css("background-image", "url('images/xsj_down.png')");
    $(".yzc_z2r_list").hide();

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


/**拼车还是包车*/
function pin_bao(a){
    if(a=="pin"){
        $(".pin_start_b,.pin_end_b,.pin_car .text-box,.search_bao").hide();
        $(".pin_start,.pin_end,.pin_car .end-li,.city_sel_to,.search_pin").show();
        $("#pin_end_b").css("width","170px");
    }else if(a=="bao") {
        $(".pin_start_b,.pin_end_b,.pin_car .text-box,.search_bao").show();
        $(".pin_start,.pin_end,.pin_car .end-li,.city_sel_to,.search_pin").hide();
        $("#pin_end_b").css("width","268px");
    }
}

/**输入高德*/
function city_(obj){
    $(obj).val("");
    var city=$(obj).parent().find("p").text();
    var city_id=$(obj).attr("class");
    tishi(city,city_id);
    $("body .amap-sug-result").css("margin-left" ,"-97px");
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
