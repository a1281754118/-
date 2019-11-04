var router = require("express").Router();
var db = require('./db')
var multer = require('multer');
var path = require('path')
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
router.get('/get3',function(req,res){
    var keyword=req.query.keyword||"";
    db.query('select * from tb_ads where Src like ? order by Src',['%' + keyword + '%'],
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
//删除数据
router.post('/dele',function(req,res){
    console.log(req.body)
    if (req.body.id) {
        db.query('delete from tb_ads where Id=?', [req.body.id],
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
    } else {
        res.send({
            success: false,
            message: "缺少id参数"
        })
    }

})
//修改
router.post('/edl',upload.single('file'),function(req,res,next){
    console.log(req.body);
    if(req.file){
        db.query('update tb_ads set `Src`=?,`SortNum`=?,`Enable`=? where Id=?',
        ["/images/" + req.file.filename,req.body.sortnum,req.body.enable,req.body.id],function (err, result) {
            if (err) {
                console.log(err);
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
        })
    }else{
        db.query('update tb_ads set `SortNum`=?,`Enable`=? where Id=?',
        [req.body.sortnum,req.body.enable,req.body.id],function (err, result) {
            if (err) {
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
        })
    }

})
//增加
router.post('/add',
    upload.single("file"),
    function (req, res, next) {
        console.log(req.body)
        if (req.file) {
            db.query(
                'insert into tb_ads (`SortNum`,`Enable`,`Src`) values (?,?,?)',
                [req.body.sortnum, req.body.enable, "/images/" + req.file.filename],
                function (err, result) {
                    if (err) {
                        res.send({
                            success: false,
                            message: "添加失败"
                        })
                    } else {
                        res.send({
                            success: true,
                            message: "添加成功"
                        })
                    }
                }
            );
        } else {
            res.send({
                success: false,
                message: "添加分类时必须上传图片"
            })
        }
    });
module.exports = router