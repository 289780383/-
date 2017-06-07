var zhe=9;//折扣
$(function(){
    /**选择性别*/
    $(".peo_sex p").on("click",peo_sex);
    $(".peo_sex p").eq(0).find("i").addClass("sel_sex");
    /**选择支付方式*/
    $(".pay_way li").on("click",pay_way);
    /**计算打折价格*/
    compute(zhe);
    $(".privilege i").text(zhe+'折');
    /**打开地图查看线路*/
    $(".head_map").on("click",open_map);
    /**选择学历*/
    $(".sel_education").on("click",sel_education);
    /**选择从业资格类别*/
    $(".sel_jobs").on("click",sel_jobs);
    /**选择准驾车型*/
    $(".sel_cars").on("click",sel_cars);
    /**选择具体项目*/
    $(".this_list li").on("click",this_list);
    /**确认去支付*/
    $(".go_pay").on("click",go_pay);

});
/**打开地图查看线路*/
function open_map(){
    window.open("map.html","_self","");
}
/**选择性别*/
function peo_sex(){
    $(this).parent().find("i").removeClass("sel_sex");
    $(this).find("i").addClass("sel_sex");
}
/**选择支付方式*/
function pay_way(){
    $(".pay_way i").removeClass("sel_pay");
    $(this).find("i").addClass("sel_pay");
    compute(zhe);
}
/**计算价格*/
function compute(zhe){
    var mon=$(".the_money").text().trim();
    var pay_type=$(".sel_pay").parent().attr("class");
    if(mon!=""){
        mon=mon.slice(1);
        if(pay_type=="wx_pay"||pay_type=="zfb_pay"){
            mon=mon/10*zhe;
            $(".end_money").text(mon);
        }else if(pay_type=="cash_pay"){
            $(".end_money").text(mon);
        }
    }else {
        $(".end_money").text("");
    }

}
/*学历*/
function sel_education(){
 $(".education").show();
 var now=$(this).find("span").text().trim();
 for(var i=0;i<$(".education li").length;i++){
    if(now==$(".education li").eq(i).find("p").text()){
        $(".education i").removeClass("sel_this");
        $(".education li").eq(i).find("i").addClass('sel_this');
    }
}
}
function education_save(){
    $(".education").hide();
    var val=$(".education .sel_this").prev("p").text();
    $(".sel_education").find("span").text(val);
}
/*从业资格类别*/
function sel_jobs(){
 $(".jobs").show();
 var now=$(this).find("span").text().trim();
 for(var i=0;i<$(".jobs li").length;i++){
    if(now==$(".jobs li").eq(i).find("p").text()){
        $(".jobs i").removeClass("sel_this");
        $(".jobs li").eq(i).find("i").addClass('sel_this');
    }
}
}
function jobs_save(){
    $(".jobs").hide();
    var val=$(".jobs .sel_this").prev("p").text();
    $(".sel_jobs").find("span").text(val);
}
/*准驾车型*/
function sel_cars(){
 $(".cars").show();
 var now=$(this).find("span").text().trim();
 for(var i=0;i<$(".cars li").length;i++){
    if(now==$(".cars li").eq(i).find("p").text()){
        $(".cars i").removeClass("sel_this");
        $(".cars li").eq(i).find("i").addClass('sel_this');
    }
}
}
function cars_save(){
    $(".cars").hide();
    var val=$(".cars .sel_this").prev("p").text();
    $(".sel_cars").find("span").text(val);
}

/**选择具体项目*/
function this_list(){
    $(".this_list i").removeClass("sel_this");
    $(this).find("i").addClass("sel_this");
}
    /**确认去支付*/
    function go_pay(){
        var p_name=$(".peo_name input").val().trim();
        var p_id=$(".peo_id input").val().trim();
        var p_tel=$(".peo_tel input").val().trim();
        var p_ads=$(".peo_address input").val().trim();
        var time1=$("#first_time").val().trim();
        var p_jobs=$(".peo_jobs input").val().trim();
        var time2=$("#second_time").val().trim();
        if(p_name==""||p_id==""||p_tel==""||p_ads==""||p_jobs==""||time1==""||time2==""){
            msg_show("必填项目不能有空值",3000);
            return;
        }
        alert("success");
    }