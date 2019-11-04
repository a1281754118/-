<template>
  <div class="">
    <!-- <span slot="footer">
      <el-button @click="form.visible=true">登陆</el-button>
    </span> -->
    <el-dialog class="kuandu" title="登陆" :visible="form.visible" width="450px" style="opacity:0.95;">
      <el-form :model="form" ref="form" label-width="0px" :rules='rulesobj'>
        <el-form-item label prop="username" >
          <el-input v-model="form.username" placeholder="请输入账号或者用户名"></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input @keypress.native.13="goYahu" v-model="form.password" type="password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label prop="accept" >
          <el-checkbox v-model="form.accept" >同意<a href="#" @click="drawer = true" type="primary">《用户协议》</a></el-checkbox>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button  @click="goYahu()">登陆</el-button>
      </span>
    </el-dialog>
  <el-drawer
  title="用户协议"
  :visible.sync="drawer"
  :direction="direction"
  :before-close="handleClose">
  <span>shab!</span>
</el-drawer>
    <!-- <button class="button luv" @click='goYahu()'>登陆</button> -->
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      drawer: false,
      direction: 'rtl',
      rulesobj:{
        username:[{required:true,message:'账号必须填写'},{ min: 2, max: 12, message: '长度在 2 到 12 个字符' }],
        password:[{required:true,message:'密码必须填写'},{ min: 6, max: 10, message: '长度在 6 到 10 个字符' }],
        accept:[{pattern:/true/,message:'请同意用户协议'}]
      },
      form: {
        visible: true,
        username: "",
        password: "",
        accept:true,
      }
    };
  },
  methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
      },
    // login:function(){
    //   this.axios.post('http://localhost:3000/login')
    // },
    goYahu: function() {
      this.axios.post('/api/login',{
        loginname:this.form.username,
        password:this.form.password
      }).then((result)=>{
        if(result.data.success){
              var to = this.$route.query.returnUrl||"/manager/user";
                this.$notify({
          title: '成功',
          message: result.data.message,
          type: 'success'
        });
              this.$router.push(to);
        }else{
           this.$notify.error({
          title: '错误',
          message: result.data.message,
          type: 'success'
        });
        }
      })
      }
      // this.$refs.form.validate(result => {
      //   if (result) {
      //     this.$notify({
      //     title: '成功',
      //     message: '登陆成功',
      //     type: 'success'
      //   });
      //     document.cookie = "auth=123;Path=/;";
      //     var to = this.$route.query.returnUrl;
      //     this.$router.push(to ? to : "/manager/user");
      //   }
      //   else{
      //     console.log(result)
      //     this.$notify.error({
      //     title: '错误',
      //     message: '登陆失败'
      //   });
      //   }
      // });
    
  }
};
</script>
<style >

</style>