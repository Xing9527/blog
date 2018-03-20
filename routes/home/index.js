var express = require('express');
const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    mongoClient.connect(url,(err,client)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log("连接成功")
        const db = client.db('myblog');
        const posts = db.collection('posts');
        posts.find().toArray((err,data)=>{
            if(err){
                console.log(err);
                return;
            }
            res.render('home/index',{data:data});
        })
        client.close()
    })
});

module.exports = router;
