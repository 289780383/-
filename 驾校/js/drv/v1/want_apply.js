var zhe=9;//折扣
$(function(){
    /**选择性别*/
    $(".student_sex p").on("click",student_sex);
    $(".student_sex p").eq(0).find("i").addClass("sel_sex");
    /**选择支付方式*/
    $(".pay_way li").on("click",pay_way);
    /**选择课程*/
    $(".sel_course").click(function(){
        window.open("select_course.html","_self","");
    });
    /**计算打折价格*/
    compute(zhe);
    /**打开地图查看线路*/
    $(".head_map").on("click",open_map);
});
/**打开地图查看线路*/
function open_map(){
    window.open("map.html","_self","");
}
/**选择性别*/
function student_sex(){
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
    var mon=$(".course_money").text().trim();
    var pay_type=$(".sel_pay").parent().attr("class");
    if(mon!=""){
        mon=mon.slice(1);
        if(pay_type=="wx_pay"||pay_type=="zfb_pay"){
            mon=mon/10*zhe;
            $(".end_money").text("（"+mon+"元）");
        }else if(pay_type=="cash_pay"){
            $(".end_money").text("（"+mon+"元）");
        }
    }else {
        $(".end_money").text("");
    }

}
