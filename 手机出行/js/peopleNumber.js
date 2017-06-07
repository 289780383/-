/*人数*/
/*显示弹窗*/
function people(){
    $(".mask").show();
    $(".people").show();
    $(".more_warp").hide();
    $(".return").hide();
    $(".sure_").css("visibility","hidden");
    $(".people_btn").hide();
}
/*将1234放入input中*/
function people_n(obj){
    var n=$(obj).text();
    $(".people_num").val(n);
    cancel();
};
/*弹出更多人数的选择框*/
function go_more(obj){
    $(obj).hide();
    $(".people_n").hide();
    $(".more_warp").show();
    $(".people_btn").show();
    $(".cancel").hide();
    $(".return").show();
    $(".sure_").css("visibility","visible");
}
/*关闭弹窗*/
function cancel(){
    $(".mask").hide();
    $(".people").hide();
    $(".sure_").css("visibility","hidden");
    $(".people_n").show();
    $(".people_more").show();
    $(".people_btn").hide();
    $(".cancel").show();
    $(".return").hide();

}
/*确定更多人数*/
function sure(){
    var n=$(".more_warp span").text();
    $(".people_num").val(n+"人");
    cancel();
}
/*返回前一页*/
function return_p(){
    cancel();
    people();
}
/*人数减*/
function reduce(obj){
    var n=$(".more_warp span").text();
    n--;
    if(n<=5){
        n=5;
    }
    $(".more_warp span").text(n);
}
/*人数加*/
function add(obj){
    var n=$(".more_warp span").text();
    n++;
    if(n>=60){
        n=60;
    }
    $(".more_warp span").text(n);
}
