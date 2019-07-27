// 登录 注册 退出登录
var express = require('../node_modules/express');
// 获取路由对象
var router = express.Router();
var User=require('../modules/db/user')  // 账号
var tools=require('../modules/tools')
var md5 = require('md5');


router.get('/login',(req,res)=>{    
    
    res.render('login.html')
});
// 登录
router.post('/login',(req,res)=>{
    User.findOne({username:req.body.username},(err,data)=>{
        if(!data){
            req.flash('error','用户名不存在');
            res.redirect('/login');
        }else{
            if(data.password==md5(req.body.password)){
                req.session.user = data;
                // console.log(req.session.user);
                // console.log(data);
                res.redirect('/');
            }else{
                req.flash('error','密码错误');
                res.redirect('/login');
            }
        }
    })
})





//注册
router.post('/signup',(req,res)=>{
console.log(req.body);
User.findOne({username:req.body.username},(err,data)=>{
    if(data){
        req.flash('error', '用户名已被抢注');
        res.redirect('/signup');
    }else{
        if(req.body.password==req.body.passwords){
            req.body.password=md5(req.body.password)
            var user = new User({
                username:req.body.username,
                password:req.body.password,
                email:'12345678@email.com',
                introduce:'这个个很懒,什么都没有..',
                age:'0',
                sex:'男',
                headerurl:'/img/toux.jpg'
            });
            user.save((err)=>{
                res.redirect('/login');
            })
        }else{
            req.flash('error', '两次密码不一致');
            res.redirect('/signup');
        }
    }
})



})


router.get('/signup',(req,res)=>{
    res.render('signup.html');
});

// 退出登录
router.get('/getout',(req,res)=>{
    req.session.user=null;

    res.redirect('/')
})


module.exports = router;