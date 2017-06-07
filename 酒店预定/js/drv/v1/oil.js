
$(function(){
    $(".oil_list li").on("click",sel_oil_card);
});
function sel_oil_card(){
    $(this).siblings().find("i").removeClass("sel_i");
    $(this).find("i").addClass("sel_i");
}