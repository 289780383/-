$(function(){
    $(".head_nav").delegate("li","click",list_fn);
    $(".return_ticket").on("click",return_ticket);
    $(".change_ticket").on("click",change_ticket);
    $(".m_cancel").on("click",cancel_fn);

})
var list_fn=function(){
    $(this).siblings().removeClass('head_sel');
    $(this).addClass('head_sel');
    var index=$(this).index();
    switch(index){
        case 0:
        
        break;
        case 1:
        
    }
}
var return_ticket=function(){
	$(".return_mask,.mask").show();
}
var change_ticket=function(){
	$(".change_mask,.mask").show();
}
var cancel_fn=function(){
    $(".return_mask,.change_mask,.mask").hide();
}
