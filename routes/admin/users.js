var express = require('express');
const mongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/login');
});
router.post('/exist',(req,res)=>{
  var username = req.body.username;
  var pwd = req.body.pwd;
  console.log(pwd)
  console.log(username)
  mongoClient.connect(url,(err,client)=>{
    if(err){
      console.log(err);
      return;
    }
    const db = client.db('xing');
    const users = db.collection('users');
    users.find({username:username,pwd:pwd}).toArray((err,docs)=>{
      console.log(docs)
      if(err){
        console.log(err);
        return;
      }
      if(docs.length){
        //登陆成功
          req.session.isLogin = true;
          res.redirect('/admin/index')
      }else{
        res.redirect('/admin/users')
      }
    })
      client.close()
  })
});
router.get('/logout',(req,res)=>{
  req.session.isLogin = false;
  res.redirect('/admin/users')
})

module.exports = router;
