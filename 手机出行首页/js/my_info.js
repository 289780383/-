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
    /**-----------------------------------*/
    /**修改手机号*/
    $(".revise_tel").on("click",revise_tel);
    /**监视手机号输入状态*/
    var tel;
    $('.new_tel').bind('input propertychange', function() {
       tel=$(this).val();
        if(tel.length==11){
            if (/^(13[0-9]|14[579]|15[012356789]|17[0135678]|18[0-9])\d{4}\d{4}$/.test(tel)) {
                /**验证码*/
                $(".send_yzm").addClass("send_yzm_on");
                $(this).blur();
                $(".send_yzm_on").on("click",send_yzm_on);
            } else {
                msg_show("手机号格式有误",2000);
                $(".send_yzm_on").removeClass("send_yzm_on");
            }
        }
    });
    /**发送验证码*/
    function send_yzm_on(){
        $(this).removeClass("send_yzm_on");
    }
    /**修改手机号点击取消*/
    $(".rev_cancel").on("click",rev_cancel);
    function rev_cancel(){
        $(this).parent().parent().hide();
        $(".mask2").hide();
    }
    /**修改手机号点击确定*/
    $(".rev_sure").on("click",rev_sure);
    /**监视验证码*/
    var yzm_key=123;
    /**修改手机号点击确定*/
    function rev_sure(){
        var yzm=$(".the_yzm").val();
        if(yzm==yzm_key){
            msg_show("手机号更换成功",2000);
             var tel_m=tel.substr(0,3)+"****"+tel.substring(7);
            $(".revise_tel span").text(tel_m);
            $(this).parent().parent().hide();
            $(".mask2").hide();
        }else {
            msg_show("验证码错误，重新输入",2000);
        }
    }
    /**--------------------------*/
    /**修改密码*/
    $(".revise_pwd").on("click",revise_pwd);
    function revise_pwd(){
        $(".mask_revise_pwd,.mask2").show();
    }
    /**输入原密码*/
    var pwd_old=123;
    $(".pwd_now").bind('input propertychange', function() {
        var pwd=$(this).val().trim();
        if(pwd_old==pwd){
            msg_show("原密码正确",1000);
            $(".pwd_new1").focus();
            $(".pwd_new1,.pwd_new2").attr("readonly",false);
        }else {
            $(".pwd_new1,.pwd_new2").attr("readonly",true);
        }
    });
    $(".pwd_new1,.pwd_new2").bind('input propertychange', function(){
        var pwd=$(this).val();
        if(pwd.length>6){
            if (!/^\w{6,16}$/.test(pwd)){
                msg_show("密码不能含有特殊字符",2000);
                $(this).val("");
            }
        }
    });
    /**点击取消*/
    $(".pwd_cancel").on("click", rev_cancel);
    /**修改密码点击确定*/
    $(".pwd_sure").on("click",pwd_sure);
    function pwd_sure(){
        var new1=$(".pwd_new1").val();
        var new2=$(".pwd_new2").val();
        if(new1!=""){
            if(new1==new2){
                msg_show("修改成功",2000);
                $(this).parent().parent().hide();
                $(".mask2").hide();
            }else {
                msg_show("两次密码不一致",2000);
            }
        }else {
            msg_show("请输入新密码",2000);
        }
    }
});
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
/**修改手机号*/
function revise_tel(){
    $(".mask_revise_tel,.mask2").show();
}
/**生日日期选择*/
    $(function () {
        var currYear = (new Date()).getFullYear();
        var opt = {};
        opt.date = {preset: 'date'};
        opt.datetime = {preset: 'datetime'};
        opt.time = {preset: 'time'};
        opt.default = {
            theme: 'android-ics light', //皮肤样式
            display: 'modal', //显示方式
            mode: 'scroller', //日期选择模式
            dateFormat: 'yyyy-mm-dd',
            lang: 'zh',
            showNow: true,
            nowText: "今天",
            startYear: currYear-100, //开始年份
            endYear: currYear //结束年份
        };
        $(".user_birthday").mobiscroll($.extend(opt['date'], opt['default']));
    });

