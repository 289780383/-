$(function() {
    /**选择性别*/
    $(".student_sex p").on("click", student_sex);
    $(".student_sex p").eq(0).find("i").addClass("sel_sex");
    /**点击列表*/
    $(".student_xl").on("click", student_xl);
    var all_data = [{
        schools: "山东交通职业学院",
        edu_level: [{ level: "高起专", major: ["汽车运用技术", "公路监理", "道路桥梁工程技术", "工程机械运用与维护"] }]
    }, {
        schools: "山东青岛农业大学",
        edu_level: [{ level: "高起专", major: ["作物生产技术", "园林技术", "畜牧兽医", "建筑工程技术"] }, { level: "高起本", major: ["土木工程", "计算机科学与技术", "动物科学", "农学"] }, { level: "专起本", major: ["农林经济管理", "会计学", "国际经济与贸易", "物流管理"] }]
    }];

    function student_xl() {
        var type = $(this).attr("data-type");
        var the_data = [];
        if (type == 1) {
            $.each(all_data, function(i) {
                the_data.push(all_data[i].schools);
            });
        } else if (type == 2) {
            var the_school = $(".the_school").text().NoSpace();
            if (the_school.indexOf("请") == "-1") {
                $.each(level_data, function(i) {
                    the_data.push(level_data[i].level);
                });
            } else {
                msg_show("请先选择院校", 2000);
                return;
            }
        } else if (type == 3) {
            var the_school = $(".the_school").text().NoSpace();
            var the_level = $(".the_level").text().NoSpace();
            if (the_school.indexOf("请") == "-1") {
                if (the_level.indexOf("请") == "-1") {
                    $.each(major_data.major, function(i) {
                            the_data.push(major_data.major[i]);
                    });
                } else {
                    msg_show("请先选择层次", 2000);
                    return;
                }
            } else {
                msg_show("请先选择院校", 2000);
                return;
            }
        }
        var str = '';
        for (var i = 0; i < the_data.length; i++) {
            str += '<li data-index="' + i + '""><p>' + the_data[i] + '</p><span></span></li>';
        }
        $(".xl_box").html(str);
        $(".xl_box").attr("data-type", type);
        $(".xl_box li").on("click", xl_box);
        var key = $(this).find("span").text().trim();
        $.each($(".xl_box li"), function() {
            if ($(this).find("p").text() == key) {
                $(".xl_box span").removeClass("sel_xl");
                $(this).find("span").addClass('sel_xl');
            }
        });
        $("html,body").css({ "height": '100%', "overflow": 'hidden' });
        $(".mask2,.xl_box").show();
    };
    /**点击黑色遮罩*/
    $(".mask2").on("click", function() {
        $("html,body").css({ "height": '', "overflow": 'auto' });
        $(".mask2,.xl_box").hide();
    });
    /**选择项目*/
    $(".xl_box li").on("click", xl_box);
    var level_data = [],lmajor_data = [];

    function xl_box() {
        $(".xl_box span").removeClass("sel_xl");
        $(this).find("span").addClass('sel_xl');
        var the_val = $(this).find("p").text().trim();
        if ($(".xl_box").attr("data-type") == 1) {
            $(".the_school").text(the_val);
            level_data = all_data[$(this).attr("data-index")].edu_level;
            $(".the_level").text("请选择层次");
        } else if ($(".xl_box").attr("data-type") == 2) {
            $(".the_level").text(the_val);
            major_data = level_data[$(this).attr("data-index")];
            $(".the_major").text("请选择专业");
        } else if ($(".xl_box").attr("data-type") == 3) {
            $(".the_major").text(the_val);
        }
        $("html,body").css({ "height": '', "overflow": 'auto' });
        $(".mask2,.xl_box").hide();
    }; /**点击提交*/
    $(".submit_btn").on("click", function() {
        var the_school = $(".the_school").text().NoSpace();
        if (the_school.indexOf("请") >= 0) {
            msg_show("请选择院校", 2000);
            return;
        }
        var the_level = $(".the_level").text().NoSpace();
        if (the_level.indexOf("请") >= 0) {
            msg_show("请选择层次", 2000);
            return;
        }
        var the_major = $(".the_major").text().NoSpace();
        if (the_major.indexOf("请") >= 0) {
            msg_show("请选择专业", 2000);
            return;
        }
        var studet_name=$("#student_name").val().NoSpace();
        if ( studet_name== "") {
            msg_show("输入您的姓名", 2000);
            return;
        }
        var studet_id = $(".studet_id").val().NoSpace();
        if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(studet_id)) {
            msg_show("请输入正确身份证号", 2000);
            return;
        }
        var student_tel = $(".student_tel").val().NoSpace();
        if (!/^(13[0-9]|14[579]|15[012356789]|17[0135678]|18[0-9])\d{4}\d{4}$/.test(student_tel)) {
            msg_show("输入正确手机号", 2000);
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
