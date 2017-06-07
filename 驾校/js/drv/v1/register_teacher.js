$(function(){
    $(".item_head").on("click",function(){
        $(".mask2,.mask_select_pic").show();
    });
    $(".item_sex").on("click",function(){
        var the_sex=$(".item_sex span").text().trim();
        $(".select_sex i").removeClass("sel_sex");
        if(the_sex=="男"){
            $(".select_sex").eq(0).find("i").addClass("sel_sex");
        }else {
            $(".select_sex").eq(1).find("i").addClass("sel_sex");
        }
        $(".mask2,.mask_select_sex").show();
    });
    /**选择性别*/
    $(".select_sex").on("click",select_sex_type);
    /**选取头像方式*/
    $(".select_pic").on("click",select_pic_type);

    $(".age input").bind('input propertychange', function() {
        if(!/^\d{1,}$/.test($(this).val())){
            $(this).val("");
        }
    });
    /**选择驾校*/
$(".item_school_name").on("click",select_school_name);
    /**填写驾校名称*/
    get_school_name();
    /**选择驾校地址*/
    $(".item_address").on("click",select_school_address);
    /**填写驾校地址*/
    get_school_address();
});

/**填写驾校地址*/
function get_school_address(){
    var address=decodeURI($.getUrlParam('point'));
    if(address=="null"){
        return;
    }
    $(".item_address span").text(address);
}
/**选择驾校地址*/
function select_school_address(){
    window.open("select_point.html","_self","");
}
/**填写驾校名称*/
function get_school_name(){
    var school=decodeURI($.getUrlParam('school'));
    var school_city=decodeURI($.getUrlParam('school_city'));
    if(school=="null"){
        return;
    }
    $(".item_school_name span").text(school_city+" · "+school);
}

/**选择驾校*/
function select_school_name(){
    window.open("select_school.html","_self","");
}
/**选择性别*/
function select_sex_type(){
    var the_sex=$(this).find("span").text().trim();

    $(".item_sex span").text(the_sex);
    $(".mask2,.mask_select_sex").hide();
}
/**选取头像方式*/
function select_pic_type(){
    var type=$(this).index();
    if(type==0){
        alert($(this).text());
    }else if(type==1){
        alert($(this).text());
    }
    $(".mask2,.mask_select_pic").hide();
}
