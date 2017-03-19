/**
 * Created by Ben on 2017/3/12.
 */
function loadIndex() {
    var template = $('#write').html();
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

//提示不能发表空标题
$('.sumitForm').submit(function() {
    if($('#title').val() == "") {
        alert('文章标题不能为空哇 :)');
        return false;
    }
});







