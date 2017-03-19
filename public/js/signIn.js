swal('Welcome to HelloWorld！','请登录后开启您的全新旅程吧～, 如果没有账号,记得先注册哦');

function loadIndex() {
    var template = $('#signIn').html();
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


//不提交表单，只是取出表单的值作为数据进行post,发送Ajax进行验证
$('#submit').click(function(){

    if($('#name').val() == ''){
        swal('Welcom to HelloWorld!','账户名不能为空撒 :)');
        return false;
    };
    if($('#password').val() == ''){
        swal('Welcom to HelloWorld!','密码不能为空喔 :)');
        return false;
    };

    $.ajax({
        data:{name:$('#name').val(),password:$('#password').val()},
        type: 'post',
        url: '/signIn',
        dataType: 'json',
        success: function(data){
           if (data.msg == "账号不存在啊，请重新输入账号密码") {
                 swal('账号不存在，赶快注册一个吧～');
            }
            else if (data.msg == "密码错误啦！") {
               swal('密码错啦～');
            }
           else if (data.msg == "账号密码正确") {
                $('#dd').click();  //触发表单的提交事件
            }
        }
});

});





