var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //指定存储路径
        cb(null, "./public/images")
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
//请i求数据
var upload = multer({ storage: storage });


router.get('/', function (req, res, next) {
    var db = require("./db");
    db.query(db.query('insert into `yonghu` name=?,Password=?,mobile=?', [input1, input2, input3]), function (err, result, fields) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { title: '首页', arr: result })
            console.log(result);
        }
    })
})
  //修改
  router.post('/xiugai',
  upload.single("file"),
  function (req, res, next) {
      console.log(req.signedCookies)
      console.log(req.body.name)
      if (req.file) {
          db.query(
              'update tb_admin set `Src`=?,`Name`=? where LoginName=?',
              ["/images/" + req.file.filename,req.body.name,req.signedCookies.node_auth],
              function (err, result) {
                  if (err) {
                      res.send({
                          success: false,
                          message: "修改失败"
                      })
                  } else {
                      if(result.affectedRows >0 ){
                           res.send({
                          success: true,
                          message: "修改成功"
                      })
                      }else{
                          res.send({
                              success: true,
                              message: "修改成功"
                          })
                      }
                     
                  }
              }
          );
      } else { db.query(
          'update tb_admin set `Name`=? where LoginName=?',
          [req.body.name,req.signedCookies.node_auth],
          function (err, result) {
              if (err) {
                  res.send({
                      success: false,
                      message: "修改失败"
                  })
              } else {
                  if(result.affectedRows >0 ){
                       res.send({
                      success: true,
                      message: "修改成功"
                  })
                  }else{
                      res.send({
                          success: true,
                          message: "修改成功"
                      })
                  }
                 
              }
          }
      );
      }
  });
module.exports = router;