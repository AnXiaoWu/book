// 博客详情页  回复页

var express = require('../node_modules/express');
// 获取路由对象
var router = express.Router();
var Message = require('../modules/db/message')
var User = require('../modules/db/user')  // 账号
var Article = require('../modules/db/article')  // 文章
var session = require('express-session');

var tools = require('../modules/tools')

//博客详情


var count = 0

router.get('/issues/:_id', (req, res) => {

//   console.log(req.params);
    Message
        .find()
        .populate('article').populate('author')
        .updateOne({_id:req.params._id},{
            count:count+=1
        },(err)=>{
            if(err){

            }else{
                // console.log('访问量+1');
            }
        })
      
        .find({ _id: req.params }, (err, datas) => {
            User.findOne({ _id: datas[0].author }, (err, msg) => {
                if (err) {
                    console.log('博客详情');
                    console.log(err);
                } else {
                    var data = JSON.parse(JSON.stringify(datas));

                    res.render('issues.html', { msg, data ,nawyear:-1})
                }
            })

        
        })
      


})

// 用户列表
// router.get('/issues/:_id',(req,res)=>{
//     console.log(req.params);
//     Message.findOne({_id:req.params}).exec((err,data)=>{

//         res.render('issues.html',{data})
//     })    

// })


// 回复博客
router.post('/issues', (req, res) => {
    // console.log(req.body._id);
    var article = new Article({
        text: req.body.text,
        time: tools.times(new Date()),
        username: req.session.user.username
    })

    article.save(err => {
        Message.findOne({ _id: req.body._id }, (err, msg) => {
            msg.article.push(article._id)
            msg.save(err => {
                // console.log(msg);
                res.redirect('/issues/' + req.body._id)
            })
        })
    })
})


// 删除文章

router.get('/delt/:_id', (req, res) => {
    console.log(req.params);
    res.query

    Message.deleteOne({ _id: req.params }, (err) => {
        if (err) {
            res.send('出错啦')
        } else {
            res.redirect('/')
        }
    })
})

// 转到编辑文章页
router.get('/add/:id', (req, res) => {
    // console.log(req.params.id);
    Message.findOne({ _id: req.params.id }, (err, datas) => {
        // var data = JSON.parse(JSON.stringify(datas))
        var data = JSON.parse(JSON.stringify(datas));
        console.log(data);

        res.render('addissue.html', { data })
    })


})
// 编辑页提交
// console.log(req.params);
router.post('/add', (req, res) => {
    // console.log(req.params);
    console.log(req.body._id);
    // console.log(req.query._id);

    Message.updateOne({ _id: req.body._id }, {
        text: req.body.text,
        time: tools.times(new Date())
    }, (err) => {
        if (err) {
            res.send('修改失败')
        } else {
            res.redirect('/issues/' + req.body._id)
        }
    })

})








module.exports = router;