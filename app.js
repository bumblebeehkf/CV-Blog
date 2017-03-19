var express = require('express');
var parser = require('body-parser');
var mysql = require('mysql');
var path = require('path');
var routers = require('./routers');
var app = express();
var mustacheExpress = require('mustache-express');

app.use(express.static(path.join(__dirname, 'public')));

//注册.mustache拓展名
app.engine('mustache', mustacheExpress());
//设置模板目录
app.set('views', path.join(__dirname, 'public'));
//设置模板引擎
app.set('view engine', 'mustache');


app.use(parser.urlencoded({
    extended: false
}));

routers(app);

app.use(function(erro,req,res,next) {
    if(erro) {console.log(erro)};
});

app.listen(4000, function () {
    console.log('web服务器已启动,端口:%s');
});