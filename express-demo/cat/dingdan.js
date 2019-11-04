var router = require("express").Router();
var db = require('../routes/db')

router.get('/',function(req,res){
    console.log(req.query)
    db.query('select tt.Title,tt.Src,dd.* from tb_ticket as tt inner join tb_order as dd  on tt.Id =dd.TicketId where CustomerId=? and Status=?',[req.loginId,req.query.index],
    function(err,result){
        if (err) {
            console.log(err);
            res.send({
                success: false,
                message: "服务器内部错误"
            })
        } else {
            res.send({
                success: true,
                message: "请求成功",
                rows: result
            })
        }
    })
})
router.get('/get2',function(req,res){
    console.log(req.query)
    db.query('select tt.Title,tt.Src,dd.* from tb_ticket as tt inner join tb_order as dd  on tt.Id =dd.TicketId where CustomerId=? and dd.Id=?',[req.loginId,req.query.id],
    function(err,result){
        if (err) {
            console.log(err);
            res.send({
                success: false,
                message: "服务器内部错误"
            })
        } else {
            res.send({
                success: true,
                message: "请求成功",
                rows: result
            })
        }
    })
})




module.exports = router