function pay_way(obj) {
    $(".way_list span,.why_main span").removeClass("selected");
    $(obj).find("span").toggleClass("selected", '');
}
$(function () {
    /**开启房间数遮罩*/
    $(".the_number").on("click", sel_room_num);
    /**选择房间数*/
    $(".room_list li").on("click", room_list);
    /**确认房间数量*/
    $(".room_btn").on("click", room_btn);
    /**提交*/
    $(".foot_btn").on("click", send_btn);
    /**点击返回按钮*/
    $(".close_mask").on("click", close_mask);
    font_set();
    function font_set(){
        var text=$(".top_text").text();
        $(".top_text").text(text);
    }
});
/**开启房间数遮罩*/
function sel_room_num() {
    var num = $(this).find("span").text().NoSpace();
    $(".room_list li").removeClass("sel_num");
    for (var i = 0; i < 8; i++) {
        if (num == $(".room_list li").eq(i).text().NoSpace()) {
            $(".room_list li").eq(i).addClass("sel_num");
            break;
        }
    }
    $(".room_num,.mask2").show();
}
/**选择房间数*/
function room_list() {
    $(".room_list li").removeClass("sel_num");
    $(this).addClass("sel_num");
}
/**确认房间数量*/
function room_btn() {
    var num = $(".sel_num").text();
    $(".the_number span").text(num);
    $(".room_num,.mask2").hide();
}
/**提交*/
function send_btn() {
    $(".submit_end").show();
}
/**返回*/
function close_mask() {
    $(this).parent().parent().hide();
}
