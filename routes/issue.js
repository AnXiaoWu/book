// 发布页

var express = require('../node_modules/express');
// 获取路由对象
var router = express.Router();
var Message = require('../modules/db/message')
var tools=require('../modules/tools')
router.get('/issue',(req,res)=>{
    console.log('================转到');
    res.render('issue.html');
})
router.post('/issue',(req,res)=>{
console.log('-----------------------------发布l');
console.log(req.body);
// console.log(req.session.user);
var msg = new Message({
    title:req.body.title,
    label:req.body.label,
    time:tools.times(new Date()),
    text:req.body.text,
    author:req.session.user._id,
    article:[],
   
})
// console.log(msg);
// console.log(tools.times(new Date()));
msg.save(err=>{
    // console.log(msg);
    res.redirect('/')
});
})







module.exports = router;