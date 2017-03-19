var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
var monment = require('moment');

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
    'time char(50), pageView int default 1, commentNum int default 0 ,' +
    'articleId int not null auto_increment, primary key(articleId))', function(erro, rows) {
    if(erro) {}
});

//首页
router.get('/all', function (req, res, next) {
    connection.query('select name,title,content,articleId,time,pageView,commentNum ' +
        'from article order by time desc',
        function (erro, rows) {
            if (erro) {console.log(erro)};

            connection.query('select name,avatar_address,sex,produce from user', function(erro, data) {
                if(erro) {console.log(erro)};

                //写入作者头像地址
                rows.forEach(function(item, index, input) {
                    data.forEach(function(obj, index, input) {
                        if(item.name == obj.name){
                            item.avatar = obj.avatar_address;
                            item.produce = obj.produce;
                            item.name = obj.name;
                            item.sex = obj.sex;
                        };
                    });
                });

                res.send(rows);
            });
        });
});

//个人文章列表
router.get('/', function (req, res, next) {
    res.sendFile(path.resolve('public/success_index.html'));
});

//写文章
router.post('/', function (req, res, next) {
    if (req.cookies.userName) {
        //把文章标题和内容,时间写入数据库
        var time = monment(new Date()).format('YYYY-MM-DD HH:mm');
        connection.query('insert into article(name,title,content,time) values(?,?,?,?)',
            [req.cookies.userName, req.body.title, req.body.content, time]);
    }
    //写完后跳到我的文章列表页
    res.sendFile(path.resolve('public/success.html'));
});

//登录成功后发出Ajax响应，返回个人文章数据
router.get('/blogs', function (req, res, next) {
    if (req.cookies.userName) {
        connection.query('select name,title,content,articleId,time,pageView,commentNum from article' +
            ' where name=? order by time desc',
            [req.cookies.userName],
            function (erro, rows) {
                if (erro) {console.log(erro)};
                /*向客户端发送数据数组，
                 [{ title: '我的第一篇文章', content: '我们都是好孩子',time:'' },
                 { title: '我是一种小白鼠', content: '我需要电击。' },
                 { title: '禽兽的感官', content: '理性的灵魂。' } ]*/

                //写入作者头像地址
                connection.query('select name,avatar_address,produce,sex from user', function(erro, data) {
                    if(erro) {console.log(erro)};

                    rows.forEach(function(item, index, input) {
                        data.forEach(function(obj, index, input) {
                            if(item.name == obj.name){
                                item.avatar = obj.avatar_address;
                            };
                        });
                    });
                    res.send(rows);
                });
            })
    }
});

//用户登出后发出的Ajax响应，清除cookies,返回所有用户的文章数据
router.get('/signOut', function (req, res, next) {
    res.clearCookie('userName');
    connection.query('select name,title,content,time,articleId,pageView,commentNum from' +
        ' article order by time desc', function (erro, rows) {
        if (erro) {console.log(erro)};

        //写入作者头像地址
        connection.query('select name,avatar_address,produce,sex from user', function(erro, data) {
            if(erro) {console.log(erro)};

            rows.forEach(function(item, index, input) {
                data.forEach(function(obj, index, input) {
                    if(item.name == obj.name){
                        item.avatar = obj.avatar_address;
                        item.produce = obj.produce;
                        item.name = obj.name;
                        item.sex = obj.sex;
                    };
                });
            });
            res.send(rows);
        });
    });
});

//根据文章id返回文章详情页
//分别从article,user,comments三张表中获取数据，构造由各个新对象组成的数组返回给模板渲染
router.get('/:articleId', function (req, res, next) {
    //从article表中获取文章内容
    connection.query('select name,title,content,articleId,time,pageView,commentNum from article' +
        ' where articleId=? order by time desc',
        [req.params.articleId],
        function (erro, rows) {
            if (erro) {console.log(erro)};

            //从user表中获取头像地址
            connection.query('select name,avatar_address from user', function(erro,data) {
                if(erro) {console.log(erro)};

                //获取文章作者的头像
                rows.forEach(function(item, index, input) {
                    data.forEach(function(obj, index, input) {
                        if(item.name == obj.name){ item.avatar = "../" + obj.avatar_address };
                    });
                });

                //从commments表中获取评论
                connection.query('select user,comment from comments where articleId=?', [req.params.articleId],
                    function (erro, com) {
                        if (erro) {console.log(erro)};

                        //获取各个文章评论者的头像
                        com.forEach(function(item, index, input) {
                            data.forEach(function(obj, index, input) {
                                if(item.user == obj.name) { item.comment_avatar = "../" + obj.avatar_address };
                            });
                        });

                        //页面访问量自动加一
                        rows[0].pageView+=1;
                        //访问量更新到article表中
                        connection.query('update article set pageView=? where articleId=?',
                            [rows[0].pageView, rows[0].articleId]);

                        //发送给模板的数据，title等四个属性存储文章内容的数据，commentsArray数组存储各个评论信息
                        var article_commentData = {
                            //文章数据
                            title: rows[0].title,
                            content: rows[0].content,
                            articleId: rows[0].articleId,
                            avatar: rows[0].avatar,
                            time: rows[0].time,
                            pageView: rows[0].pageView,
                            commentNum: rows[0].commentNum,
                            //评论数据
                            commentsArray: com,
                            /*[ { user: 'feng', comment: 'j'， comment_avatar: '../avatar/avatar1.png' },
                             { user: 'feng', comment: '懂得'， comment_avatar: '../avatar/avatar1.png' },
                             { user: 'feng', comment: '懂得'， comment_avatar: '../avatar/avatar1.png' ]*/
                            //构造编辑和删除文章的路由
                            articleDelete:  '/posts/'+ rows[0].articleId + '/delete',
                            articleEdit: '/posts/' + rows[0].articleId + '/edit'
                        };

                        if(req.cookies.userName) {
                            if(req.cookies.userName == rows[0].name) {
                                res.render('article.mustache', article_commentData);
                            }
                            else {
                                //不是本人不能编辑或者删除文章
                                res.render('article_else.mustache', article_commentData);
                            }
                        }
                        else {
                            //未登录不能评论
                            res.render('article_out.mustache', article_commentData)
                        }

                    });
            });
        });
});

//用户提交评论后，渲染新的文章详情页
router.post('/comment', function (req, res, next) {
    //创建评论表comments
    connection.query('create table comments( articleId char(30), user char(10), comment char(255) )',
        function (error, row) {});
    //把新评论存储到comments表中
    connection.query('insert into comments(articleId,user,comment) values(?,?,?)',
        [req.body.articleId, req.cookies.userName, req.body.comment]);

    connection.query('select name,title,content,articleId,time,pageView,commentNum from article ' +
        'where articleId=? order by time desc',
        [req.body.articleId],
        function (erro, rows) {if (erro) {console.log(erro)};

            //更新评论数
            rows[0].commentNum += 1;
            connection.query('update article set commentNum=? where articleId=?',
                [rows[0].commentNum, rows[0].articleId])

            connection.query('select name,avatar_address from user', function(erro,data){
                if(erro) {console.log(erro)};

                rows.forEach(function(item, index, input) {
                    data.forEach(function(obj, index, input) {
                        if(item.name == obj.name){
                            item.avatar = "../" + obj.avatar_address;
                        };
                    });
                });

                connection.query('select user,comment from comments where articleId=?', [req.body.articleId],
                    function (erro, com) {
                        if (erro) {console.log(erro)};

                        com.forEach(function(item, index, input) {
                            data.forEach(function(obj, index, input) {
                                if(item.user == obj.name) { item.comment_avatar = "../" + obj.avatar_address };
                            })
                        });   console.log(rows)

                        var article_commentData = {
                            //文章数据
                            title: rows[0].title,
                            content: rows[0].content,
                            articleId: rows[0].articleId,
                            avatar: rows[0].avatar,
                            time: rows[0].time,
                            pageView: rows[0].pageView,
                            commentNum: rows[0].commentNum,
                            //评论数据
                            commentsArray: com,
                            /*[ { user: 'feng', comment: 'j' },
                             { user: 'feng', comment: '懂得' },
                             { user: 'feng', comment: '懂得' ]*/
                            //构造编辑和删除文章的路由
                            articleDelete:  '/posts/'+ rows[0].articleId + '/delete',
                            articleEdit: '/posts/' + rows[0].articleId + '/edit'
                        };   console.log(article_commentData)
                        res.render('article_comments.mustache', article_commentData);
                    });
            });
        });
});

//删除文章
router.get('/:articleId/delete', function(req, res, next) {
    //只能删除自己的文章
    connection.query('select name from article where articleId=?', [req.params.articleId], function(erro, ro) {
        if(erro) {};
        //防止刷新页面后重复提交表单之后出现错误
        if(ro.length != 0) {
            if (ro[0].name == req.cookies.userName) {
                connection.query('delete from article where articleId=?', [req.params.articleId], function (erro, rows) {
                    if (erro) {console.log(erro)}
                    ;
                });
            }
        }
    });
    //删除后或者无删除权限跳到我的文章列表页
    res.sendFile(path.resolve('public/success_delete.html'));
});

//编辑文章
router.get('/:articleId/edit', function(req, res, next) {
    connection.query('select name,title,content,articleId from article where articleId=?', [req.params.articleId],
        function (erro, data) {
            if (erro) {console.log(erro)};

            //只能编辑自己的文章
            if (data[0].name == req.cookies.userName) {
                res.render('edit.mustache', data[0])
            }
            else {
                res.sendFile(path.resolve('public/success.html'));
            }
        });
});

//更新article表中被编辑的文章
router.post('/edit', function(req, res, next) {
    connection.query('update article set title=?,content=? where articleId=?',
        [req.body.title, req.body.content ,req.body.articleId],
        function(erro) {
            if(erro) {console.log(erro)};
    });

    res.sendFile(path.resolve('public/success.html'));
});


module.exports = router;