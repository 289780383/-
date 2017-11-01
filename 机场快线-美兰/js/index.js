/**main部分*/
$(function(){
	$(".item_b i").on("click",show_text);
	$(".main .item_t").on("click",creat_order);
})
var show_text=function(e){
	$(this).toggleClass("down_or");
	$(this).siblings("p").toggleClass("over_ellipsis");
	e.stopPropagation();
}
var creat_order=function(){
	window.open("submit_order.html","_self","");
}
