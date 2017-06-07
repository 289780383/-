    font_size();
window.onresize = function() {
    font_size();
};

function font_size() {
    var deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth > 750) deviceWidth = 750; //640为设计稿宽度三处需要修改
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
}
$(function() {

    /**选择项目*/
    $(".main_list li").on("click", main_list);
    /**可选日期*/
    set_date(7);
    $(".auto-item").on("click", auto_item);
    /**定位当前地址坐标*/
    local_poi();
    /**捎句话*/
    $(".talk_msg").on("click", talk_msg);
    /**捎句话关闭*/
    $(".close_talk").on("click", close_talk);
    $(".talk_list li").on("click", talk_list);
});
/**捎句话关闭*/
function close_talk() {
    $(".talk").hide();
    $("html,body").css({ "height": "auto", "overflow": "auto" });
}
/**捎句话*/
function talk_msg() {
    var str = $(this).find("span").html().trim();
    $(".want_talk").text(str.replace(/<br>/, "；"));
    str = str.split("<br>");
    $(".talk_list li").removeClass("sel_talk");
    for (var i = 0; i < $(".talk_list li").length; i++) {
        for (var j = 0; j < str.length; j++) {
            if ($(".talk_list li").eq(i).text().trim() == str[j]) {
                $(".talk_list li").eq(i).addClass("sel_talk");
            }
        }
    }
    $(".talk").show();
    $("html,body").css({ "height": "100%", "overflow": "hidden" });
}
/**捎句话确定*/
function talk_save() {
    var txt = $(".want_talk").text().trim();
    if (txt.indexOf("；") == -1) {
        $(".talk_msg span").css("line-height", "1.1rem");
    } else {
        $(".talk_msg span").css("line-height", "0.54rem");
    }
    txt = txt.replace(/；/, "<br>");
    $(".talk_msg span").html(txt);
    close_talk();
}
/**选择话*/
function talk_list() {
    if ($(".sel_talk").length < 2) {
        $(this).toggleClass("sel_talk");
    } else if ($(this).hasClass('sel_talk')) {
        $(this).toggleClass("sel_talk");
    } else {
        return;
    }
    var str = '';
    for (var i = 0; i < $(".sel_talk").length; i++) {
        str += $(".sel_talk").eq(i).text().trim();
        if (i != $(".sel_talk").length - 1) {
            str += "；";
        }
    }
    if (str == "") {
        str = "选择备注";
    }
    $(".want_talk").text(str);
}

function auto_item() {
    var str = $(this).html().trim();
    var i = str.indexOf("<");
    str = str.substr(0, i);
    if ($(".city_select").attr("data-id") == "start") {
        $(".start_poi span").text(str);
    } else {
        $(".end_poi span").text(str);
    }
    city_fh();
}
/**输入提示**/
function tishi() {
    $(".city_title").on('keyup', function() {
        if ($(".city_title").val().length > 0) {
            input_auto($(".city_sel").text().trim(), $(this));
            $("#panel").hide();
            $("#input_auto").show();
        } else {
            $("#input_auto").hide();
            $("#panel").show();
        }
    });
}
/**关闭地点选择*/
function city_fh() {
    $("#panel").show();
    $(".city_select").hide();
    $(".city_title").val("");
    $("#panel").css("display", "block");
    $("#panel .amap-sug-result").html("");
    $("#input_auto").css("display", "none");
    $("html,body").css({ "height": "auto", "overflow": "auto" });
}
/**去预约*/
function go_yue() {
    window.open("fill_order.html", "_self", "");
}
/**选择项目*/
var Arr_line = ["烟台-济宁", "烟台-济宁", "烟台-济宁", "烟台-济宁", "烟台-济宁", "烟台-济宁"];
var Arr_date = ["2017-03-22", "2017-03-22", "2017-03-22", "2017-03-22", "2017-03-22"];
var Arr_time = ["08:00", "09:00", "10:00", "11:00", "12:00"];
var Arr_peo = [1, 2, 3, 4, 5, 6];
var Arr_peo_num = [1, 2, 3, 4, 5, 6, 7];
/**设置可选日期*/
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期 
    var d = dd.getDate();
    m < 10 ? m = "0" + m : m;
    d < 10 ? d = "0" + d : d;
    return y + "-" + m + "-" + d;
}

function set_date(n) {
    Arr_date = [];
    for (var i = 0; i < n; i++) {
        Arr_date.push(GetDateStr(i));
    }
}

function main_list() {
    $("html,body").css({ "height": "100%", "overflow": "hidden" });
    var peo = '';
    if ($(this).hasClass("start_poi")) {
        var poi = $(".line_id span").text().trim().split("-");
        if (poi.length <= 1) {
            return;
        }
        $(".city_sel").text(poi[0]);
        if (local_address.indexOf(poi[0]) < 0) {
            search_poi(poi[0]);
        } else {
            local_poi(poi[0]);
        }
        $(".city_select").attr("data-id", "start");
        $(".city_select").show();
        return;
    }
    if ($(this).hasClass("end_poi")) {
        var poi = $(".line_id span").text().trim().split("-");
        if (poi.length <= 1) {
            return;
        }
        $(".city_sel").text(poi[1]);
        search_poi(poi[1]);
        $(".city_select").show();
        $(".city_select").attr("data-id", "end");
        return;
    }
    if ($(this).hasClass("line_id")) {
        var arr = Arr_line;
        sel_box("线路", arr, peo);

    }
    if ($(this).hasClass("the_date")) {
        var arr = Arr_date;
        sel_box("日期", arr, peo);

    }
    if ($(this).hasClass("the_time")) {
        var arr = Arr_time;
        peo = Arr_peo_num;
        sel_box("时间", arr, peo);

    }
    if ($(this).hasClass("peo_num")) {
        var arr = Arr_peo;
        sel_box("人数", arr, peo);

    }
    var val = $(this).find("span").text().trim();
    $(".sel_list li").each(function(i) {
        if ($(this).find("p").text() == val) {
            $(this).addClass('sel_true');
        }
    });

}

function sel_box(el, arr, peo) {
    $(".sel_box,.mask").show();
    $(".sel_title").text("选择" + el);
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        str += '<li>';
        if (el == "人数") {
            str += '<p>' + arr[i] + '人</p>';
        } else {
            str += '<p>' + arr[i] + '</p>';
        }
        if (peo[i]) {
            str += '<span>' + peo[i] + '人预约</span>';
        }

        str += '</li>';
        $(".sel_list").html(str);
        sel_item();

    }
}

/**选择的浮层关闭*/
function sel_cancle() {
    $("html,body").css({ "height": "auto", "overflow": "auto" });
    $(".sel_box,.mask").hide();
}
/**选择具体项*/
function sel_item() {
    var item = $(".sel_title").text().trim().substring(2);
    $(".sel_list li").on("click", function() {
        var val = $(this).find("p").text().trim();
        if (item == '线路') {
            $(".line_id span").text(val);
        } else if (item == '日期') {
            $(".the_date span").text(val);
        } else if (item == '时间') {
            $(".the_time span").text(val);
        } else if (item == '人数') {
            $(".peo_num span").text(val);
        }
        sel_cancle();
    });

}
/**选择乘坐方式*/
function ride_way(e) {
    $(".ride_list li").removeClass("sel_way");
    $(e).addClass("sel_way");
}
/***/
var mapObj = new AMap.Map('', {
    resizeEnable: true
});

/**先确定我的坐标后搜附近*/
var lnglatXY = []; //坐标
var local_address = ''; //当前地理位置
function local_poi(c) {
    mapObj.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
        AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
    });

    //解析定位结果
    function onComplete(data) {
        local_address = data.formattedAddress;
        lnglatXY = [];
        lnglatXY = [data.position.getLng(), data.position.getLat()];
        zhoubian(c, lnglatXY, 2000);
    }
    //解析定位错误信息
    function onError(data) {
        console.log('定位失败');
    }
}
$(function() {
    local_poi();
    //search_poi('招远');
});

/**周边*/
function zhoubian(c, poi, m) {
    AMap.service(["AMap.PlaceSearch"], function() {
        var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            pageSize: 20,
            cityLimt:true,
            city: c
        });
        placeSearch.searchNearBy('', poi, m, function(status, result) {
            $("#panel .amap-sug-result").html("");
            var str = "";
            for (var i = 0; i < 10; i++) {
                if (!result.poiList.pois[i]) {
                    return;
                }
                str += '<div class="auto-item">' + result.poiList.pois[i].name + '<span class="auto-item-span">' + result.poiList.pois[i].address + '</span></div>';
            }
            $("#panel .amap-sug-result").html(str);
            $(".auto-item").on("click", auto_item);

        });
    });
}
/**城市搜索*/
function search_poi(c) {
    AMap.service(["AMap.PlaceSearch"], function() {
        var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            type: "汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施",
            pageSize: 20,
             citylimt:true,
            city: c
        });

        placeSearch.search('', function(status, result) {

            $("#panel .amap-sug-result").html("");
            var str = "";
            for (var i = 0; i < 10; i++) {
                if (!result.poiList.pois[i]) {
                    return;
                }
                str += '<div class="auto-item">' + result.poiList.pois[i].name + '<span class="auto-item-span">' + result.poiList.pois[i].address + '</span></div>';
            }
            $("#panel .amap-sug-result").html(str);
            $(".auto-item").on("click", auto_item);
        });
    });
}
/**输入提示*/
function input_auto(c, el) {
    if(c.trim()==""){
          c="全国";
    }
    AMap.service(["AMap.PlaceSearch"], function() {
        var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            citylimit:true,
city: c
        });
        //关键字查询
        placeSearch.search(el.val().trim(), function(status, result) {
            $("#input_auto .amap-sug-result").html("");
            var str = "";
            for (var i = 0; i < 10; i++) {
                if (result.poiList == undefined) {
                    return;
                }
                if (result.poiList.pois.length <= i) {
                    return;
                }
                str += '<div class="auto-item">' + result.poiList.pois[i].name + '<span class="auto-item-span">' + result.poiList.pois[i].address + '</span></div>';
            }
            $("#input_auto .amap-sug-result").html(str);
            $(".auto-item").on("click", auto_item);
        });
    });
}
