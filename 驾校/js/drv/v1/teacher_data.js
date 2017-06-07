$(function () {
    /**陪练类型*/
    $(".job_type").on("click", job_type);
    /**选择陪练类型*/
    $(".select").on("click", select_job_type);
    /**取消*/
    $(".btn_cancel").on("click", btn_cancel);
    /**确定*/
    $(".btn_sure").on("click", btn_sure);
    /**打开服务*/
    $(".item_service").on("click", service_show);
    /**选择服务*/
    $(".service_list li").on("click", select_service);
    /**----------------------*/
    /**显示上传图片页面*/
    $(".item_environment").on("click",item_environment);
    /**马上上传*/
    $(".upload_btn").on("click",upload_btn);
    /**选择上传方式*/
    $(".mask_select_pic div").on("click",mask_select_pic);
    /**删除图片*/
    $(".img_warp").swipe({
        longTap:function (event, target){
            $(".img_warp").append("<i></i>");
            $(".photos_save").hide();
            $(".photos_sure").show();
            $(".img_warp i").click(function(){
                $(this).parent().remove();
                if($(".img_warp").length==0){
                    $(".photos_notice").show();
                }
            });
        }
    });
    /**----------------------*/
    /**打开简介界面*/
    $(".item_introduce").on("click",item_introduce);
    /**打开模板*/
    $(".go_template").on("click",go_template);
    /**点击使用模板*/
    $(".template_this").on("click",template_this);
    /**点击简介输入框*/
    $(".introduce_main textarea").focus(function(){
     if($(".introduce_main textarea").text()=="请输入您的个人简介"){
         $(this).val("");
     }
    });
});
/**教练简介取消*/
function introduce_cancel(){
    $(".teacher_introduce").hide();
    $(".template").slideUp();
    $(".go_template").show();
}
/**教练简介保存*/
function introduce_save(){
    /**执行保存*/
    introduce_cancel();
}
/**点击使用模板*/
function template_this(){
    $(".template").slideUp();
    $(".go_template").show();
    $(".introduce_main textarea").val($(".template_text").text().NoSpace());
}
/**打开模板*/
function go_template(){
    $(this).hide();
    $(".template").slideDown();
}

/**打开简介界面*/
function item_introduce(){
    if($(".introduce_main textarea").val().length==0){
        $(".introduce_main textarea").val("请输入您的个人简介");
    }
    $(".teacher_introduce").show();
}

/**-------------------------------*/
/**返回*/
function photos_cancel(){
    $(".upload_photos").hide();
$(".photos_library").html(now_pic.html());
    $(".img_warp").swipe({
        longTap:function (event, target){
            $(".img_warp").append("<i></i>");
            $(".photos_save").hide();
            $(".photos_sure").show();
            $(".img_warp i").click(function(){
                $(this).parent().remove();
                if($(".img_warp").length==0){
                    $(".photos_notice").show();
                }
            });
        }
    })

}
/**确认图片*/
function photos_sure(){
    $(".img_warp i").remove();
    $(".photos_sure").hide();
    $(".photos_save").show();
}
/**保存图片*/
function photos_save(){
   if($(".photos_library img").length>=8){
       /**执行保存操作*/
       $(".upload_photos").hide();
   }else {
       msg_show("至少上传8张图片",3000);
   }
}
/**选择上传方式*/
function mask_select_pic(){
    var clas=$(this).attr("class");
    if(clas=="select1"){
        alert("拍照");
    }else{
        alert("从相册选择");
    }
    $(".photos_notice").hide();
    $(".mask2,.mask_select_pic").hide();
}
/**马上上传*/
function upload_btn(){
    $(".mask2,.mask_select_pic").show();
}
/**显示上传图片页面*/
var now_pic;
function item_environment(){
    if($(".photos_library img").length>0){
        $(".photos_notice").hide();
    }else {
        $(".photos_notice").show();
    }
    now_pic=$(".photos_library").clone(true);
    $(".photos_save,.upload_photos").show();
}
/**服务保存*/
function service_save() {
    var str = "";
    for (var i = 0; i < $(".sel_service").length; i++) {
        str += $(".sel_service").eq(i).parent().find("p").text().trim();
        if (i == $(".sel_service").length - 1) {
            break;
        }
        str += "/";
    }
    $(".item_service span").text(str);
    $(".service").hide();
}
/**选择服务*/
function select_service() {
    if ($(".sel_service").length < 3) {
        $(this).find("i").toggleClass("sel_service");
    } else {
        $(this).find(".sel_service").toggleClass("sel_service");
    }
}
/**打开服务*/
function service_show() {
    var str = $(this).find("span").text().trim().split("/");
    for (var i = 0; i < $(".service_list li").length; i++) {
        for (var j = 0; j < str.length; j++) {
            if ($(".service_list li").eq(i).find("p").text().trim() == str[j]) {
                $(".service_list li").eq(i).find("i").addClass("sel_service");
            }
        }
    }
    $(".service").show();
}
/**陪练类型*/
function job_type() {
    var str = $(this).find("span").text().trim().split("/");
    for (var i = 0; i < $(".select").length; i++) {
        for (var j = 0; j < str.length; j++) {
            if ($(".select").eq(i).find("span").text().trim() == str[j]) {
                $(".select").eq(i).find("i").addClass("sel");
            }
        }
    }

    $(".mask2,.mask_select").show();
}
/**选择陪练类型*/
function select_job_type() {
    $(this).find("i").toggleClass("sel");
}
/**取消*/
function btn_cancel() {
    $(".mask2,.mask_select").hide();
}
/**确定*/
function btn_sure() {
    var str = "";
    for (var i = 0; i < $(".sel").length; i++) {
        str += $(".sel").eq(i).next("span").text().trim();
        if (i == $(".sel").length - 1) {
            break;
        }
        str += "/";
    }
    $(".job_type span").text(str);
    $(".mask2,.mask_select").hide();
}