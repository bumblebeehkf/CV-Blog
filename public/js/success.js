//用户登录成功后从服务器端获取数据，渲染页面
$.ajax({
    type: 'get',
    url: '/posts/blogs',
    dataType: 'json',
    success: function(data) {
        var dataObject =  { items: data };
        function render() {
            var template = $('#item-template').html();
            Mustache.parse(template);   // optional, speeds up future uses
            var rendered = Mustache.render( template, dataObject);
            $('#blog').html(rendered);
        };
        render();

    }
});

//右上角按钮
$('.nav-login').click(function (e) {
    $('.nav-login-box').show();
    e.stopPropagation();
});
$(document).click(function () {
    $('.nav-login-box').hide();
});











