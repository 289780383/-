/**设置页面基本单位*/
font_size();
window.onresize = function() {
    font_size();
};

function font_size() {
    var deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth > 750) deviceWidth = 750; //640为设计稿宽度三处需要修改
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
};
/**隐藏地图控件*/
$(".amap-logo,.amap-copyright,.amap-mcode,.amap-toolbar").remove();
/**绘制点*/
data_new();
/**1分钟刷新一次*/
data_auto("1");

function data_auto(time) {
    setInterval(function() {
        console.log("刷新了");
        data_new();
    }, time * 60000);
}

function data_new() {
    /**加载数据*/
    $.ajax({
        type: "POST",
        url: "data.json",
        dataType: "json",
        success: function(data) {
            render_poi(data.all_poi, data.all_car);
        },
        error: function(data) {
            console.log("数据请求失败");
        }
    });
}

/**地图定点*/
var markers = [];

function render_poi(poi, car) {
    map.remove(markers);
    var markers_poi = [];
    $.each(poi, function(i) {
        var markers_ = new Object();
        markers_.content = '<i class="state_poi">' + i + '</i>';
        markers_.position = poi[i].position;
        markers_poi.push(markers_);
    });
    var markers_car = [];
    $.each(car, function(i) {
        var markers_ = new Object();
        markers_.content = '<div class="car_poi">车</div>';
        markers_.position = car[i].position;
        markers_car.push(markers_);
    });
    // 渲染途径点
    markers_poi.forEach(function(marker) {
        var mark = new AMap.Marker({
            map: map,
            content: marker.content,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-15, -15)
        });
        markers.push(mark);
    });
    //渲染车位置
    markers_car.forEach(function(marker) {
        var mark = new AMap.Marker({
            map: map,
            content: marker.content,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-15, -15)
        });
        markers.push(mark);
    });
    var newCenter = map.setFitView();
}
