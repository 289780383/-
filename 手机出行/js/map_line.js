/**
 * Created by Administrator on 2016/10/9 0009.
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
                /*alert(result.taxi_cost+"元");*/
            });
    });
}

