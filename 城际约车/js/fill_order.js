/**
 * Created by Administrator on 2016/9/29 0029.
 */
 function pay_way(obj){
 	$(".way_list span,.why_main span").removeClass("selected");
 	$(obj).find("span").toggleClass("selected",'');
 }
 function ride_way(obj){
 	$(".ride_list span").removeClass("selected");
 	$(obj).find("span").addClass("selected");
 	var coupon=parseInt($(".coupon_money").text().trim().substring(1));
if($(".coupon_money").text().trim()==""){
	coupon=0;
}
 	var m=parseFloat($(".pay_money span").text()-coupon).toFixed(2);
 	$(".all_money").text(m);
 }
 /**最终价格初始化*/
 function money_init(){
var coupon=parseInt($(".coupon_money").text().trim().substring(1));
if($(".coupon_money").text().trim()==""){
	coupon=0;
}
 	var m=parseFloat($(".pay_money span").text()-coupon).toFixed(2);
 	$(".all_money").text(m);
 }
/**打开优惠券界面*/
function open_coupon(){
	$(".sel_warp").show();
	$("html,body").css("overflow","hidden");
	var val=$(this).find(".coupon_money").text().trim();
	if(val==""){
		return;
	}else{
		val=val.substring(1);
		$(".money_warp span").each(function(i,e){
			$(this).parents("li").find(".sel_1").removeClass('sel_1');
			if(val==$(this).text().trim()){
				$(this).parents("li").find("i").addClass('sel_1');
			}
		});
	}
}
/**退出优惠选择*/
function close_coupon(){
	$(".sel_warp").hide();
	$("html,body").css("overflow","auto");
}
/**选择优惠券*/
function conpon_list(){
	var the_i=$(this).find("i");
	if(the_i.hasClass("sel_0")){
		return;
	}else if(the_i.hasClass("sel_1")){
		the_i.removeClass("sel_1");
	}else{
		$(".sel_1").removeClass('sel_1');
		the_i.addClass("sel_1");
	}

}
/**点击确定*/
function coupon_sure(){
	var val=$(".sel_1").parents("li").find(".money_warp").text();
$(".coupon_money").text(val);
 	money_init();
	close_coupon();
}
 $(function(){
 	money_init();
 	$(".coupon").on("click",open_coupon);
 	$(".coupon_list li").on("click",conpon_list);
 	$(".coupon_sure").on("click",coupon_sure);
 });