var express = require('express');
const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const ObjectId = require('mongodb').ObjectId;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var id = req.query.id;
    mongoClient.connect(url,(err,client)=>{
        if(err){
            console.log(err);
            return;
        }
        const db = client.db('myblog');
        const posts = db.collection('posts');
        posts.find({_id:ObjectId(id)}).toArray((err,data)=>{
            if(err){
                console.log(err)
                return
            }
            res.render('home/article',{data:data[0]})
        })
        client.close()
    })
});

module.exports = router;
