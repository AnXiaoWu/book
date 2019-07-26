// 首页
var express = require('../node_modules/express');
// 获取路由对象
var router = express.Router();
var Message = require('../modules/db/message')
var tools = require('../modules/tools')
var User = require('../modules/db/user')  // 账号
var multer = require('multer')
// router对象和app对象用法相似，可以添加多个接口
router.get('/', (req, res) => {

    // 页数
    var page = (req.query.page || 1) * 1;
    // 一页几条
    var show_cuont = 5


    Message
        .find()
        .skip((page - 1) * show_cuont)
        .limit(show_cuont)
        .sort({'time.year': -1})  //排序颠倒
        .populate('author')
        .populate('article')
        .exec((err, data) => {
            var att = []
            var seat = {}
            data.forEach((msg) => {

                //首页 标签栏
                att = att.concat(msg.label)
                var seats = new Set(att)
                seat = Array.from(seats)
                msg.article.forEach(article => {
                    article.time = tools.times(new Date());
                });
            });
            var msgs = JSON.parse(JSON.stringify(data));

            // console.log(msgs);

            Message.countDocuments((err, count) => {
                var allpage = Math.ceil(count / show_cuont);
                res.render('index.html', { msgs, page, allpage, show_cuont, seat });
            })

        });
    // console.log(req.session.user);
    // res.render('index.html');


});


// s 搜索

router.get('/s', (req, res) => {
    // console.log(req.params);
    Message.find({
        //     // 多条件模糊查询
        $or: [
            { title: { $regex: req.query.name, $options: '$i' } }, // /JAVA/i
            { text: { $regex: req.query.name, $options: '$i' } },
            { label: { $regex: req.query.name, $options: '$i' } },
            { time: { $regex: req.query.name, $options: '$i' } }

        ]
    })
        .populate('author')
        .populate('article')
       
        .exec((err, datas) => {
            // console.log(data);
            var msgs = JSON.parse(JSON.stringify(datas))
            // res.send(data._id)
            console.log(msgs);

            res.render('FilterPaper.html', { msgs })

        });
})

router.get('/z:name', (req, res) => {
    var newuser = req.params.name
    console.log(req.params);
    Message.find()
        .populate('author')
        .populate('article')
        .exec((err, datas) => {
var data = JSON.parse(JSON.stringify(datas))
            // console.log(data);
            res.render('FilterPaper.html', { data, newuser })
        })
    // res.send(req.params)


})


// 标签
router.get('/label', (req, res) => {
    // console.log(req.params);
    var att = []
    Message.find({}, (err, datas) => {
        datas.forEach((label) => {
            // console.log(label);
            att = att.concat(label.label)
            // console.log(att);
        })
        // console.log(att);
        var seats = new Set(att)
        seat = Array.from(seats)
        // console.log(seat);
        // res.send(seat)

        res.render('label.html', { seat })
    })

})


//存档
router.get('/Archive', (req, res) => {

    Message.find()
    .populate('author')
    .populate('article')
    .sort({'time.year': -1}) 
    .exec((err, datas) => {
var data = JSON.parse(JSON.stringify(datas))
        // console.log(data);
        res.render('Archive.html',{data})
    })


    
})








//跳转 个人信息页 
router.get('/personal/:name', (req, res) => {
    // console.log(req.params.name);
    User
    .findOne({_id:req.params.name},(err,datas)=>{
        // console.log(datas);
        var data = JSON.parse(JSON.stringify(datas))
        res.render('personal.html',{data})
    })
   
    
})

// 保存个人信息

router.post('/personal',(req,res)=>{
    // console.log('-----------------');
// console.log(req.body.username);
    User.updateOne({username:req.body.username},{
        introduce:req.body.introduce,
        age:req.body.age,
        sex:req.body.sex,
        email:req.body.email
    },(err)=>{
        if(err){
            res.send('保存失败了')
        }else{
            // console.log('====================');
            // console.log(req.body);
            res.redirect('/')
        }
            // res.send(req.body)}
    })

})





module.exports = router;