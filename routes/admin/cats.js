var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const DB_STR = "mongodb://localhost:27017";
/* GET home page. */
router.get('/',(req,res)=>{
    mongoClient.connect(DB_STR,(err,client)=>{
        if(err){
            res.send(err);
            return;
        }
        console.log("链接成功");
        const db = client.db('myblog');
        const cats = db.collection('cats');
        cats.find().toArray((err,docs)=>{
            // console.log(docs)
            res.render('admin/category_list',{data:docs});
        });
        client.close();
    })
})
router.get('/add',(req,res)=>{
    res.render('admin/category_add');
});
router.post('/add',(req,res)=>{
    var title = req.body.title;
    var sort = req.body.sort;
    mongoClient.connect(DB_STR, function(err, client) {
        if(err){
            console.log(err);
            return
        }
        console.log("链接成功")
        const db = client.db('myblog');
        const cats = db.collection('cats');
        cats.insert({title:title,sort:sort},(error)=>{
            if(error){
                console.log(error);
                return
            }else{
                res.send("添加成功,<a href='/admin/cats'>分类列表</a>")
            }
        });
        client.close();
    });

});
router.get('/edit',(req,res)=>{
    var id = req.query.id;
    mongoClient.connect(DB_STR,(err,client)=>{
        if(err){
            res.send(err);
            return;
        }
        console.log("链接成功");
        const db = client.db('myblog');
        const cats = db.collection('cats');
        cats.find({_id:ObjectId(id)}).toArray((err,docs)=>{
            // console.log(docs);
            res.render('admin/category_edit',{data:docs[0]});
        });
        client.close();
    })

});
router.post('/edit',(req,res)=>{
    var title = req.body.title;
    var sort = req.body.sort;
    var id = req.body.id;
    mongoClient.connect(DB_STR,(err,client)=>{
        if(err){
            res.send(err);
            return;
        }
        console.log("链接成功");
        const db = client.db('myblog');
        const cats = db.collection('cats');
        cats.update({_id:ObjectId(id)},{$set:{title:title,sort:sort}},(error)=>{
            if(error){
                console.log(error);
                return;
            }else{
                res.send("修改成功，<a href='/admin/cats'>分类列表</a>")
            }
        })
        client.close();
    })
});
router.get('/del',(req,res)=>{
    var id = req.query.id;
    mongoClient.connect(DB_STR,(err,client)=>{
        if(err){
            res.send(err);
            return;
        }
        console.log("链接成功");
        const db = client.db('myblog');
        const cats = db.collection('cats');
        cats.remove({_id:ObjectId(id)},(error)=>{
            if(error){
                console.log(error);
                return;
            }else{
                res.send("删除成功，<a href='/admin/cats'>分类列表</a>")
            }
        })
        client.close();
    })
})

module.exports = router;
