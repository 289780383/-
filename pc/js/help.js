$(function(){
    $(".ticket_item h5").on("click",open_list);
    $(".ticket_main p").on("click",sel_title);
})
function open_list(){
    $(".ticket_item .ticket_main").hide();
    $(".ticket_item h5").removeClass("sel_h5");
    $(this).parent().find(".ticket_main").slideDown();
    $(this).addClass("sel_h5");
}
function sel_title(){
    $(".ticket_main p").removeClass("sel_p");
    $(this).addClass("sel_p")
}