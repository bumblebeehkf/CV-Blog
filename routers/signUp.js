var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var multer = require('multer');

router.use(multer({dest: '/tmp/'}).array('avatar'));

router.get('/', function (req, res, next) {
    res.sendFile(path.resolve('public/signUp.html'));
});

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
    //创建user表
    connection.query('create table user( name char(15), password char(30), sex char(15), produce char(50), avatar_address char(50) )',
                     function (error, rows) { });
    //插入用户信息
    var avatar_address = 'avatar/' + req.files[0].originalname;
    connection.query('insert into user(name,password,sex,produce,avatar_address) values(?,?,?,?,?)',
                      [req.body.name, req.body.password, req.body.sex, req.body.produce, avatar_address]);
    connection.end();

    //把头像放到avatar文件夹中
    var des_file = "public/avatar/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
             if( err ){console.log( err )};
            });
        });

    res.redirect('/signIn');
});

module.exports = router;