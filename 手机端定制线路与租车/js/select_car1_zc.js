var car_type=["全部","轿车","房车","商务","小巴","中巴","大巴"];
$(function(){
    /**价格排序*/
    $(".car_sort").on("click",car_sort);
    /**生成列表*/
    car_type_list();
    /**计算列表长度*/
    $(".result_top").css("width",$(".result_top li").outerWidth()*$(".result_top li").length );
    add_tj($(".result_item").eq(0));
    $(".car_filter").click(function(){
        window.open("select_car2_zc.html","_self","");
    });
    /**去确认定单*/
    $(".result_item").on("click",go_to_order);
});
function go_to_order(){
    window.open("order_confirmation_zc.html","_self","");
}
/**价格排序*/
var flag_sort=0;
function car_sort(){
    if (flag_sort==0){
        $(this).html("价格由高到低<i></i>");
        $(this).find("i").css("background-position","left bottom");
        flag_sort=1;
        var asc = function(a, b) {
            return parseInt($(a).find('.car_price i').text()) > parseInt($(b).find('.car_price i').text()) ? 1 : -1;
        };

    }else {
        $(this).html("价格由低到高<i></i>");
        $(this).find("i").css("background-position","left top");
        flag_sort=0;
        var asc = function(a, b) {
            return parseInt($(a).find('.car_price i').text()) < parseInt($(b).find('.car_price i').text()) ? 1 : -1;
        };

    }
    var sortByInput = function(sortBy) {
        var sortEle = $('.result_item').sort(sortBy);
        $('.result_list').empty().append(sortEle);
    };
    sortByInput(asc);

}
/**生成列表*/
function car_type_list(){
    var str='';
    for (var i= 0;i<car_type.length;i++){
        str+="<li>"+car_type[i]+"</li>";
        $(".result_top").html(str);
    }
    $(".result_top li").eq(0).addClass("sel_type");
    /**选择车型*/
    $(".result_top li").on("click",sel_type);
}

/**选择车型*/
function sel_type(){
    $(".result_top li").removeClass("sel_type");
    $(this).addClass("sel_type");
}
function add_tj(obj){
    $(obj).append("<i class='result_t'>特价</i>");
}
