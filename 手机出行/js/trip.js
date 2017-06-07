/**
 * Created by Administrator on 2016/9/28 0028.
 */

/**flag7客服派单状态*/
var flag7=true;

/*取消发布*/
function close_trip(){
    $(".mask").show();
    $(".close_trip").show();
}
/*不取消发布了*/
function close_no(){
    $(".mask").hide();
    $(".close_trip").hide();
}
function close_yes(){
    window.open("trip_again.html","_self","");

}
$(function(){
    ww();
});

function ww(){

    var l=0;
    var str='';
    var k=0;
    $(".waiting_time").html(5);
    var m=4;
    for(var i=0;i<120;i++){
        str+='<i class="line"></i>';
    }
    $(".warp").html(str);
    for (var j=0;j<120;j++){$(".warp i").eq(j).css("transform","rotate("+j*3+"deg)")}

    var tim=setInterval(
        function xi(){
            $(".warp i").eq(k).show();
            k++;
            if(k%24==0){
                $(".waiting_time").html(m--);
            }
            if(k>=120){
                clearInterval(tim);
                return false;
            }
        },2500);

    warp_();
    function warp_(){
        $(".q").css("transform","translateY(-80px) rotate("+l*1+"deg)");
        l++;
        if(l>=30000){
            return;
        }
        setTimeout(warp_,10)
    }
    /**定时器每个5秒发一次请求*/
    var waitting=setInterval(function(){
        $.ajax({
            type: "POST", //GET
            url: "***.action",
            dataType: "json",
            success: function (data) {
                if(flag7){
                    clearInterval(waitting);
                    window.open("pay.html","_self","");
                    /**把信息铺到支付页面*/
                }
            },
            error: function (data) {
                /**测试需删除提示网络不畅*/
/*
                if(flag7){
                    window.open("pay.html","_self","");
                    clearInterval(waitting);
                }
*/
            }
        });
        if($(".waiting_time").text()=="0"){
            clearInterval(waitting);
            clearInterval(tim);
            $(".pull").hide();
            $(".trip_wait").hide();
            $(".cry").show();
            $(".prompt").html("非常抱歉，您的行程单未能及时派出。");
            $(".trip_top p").text("派单失败");
        }
    },5000);
}
/**继续等待*/
function Continue(){
    ww();
    $(".pull").show();
    $(".trip_wait").show();
    $(".cry").hide();
    $(".prompt").html("80%的行程在5分钟后接单，别着急取消<br>客服派单后将通过微信公众号或者短信通知你");
    $(".trip_top p").text("行程已发布，等待客服派单");

}