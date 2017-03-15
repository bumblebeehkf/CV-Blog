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







