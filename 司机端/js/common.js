
var k="告诉对方公司是否司是否司是否撒否撒";
msg_show(k,3000);
function msg_show(msg,time){
    $("body").append("<div class='msg_show'><p>"+msg+"</p></div>");
    setTimeout(function(){
        $(".msg_show").remove();
    },time);
}