$(function(){
	the_init();
	set_h();
	$(".main_nav li").on("click",main_nav);
});
window.onresize = function () {
	set_h();
};
/*初始化*/
function the_init(){
	$(".main_nav li").removeClass("sel_nav");
	$(".main_nav li").eq(0).addClass("sel_nav");
	$(".details").hide();
	$(".state").show();

}
/**导航点击*/
function main_nav(){
	$(".main_nav li").removeClass("sel_nav");
	$(this).addClass("sel_nav");
	if($(this).index()==0){
		$(".details").hide();
		$(".state").show();
	}else{
		$(".state").hide();
		$(".details").show();
	}
}
/**设置线高度*/
function set_h(){

	var n=$(".state li").length;
	var h=$(".state").height();
	var h1=$(".state li").eq(n-1).outerHeight();
	$(".state li").eq(0).find("i").addClass('big_i');
	if(n<=1){
		return;
	}

	$(".line").css("height",(h-h1)+'px');
}
