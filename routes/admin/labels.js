var express = require('express');
const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const ObjectId = require('mongodb').ObjectId;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    mongoClient.connect(url,(err,client)=>{
        if(err){
            console.log(err);
            return;
        }
        const db = client.db('myblog');
        const labels = db.collection('labels');
        labels.find().toArray((err,data)=>{
            if(err) {
                console.log(err);
                return;
            }else{
                res.render('admin/label',{data:data});
            }
        })
        client.close()
    })
});
router.get('/add',(req,res)=>{
    res.render('admin/label_add');
})
router.post('/add',(req,res)=>{
    var label = req.body.label;
    var time = new Date();
    // console.log(label)
    mongoClient.connect(url,(err,client)=>{
        if(err){
            console.log(err)
            return
        }
        // console.log("链接成功");
        const db = client.db('myblog');
        const labels = db.collection('labels');
        labels.insert({label:label,time:time},(err)=>{
            if(err){
                console.log(err);
                return;
            }else{
                res.send("添加成功，<a href='/admin/labels'>跳转到标签列表</a>")
            }
        })
        client.close()
    })
})
router.get('/del',(req,res)=>{
    var id = req.query.id;
    // console.log(id)
    mongoClient.connect(url,(err,client)=>{
        if(err){
            console.log(err);
            return;
        }
        const db = client.db('myblog');
        const labels = db.collection('labels');
        labels.remove({_id:ObjectId(id)},(err)=>{
            if(err){
                console.log(err)
                return;
            }else{
                res.send("删除标签成功，<a href='/admin/labels'>跳转到标签列表</a>")
            }
        })
        client.close()
    })
})
module.exports = router;
