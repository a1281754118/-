var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/news', function(req, res, next) {
  var db = require("./db");
  db.query("update   ?? set   Name = ?,Password = ?,mobile = ? ;",['yonghu','aa','abc123','1332552332'], function (err, result, fields) {
    if (err) {
        console.log(err);
    } else {
      res.render('news', { title: 'news' ,arr:result},)
        console.log(result);
    }
})
});
router.get('/sport', function(req, res, next) {
  res.render('sport', { title: 'sport' });
});
router.get('/music', function(req, res, next) {
  res.render('music', { title: 'music' });
});

module.exports = router;
