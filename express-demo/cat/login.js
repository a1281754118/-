var router=require('express').Router();
var db=require('../routes/db');
var request=require("request");
var WXBizDataCrypt = require('../WXBizDataCrypt')
router.post('/',function(req,res){
    var code=req.body.code;
    var encryptedData=req.body.encryptedData;
    var iv=req.body.iv;
    //https://api.weixin.qq.com/sns/jscode2session?appid=wx163547d801c41c12&secret=c6801904df7756ee23813e4d0dc6e3fb&js_code=JSCODE&grant_type=authorization_code
    request.get("https://api.weixin.qq.com/sns/jscode2session?appid=wx91ae330a493ab597&secret=f31d35510220f2e6791332616278699d&js_code="+code+"&grant_type=authorization_code",function(err,response,body){
        console.log(body);
        var seession_key= JSON.parse(body).session_key;
        var pc= new WXBizDataCrypt("wx91ae330a493ab597",seession_key);
        var data ;
        try {
            data= pc.decryptData(encryptedData , iv);
        } catch (error) {
            res.send({
                success:false,
                message:"非法请求"
            });
        }
       if(data){
        console.log(data);
        var openid= data.openId;
        var cryptoJs=require("crypto-js");
        //根据openid查询数据库,没有用户就注册，有就返回登录信息
        db.query("select * from tb_customer where  AppOpenId=?",[openid],function(err,result){
            if(err){
                console.log(err);
                res.send({
                    success: false,
                    message: "服务器内部错误"
                })
            }else{
                if(result==""){
                    // console.log(result);
                    db.query('insert into tb_customer (`AppOpenId`,`NickName`,`AvatarUrl`,`Sex`,`Country`,`Province`,`City`,`Account`,`Status`,`RowVersion`) values (?,?,?,?,?,?,?,?,?,?)',
                    [data.openId,data.nickName,data.avatarUrl,data.gender,data.country,data.province,data.city,"0.00","1","1"],function(err,result){
                    if (err) {
                        console.log(err);
                        res.send({
                            success: false,
                            message: "添加失败",
                            
                        })
                    } else {
                        var id=result[0].Id;

                        res.send({
                            success: true,
                            message: "添加成功",
                            token:id,
                        })
                    }
                    })
                    
                }else{
                    
                    var id=result[0].Id.toString();
                    
                    var enc = cryptoJs.AES.encrypt(id,'asdasd55sdasd',{iv:"CB3EC842D7C69578"})
                    res.send({
                        success:true,
                        message: "登陆成功",
                        token:enc.toString(),
                    });
                }
               
            }
        })
        
       }
       
    })
});

module.exports=router;