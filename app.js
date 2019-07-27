var express = require('express');
var app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
const favicon = require('serve-favicon');
const path = require('path');
var Article = require('./modules/db/article')  // 文章
var User = require('./modules/db/user')  // 账号
var Message = require('./modules/db/message')
var md5 = require('md5');
var tools=require('./modules/tools')
var multer = require('multer')  
// 会话闪存
var flash = require('connect-flash');
app.use(flash());

// 渲染模块
var artTmpEngine = require('./modules/art-template');
artTmpEngine(app);

// 会话模块
var session = require('express-session');

var MongoStore = require('connect-mongo')(session);

app.use(session({
    //添加session的配置信息
    secret: 'myblog',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    },
    store: new MongoStore({
        // 连接数据库
        url: 'mongodb://127.0.0.1/session-blog'
    })
}));


//设置模板渲染的变量
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.error = req.flash('error').toString();
    next();
});

// 站点小图标

app.use(favicon(path.join(__dirname,"public/img/ico.jpg")));

// 导入路由模块   首页模块
var indexRouter = require('./routes/index');
// 使用路由
app.use(indexRouter);

// 登录 注册 退出登录模块
var loginRouter = require('./routes/login');
app.use(loginRouter)

// 发布页
var issueRouter = require('./routes/issue')
app.use(issueRouter)

var issuesRouter=require('./routes/issues')
app.use(issuesRouter)

// 换头像
var painterRouter= require('./routes/painter')
app.use(painterRouter)

app.listen(3000, function () {
    console.log('node running');
});