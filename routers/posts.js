var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');

router.use(cookieParser());

//连接MySQL数据库
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qq6257364'
});
connection.connect();
//使用数据库
connection.query('use Blog');
//创建article表
connection.query('create table article( name char(15), title char(30), content char(255),' +
    'articleId int not null auto_increment, primary key(articleId))',
    function (error, rows) {
    });


//首页
router.get('/all', function (req, res, next) {
    connection.query('select title,content,articleId from article', function (erro, rows) {
        if (erro) {
            console.log(erro)
        };
        res.send(rows);
    });
});

//个人文章列表
router.get('/', function (req, res, next) {
    res.sendFile(path.resolve('public/success.html'));
});

//写文章
router.post('/', function (req, res, next) {
    if (req.cookies.userName) {
        //把文章标题和内容写入数据库
        connection.query('insert into article(name,title,content) values(?,?,?)',
            [req.cookies.userName, req.body.title, req.body.content]);
    }
    //写完后跳到我的文章列表页
    res.sendFile(path.resolve('public/success.html'));
});


//登录成功后发送Ajax响应，返回个人文章数据
router.get('/blogs', function (req, res, next) {
    if (req.cookies.userName) {
        connection.query('select title,content,articleId from article where name=?', [req.cookies.userName],
            function (erro, rows) {
                if (erro) {
                    console.log(erro)
                }
                /*向客户端发送数据数组，
                 [{ title: '我的第一篇文章', content: '我们都是好孩子' },
                 { title: '我是一种小白鼠', content: '我需要电击。' },
                 { title: '禽兽的感官', content: '理性的灵魂。' } ]*/
                res.send(rows);
            })
    }
});

//用户登出后发出的Ajax响应，清除cookies,返回所有用户的文章数据
router.get('/signOut', function (req, res, next) {
    res.clearCookie('userName');
    connection.query('select title,content from article', function (erro, rows) {
        if (erro) {
            console.log(erro)
        };
        res.send(rows);
    });
});


//响应article.html的Ajax请求，返回该文章的内容和文章id
router.get('/:articleId', function (req, res, next) {
    connection.query('select title,content,articleId from article where articleId=?', [req.params.articleId],
        function (erro, rows) {
            if (erro) {
                console.log(erro)
            };
            connection.query('select user,comment from comments where articleId=?', [req.params.articleId],
                function (erro, data) {
                    if (erro) {
                        console.log(erro)
                    };
                    console.log(data);
                    var article_commentData = {
                        //文章数据
                        title: rows[0].title,
                        content: rows[0].content,
                        articleId: rows[0].articleId,
                        //评论数据
                        commentsArray: data
                        /*[ { user: 'feng', comment: 'j' },
                         { user: 'feng', comment: '懂得' },
                         { user: 'feng', comment: '懂得' ]*/
                    };
                    res.render('article.mustache', article_commentData);
                });
        });
});


//获取用户提交的评论，并将其存入到comments表中
router.post('/comment', function (req, res, next) {
    //创建评论表
    connection.query('create table comments( articleId char(30), user char(10), comment char(255) )',
        function (error, rows) {
        });
    connection.query('insert into comments(articleId,user,comment) values(?,?,?)',
        [req.body.articleId, req.cookies.userName, req.body.comment]);

    //返回有评论的文章页
    connection.query('select title,content,articleId from article where articleId=?', [req.body.articleId],
        function (erro, rows) {
            if (erro) {
                console.log(erro)
            };
            connection.query('select user,comment from comments where articleId=?', [req.body.articleId],
                function (erro, data) {
                    if (erro) {
                        console.log(erro)
                    };
                    var article_commentData = {
                        //文章数据
                        title: rows[0].title,
                        content: rows[0].content,
                        articleId: rows[0].articleId,

                        //评论数据
                        commentsArray: data
                        /*[ { user: 'feng', comment: 'j' },
                         { user: 'feng', comment: '懂得' },
                         { user: 'feng', comment: '懂得' ]*/
                    };
                    res.render('article_comments.mustache', article_commentData);
                });
        });
});


module.exports = router;