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
        swal('Welcom to HelloWorld!','账户名不能为空撒 :)');
        return false;
    };
    if($('#name').val().length > 8){
        swal('Welcom to HelloWorld!','名字太长啦 :)');
        return false;
    };

    if($('#password').val() == ''){
        swal('Welcom to HelloWorld!','密码不能为空喔 :)');
        return false;
    };
    if($('#avatar_value').val() == ''){
        swal('Welcom to HelloWorld!','头像不能为空哟 :)');
        return false;
    };



});







