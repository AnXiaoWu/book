var mongoose = require('./connection')

var msgSchema= new mongoose.Schema({
    title:String,
    text:String,
    label:Array,
    time:Object,
    count:Number,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    article:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'article'
    }]
})
var Message = mongoose.model('message',msgSchema)

module.exports=Message;