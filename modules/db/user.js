var mongoose =require('./connection')

var userSchema =new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    introduce:String,
    age:String,
    sex:String,
    headerurl:String

})

var User = mongoose.model('user',userSchema)

module.exports=User