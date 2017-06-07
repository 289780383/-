$(function(){
    $(".head_txt").on("click",head_txt);
});
function head_txt(){
    if($(".main_text").val().NoSpace()==""){
        msg_show("请填写信息后发布",3000);
    }else{
        msg_show("发布成功",3000);
        $(".main_text").val("");
    }
}
