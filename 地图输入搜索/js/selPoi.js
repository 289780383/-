(function($) {
    /**默认配置*/
    var settings = {
        "show": true, //输入框是否可用
        'poi_list': "", //地点列表元素名称
        "city": "", //限定的城市adcode
        "map_sel": false, //地图显示
        "open_map": "", //打开地图的元素名称
        "area": [] //限定区域
    };
    /**初始化*/
    var flag = false;
    var init = function(the) {
        list_poi(the);
        map.on('dragend', function(e) {
            flag = true;
            $("" + settings.poi_list + "").hide();
        });
        dw();
        dragLocation(the);
        if (!settings.show) {
            the.attr("readonly", "true");
        }
        if (settings.map_sel) {
            $("#container").show();

        } else {
            $("#container").hide();

        }
        if (settings.open_map != "") {
            $("" + settings.open_map + "").on("click", function() {
                $("#container").toggle();
                set_map_poi(the);
            });
        }
        input_change(the);
    };
    /**拖拽查找*/
    var positionPicker;
    var dragLocation = function(the) {
        AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
            positionPicker = new PositionPicker({
                mode: 'dragMap',
                map: map
            });
            positionPicker.on('success', function(positionResult) {
                if (flag) {
                    the.val(positionResult.nearestPOI);
                    flag = false;
                    the.attr({
                        "position": [positionResult.position],
                        "data-adcode": positionResult.regeocode.addressComponent.adcode
                    });
                area_adcode_limit(the);
                console.log(positionResult);
                }
                //console.log(positionResult.regeocode);
            });
            positionPicker.on('fail', function(positionResult) {});
            positionPicker.start();
        });

    }
    /**输入查找*/
    var input_change = function(the) {
        the.on("input propertychange", function() {
            AMap.service(["AMap.PlaceSearch"], function() {
                var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                    pageSize: 20,
                    pageIndex: 1,
                    citylimit: true,
                    city: settings.city, //城市
                });
                if (the.val().trim() == "") {
                    $("" + settings.poi_list + "").html("");
                    return;
                }

                //关键字查询
                placeSearch.search(the.val().trim(), function(status, result) {
                    console.log(result);
                    search_result(the, result);
                });
            });

        });

    }

    /**搜索结果处理*/
    var search_result = function(the, result) {
        $("" + settings.poi_list + "").show();
        var res = "";
        if (result.info == "OK") {
            res = result.poiList.pois;
        } else {
            return;
        }
        if (settings.poi_list) {
            var str = "<ul id='the_list'>";
            //console.log(res);
            res.forEach(function(el, i) {
                str += '<li position="' + el.location + '"><p>' + el.name + '</p><span>' + el.address + '</span></li>';
            });
            str += '</ul>';
            $("" + settings.poi_list + "").html(str);
        }
    };
    var set_map_poi = function(the) {
        var the_position = the.attr("position");
        if (the_position != "" && typeof(the_position) !== "undefined") {
            var location = the.attr("position").split(",");
            //map.setCenter([location[0], location[1]]);
            positionPicker.start([location[0], location[1]]);
            map.setZoom(16);
            return;
        } else {
            local_adcode == "000000" ? alert("定位失败，可尝试刷新页面。") : console.log("定位成功");
            if (settings.city.substr(0, 4) == local_adcode.substr(0, 4)) {
                map.setCenter(local_poi);
                map.setZoom(16);
            } else {
                map.setCity(settings.city);
                map.setZoom(8);
            }
        }
    };
    /**点击列表选择*/
                var list_poi=function(the){
                            $(settings.poi_list).delegate('li', 'click', function() {
                the.val($(this).find("p").text().trim());
                var location = $(this).attr("position").split(",");
                var the_adcode;
                if (settings.city == "") {
                    the_adcode = "000000";
                } else {
                    the_adcode = settings.city;
                }
                the.attr({
                    "position": $(this).attr("position"),
                    "data-adcode": the_adcode
                });
                //map.setCenter([location[0], location[1]]);
                positionPicker.start([location[0], location[1]]);
                map.setZoom(16);
                $(settings.poi_list).hide();
                area_adcode_limit(the);
            });

            }


    /**定位当前点*/
    var local_adcode = "000000",
        local_jw;
    var dw = function() {
        map.plugin('AMap.Geolocation', function() {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, //是否使用高精度定位，默认:true
            });
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
            AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
        });

        function onComplete(data) {
            local_adcode = data.addressComponent.adcode;
            local_poi = [data.position.getLng(), data.position.getLat()];
        }
        //解析定位错误信息
        function onError(data) {
            console.log('定位失败');
        }

    };


    /**判断坐标点是否在范围内*/
    var area_adcode_limit = function(the) {

        var path = [];
        path.push(settings.area);
        //console.log(path[0].length);
        if (path[0].length >0) {
            var polygon = new AMap.Polygon({
                map: map,
                path: path,
                strokeOpacity: 0.2, //线透明度
                strokeWeight: 1, //线宽
                fillOpacity: 0 //填充透明度
            });
            var p = the.attr("position").split(",");
            if (!polygon.contains([p[0], p[1]])) {
                msg_show("超出经营范围", 1000);
                return false;
            }

        } else {
            if (settings.city == "") {
                return true;
            }
            if (the.attr("data-adcode").substr(0, 4) != settings.city.substr(0, 4)) {
                msg_show("超出城市范围", 1000);
                return false;
            }
        }
        return true;
    }



    $.fn.selPoi = function(options) {
        //创建一些默认值，拓展任何被提供的选项
        settings = $.extend({}, settings, options);
        init(this);
    };
})(jQuery);