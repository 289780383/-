$(function(){
    $(".list").delegate("li","click",list_fn);
    $(".tel_btn").delegate("li","click",tel_fn);
})
var list_fn=function(){
    var index=$(this).index();
    switch(index){
        case 0:
        window.open("my_order.html","_self","");
        break;
        case 1:
        window.open("revise_order.html","_self","");
        break;
        case 2:
        window.open("revise_mine.html","_self","");
        break;
        case 3:
        $(".contact_mask,.mask").show();
    }
}
var tel_fn=function(){
     $(".contact_mask,.mask").hide();
}