var path = require('path');

module.exports = function (app) {
    //进入首页
    app.get('/', function (req, res) {
        res.sendFile(path.resolve('public/index.html'));
    });

    //注册页路由
    app.use('/signUp', require('./signUp'));

    //登录页路由
    app.use('/signIn', require('./signIn'));

    //文章页路由
    app.use('/posts', require('./posts'))

}
