$(document).ready(function() {
    //右上角按钮
    $('.nav-login').click(function (e) {
        $('.nav-login-box').show();
        e.stopPropagation();
    });
    $(document).click(function () {
        $('.nav-login-box').hide();
    });
})

//阻止未登录用户提交评论
$('.comment-form').submit(function() {
    swal("这位同学，登录后才能发表评论的哇 :)");
    return false;
});
