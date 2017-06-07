/**点击出发点*/
function start_station() {

    $("#panel").show();
    $(".city_sel").text(my_city);
    tishi();
    $(".city_title").val("");
    $(".city_title").attr("placeholder", "您从哪上车");
    $(".city_title").attr("title", "1");
    $(".city_title,.city_p").show();
    $(".city_pin,.city_nav,.city_main").hide();

    $.ajax({
        type: "POST", //GET
        url: "***.action",
        data: {
            start_end: "start"
        },
        dataType: "json",
        success: function (data) {
            /**将城市数据铺到列表中*/
            var city = [
                {"letter": "a", "city": ["石家庄", "阿拉善", "安庆"]},
                {"letter": "b", "city": ["石家庄", "阿拉善", "安庆"]},
                {"letter": "c", "city": ["石家庄", "阿拉善", "安庆"]},
                {"letter": "d", "city": ["石家庄", "阿拉善", "安庆"]},
                {"letter": "e", "city": ["石家庄", "阿拉善", "安庆"]},
                {"letter": "f", "city": ["石家庄", "阿拉善", "安庆"]},
                {"letter": "a", "city": ["石家庄", "阿拉善", "安庆"]},
                {"letter": "b", "city": ["石家庄", "阿拉善", "安庆"]},
                {"letter": "c", "city": ["石家庄", "阿拉善", "安庆"]},
                {"letter": "d", "city": ["石家庄", "阿拉善", "安庆"]},
                {"letter": "e", "city": ["石家庄", "阿拉善", "安庆"]},
                {"letter": "f", "city": ["石家庄", "阿拉善", "安庆"]}

            ];
            var str_A = '';
            var str_a = '';
            for (var i = 0; i < city.length; i++) {
                str_A += "<li>" + city[i].letter.toLocaleUpperCase() + "</li>";
                str_a += "<li class='c_a'>";
                str_a += "<span>" + city[i].letter.toLocaleUpperCase() + "</span>";
                for (var j = 0; j < city[i].city.length; j++) {
                    str_a += "<p>" + city[i].city[j] + "</p>";
                }
                str_a += "</li>";

            }
            $(".city_nav").html(str_A);
            $(".city_list").html(str_a);
            $(".city_select").show();
            gundong();
        },
        error: function (data) {
            /**测试这里该删除*/
            var city = [
                {"letter": "a", "city": ["哈尔滨", "阿拉善", "安庆"]},
                {"letter": "b", "city": ["哈尔滨", "阿拉善", "安庆"]},
                {"letter": "c", "city": ["哈尔滨", "阿拉善", "安庆"]},
                {"letter": "d", "city": ["哈尔滨", "阿拉善", "安庆"]},
                {"letter": "e", "city": ["哈尔滨", "阿拉善", "安庆"]},
                {"letter": "f", "city": ["哈尔滨", "阿拉善", "安庆"]}
            ];
            var str_A = '';
            var str_a = '';
            for (var i = 0; i < city.length; i++) {
                str_A += "<li>" + city[i].letter.toLocaleUpperCase() + "</li>";
                str_a += "<li class='c_" + city[i].letter + "'>";
                str_a += "<span>" + city[i].letter.toLocaleUpperCase() + "</span>";
                for (var j = 0; j < city[i].city.length; j++) {
                    str_a += "<p>" + city[i].city[j] + "</p>";
                }
                str_a += "</li>";

            }
            $(".city_nav").html(str_A);
            $(".city_list").html(str_a);

            $(".city_select").show();
            gundong();
        }
    });

}
/**点击返回*/
function city_fh() {
    $(".city_sel").show();
    $(".city_title,.city_p").show();
    $(".city_pin,.city_nav,.city_main").hide();
    $(".city_select").hide();
    $("#panel").show();
}
/**单击具体的点*/
function tian_dian() {
    var city = $(".city_sel").text();
    var city_point = $(this).find("p").text();
    if ($(".city_title").attr("title") == 1) {
        $(".start_point").val(city + " · " + city_point);
    } else if ($(".city_title").attr("title") == 2) {
        $(".end_point").val(city + " · " + city_point);
    }
    city_fh();
}

function tian_dian1() {
    var city = $(".city_sel").text();
    var city_point = $(this).find(".poi-name").text();
    if ($(".city_title").attr("title") == 1) {
        $(".start_point").val(city + " · " + city_point);
    } else if ($(".city_title").attr("title") == 2) {
        $(".end_point").val(city + " · " + city_point);
    }
    city_fh();
}


/**点击标题小城市*/
function city_sel(obj) {
    $(obj).hide();
    $(".city_title,.city_p").hide();
    $(".city_pin,.city_nav,.city_main").show();
    $(".city_pin").val("");
    $("#panel").hide();
}
/**点击目的城市*/
function end_station(AMap, geolocation) {

    $("#panel").show();
    $(".city_sel").text(my_city);
    tishi();
    $(".city_title").val("");
    $(".city_title").attr("placeholder", "您从哪下车");
    $(".city_title").attr("title", "2");
    $.ajax({
        type: "POST", //GET
        url: "***.action",
        data: {
            start_end: $(".position_start").val()
        },
        dataType: "json",
        success: function (data) {
            /**将城市数据铺到列表中*/
            var city = [
                {"letter": "x", "city": ["西安", "西安", "西安", "西安", "西安", "西安"]},
                {"letter": "y", "city": ["烟台市", "烟台市", "烟台市", "烟台市", "烟台市", "烟台市"]},
                {"letter": "z", "city": ["张家界", "张家界", "张家界", "张家界", "张家界"]}
            ];
            var str_A = '';
            var str_a = '';
            for (var i = 0; i < city.length; i++) {
                str_A += "<li>" + city[i].letter.toLocaleUpperCase() + "</li>";
                str_a += "<li class='c_a'>";
                str_a += "<span>" + city[i].letter.toLocaleUpperCase() + "</span>";
                for (var j = 0; j < city[i].city.length; j++) {
                    str_a += "<p>" + city[i].city[j] + "</p>";
                }
                str_a += "</li>";

            }
            $(".city_nav").html(str_A);
            $(".city_list").html(str_a);
            $(".city_select").show();
            gundong();
        },
        error: function (data) {
            /**测试这里该删除*/
            var city = [
                {"letter": "x", "city": ["西安", "西安", "西安", "西安", "西安", "西安"]},
                {"letter": "y", "city": ["烟台市", "烟台市", "烟台市", "烟台市", "烟台市", "烟台市"]},
                {"letter": "z", "city": ["张家界", "张家界", "张家界", "张家界", "张家界"]}
            ];
            var str_A = '';
            var str_a = '';
            for (var i = 0; i < city.length; i++) {
                str_A += "<li>" + city[i].letter.toLocaleUpperCase() + "</li>";
                str_a += "<li class='c_" + city[i].letter + "'>";
                str_a += "<span>" + city[i].letter.toLocaleUpperCase() + "</span>";
                for (var j = 0; j < city[i].city.length; j++) {
                    str_a += "<p>" + city[i].city[j] + "</p>";
                }
                str_a += "</li>";

            }
            $(".city_nav").html(str_A);
            $(".city_list").html(str_a);

            $(".city_select").show();
            gundong();
        }
    });

}
function local_city(obj) {
    $(".city_sel").text($(obj).find("span").text());
    $(".city_title,.city_p").show();
    $(".city_pin,.city_nav,.city_main").hide();
    $(".city_sel").show();
    $("#panel").show();
}
/**城市列表滚动*/
function gundong() {

    $(".city_nav li").click(function () {
        $("html,body").animate({scrollTop: $(".c_" + $(this).text().toLocaleLowerCase() + "").offset().top - $(".city_top").height()}, 1000);
    });
    $(".city_list p").click(function () {
        $(".city_sel").show();
        $(".city_sel").text($(this).text());
        $(".city_title,.city_p").show();
        $(".city_pin,.city_nav,.city_main").hide();
        tishi();
        if ($(".city_sel").text() == my_city) {
            $("#panel").show();
        } else {
            $("#panel").hide();
        }

    });
}
$(function () {
    /**点击具体的点添值*/
    $(".city_p li").on("click", tian_dian);
    $("#panel").show();
    /**选择时间段*/
    $(".time_type li").on("click", time_type);
    $(".time_show li").on("click", time_show);
});
/**输入提示**/
function tishi() {
    AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
        var autoOptions = {
            city: $(".city_sel").text(), //城市，默认全国
            input: "keyword"//使用联想输入的input的id
        };
        autocomplete = new AMap.Autocomplete(autoOptions);
        var placeSearch = new AMap.PlaceSearch({
            city: $(".city_sel").text(),
            map: map
        })
        AMap.event.addListener(autocomplete, "select", function (e) {
            var city = $(".city_sel").text();
            var city_point = e.poi.name;
            if ($(".city_title").attr("title") == 1) {
                $(".start_point").val(city + " · " + city_point);
            } else if ($(".city_title").attr("title") == 2) {
                $(".end_point").val(city + " · " + city_point);
            }
            city_fh();

            //TODO 针对选中的poi实现自己的功能
            placeSearch.search(e.poi.name)
        });
    });

}
/**周边*/

function zhou_bian() {
    var map = new AMap.Map("container", {
        resizeEnable: true
    });
    AMap.service(["AMap.PlaceSearch"], function () {
        var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            pageSize: 20,
            pageIndex: 1,
            city: $(".city_sel").text(), //城市
            map: map,
            panel: "panel"
        });

        var cpoint = lnglatXY; //中心点坐标
        placeSearch.searchNearBy('', cpoint, 2000, function (status, result) {
            $(".poibox").on("click", tian_dian1);
        });
    });
}
/**选择时间*/
function get_time(obj) {
    if ($(obj).attr("class") == "start_time") {
        $(".bot_msg").text("请选择去程时间");
    } else {
        $(".bot_msg").text("请选择回程时间");
    };
    $(".time_type li").eq(0).trigger("click");
    $(".getTime,.mask").show();
}
/**选择时间段*/
var time_type0 = ["04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30"];
var time_type1 = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
var time_type2 = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"];
var time_type3 = ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"];
function time_type() {
    $(".time_type li").removeClass("sel_hour");
    $(this).addClass("sel_hour");
    if ($(this).index() == 0) {
        time_list(time_type0);
    } else if ($(this).index() == 1) {
        time_list(time_type1);
    } else if ($(this).index() == 2) {
        time_list(time_type2);
    } else {
        time_list(time_type3);
    }

    function time_list(a) {
        var str = "";
        for (var i = 0; i < time_type0.length; i++) {
            str += "<li>" + a[i] + "</li>";
        }
        $(".time_show").html(str);
        $(".time_show li").on("click", time_show);
        $(".time_show li").eq(0).addClass("sel_time");
    }
}
/**选择具体时间点*/
function time_show() {
    $(".time_show li").removeClass("sel_time");
    $(this).addClass("sel_time");
}
/**点击取消*/
function cancel_btn(){
    $(".getTime,.mask").hide();
}/**点击确定*/
function sure_btn(){
    $(".getTime,.mask").hide();
    if($(".bot_msg").text()=="请选择去程时间"){
        $(".start_time").val($(".sel_time").text());
    }else {
        $(".end_time").val($(".sel_time").text());
    }
}