$(function(){
    /**酒店遮罩层显示*/
    $(".the_hotel_name").on("click",hotel_name);
    /**点击酒店返回按钮*/
    $(".close_mask").on("click",close_mask);
    /**选择酒店*/
    $(".hotel_btn_sure").on("click",hotel_btn_sure);
    /**选择房型*/
    $(".the_room_price").on("click",room_price);
    /**展示图片*/
    $(".pic_show_or").on("click",pic_show_or);
    /**展示图片*/
    $(".room_btn_sure").on("click",room_btn_sure);
});
/**选择酒店*/
function hotel_name(){
    $("html,body").css({overflow:"hidden"});
    $(".select_hotel").show();
}
function close_mask(){
    $("html,body").css({overflow:"auto"});
    $(".select_hotel,.select_room").hide();
}
function hotel_btn_sure(){
    var the_name=$(this).parent().find(".the_name").text();
    $(".the_hotel_name").text(the_name);
    close_mask();
}
/**选择房间类型*/
function room_price(){
    $("html,body").css({overflow:"hidden"});
    $(".room_list .room_pic").hide();
    $(".select_room").show();
}
function pic_show_or(){
    $(".room_list .room_pic").hide();
    $(this).parent().parent().find(".room_pic").slideDown();
}
function room_btn_sure(){
    var room_type=$(this).parent().parent().find(".room_type span").text();
    $(".the_room_price").text(room_type);
    close_mask();
}