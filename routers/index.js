var path = require('path');

module.exports = function (app) {
    //进入首页
    app.get('/', function (req, res) {
        res.sendFile(path.resolve('public/index.html'));
    });

    //以下为三个静态网页路由
    app.get('/zhihu', function(req, res) {
        res.sendFile(path.resolve('public/works/zhihu/index.html'));
    });

    app.get('/xiaomi', function(req, res) {
        res.sendFile(path.resolve('public/works/mi/mi.html'));
    });

    app.get('/chuizi', function(req, res) {
        res.sendFile(path.resolve('public/works/smartisan/index.html'));
    });

    //注册页路由
    app.use('/signUp', require('./signUp'));

    //登录页路由
    app.use('/signIn', require('./signIn'));

    //文章页路由
    app.use('/posts', require('./posts'))

}
