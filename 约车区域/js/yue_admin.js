/**all_data所有数据，all_order接单页面数据，wsc_people地图未上车人数据，all_car地图车数据,wjd_order未接单数据*/
var all_data = [],
    all_order = [],
    wsc_people = [],
    all_car = [],
    wjd_order = [];
/**自动刷新数据时间间隔单位分钟 */
var data_new_time = 3;
/**点击分页用临时数据*/
var all_data_ls = [];
/**搜索过滤后的数据*/
var search_data = [];
$(function() {
    /**隐藏地图控件*/
    $(".amap-logo,.amap-copyright,.amap-mcode,.amap-toolbar").remove();
    map.clearMap(); // 清除地图覆盖物
    /**下拉列表select*/
    $(".select_box>div").on("click", open_select);
    $(".select_list li").on("click", select_item);
    /**单选列表radio*/
    $(".radio_box li").on("click", radio_item);
    $("body").on("click", close_all);
    /**设置列表高度*/
    set_height();
    /**打开接单列表*/
    $(".order_sure").on("click", order_sure);
    /**订单导航nav*/
    $(".order_nav li").on("click", order_nav);
    /**关闭订单列表*/
    $(".close_table").on("click", close_table);
    /**订单排序*/
    $(".order_select").on("change", order_select);
    /**订单查找*/
    $(".sure_table .order_search_btn").on("click", order_search_btn);
    $(".dispatch_table .order_search_btn").on("click", order_search_btn);
    /**接单确认*/
    $(".trip_sure").on("click", trip_sure);
    /**接单取消*/
    $(".trip_cancel").on("click", trip_cancel);
    /**show_or*/
    $(".show_no").on("click", show_no);
    $(".show_yes").on("click", show_yes);
    /**日期插件*/
    /*    laydate({
            elem: '#form_date2', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
            format: 'YYYY-MM-DD hh:mm:ss', //日期格式
            istime: true, //是否开启时间选择
            isclear: true, //是否显示清空
            istoday: true, //是否显示今天
            issure: true, //是否显示确认
            festival: true, //是否显示节日
            min: '1900-01-01 00:00:00', //最小日期
            max: '2099-12-31 23:59:59', //最大日期
            start: '2014-6-15 23:00:00', //开始日期
            fixed: false, //是否固定在可视区域
        });
    */
    /**录入订单*/
    $(".entry_again").on("click", entry_again);
    /**弹出层order_mask*/
    $(".close_mask").on("click", close_mask);
    /**派单页面dispatch*/
    $(".dispatch").on("click", dispatch);
    $(".dispatch_sure").on("click", dispatch_sure);
    $(".dispatch_submit").on("click", dispatch_submit);
    $(".dispatch_cancel").on("click", dispatch_cancel);

    /**刷新数据*/
    data_new();
    data_auto(data_new_time);
    /**地点输入提示*/
    $("#start_poi, #end_poi").on('keyup', function(e) {
        input_auto("", $(this));
        e.stopPropagation();
    });
    $(document).on("click", function() {
        $(".data_box_local,.data_box").css("visibility", "hidden");
        $(".date_list").css("display", "none");
    });
    $("#start_poi2, #end_poi2").on('keyup', function(e) {
        var arr = $(this).parents(".order_mask").find(".order_title").text().trim().split("-");
        console.log(arr);
        if ($(this).hasClass('form_start')) {
            input_auto(arr[0], $(this));
        } else {
            input_auto(arr[1], $(this));
        }
        e.stopPropagation();
    });
    /**选择日期*/
    $(".form_date,.form_time").on("click", select_date);

    function select_date(e) {
        $(".date_list").hide();
        $(this).parent().find(".date_list").show();
        e.stopPropagation();
    }
    /**选择日期项目*/
    $(".date_list li").on("click", select_date_item);

    function select_date_item() {
        $(".date_list").hide();
        $(this).parent().siblings('input').val($(this).text().trim());
    }
    /**选择条目*/
    $(".sel_the_trip").on("click", sel_the_trip);
    /**全选*/
    $(".sel_sort_all").on("click", sel_sort_all);
});
var local_data = [ /**数据*/ {
    address: "逍遥津街道淮河路77号百盛购物中心1楼",
    location: "117.294321,31.864564",
    name: "DFS专柜"
}, {
    address: "逍遥津街道淮河路77号百盛购物中心1楼",
    location: "117.294321,31.864564",
    name: "DFS专柜"
}];
/**显示本地数据*/
        function  show_local_data(el){
              var str_local = "";
                    if (local_data.length > 0) {
            for (var j = 0; j < local_data.length; j++) {
                str_local += '<li data-poi="' + local_data[j].location + '"><span class="state_name">' + local_data[j].name + '</span><span class="state_poi">' + local_data[j].address + '</span></li>';
            }
            el.parent().find(".data_box_local").html(str_local);
            el.parent().find(".data_box_local").css("visibility", "visible");
            el.parent().find(".data_box").css("visibility", "hidden");
            $(".data_box_local li").on("click", function() {
                el.val($(this).find(".state_name").text().trim());
                $(".data_box,.data_box_local").remove();
                if (el.attr("id") == "start_poi") {
                    addMarker_start($(this).attr("data-poi"));
                } else if (el.attr("id") == "end_poi") {
                    addMarker_end($(this).attr("data-poi"));
                } else if (el.attr("id") == "start_poi2") {
                    addMarker_start_s($(this).attr("data-poi"));
                } else if (el.attr("id") == "end_poi2") {
                    addMarker_end_s($(this).attr("data-poi"));
                }
            });}
        }

/**输入提示*/
function input_auto(c = "全国", el) {

    if (el.val().trim().length == 0) {
        show_local_data(el);

            return;
        
    }
    var new_data_local = [];
    el.parent().find(".data_box_local").remove();
    el.parent().append("<ul class='data_box_local'></ul>");
    var str_local = "";
    $.each(local_data, function(i) {
        if (local_data[i].address.toLowerCase().indexOf(el.val().trim().toLowerCase()) >= 0) {
            new_data_local.push(local_data[i]);
        } else if (local_data[i].name.toLowerCase().indexOf(el.val().trim().toLowerCase()) >= 0) {
            new_data_local.push(local_data[i]);
        }
    });
    if (new_data_local.length > 0) {
        for (var j = 0; j < new_data_local.length; j++) {
            str_local += '<li data-poi="' + new_data_local[j].location + '"><span class="state_name">' + new_data_local[j].name + '</span><span class="state_poi">' + new_data_local[j].address + '</span></li>';
        }
        el.parent().find(".data_box_local").html(str_local);
        el.parent().find(".data_box_local").css("visibility", "visible");
        el.parent().find(".data_box").css("visibility", "hidden");
        $(".data_box_local li").on("click", function() {
            el.val($(this).find(".state_name").text().trim());
            $(".data_box,.data_box_local").remove();
            if (el.attr("id") == "start_poi") {
                addMarker_start($(this).attr("data-poi"));
            } else if (el.attr("id") == "end_poi") {
                addMarker_end($(this).attr("data-poi"));
            } else if (el.attr("id") == "start_poi2") {
                addMarker_start_s($(this).attr("data-poi"));
            } else if (el.attr("id") == "end_poi2") {
                addMarker_end_s($(this).attr("data-poi"));
            }
        });

    } else {
        el.parent().find(".data_box_local").css("visibility", "hidden");

        AMap.service(["AMap.PlaceSearch"], function() {
            var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                citylimit: true,
                city: c
            });
            //关键字查询
            placeSearch.search(el.val().trim(), function(status, result) {
                el.parent().find(".data_box").remove();
                el.parent().append("<ul class='data_box'></ul>");

                if (status != "complete") {
                    return;
                }
                var str = "";
                for (var i = 0; i < 10; i++) {
                    if (!result.poiList.pois[i]) {
                        return;
                    }
                    str += '<li data-poi="' + result.poiList.pois[i].location + '"><span class="state_name">' + result.poiList.pois[i].name + '</span><span class="state_poi">' + result.poiList.pois[i].address + '</span></li>'
                }
                el.parent().find(".data_box").html(str);
                el.parent().find(".data_box").css("visibility", "visible");
                $(".data_box li").on("click", function() {
                    el.val($(this).find(".state_name").text().trim());
                    $(".data_box,.data_box_local").remove();
                    if (el.attr("id") == "start_poi") {
                        addMarker_start($(this).attr("data-poi"));
                    } else if (el.attr("id") == "end_poi") {
                        addMarker_end($(this).attr("data-poi"));
                    } else if (el.attr("id") == "start_poi2") {
                        addMarker_start_s($(this).attr("data-poi"));
                    } else if (el.attr("id") == "end_poi2") {
                        addMarker_end_s($(this).attr("data-poi"));
                    }
                });

            });

        });

    }
}

/**自动刷新数据*/
/**刷新记时间*/
var count = 0;

function data_auto(time) {
    setTimeout(function() {
        count++;
        if (count >= time * 60) {
            data_new();
        }
    }, 1000);

}
/**刷新数据*/
function data_new() {
    /**加载数据*/
    $.ajax({
        type: "POST",
        url: "data.json",
        dataType: "json",
        success: function(data) {
            count = 0;
            all_data = data;
            all_order = data.all_order;
            all_car = data.all_car;
            wsc_people = [];
            for (var i = 0; i < all_order.length; i++) {
                if (all_order[i].in_car == false) {
                    wsc_people.push(all_order[i])
                }
            };
            all_car = data.all_car;
            render_poi(wsc_people, all_car);
            /**未接单数量*/
            wjd_order = [];
            for (var i = 0; i < all_order.length; i++) {
                if (all_order[i].order_jie == false) {
                    wjd_order.push(all_order[i]);
                }
            };
            // 未接单小圆圈提示
            if (wjd_order.length != 0) {
                $(".order_sure i").css("display", "block");
                $(".order_sure i").text(wjd_order.length);
            } else {
                $(".order_sure i").css("display", "none");
            }

            /**设置拼车包车选项*/
            sel_list(all_order);
            /**全部线路下拉列表*/
            all_line_list(all_car);
            /**全部车辆下拉列表*/
            all_car_list(all_car);
        },
        error: function(data) {
            console.log("数据请求失败");
        }
    });
}
/**全部线路下拉列表*/
function all_line_list(data) {
    var list = [];
    $.each(data, function(i) {
        if (list.indexOf(data[i].line_name) == -1) {
            list.push(data[i].line_name);
        }
    });
    var str = "<li><p>全部线路</p></li>";
    for (var k = 0; k < list.length; k++) {
        str += "<li><p>" + list[k] + "</p></li>";
    }
    $(".all_line .select_list").html(str);
    $(".select_list li").on("click", select_item);
}
/**全部车辆下拉列表*/
function all_car_list(data) {
    var list = [];
    $.each(data, function(i) {
        if (list.indexOf(data[i].id) == -1) {
            list.push(data[i]);
        }
    });
    var str = "<li><p>全部车辆</p></li>";
    for (var k = 0; k < list.length; k++) {
        str += "<li><p>" + list[k].id + "</p><span>余" + list[k].seat_num + "座</span>";
        if (list[k].up_or == "up") {
            str += "<i>上行</i></li>";
        } else {
            str += "<i>下行</i></li>";
        }
    }
    $(".all_car .select_list").html(str);
    $(".select_list li").on("click", select_item);
}

/**设置拼车包车选项*/
function sel_list(data) {
    var list = [];
    $.each(data, function(i) {
        if (list.indexOf(data[i].pin_bao) == -1) {
            list.push(data[i].pin_bao);
        }
    });
    var str = "";

    for (var k = 0; k < list.length; k++) {
        str += "<option>" + list[k] + "</option>";
    }
    $(".form_way").html(str);
}

/**地图车辆筛选*/
function cars_map_data(data) {
    var car1 = [],
        car2 = [],
        car3 = [],
        car4 = [];
    var line_name = $(".all_line div").text().trim();
    var car_id = $(".all_car div").text().trim();
    var car_state = $(".car_state .radio_sel").siblings("p").text().trim();
    var up_or = $(".up_down .radio_sel").siblings("p").text().trim();
    if (line_name == "全部线路") {
        car1 = data;
    } else {
        for (var i = 0; i < data.length; i++) {
            if (line_name == data[i].line_name) {
                car1.push(data[i]);
            }
        }
    }
    if (car_id == "全部车辆") {
        car2 = car1;
    } else {
        for (var i = 0; i < car1.length; i++) {
            if (car_id == car1[i].id) {
                car2.push(car1[i]);
            }
        }
    }
    switch (car_state) {
        case "所有":
            car3 = car2;
            break;
        case "待客":
            car_state = "d";
            break;
        case "运行":
            car_state = "y";
            break;
        case "空车":
            car_state = "k";
            break;
        case "停运":
            car_state = "t";
    }
    for (var i = 0; i < car2.length; i++) {
        if (car_state == car2[i].state) {
            car3.push(car2[i]);
        }
    }
    switch (up_or) {
        case "所有":
            car4 = car3;
            break;
        case "上行":
            up_or = "up";
            break;
        case "下行":
            up_or = "down";

    }
    for (var j = 0; j < car3.length; j++) {
        if (up_or == car3[j].up_or) {
            car4.push(car3[j]);
        }
    }
    return car4;
}
/**派单页面dispatch*/
function dispatch() {
    $(".sure_table").hide();
    $(".dispatch_table").show();
    $(".dispatch_table .order_nav li").eq(0).trigger("click");
    $(".dispatch_table .order_select").val($(".dispatch_table .order_select option").eq(0).text());
}

function dispatch_sure() {
    $(this).parent().find(".submit_warp").show();
}

function dispatch_submit() {
    msg_show("提交成功", 1000);
}

function dispatch_cancel() {
    show_or("派单");

}
/**弹出层order_mask*/
function close_mask() {
    $(this).parents(".order_mask").hide();
    $(".mask2").hide();
}

/**录入订单*/
function entry_again() {
    $(this).parents(".order_entry").find("input").val("");
    $(this).parents(".order_entry").find("select").val("");
    small_map.remove(start_s_markers);
    small_map.remove(end_s_markers);

}
/**创建页码分页*/
function create_pages(el, page) {
    $(".tcdPageCode").remove();
    $("." + el + " .order_footer").append('<div class="tcdPageCode"></div>');
    $("." + el + " .tcdPageCode").createPage({
        pageCount: page,
        current: 1,
        backFn: function(p) {
            console.log(p);
            if (el == "sure_table") {
                order_jie(all_data_ls, p, true);
            } else {
                order_pai(all_data_ls, p, true);
            }
        }
    });
}

/**接单确认*/
function trip_sure() {
    var order_id = $(this).parents("li").attr("data-id");
    var the_data = {};
    $.each(all_order, function(i) {
        if (order_id == all_order[i].id) {
            the_data = all_order[i];
        }
    });

    $(".order_mask").attr("data-id", order_id);
    $(".order_mask .order_title").text(the_data.line_name);
    $(".order_mask .form_name").val(the_data.name);
    $(".order_mask .form_tel").val(the_data.tel);
    $(".order_mask .form_way").val(the_data.pin_bao);
    $(".order_mask .form_num").val(the_data.number);
    $(".order_mask #form_date2").val(the_data.date + " " + the_data.time);
    $(".order_mask .form_start").val(the_data.start_poi);
    $(".order_mask .form_end").val(the_data.end_poi);
    $(".order_mask,.mask2").show();
    /*    input_tishi("", "start_poi2");
        input_tishi("", "end_poi2");
    */
    addMarker_start_s(the_data.start_poi_jw[0] + ',' + the_data.start_poi_jw[1]);
    addMarker_end_s(the_data.end_poi_jw[0] + ',' + the_data.end_poi_jw[1]);
}
/**接单取消*/
function trip_cancel() {
    show_or("接单");
}
/**show_or*/
function show_or(msg) {
    $(".show_or .show_title").text("是否真的取消" + msg + "？");
    $(".show_or,.mask2").show();
}

function show_no() {
    $(".show_or,.mask2").hide();
}

function show_yes() {
    show_no();
}
/**订单排序*/
var sort_key = 0;

function order_select() {
    var the_data = [];
    if (search_data.length == 0) {
        the_data = all_data_ls;
    } else {
        the_data = search_data;
    }
    /**线路排序*/
    if ($(this).val().indexOf("线路") >= 0) {
        if (sort_key == 0) {
            the_data.sort(NumAscSort);
            if ($(".sure_table").css("display") == "block") {
                order_jie(the_data, 1, true);
            } else {
                order_pai(the_data, 1, true);
            }
            sort_key = 1;
        } else {
            the_data.sort(NumDescSort);
            if ($(".sure_table").css("display") == "block") {
                order_jie(the_data, 1, true);
            } else {
                order_pai(the_data, 1, true);
            }
            sort_key = 0;
        }

        function NumAscSort(a, b) {
            return a.sort_xl - b.sort_xl;
        }

        function NumDescSort(a, b) {
            return b.sort_xl - a.sort_xl;
        }
        /**支付方式*/
    } else if ($(this).val().indexOf("支付方式") >= 0) {
        /**升降排序*/
        if (sort_key == 0) {
            the_data.sort(NumAscSort);
            if ($(".sure_table").css("display") == "block") {
                order_jie(the_data, 1, true);
            } else {
                order_pai(the_data, 1, true);
            }
            sort_key = 1;
        } else {
            the_data.sort(NumDescSort);
            if ($(".sure_table").css("display") == "block") {
                order_jie(the_data, 1, true);
            } else {
                order_pai(the_data, 1, true);
            }
            sort_key = 0;
        }

        function NumAscSort(a, b) {
            return a.sort_zffs - b.sort_zffs;
        }

        function NumDescSort(a, b) {
            return b.sort_zffs - a.sort_zffs;
        }

    } else if ($(this).val().indexOf("时间") >= 0) {
        /**升降排序*/
        if (sort_key == 0) {
            the_data.sort(NumAscSort);
            if ($(".sure_table").css("display") == "block") {
                order_jie(the_data, 1, true);
            } else {
                order_pai(the_data, 1, true);
            }
            sort_key = 1;
        } else {
            the_data.sort(NumDescSort);
            if ($(".sure_table").css("display") == "block") {
                order_jie(the_data, 1, true);
            } else {
                order_pai(the_data, 1, true);
            }
            sort_key = 0;
        }

        function NumAscSort(a, b) {
            return Date.parse(new Date(a.date + " " + a.time)) - Date.parse(new Date(b.date + " " + b.time));
        }

        function NumDescSort(a, b) {
            return Date.parse(new Date(b.date + " " + b.time)) - Date.parse(new Date(a.date + " " + a.time));
        }

    } else if ($(this).val().indexOf("订单状态") >= 0) {
        /**升降排序*/
        if (sort_key == 0) {
            the_data.sort(NumAscSort);
            if ($(".sure_table").css("display") == "block") {
                order_jie(the_data, 1, true);
            } else {
                order_pai(the_data, 1, true);
            }
            sort_key = 1;
        } else {
            the_data.sort(NumDescSort);
            if ($(".sure_table").css("display") == "block") {
                order_jie(the_data, 1, true);
            } else {
                order_pai(the_data, 1, true);
            }
            sort_key = 0;
        }

        function NumAscSort(a, b) {
            return a.sort_ddzt - b.sort_ddzt;
        }

        function NumDescSort(a, b) {
            return b.sort_ddzt - a.sort_ddzt;
        }
    }
}

/**订单查找*/
function order_search_btn() {
    var input_val = $(this).siblings("input").val().NoSpace();
    if (input_val == "") {
        return;
    }
    search_data = [];
    $.each(all_data_ls, function(i) {
        if (all_data_ls[i].tel.indexOf(input_val) == 0 || all_data_ls[i].name.indexOf(input_val) == 0) {
            search_data.push(all_data_ls[i]);
        }
    });
    if ($(".sure_table").css("display") == "block") {
        order_jie(search_data, 1, true);
        var p1 = search_data.length / 10;
        var p2 = search_data.length % 10;
        if (p2 > 0) {
            p1++;
        }

        create_pages("sure_table", p1);
    } else {
        order_pai(search_data, 1, true);
        var p1 = search_data.length / 10;
        var p2 = search_data.length % 10;
        if (p2 > 0) {
            p1++;
        }

        create_pages("dispatch_table", p1);

    }
}
/**关闭订单列表*/
function close_table() {
    $(this).parents(".order_table").hide();
}
/**订单导航nav*/
function order_nav() {
    search_data = [];
    $(".order_search input").val("");
    $(this).parents(".order_table").find(".order_select").val($(this).parents(".order_table").find(".order_select option").eq(0).text());
    $(this).parent().find("li").removeClass("sel_nav");
    $(this).addClass("sel_nav");
    $(this).parents(".order_table").find(".order_mid,.order_bot,.order_footer").show();
    $(this).parents(".order_table").find(".order_entry").hide();
    if ($(this).index() == "3") {
        $(this).parents(".order_table").find(".order_mid,.order_bot,.order_footer").hide();
        $(this).parents(".order_table").find(".order_entry").show();
    }
    if ($(".sure_table").css("display") == "block") {
        /**接单页面*/
        if ($(this).index() == "0") {
            data_new();
            var data = all_data,
                the_order = [];
            for (var i = 0; i < data.all_order.length; i++) {
                if (data.all_order[i].order_jie == false) {
                    the_order.push(data.all_order[i])
                }
            };
            order_jie(the_order, 1, false);
            all_data_ls = the_order;
        } else if ($(this).index() == "1") {
            data_new();
            var data = all_data,
                the_order = [];
            for (var i = 0; i < data.all_order.length; i++) {
                if (data.all_order[i].order_jie == true) {
                    the_order.push(data.all_order[i])
                }
            };
            order_jie(the_order, 1, false);
            all_data_ls = the_order;
        } else if ($(this).index() == "2") {
            data_new();
            var data = all_data,
                the_order = [];
            order_jie(data.all_order, 1, false);
            all_data_ls = data.all_order;
        }
    } else {
        /**派单页面*/
        if ($(this).index() == "0") {
            data_new();
            var data = all_data,
                the_order = [];
            for (var i = 0; i < data.all_order.length; i++) {
                if (data.all_order[i].order_jie == true) {
                    if (data.all_order[i].pai_over == false) {
                        the_order.push(data.all_order[i]);
                    }

                }
            };
            order_pai(the_order, 1, false);
            all_data_ls = the_order;
        } else if ($(this).index() == "1") {
            data_new();
            var data = all_data,
                the_order = [];
            for (var i = 0; i < data.all_order.length; i++) {
                if (data.all_order[i].order_jie == true) {
                    if (data.all_order[i].pai_over == true) {
                        the_order.push(data.all_order[i]);
                    }
                }
            };
            order_pai(the_order, 1, false);
            all_data_ls = the_order;
        }

    }
}
/**打开接单列表*/
function order_sure() {
    $(".sure_table").show();
    $(".dispatch_table").hide();
    $(".sure_table .order_nav li").eq(0).trigger("click");
    $(".sure_table .order_select").val($(".sure_table .order_select option").eq(0).text());
}
/**设置列表高度*/
$(window).resize(function() {
    set_height();
});

function set_height() {
    var Hight = $(window).height();
    $(".order_bot").css("height", (Hight - 260) + "px");
}
/**下拉列表select*/
function open_select(event) {
    $(this).parent().siblings(".select_box").find(".select_list").hide();
    $(this).parent().siblings(".select_box").find("div").addClass("select_title");
    $(this).toggleClass('select_title', '');
    $(this).next(".select_list").toggle();
    event.stopPropagation();
}

function select_item(event) {
    $(this).parents(".select_box").find("div").text($(this).find("p").text().trim());
    $(".select_box").find("div").addClass("select_title");
    $(this).parent().hide();
    var car = cars_map_data(all_car);
    render_poi(wsc_people, car);
    event.stopPropagation();
}

/**单选列表radio*/
function radio_item() {
    $(this).parent().find("i").removeClass("radio_sel");
    $(this).find("i").addClass("radio_sel");
    var car = cars_map_data(all_car);
    render_poi(wsc_people, car);
}
/**关闭弹出层*/
function close_all() {
    $(".select_box>div").addClass("select_title");
    $(".select_list,.data_box").hide();

}
/**输入提示*/
function input_tishi(c, input_id) {
    AMap.plugin('AMap.Autocomplete', function() { //回调函数
        //实例化Autocomplete
        var autoOptions = {
            citylimit: true,
            city: c, //城市，默认全国
            input: input_id //使用联想输入的input的id
        };
        var autocomplete = new AMap.Autocomplete(autoOptions);
        //TODO: 使用autocomplete对象调用相关功能
    })
}
/**接单页面渲染*/
function order_jie(data, page, click_nav) {
    var str = "";
    for (var i = (page * 10) - 10; i < page * 10; i++) {
        if (!data[i]) {
            break;
        }
        var the_date = (data[i].date).split("-");
        str += '<li data-id="' + data[i].id + '"><div class="peo_msg"><p class="peo_tel">' + data[i].tel + '：' + data[i].name + '</p>';
        if (data[i].pay_or) {
            str += '<span class="pay_state">已支付</span>';
        } else {
            str += '<span class="pay_state">未支付</span>';
        }
        str += '<p class="peo_num"><span>' + data[i].number + '人</span>';
        if (data[i].pin_bao == "拼车") {
            str += '<i>拼车</i>';
        } else if (data[i].pin_bao == "包车") {
            str += '<i class="peo_bao">包车</i>';
        }
        str += '</p></div>';
        str += '<div class="trip_msg"><div class="trip_left"><p class="trip_time"><span>' + the_date[1] + '-' + the_date[2] + '</span><i>' + data[i].time + '</i></p><p class="trip_name">' + data[i].line_name + '</p></div></div>';
        str += '<div class="trip_poi"><p class="trip_start over_ellipsis">' + data[i].start_city + '·' + data[i].start_poi + '</p><p class="trip_end over_ellipsis">' + data[i].end_city + '·' + data[i].end_poi + '</p></div>';
        if (data[i].order_jie) {
            str += '<div class="trip_cancel order_trip_btn">接单取消</div>';
        } else {
            str += '<div class="trip_sure order_trip_btn">接单确认</div></li>';
        }
    };
    $(".sure_table .order_list").html(str);
    $(".trip_sure").on("click", trip_sure);
    $(".trip_cancel").on("click", trip_cancel);
    var p1 = data.length / 10;
    var p2 = data.length % 10;
    if (p2 > 0) {
        p1++;
    }
    if (!click_nav) {
        create_pages("sure_table", p1);
    }

}
/**派单页面渲染*/
function order_pai(data, page, click_nav) {
    var str = "";
    for (var i = (page * 10) - 10; i < page * 10; i++) {
        if (!data[i]) {
            break;
        }
        var the_date = (data[i].date).split("-");
        str += '<li data-id="' + data[i].id + '"><div class="peo_msg"><p class="peo_tel">' + data[i].tel + '：' + data[i].name + '</p>';
        if (data[i].pay_or) {
            str += '<span class="pay_state">已支付</span>';
        } else {
            str += '<span class="pay_state">未支付</span>';
        }
        str += '<p class="peo_num"><span>' + data[i].number + '人</span>';
        if (data[i].pin_bao == "拼车") {
            str += '<i>拼车</i>';
        } else if (data[i].pin_bao == "包车") {
            str += '<i class="peo_bao">包车</i>';
        }
        str += '</p></div>';
        str += '<div class="trip_msg">';
        if ($(".dispatch_table").css("display") == "block") {
            str += '<i class="sel_the_trip"></i>';
        }
        str += '<div class="trip_left"><p class="trip_time"><span>' + the_date[1] + '-' + the_date[2] + '</span><i>' + data[i].time + '</i></p><p class="trip_name">' + data[i].line_name + '</p></div></div>';
        str += '<div class="trip_poi"><p class="trip_start over_ellipsis">' + data[i].start_city + '·' + data[i].start_poi + '</p><p class="trip_end over_ellipsis">' + data[i].end_city + '·' + data[i].end_poi + '</p></div>';
        if (data[i].pai_over) {
            str += '<div class="dispatch_over dispatch_btn">已派单</div>';
            str += '<div class="submit_warp submit_over"><p>车号：</p><input type="text" readonly class="driver_id" value="' + data[i].car_id + '"><p>司机：</p><input type="text" readonly class="driver_name" value="' + data[i].driver_name + '"><p>手机：</p><input type="tel" readonly class="driver_tel" value="' + data[i].driver_tel + '"><div class="dispatch_cancel submit_btn">取消派单</div></div></li>';
        } else {
            str += '<div class="dispatch_sure dispatch_btn">派单</div>';
            str += '<div class="submit_warp"><p>车号：</p><input type="text" class="driver_id" placeholder="输入车号"><p>司机：</p><input type="text" class="driver_name" placeholder="输入姓名"><p>手机：</p><input type="tel" class="driver_tel" placeholder="输入手机号"><div class="dispatch_submit submit_btn">提交</div></div></li>';
        }

    };
    $(".dispatch_table .order_list").html(str);
    $(".dispatch_sure").on("click", dispatch_sure);
    $(".dispatch_submit").on("click", dispatch_submit);
    $(".dispatch_cancel").on("click", dispatch_cancel);
    $(".sel_the_trip").on("click", sel_the_trip);
    var p1 = data.length / 10;
    var p2 = data.length % 10;
    if (p2 > 0) {
        p1++;
    }
    if (!click_nav) {
        create_pages("dispatch_table", p1);
    }
}

/**地图定点*/
var markers = [];

function render_poi(peo, car) {
    map.remove(markers);
    var markers_peo = [];
    $.each(peo, function(i) {
        var markers_ = new Object();
        markers_.content = '<div class="peo_poi"><p>' + peo[i].name + '，' + peo[i].tel + '</p><i></i></div>';
        markers_.position = peo[i].position;
        markers_peo.push(markers_);
    });
    var markers_car = [];
    $.each(car, function(i) {
        var markers_ = new Object();
        markers_.content = '<div class="car_' + car[i].state + '_' + car[i].up_or + ' car_poi"><p>' + car[i].id + '</p><i></i><span></span></div>';
        markers_.position = car[i].position;
        markers_car.push(markers_);
    });
    // 这个定位人
    markers_peo.forEach(function(marker) {
        var mark = new AMap.Marker({
            map: map,
            content: marker.content,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-43, -106)
        });
        markers.push(mark);
    });
    //这个定位车
    markers_car.forEach(function(marker) {
        var mark = new AMap.Marker({
            map: map,
            content: marker.content,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-33, -120)
        });
        markers.push(mark);
    });
    var newCenter = map.setFitView();
}
// 实例化点标记
var start_markers = [];

function addMarker_start(poi) {
    if (start_markers.length > 0) {
        for (var i = 0; i < start_markers.length; i++) {
            start_markers[i].setMap(null);
        }

    }
    console.log(poi);

    var arr = poi.split(',');
    console.log(arr);
    marker = new AMap.Marker({
        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [arr[0], arr[1]]
    });

    marker.setMap(map);
    start_markers.push(marker);
    var newCenter = map.setFitView();
}
// 实例化点标记
var end_markers = [];

function addMarker_end(poi) {
    if (end_markers.length > 0) {
        for (var i = 0; i < end_markers.length; i++) {
            end_markers[i].setMap(null);
        }

    }
    var arr = poi.split(',');
    marker = new AMap.Marker({
        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [arr[0], arr[1]]
    });

    marker.setMap(map);
    end_markers.push(marker);
    var newCenter = map.setFitView();
}

// 小地图实例化点标记
var start_s_markers = [];

function addMarker_start_s(poi) {
    if (start_s_markers.length > 0) {
        for (var i = 0; i < start_s_markers.length; i++) {
            start_s_markers[i].setMap(null);
        }

    }
    var arr = poi.split(',');
    marker = new AMap.Marker({
        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [arr[0], arr[1]]
    });

    marker.setMap(small_map);
    start_s_markers.push(marker);
    var newCenter = small_map.setFitView();
}
// 实例化点标记
var end_s_markers = [];

function addMarker_end_s(poi) {
    if (end_s_markers.length > 0) {
        for (var i = 0; i < end_s_markers.length; i++) {
            end_s_markers[i].setMap(null);
        }

    }
    var arr = poi.split(',');
    marker = new AMap.Marker({
        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [arr[0], arr[1]]
    });

    marker.setMap(small_map);
    end_s_markers.push(marker);
    var newCenter = small_map.setFitView();
}
/**选择单点*/
$(".sel_the_trip").on("click", sel_the_trip);

function sel_the_trip() {
    $(this).toggleClass('sel_the_sure');
    shai_xuan();
}
/**全选*/
function sel_sort_all() {
    $(this).parents(".order_table").find(".sel_the_trip").addClass('sel_the_sure');
    shai_xuan();
}

/**筛选点*/
function shai_xuan() {
    if ($(".sel_the_sure").length <= "0") {
        render_poi(all_order, all_car);
        return;
    }

    var peo = [];
    $.each(all_order, function(i) {
        $(".sel_the_sure").each(function() {
            var the_id = $(this).parents("li").attr("data-id");
            console.log(the_id);
            if (all_order[i].id == the_id) {
                peo.push(all_order[i]);
            }
        });
    });
    pai_shai(peo);
}
/**派单筛选*/
function pai_shai(peo) {
    map.remove(markers);
    var markers_peo = [];
    console.log(peo);
    $.each(peo, function(i) {
        var markers_ = new Object();
        if (peo[i].pai_over) {
            markers_.content = '<div class="peo_poi"><p class="pai_no">' + peo[i].name + '，' + peo[i].tel + '</p><i class="pai_no_i"></i></div>';
        } else {
            markers_.content = '<div class="peo_poi"><p class="pai_yes">' + peo[i].name + '，' + peo[i].tel + '</p><i class="pai_yes_i"></i></div>';
        }
        markers_.position = peo[i].position;
        markers_peo.push(markers_);
    });
    // 这个定位人
    markers_peo.forEach(function(marker) {
        var mark = new AMap.Marker({
            map: map,
            content: marker.content,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-43, -106)
        });
        markers.push(mark);
    });
    var newCenter = map.setFitView();
}
