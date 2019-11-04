var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db=require("./db");
  db.query('select * from ??', ['yonghu'], function (err, result, fields) {
        if (err) {
            console.log(err);
        } else {
          res.render('index', { title: '首页' ,arr:result},)
            console.log(result);
        }
    })
  }); 
module.exports = router;
