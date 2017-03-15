function loadIndex() {
    var template = $('#signUp').html();
    Mustache.parse(template);   // optional, speeds up future uses
    var rendered = Mustache.render(template);
    $('#blog').html(rendered);
};

loadIndex();

//右上角按钮
$('.nav-login').click(function (e) {
    $('.nav-login-box').show();
    e.stopPropagation();
});
$(document).click(function () {
    $('.nav-login-box').hide();
});

//验证表单中的各个input数据
$('form').submit(function(){
    if($('#name').val() == ''){
        alert('账户名不能为空！');
        return false;
    };
    if($('#password').val() == ''){
        alert('密码不能为空不能为空！');
        return false;
    };
    if($('#passwordRepeat').val() !== $('#password').val()){
        alert('重复密码不正确，请再次输入！');
        return false;
    };
    if($('#avatar_value').val() == ''){
        alert('头像不能为空！');
        return false;
    };
});







