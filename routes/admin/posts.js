var express = require('express');
var router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const DB_STR = "mongodb://localhost:27017";

/* GET home page. */
router.get('/', function(req, res, next) {
    mongoClient.connect(DB_STR,(err,client)=>{
        const db = client.db('xing');
        const posts = db.collection('posts');
        posts.find().toArray((err,data)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log("链接成功");
            res.render('admin/article_list',{data:data});
        })
        client.close()
    })
});
router.get('/add',(req,res)=>{
    mongoClient.connect(DB_STR,(err,client)=>{
        if(err){
            console.log(err);
            return;
        }
        // console.log("链接成功");
        const db = client.db('xing');
        const cats = db.collection('cats');
        cats.find().toArray((err,data)=>{
            res.render('admin/article_add',{data:data});
        })
        client.close();
    })
});
router.post('/add',(req,res)=>{
    var cat = req.body.cat;
    var title = req.body.title;
    var time = new Date();
    var summary = req.body.summary;
    var content = req.body.content;
    var post = {
        "cat":cat,
        "title":title,
        "time":time,
        "summary":summary,
        "content":content
    };
    mongoClient.connect(DB_STR,(err,client)=>{
        if(err){
            // console.log(err);
            return;
        }
        // console.log("链接成功");
        const db = client.db('xing');
        const posts = db.collection('posts');

        posts.insert(post,(err)=>{
            if(err){
                // console.log(error);
                return;
            }else{
                res.send("添加成功，<a href='/admin/posts'>跳转到文章列表</a>")
            }
        });
        client.close();
    })
});
router.get('/del',(req,res)=>{
    var id = req.query.id;
    // console.log(id);
    mongoClient.connect(DB_STR,(err,client)=>{
        if(err){
            console.log(err);
            return;
        }
        const db = client.db('xing')
        const posts = db.collection('posts');
        posts.remove({_id:ObjectId(id)},(err)=>{
            if(err){
                console.log(err);
                return;
            }else{
                res.send("删除成功，<a href='/admin/posts'>跳转回文章列表</a>")
            }
        })
    })
})
module.exports = router;
