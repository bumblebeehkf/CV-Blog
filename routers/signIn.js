var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get('/', function (req, res, next) {
    res.sendFile(path.resolve('public/signIn.html'));
});

//验证账号密码是否正确
router.post('/', function (req, res, next) {
    //连接MySQL数据库
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'qq6257364',
        charset:'utf8_general_ci'
    });
    connection.connect();
    //使用数据库
    connection.query('use Blog');
    connection.query('select *  from user', function (erro, rows) {
        //将数据库中的所有用户名放在数组arr中
        var arr = [];
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].name) {
                arr.push(rows[i].name);
            }
        };
        //检验用户是否存在
        for (var j = 0; j < arr.length; j++) {
            if (req.body.name == arr[j]) {
                //把用户是否存在的结果存储起来
                var exist = true;
                connection.query('select password from user where name=?', [req.body.name], function (erro, rows) {
                    if (req.body.password == rows[0].password) {
                        res.send({msg:"账号密码正确"});
                    } else {
                        res.send({msg: "密码错误啦！"});
                    }
                });
            }
        }
        //用户不存在的情况
        if (!exist) {
            res.send({msg: "账号不存在啊，请重新输入账号密码"});
        }
    });
});

//验证成功后发送个人主页
router.post('/success', function(req, res, next) {
    //设置cookie, 发送登录成功页面
    res.cookie('userName', req.body.name );
    res.redirect('/posts');
});


module.exports = router;