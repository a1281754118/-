var db=require('./db')
var validator=require('./validator');
var router=require('express').Router();
/**登陆界面 /login */
console.log(validator.message);

router.post('/',validator.valid({type:'post',rules:[{
    required:true,prop:'loginname',
    min:2,prop:'loginname',
    max:12,prop:'loginname',
}]}),function(req,res){
    var loginname=req.body.loginname;
    var password=req.body.password;
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    if(reg.test(loginname)){
        console.log(111);
        if(loginname!=undefined&&password!=undefined){
            //验证用户名密码
            db.query(
                'select * from tb_admin where Name=? and `Password`=md5(?)',
                [loginname,password],
                function(err,result){
                    console.log(result);
                    if(err){
                        res.send({
                            success:false,
                            message:"数据访问异常"
                        })
                    }else{
                        if(result.length>0){
                            //大于0，说明有查到记录，登录成功
                            res.cookie("node_auth",loginname,{
                                signed:true
                            });
                            res.send({
                                success:true,
                                message:"登录成功"
                            })
                        }else{
                            res.send({
                                success:false,
                                message:"用户名或密码有误"
                            })
                        }
                    }
                }
            )
        }else{
            res.send({
                success:false,
                message:"用户或密码格式不正确"
            })
        }
    }else{
        if(loginname!=undefined&&password!=undefined){
            //验证用户名密码
            db.query(
                'select * from tb_admin where LoginName=? and `Password`=md5(?)',
                [loginname,password],
                function(err,result){
                    console.log(result);
                    if(err){
                        res.send({
                            success:false,
                            message:"数据访问异常"
                        })
                    }else{
                        if(result.length>0){
                            //大于0，说明有查到记录，登录成功
                            res.cookie("node_auth",loginname,{
                                signed:true
                            });
                            res.send({
                                success:true,
                                message:"登录成功"
                            })
                        }else{
                            res.send({
                                success:false,
                                message:"用户名或密码有误"
                            })
                        }
                    }
                }
            )
        }else{
            res.send({
                success:false,
                message:"用户或密码格式不正确"
            })
        }
    }
    
})
router.post('/zhuche',validator.valid({type:'post',rules:[{
    required:true,prop:'loginname',
    min:2,prop:'loginname',
    max:12,prop:'loginname',
}]}),function(req,res){
    db.query(
        'insert into tb_admin (`LoginName`,`Password`) values (?,md5(?))',
        [req.body.loginname,req.body.password],
        function (err, result) {
            if (err) {
                console.log(err);
                
                res.send({
                    success: false,
                    message: "注册失败"
                })
            } else {
                res.send({
                    success: true,
                    message: "注册成功"
                })
            }
        }
    );
})
module.exports=router