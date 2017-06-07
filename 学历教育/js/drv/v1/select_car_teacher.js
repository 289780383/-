$(function(){
    $(".find_teacher li").on("click",find_teacher);
    $(".find_teacher li").eq(0).find(".sel").addClass("sel_type");

});
function find_teacher(){
    $(".find_teacher").find(".sel").removeClass("sel_type");
    $(this).find(".sel").addClass("sel_type");
}