<template>
  <div class="zuo">
    <div class="toolbar">
        
      <div class="cc">
      <el-input @keypress.native.13="load"   placeholder="请输入搜索内容" v-model="keyword" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="send()"></el-button>
      </el-input>
      </div>
      <el-button type="primary" @click="shuju()">
        <i class="el-icon-loading"></i> 刷新
      </el-button>
    
    </div>
    <el-table :data="list" stripe >
        <el-table-column label="编号" width="100" prop="Id"></el-table-column>
        <el-table-column label="头像" prop="Src">
            <template slot-scope="scope">
                <el-image class="img" :src=scope.row.Src></el-image>
            </template>
        </el-table-column>
        <el-table-column label="用户名" prop="Name"></el-table-column>
      
        <el-table-column label="操作">
            <template slot-scope="scope">
               <el-button type="warning" size="small" @click="editRow(scope.$index)">
        <i class="el-icon-edit"></i> 修改
      </el-button>
     <el-button type="danger" size="small" @click="dele(scope.$index)">
        <i class="el-icon-close"></i> 删除
      </el-button>
            </template>
            
      
        </el-table-column>
        
    </el-table>
    
    <div class="">
      
    <el-dialog :title="title" :visible.sync="visiable" width="700px">
      <el-form :model="form" ref="form" label-width="80px" :rules='rulesobj'>
      <el-form-item label="头像:" prop="Src">
       <el-input
            id="file"
            type="file"
            v-model="form.file"
            @change="selectFile($event)"
            style="opacity:0;position:absolute;width:100%;height:40px;z-index:999;"
          ></el-input>
          <el-input id="src" placeholder="点击选择要上传的图片" v-model="form.Src"></el-input>
          <!-- <img style="width:50px" :src=form.Src alt=""> -->
      </el-form-item>
      <el-form-item label="用户名" prop="Name">
        <el-input v-model="form.Name"></el-input>
      </el-form-item>
      <el-form-item label="原密码" prop="Password">
        <el-input type="show-password" v-model="form.password" placeholder="不修改可以不填写"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password1">
        <el-input show-password type="password" v-model="form.password1" placeholder="不修改可以不填写"></el-input>
      </el-form-item>
      
    </el-form>
      <span slot="footer">
       <el-button type="primary" @click="save">提交修改</el-button>
      <el-button type="info" @click="save1">重置密码</el-button>
      <el-button @click="visiable=false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>
<script>
import "./abc.less";
export default {
  data() {
    return {
      keyword:"",
      title:"",
      visiable: false,
      rulesobj:{
        username:[{required:true,message:'账号必须填写'},{ min: 5, max: 12, message: '长度在 5 到 12 个字符' }],
        password1:[{ min: 6, max: 10, message: '长度在 6 到 10 个字符' }],
        accept:[{pattern:/true/,message:'请同意用户协议'}]
      },
      imageUrl:'',
      list: [],
      form: {}
    };
  },
  methods: {
    save1:function(){
      this.axios.post("/api/category/chongzhi",{
        id:this.form.Id
      }).then(result => {
          if(!result.data.success){
          //出错报错
          this.$message({
            type:"error",
            message:result.data.message
          })
        }else{
          alert('重置成功请重新登陆')
          this.tuichu()
          // location.reload(); //刷新界面
        }
          
        });
    },
    save: function() {
      var formData = new FormData();
      console.log(formData);
      formData.append("id", this.form.Id);
      formData.append("name", this.form.Name);
      formData.append("password", this.form.password);
      formData.append("password1", this.form.password1);
      if(document.getElementById("file").files.length>0){
         formData.append("file",document.getElementById("file").files[0]);
      }
      this.axios.post("/api/category/xiugai1",formData,{
          id: this.form.id,
          name: this.form.name,
          password:this.form.password,
          password1:this.form.password1,
          // password:this.form.password,
        }).then(result => {
          if(!result.data.success){
          //出错报错
          this.$message({
            type:"error",
            message:result.data.message
          })
        }else{
          alert('你修改了重要信息请重新登陆')
          // this.tuichu()
          location.reload(); //刷新界面
        }
          
        });
    },
    selectFile: function(event) {
      console.log(event);
      if (event) {
          this.form.Src = document.getElementById("file").files[0].name;
      }else{
         this.form.Src ="";
      }
    },
    shuju: function() {
      this.axios.get("/api/category/shuju1", {

      }).then(result => {
        this.list = result.data.rows;
        console.log(this.list);
        this.$loading().close();
      });
    },
    
    tuichu: function() {
      document.cookie =
        "node_auth=;Path=/;Expires=" + new Date(1999, 0, 1).toUTCString();
      location.reload();
    },
    editRow:function(index){
      this.visiable = true;
       var row = this.list[index];
      
      this.title = "修改";
      this.form={
        Id: row.Id,
        Src: row.Src,
        Name:row.Name
      }
      console.log(row);
      
    },
    dele:function(index){
      console.log(this.list[index]);
      this.axios.post("/api/category/delete",{
        id:this.list[index].Id
      }).then(result=>{
        if(!result.data.success){
          this.$message({
            type:"error" ,
             message: result.data.massage
          })
        }
        this.shuju()
      })
    }
    
  },
  mounted() {
    this.$parent.mianbao = "用户信息修改";
    this.shuju();
  }
};
</script>
<style >
</style>