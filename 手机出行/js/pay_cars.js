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
 	var money=parseFloat($(obj).find("i").text().substring(1)).toFixed(2);
 	$(".all_money").text(money);
 }
 function ticket_way(obj){
 	$(obj).find("span").toggleClass("selected",'');
 }

 /*取消发布*/
 function close_trip(){
 	$(".mask").show();
 	$(".close_trip").show();
 }
 /*不取消发布了*/
 function close_no(){
 	$(".mask").hide();
 	$(".close_trip").hide();
 }
 function close_yes(){
 	window.open("trip_again.html","_self","");
 }
 /**最终价格初始化*/
 function money_init(){
 	var m=parseFloat($(".ride_list .selected").parent().find("i").text().substring(1)).toFixed(2);
 	$(".all_money").text(m);
 }

 $(function(){
 	money_init();
 });