<template>
  <div>
    <el-col :span="12">
      
      <el-menu 
      :router ="true"
        :default-active="activeIndex3"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="/manager/xixixiugai" >用户信息修改</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="/manager/user" >
          <i class="el-icon-menu"></i>
          <span slot="title"  >用户管理</span>
        </el-menu-item>
        <el-menu-item index="/manager/order" >
           <i class="el-icon-s-order"></i>
          <span slot="title"  >订单管理</span>
          
        </el-menu-item>
        <el-menu-item index="/manager/Administration">
          <i class="el-icon-s-ticket"></i>
          <span slot="title">门票管理</span>
        </el-menu-item>
        <el-menu-item index="/manager/classification" >
         <i class="el-icon-document"></i>
          <span slot="title">门票分类</span>
        </el-menu-item>
        <el-menu-item index="/manager/lunbo">
          <i class="el-icon-setting"></i>
          <span slot="title">轮播图管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <div>
      
    <el-menu 
      id="el1"
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#ffffff"
      text-color="#000000"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
      :vertical="isCollapse"
    >
    
    <template index="0"><el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/manager/user' }" @click="activeIndex3='2'" style="margin-left:20px">首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{mianbao}}</el-breadcrumb-item>
 
</el-breadcrumb></template>
      <el-menu-item index="5" class="bb" @click="zhuche()">
        用户注册
      </el-menu-item>
      <el-submenu   index="7" class="aa">
        <template slot="title">
          <el-avatar :src=src></el-avatar> 
          <!-- {{list[0].Name}} -->
          {{name}}
          </template>
        <el-menu-item index="3-1" @click="qiehuan()">
          <i class="el-icon-s-custom"></i>
          切换用户</el-menu-item>
        <el-menu-item index="/manager/xixixiugai"  @click="xixixiugai()">
          <i class="el-icon-s-tools"></i>
          信息修改</el-menu-item>
        <el-menu-item index="3-3" @click="tuichu()">
          <i class="el-icon-switch-button"></i>
          <a style="height:100% width:100%" class="button luv" >退出登陆</a>
        </el-menu-item>
      </el-submenu>
    </el-menu>

    <router-view></router-view>
    </div>
    <div class="">
    <el-dialog class="kuandu" :title=title :visible.sync="form.visible" width="450px" style="opacity:0.95;">
      <el-form :model="form" ref="form" label-width="0px" :rules='rulesobj'>
        <el-form-item label prop="username" >
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input @keypress.native.13="goYahu" v-model="form.password" type="password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label prop="accept" >
          <el-checkbox v-model="form.accept" >同意<a href="#">《用户协议》</a></el-checkbox>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="goYahu('form')">{{title}}</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>
<script>
import './abc.less'
export default {
  data() {
    return {
      title:"",
      rulesobj:{
        username:[{required:true,message:'账号必须填写'},{ min: 2, max: 12, message: '长度在 2 到 12 个字符' }],
        password:[{required:true,message:'密码必须填写'},{ min: 6, max: 10, message: '长度在 6 到 10 个字符' }],
        accept:[{pattern:/true/,message:'请同意用户协议'}]
      },
      form: {
        Id:"",
        visible: false,
        username: "",
        password: "",
        accept:true,

      },
      name:'',
      src:"",
      list:[],
      isCollapse: true,
      isCollapse1: true,
      activeIndex: "1",
      activeIndex2: "1",
      activeIndex3:"",
      mianbao:"用户管理"
    };
  },
  methods: {
    zhuche:function(){
      this.form.visible=true
      this.title="用户注册"
    },
    qiehuan:function(){
      this.form.visible=true
      this.title="切换用户"
    },
    xixixiugai:function(){
      this.$router.push("/manager/xixixiugai")
    },
    shuju:function(){
          this.axios.get('/api/category/shuju',{
           
          }).then((result)=>{
            this.list=result.data.rows
            this.name=this.list[0].Name
            this.src=this.list[0].Src
              this.$loading().close()
          })
        
      },
    goYahu: function(form) {
      this.$refs[form].validate((valid) => {
          if (valid) {
            if(this.title=="切换用户"){
              this.axios.post('/api/login',{
        loginname:this.form.username,
        password:this.form.password,
        
      }).then((result)=>{
        if(result.data.success){
          var to = this.$route.query.returnUrl||"/manager/user";
          this.$notify({
          title: '成功',
          message: '登陆成功',
          type: 'success',
          
        });
        location.reload();
        this.$router.push(to);
         
              
        }else{
           this.$notify.error({
          title: '错误',
          message: result.data.message
        });
        }
        this.visible=false;
      })
            }else{
              this.axios.post('/api/login/zhuche',{
        loginname:this.form.username,
        password:this.form.password,
        
      }).then((result)=>{
        if(result.data.success){
          this.$notify({
          title: '成功',
          message: '注册成功快去登陆把',
          type: 'success',
          
        });
        // this.tuichu()
        location.reload();
        }else{
           this.$notify.error({
          title: '错误',
          message: '注册失败'
        });
        }
        this.visible=false;
      })
            }
           
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
      },
    kai: function() {},
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    tuichu: function() {
      document.cookie =
        "node_auth=;Path=/;Expires=" + new Date(1999, 0, 1).toUTCString();
      location.reload();
    },
  },
  mounted() {
    this.shuju();
    // window.addEventListener('resize',()=>{
    //   this.$refs.scrollbar.undate()
    // })
    this.activeIndex3=this.$route.push
  }
};
</script>
<style >

</style>