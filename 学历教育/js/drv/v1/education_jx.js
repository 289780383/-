$(function() {
    /**选择性别*/
    $(".student_sex p").on("click", student_sex);
    $(".student_sex p").eq(0).find("i").addClass("sel_sex");
    /**选择课程*/
    $(".sel_major").click(function() {
        window.open("select_major.html", "_self", "");
    });
    /**点击学历*/
    $(".student_xl").on("click", function() {
        var key = $(this).find("span").text().trim();
        $.each($(".xl_box li"), function() {
            if ($(this).find("p").text() == key) {
                $(".xl_box span").removeClass("sel_xl");
                $(this).find("span").addClass('sel_xl');
            }
        });
        $("html,body").css({ "height": '100%', "overflow": 'hidden' });
        $(".mask2,.xl_box").show();
    });
    /**点击黑色遮罩*/
    $(".mask2").on("click", function() {
        $("html,body").css({ "height": '', "overflow": 'auto' });
        $(".mask2,.xl_box").hide();
    });
    /**选择学历*/
    $(".xl_box li").on("click", function() {
        $(".xl_box span").removeClass("sel_xl");
        $(this).find("span").addClass('sel_xl');
        $(".student_xl span").text($(this).find("p").text().trim());
        $("html,body").css({ "height": '', "overflow": 'auto' });
        $(".mask2,.xl_box").hide();
    });
    /**点击提交*/
    $(".submit_btn").on("click", function() {
        var the_major = $(".the_major").text().NoSpace();
        if (the_major.indexOf("请") >= 0) {
            msg_show("请选择专业", 2000);
            return;
        }
        var student_name = $("#student_name").val().NoSpace();
        if (student_name == "") {
            msg_show("输入您的姓名", 2000);
            return;
        }
        var student_id = $(".student_id").val().NoSpace();
        if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(student_id)) {
            msg_show("请输入正确身份证号", 2000);
            return;
        }
        var student_tel = $(".student_tel").val().NoSpace();
        if (!/^(13[0-9]|14[579]|15[012356789]|17[0135678]|18[0-9])\d{4}\d{4}$/.test(student_tel)) {
            msg_show("输入正确手机号", 2000);
            return;
        }
        var student_xl = $(".student_xl span").text().NoSpace();
        if (the_xl.indexOf("请") >= 0) {
            msg_show("请选择学历", 2000);
            return;
        }
        var student_address = $(".student_address").val().NoSpace();
        if (student_address=="") {
            msg_show("请输入住址", 2000);
            return;
        }
        alert('提交成功');
    });
});
/**选择性别*/
function student_sex() {
    $(this).parent().find("i").removeClass("sel_sex");
    $(this).find("i").addClass("sel_sex");
}
