$(function(){
    $(".main_text").on("click",main_text);
    $(".head_txt").on("click",head_txt);
    //$(".photograph").on("click",photograph);
    //$(".local_pic").on("click",local_pic);
});
function main_text(){
    console.log($(this).html());
    if($(this).html().NoSpace()=="学车过程，有什么趣事，新鲜事跟我们分享一下吧！"){
        $(this).text("");
    }
}
function head_txt(){
    if($(".main_text").html().NoSpace()=="学车过程，有什么趣事，新鲜事跟我们分享一下吧！"||$(".main_text").html().NoSpace()==""){
        msg_show("请填写信息后发布",3000);
    }else{
        msg_show("发布成功",3000);
    }
}
/*function photograph(){
    msg_show("拍照",3000);
}
function local_pic(){
    msg_show("本地图片",3000);
}*/