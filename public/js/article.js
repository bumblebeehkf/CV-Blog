$(document).ready(function() {
    //右上角按钮
    $('.nav-login').click(function (e) {
        $('.nav-login-box').show();
        e.stopPropagation();
    });
    $(document).click(function () {
        $('.nav-login-box').hide();
    });
});
