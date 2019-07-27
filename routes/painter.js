//更换头像
var express = require('express');

var fs = require('fs')
// 获取路由对象
var router = express.Router();
var multer = require('multer')
var User = require('../modules/db/user')
// 更换头像
router.get('/painter/:name', (req, res) => {
    res.render('painter.html')
})

var uploadpath = './public/img/'
var headername;
var stroage = multer.diskStorage({ //文件存储
    destination: function (req, file, cb) {
        cb(null, uploadpath);
    },
    // 自定义文件名，如果没有设置文件名，文件上传之后，默认保存的是一个随机名命名的二进制文件，没有扩展名
    filename: function (req, file, cb) {
        console.log('文件命名---------------------------');
        console.log(file);
        console.log(req.session.user.username);
        // { fieldname: 'myfiles',      input标签的name属性值
        // originalname: 'timg.jpg',    文件的原始名字
        // encoding: '7bit',            文件的编码格式
        // mimetype: 'image/jpeg'       文件的mime类型
        // }
        var arr = file.originalname.split('.')
        var ext = arr[arr.length - 1];
        // 姓名-时间.后缀
        headername = req.session.user.username + '-' + Date.now() + '.' + ext;
        // console.log(headername);
        cb(null, headername);
    }
});

var upload = multer({
    storage: stroage,
    limits: {
        // 文件大小限制
        fileSize: 1024 * 1024 * 10
    },
    // 文件的筛选：决定哪些文件可上传，哪些文件跳过
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);//是图片接收
        } else {
            // cb(null, false);
            cb('只能上传图片', false);//拒绝这个文件
        }
    }
   
});


router.post('/painter', upload.single('headerimg'), (req, res) => {
    // console.log('旧头像：' + req.session.user.headerurl);
    var headerurl = '/img/' + headername

    if (fs.existsSync(uploadpath + headername)) {
        User.findOne({ _id: req.session.user._id }, (err, user) => {
            if (user.headerurl != '/img/toux.jpg') { //了如果不是默认头像
                fs.unlinkSync('./public' + user.headerurl)

            }
            user.headerurl = headerurl;
            user.save(() => {
                req.session.user.headerurl = headerurl;
                res.redirect('/')
            })
        })
    } else {
        res.send('上传失败')
    }
})




module.exports = router;