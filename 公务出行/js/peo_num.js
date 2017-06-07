/*人数*/
/**显示弹窗*/
function people(){
    $(".mask").show();
    $(".people").show();
    $(".more_warp").hide();
    $(".return").hide();
    $(".sure_").css("visibility","hidden");
    $(".people_btn").hide();
}
/**将1234放入input中*/
function people_n(obj){
    var n=$(obj).text();
    $(".select_p span").text(n);
    $(".select_bot p i").text(n);
    com_money();
    cancel();

};
/**弹出更多人数的选择框*/
function go_more(obj){
    $(obj).hide();
    $(".people_n").hide();
    $(".more_warp").show();
    $(".people_btn").show();
    $(obj).parent().find(".cancel").hide();
    $(".return").show();
    $(obj).parent().find(".sure_").css("visibility","visible");
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
    $(".select_p span").text(n+"人");
    $(".select_bot p i").text(n+"人");
    com_money();
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
/**计算钱数*/
function com_money(){
    var m_txt=$(".sel_span").text();/**钱*/
    var n_txt=$(".select_p span").text();/**人*/
    var the_money=m_txt.substring(0,m_txt.indexOf("元"));
    var the_peo=n_txt.substring(0,n_txt.indexOf("人"));
    $(".all_money span").text(""+parseInt(the_money*the_peo).toFixed(1)+"");
}

