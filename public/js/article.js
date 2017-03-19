$(document).ready(function() {
    //右上角按钮
    $('.nav-login').click(function (e) {
        $('.nav-login-box').show();
        e.stopPropagation();
    });
    $(document).click(function () {
        $('.nav-login-box').hide();
    });

    //文章编辑和删除框
    $('.Blog-edit-icon').click(function(e) {
        $('.Blog-edit').show();
        e.stopPropagation();
    });
    $(document).click(function() {
        $('.Blog-edit').hide();
    });
});

//评论不能为空
$('.comment-form').submit(function() {
    if ($('#comment').val() == '') {
        swal('评论内容不能为空的哇 :)');
        return false;
    };
});
