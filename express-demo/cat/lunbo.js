var router = require("express").Router();
var db = require('../routes/db')
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
//搜索轮播表中的数据
router.get('/get',function(req,res){
    var keyword=req.query.keyword||"";
    db.query('select * from tb_ads where Enable=1',
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
router.get('/get1', function (req, res) {
    var keyword = req.query.keyword || "";
    db.query('select * from tb_category where Enable=1',
        function (err, result) {
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
    var keyword=req.query.keyword||"";
    db.query('select * from tb_ticket where SortNum<100 and Title  like ?',['%' + keyword + '%'],
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
router.get('/get3',function(req,res){
    var page=parseInt(req.query.page||1);
    var size=parseInt(req.query.size||8);
    var keyword="%"+(req.query.keyword||"")+"%"
    db.query(`select t.* 
    from tb_category as c inner join tb_ticket as t 
    on c.Id = t.CategoryId 
    where (c.Name like ? or t.Title like ? or t.ShopName like ? or t.ShopAddress like ? or t.ShopPhone like ? or t.Content like ?) and t.SortNum<100&&t.Enable=1
    order by SortNum limit ?,?`,[keyword,keyword,keyword,keyword,keyword,keyword,(page-1)*size,size],function(err,result){
        if(err){
            console.log(err);
            res.send({  
                success:false,
                message:"查询失败" 
            })
        }else{
            res.send({
                success:true,
                message:"查询成功",
                rows:result,
                // total:result[0].count
            })
        }
    })
})
router.get('/get4',function(req,res){
    var page=parseInt(req.query.page||1);
    var size=parseInt(req.query.size||8);
    var keyword="%"+(req.query.keyword||"")+"%"
    db.query(`select t.* 
    from tb_category as c inner join tb_ticket as t 
    on c.Id = t.CategoryId 
    where (c.Name like ? or t.Title like ? or t.ShopName like ? or t.ShopAddress like ? or t.ShopPhone like ? or t.Content like ?) and t.CategoryId=?&&t.Enable=1
    order by SortNum limit ?,?`,[keyword,keyword,keyword,keyword,keyword,keyword,req.query.id,(page-1)*size,size],function(err,result){
        if(err){
            console.log(err);
            res.send({  
                success:false,
                message:"查询失败" 
            })
        }else{
            res.send({
                success:true,
                message:"查询成功",
                rows:result,
                // total:result[0].count
            })
        }
    })
})
router.get('/get5',function(req,res){
    var page=parseInt(req.query.page||1);
    var size=parseInt(req.query.size||8);
    var keyword="%"+(req.query.keyword||"")+"%"
    db.query(`select t.* 
    from tb_category as c inner join tb_ticket as t 
    on c.Id = t.CategoryId 
    where (c.Name like ? or t.Title like ? or t.ShopName like ? or t.ShopAddress like ? or t.ShopPhone like ? or t.Content like ?) and t.Id=?
    order by SortNum limit ?,?`,[keyword,keyword,keyword,keyword,keyword,keyword,req.query.id,(page-1)*size,size],function(err,result){
        if(err){
            console.log(err);
            res.send({  
                success:false,
                message:"查询失败" 
            })
        }else{
            res.send({
                success:true,
                message:"查询成功",
                rows:result,
                // total:result[0].count
            })
        }
    })
})
router.post('/add',
    function (req, res, next) {
        console.log(req.body)
            db.query(
                'insert into tb_order (`CustomerId`,`TicketId`,`Price`,`Quantity`,`Total`,`Mobile`,`ContactName`,`UseDate`,`Status`) values (?,?,?,?,?,?,?,?,?)',
                [req.loginId,req.body.menpiaoid,req.body.price,req.body.quantity,req.body.zongjinger,req.body.moblie,req.body.name,req.body.date,"0"],
                function (err, result) {
                    if (err) {
                        res.send({
                            success: false,
                            message: "信息有误"
                        })
                    } else {
                        
                        res.send({
                            success: true,
                            message: "下单成功",
                            result:result
                        })
                    }
                }
            );
       
    });
    router.get('/get6',function(req,res){
        db.query('select * from tb_customer where Id=?',[req.loginId],
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
                    rows: result,
                })
            }
        })
    })
    router.post('/up',upload.single("file"),function(req,res){
        console.log(req.file)
        console.log(11111)
        if(req.file){
            db.query('update tb_customer set `AvatarUrl`=?  where `Id`=?',
            ["/images/" + req.file.filename,req.loginId],
            function (err, result) {
                if (err) {
                    console.log(err)
                    res.send({
                        success: false,
                        message: "修改失败"
                    })
                } else {
                    res.send({
                        success: true,
                        message: "修改成功"
                    })
                }
            }
        );
        }else{
            db.query('update tb_customer set `NickName`=?,`Province`=?,`City`=?  where `Id`=?',
            [req.body.name, req.body.province, req.body.city,req.loginId],
            function (err, result) {
                if (err) {
                    console.log(err)
                    res.send({
                        success: false,
                        message: "修改失败"
                    })
                } else {
                    res.send({
                        success: true,
                        message: "修改成功",
                        result:result[0]
                    })
                }
            }
        );
        }
        
    })
    router.post('/fukuan',function(req,res){
        console.log(23333333333)
        console.log(req.body)
        db.query('update tb_order set `Status`=?  where `CustomerId`=? and `Id`=?',
            [req.body.fukuan,req.loginId,req.body.id],
            function (err, result) {
                if (err) {
                    console.log(err)
                    res.send({
                        success: false,
                        message: "修改失败"
                    })
                } else {
                    res.send({
                        success: true,
                        message: "修改成功",
                        result:result[0]
                    })
                }
            }
        );
    })
    router.post('/shanchu', function (req, res) {
        setTimeout(()=>{
        console.log(23333333333)
        console.log(req.body)
        db.query('delete from tb_order where Id=?',[req.body.id],
            function (err, result) {
                if (err) {
                    console.log(err);
                    res.send({
                        success: false,
                        message: "服务器内部错误"
                    })
                } else {
                    if (result.affectedRows > 0) {
                        //受影响行数>0
                        res.send({
                            success: true,
                            message: "删除成功"
                        })
                    } else {
                        res.send({
                            success: false,
                            message: "找不到要删除的数据"
                        })
                    }

                }
            })
        },600000)
})
module.exports = router