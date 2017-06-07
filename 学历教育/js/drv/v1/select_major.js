$(function(){
    /**选择课程的不同类别*/
    $(".course_type").on("click",select_type);
    $(".main li").eq(0).find(".course_type i").addClass("sel_type");
    $(".main li").eq(0).find(".course_info").show();

});
/**选择课程的不同类别*/
function select_type(){
    $(".course_type i").removeClass("sel_type");
    $(".course_info").hide();
    $(this).find("i").addClass("sel_type");
    $(this).next(".course_info").show();
}