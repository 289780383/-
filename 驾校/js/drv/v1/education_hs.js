$(function() {
    /**选择性别*/
    $(".student_sex p").on("click", student_sex);
    $(".student_sex p").eq(0).find("i").addClass("sel_sex");
    /**点击学历*/
    $(".student_xl").on("click", function() {
        var key = $(this).find("span").text().trim();
        $.each($(".xl_box li"), function() {
            if ($(this).find("p").text() == key) {
                $(".xl_box span").removeClass("sel_xl");
                $(this).find("span").addClass('sel_xl');
            }
        });
        $(".mask2,.xl_box").show();
    });
    /**点击黑色遮罩*/
    $(".mask2").on("click", function() {
        $(".mask2,.xl_box").hide();
    });
    /**选择学历*/
    $(".xl_box li").on("click", function() {
        $(".xl_box span").removeClass("sel_xl");
        $(this).find("span").addClass('sel_xl');
        alert($(this).find("p").text().trim());
        $(".student_xl span").text($(this).find("p").text().trim());
        $(".mask2,.xl_box").hide();
    });
    /**点击提交*/
    $(".submit_btn").on("click", function() {
        if ($(".the_major").text().NoSpace() == "请选择专业") {
            msg_show("请选择专业", 2000);
            return;
        }
        if ($("#student_name").val().NoSpace() == "") {
            msg_show("输入您的姓名", 2000);
            return;
        }
        var studet_id = $(".studet_id").val().NoSpace();
        if (/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(studet_id)) {
            msg_show("请输入正确身份证号", 2000);
            return;
        }
        if ($(".studet_tel").val().NoSpace() == "") {
            msg_show("输入正确手机号", 2000);
            return;
        }
        if ($(".student_xl span").text().NoSpace() == "请选择学历") {
            msg_show("请选择学历", 2000);
            return;
        }
        if ($(".student_address").val().NoSpace() == "") {
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
