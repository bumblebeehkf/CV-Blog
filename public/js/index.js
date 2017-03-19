//首页或者用户登出后，渲染所有用户的文章
$.ajax({
    type: 'get',
    url: '/posts/all',
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

        //hover方法显示/隐藏作者信息
        $('.Box-avatar').each(
            function(){
                $(this).hover(function() {
                    $(this).parent().find('.Box-msg').show();
                },function(){
                    $(this).parent().find('.Box-msg').hide();
                })
            });
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




