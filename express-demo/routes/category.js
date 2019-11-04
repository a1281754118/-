var router = require("express").Router();
var db = require('./db')

var validator=require('./validator');
var path = require('path')
var multer = require('multer');
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
router.get('/shuju1', function (req, res){
    db.query('select * from tb_admin',
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
router.get('/shuju', function (req, res) {
    console.log(req.signedCookies);
    console.log(req.body);
    
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    var loginname=req.signedCookies.node_auth
    if(reg.test(loginname)){
        db.query('select * from tb_admin where Name=?', [req.signedCookies.node_auth],
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
    }else{
        db.query('select * from tb_admin where  LoginName=?', [req.signedCookies.node_auth],
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
    }
    
})
//搜索
router.get('/get', function (req, res) {
    var keyword = req.query.keyword || "";
    db.query('select * from tb_category where Name like ? order by SortNum',
        ['%' + keyword + '%'],
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
//获取
router.get('/get1', function (req, res) {
    var keyword = req.query.keyword || "";
    db.query('select * from tb_customer where NickName like ? order by NickName',
        ['%' + keyword + '%'],
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
//修改
router.post('/add1',
    upload.single("file"),
    function (req, res, next) {
        console.log(req.body)
        if (req.body.status==1) {
            db.query(
                'update tb_customer set `Status`=? where Id=?',
                [0,req.body.id],
                function (err, result) {
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
                }
            );
        } else {
            db.query(
                'update tb_customer set `Status`=? where Id=?',
                [1,req.body.id],
                function (err, result) {
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
                }
            );
        }
    });
    //增加
router.post('/add',
    upload.single("file"),
    function (req, res, next) {
        console.log(req.body)
        if (req.file) {
            db.query(
                'insert into tb_category (`Name`,`SortNum`,`Enable`,`Src`) values (?,?,?,?)',
                [req.body.name, req.body.sortnum, req.body.enable, "/images/" + req.file.filename],
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

router.post('/edit',
    upload.single("file"),validator.valid({type:'post',rules:[{
        min:4,prop:'req.body.name',
    }]}),
    function (req, res, next) {
        if (req.file) {
            db.query(
                'update tb_category set `Name`=?,`SortNum`=?,`Enable`=?,`Src`=? where `Id`=?',
                [req.body.name, req.body.sortnum, req.body.enable, "/images/" + req.file.filename, req.body.id],
                function (err, result) {
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
                }
            );

        } else if (req.file==undefined) {
            db.query(
                'update tb_category set `Name`=?,`SortNum`=?,`Enable`=?  where `Id`=?',
                [req.body.name, req.body.sortnum, req.body.enable, req.body.id],
                function (err, result) {
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
                }
            );
        }
        else {
            res.send({
                success: false,
                message: "修改分类时必须上传图片"
            })
        }
    });
//    删除
router.post('/del', function (req, res) {
    if (req.body.id) {
        db.query('delete from tb_category where Id=?', [req.body.id],
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
router.post('/delete',function(req,res){
    if(req.body.id){
        db.query('delete from tb_admin where `Id`=?',[req.body.id],
        function(err,result){
            if(err){
                res.send({
                    success:false,
                    message:'内部服务器错误'
                })
            }else{
                if(result.affectedRows>0){
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
    }
})
//重置\
router.post('/chongzhi',function (req, res, next) {
    console.log(req.signedCookies)
    db.query('update tb_admin set `Password`=md5(?) where `Id`=?',
        ['123456',req.body.id],
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
})
//修改密码
//修改
router.post('/xiugai1',
upload.single("file"),
function (req, res, next) {
    console.log(req.signedCookies)
    console.log(req.body)
    if(req.body.password!='undefined'){
        console.log(req.body.password.length);
        db.query(
            'select * from tb_admin where `Password`=md5(?)',
            [req.body.password],
            function(err,result){
                console.log(result);
                if(err){
                    res.send({
                        success:false,
                        message:"数据访问异常"
                    })
                }else{
                    if(result.length>0){
                        console.log(result);
                        console.log(req.filename);
                        //大于0，说明有查到记录，
                        if (req.file) {
                            db.query(
                                'update tb_admin set `Src`=?,`Name`=?,`Password`=md5(?) where `Id`=?',
                                ["/images/" + req.file.filename,req.body.name,req.body.password1,req.body.id],
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
                            'update tb_admin set `Name`=?,`Password`=md5(?) where `Id`=?',
                            [req.body.name,req.body.password1,req.body.id],
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
                    }else{
                        res.send({
                            success:false,
                            message:"原密码有误"
                        })
                    }
                }
            }
        )
        
    }else{
        if (req.file) {
            console.log(req.file);
            
            db.query(
                'update tb_admin set `Src`=?,`Name`=? where Id=?',
                ["/images/" + req.file.filename,req.body.name,req.body.id],
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
        } else { console.log(req.body);
            db.query(
            'update tb_admin set `Name`=? where `Id`=?',
            [req.body.name,req.body.id],
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
        }
    
});
router.post('/del1', function (req, res) {
    if (req.body.id) {
        db.query('delete from tb_order where Id=?', [req.body.id],
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



module.exports = router