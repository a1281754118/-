var router = require("express").Router();
var db = require('./db')


//请求搜索
router.get('/get', function (req, res) {
    var keyword = req.query.keyword || "";
    db.query('select * from tb_order where ContactName like ? or Mobile like ? order by Id ',
        ['%' + keyword + '%','%' + keyword + '%'],
        function (err, result) {
            if (err) {
                console.log(err);
                res.send({
                    success: false,
                    message: "服务器内部错误"
                })
            } else {
                console.log(result)
                res.send({
                    success: true,
                    message: "请求成功",
                    rows: result
                })
            }
        })
})




module.exports = router;