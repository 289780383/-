/**规定页面基本单位*/
font_size();
window.onresize = function () {
    font_size();
};
function font_size() {
    var deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth > 750) deviceWidth = 750;//640为设计稿宽度三处需要修改
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
}
$(function(){
    /**提交找答案*/
    $(".question_list li").on("click", get_answer);
    /**点击返回按钮*/
    $(".close_mask").on("click", close_mask);
});
/**提交*/
function get_answer() {
    var title=$(this).text();
    $(".submit_answer .submit_header p").text(title);
    $(".submit_answer").show();
}
/**返回*/
function close_mask() {
    $(this).parent().parent().hide();
}
