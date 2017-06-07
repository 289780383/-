$(function () {
	$(".mine_list li").on("click",mine_list);
	$(".footer_nav li").on("click",footer_nav);
});
function mine_list(){
	if($(this).hasClass('mine_dd')){
		window.open("my_order.html","_self","");
	}else if($(this).hasClass('mine_lyb')){
		window.open("interaction.html","_self","");
	}
}
/**底部导航*/
function footer_nav(){
	if($(this).hasClass('index')){
		window.open("","_self","");
	}else if($(this).hasClass('study_car')){
		window.open("","_self","");
	}else if($(this).hasClass('study_id')){
		window.open("","_self","");
	}else if($(this).hasClass('mine')){
		return;
	}
}