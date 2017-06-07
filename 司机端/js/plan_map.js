/**
 * Created by Administrator on 2016/10/12 0012.
 */
function map1(ab) {
    //基本地图加载
    var map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 13//地图显示的缩放级别
    });
//导航
    AMap.service(["AMap.Driving"], function() {
        var driving = new AMap.Driving({
            map: map,
            extensions:"all",
            panel: "panel"
        }); //构造路线导航类
        // 根据起终点坐标规划路线
        driving.search(ab
            ,function(status, result){
            });
    });
}


/**地图*/
function open_map(){
    var map_city=[];
    var city_list=["烟台汽车总站","烟台科技创业大厦","黄海学院", "大明湖"];
    var city_li=["烟台","烟台","青岛","济南"];

    $(".mask").show();
    $(".map_warp").show();
    for(var i=0;i<4;i++){
        var tmp_city = {};
        tmp_city.keyword=city_list[i];
        tmp_city.city=city_li[i];
        map_city.push(tmp_city);
    }
    map1(map_city);
}
function close_map(){
    $(".mask").hide();
    $(".map_warp").hide();
}
