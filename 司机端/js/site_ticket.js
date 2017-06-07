/**
 * Created by Administrator on 2016/10/14 0014.
 */
/**计算钱数*/
function computer_(){
    var m=$(".this_money").text();
    var n=$(".this_num").text();
    var z=m*n;
    $(".m_l").html(""+n+"x"+m+"");
    $(".m_r span").html(""+ z.toFixed(1)+"");
    $(".all_money").html(""+ z.toFixed(1)+"");
}
/**人数减*/
var peo_n=0;
function reduce(obj){
    peo_n=$(".this_num").text();
    peo_n--;
    if(peo_n<=1){
        peo_n=1;
    }
    $(".this_num").text(peo_n);
    computer_();
}
/**人数加*/
function add(obj){
    peo_n=$(".this_num").text();
    peo_n++;
    if(peo_n>=60){
        peo_n=60;
    }
    $(".this_num").text(peo_n);
    computer_();
}
/**确认弹窗*/
function site_sure(){
    $(".close_trip").show();
    $(".mask").show();
}
/**关闭弹窗*/
function close_no(){
    $(".close_trip").hide();
    $(".mask").hide();
}
/**确认收费*/
function close_yes(){
    $.ajax({
        type: "POST", //GET
        url: "***.action",
        data: {
            /***/
        }, //组装参数
        dataType: "json",
        success: function (data) {
            /**收费后*/
            close_no();
            reset();
        },
        error: function (data) {
            close_no();
            reset();
        }
    });

}
/**初始化*/
function reset(){
    /**先移除*/
    $(".end_station li")
        .css({backgroundColor:"",border:""})
        .find(".end_city,.end_m").css("color","");
    $(".end_station li").find(".end_dian").css("color","");
    $(".end_station").find(".end_money").removeClass("this_money");

    $(".end_station li").eq(0).css({backgroundColor:"#0298ff",border:"1px solid #0298ff"});
    $(".end_station li").eq(0).find(".end_city,.end_m").css("color","#e5e5e5");
    $(".end_station li").eq(0).find(".end_dian").css("color","#fff");
    $(".end_station li").eq(0).find(".end_money").addClass("this_money");
    $(".this_num").text("1");
    computer_();
}

/**文档加载*/
$(function(){
    reset();
   $(".end_station li").click(function(){
       /**先移除*/
       $(".end_station li")
           .css({backgroundColor:"",border:""})
           .find(".end_city,.end_m").css("color","");
       $(".end_station li").find(".end_dian").css("color","");
       $(".end_station").find(".end_money").removeClass("this_money");
       /**后添加*/
       $(this).css({backgroundColor:"#0298ff",border:"1px solid #0298ff"});
       $(this).find(".end_city,.end_m").css("color","#e5e5e5");
       $(this).find(".end_dian").css("color","#fff");
       $(this).find(".end_money").addClass("this_money");
       computer_();
   });
});
