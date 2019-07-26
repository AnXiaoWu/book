var mongoose = require('./connection');

var articleSchema = new mongoose.Schema({
    username:String,
    time:Object,
    text:String
    
});

var Article = mongoose.model('article',articleSchema);

module.exports = Article;