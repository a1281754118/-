<template>
  <div class="zuo">
      <div class="dd">
    <div class="toolbar">
        <el-button @click="showAddDialog" type="success">
        <i class="el-icon-circle-plus-outline"></i>
        添加
      </el-button>
      <div class="cc">
      <el-input @keypress.native.13="load"   placeholder="请输入搜索内容" v-model="keyword" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="send()"></el-button>
      </el-input>
      </div>
      <el-button type="primary" @click="load()">
        <i class="el-icon-loading"></i> 刷新
      </el-button>
    
    </div>
    <el-table :data="list" stripe >
        <el-table-column label="编号" width="100" prop="Id"></el-table-column>
        <el-table-column label="图片" prop="Src">
            <template slot-scope="scope">
                <el-image class="img" :src=scope.row.Src></el-image>
            </template>
        </el-table-column>
        <el-table-column label="分类名" prop="Name"></el-table-column>
        <el-table-column label="排序号" prop="SortNum"></el-table-column>
        <el-table-column label="状态" width="130" prop="Enable">
          <template slot-scope="scope">
            <el-tag :type="scope.row.Enable?'success':'danger'">{{scope.row.Enable?'启用':"禁用"}}</el-tag>
          </template>
        </el-table-column>
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
    </div>
    <div class="">
    <el-dialog :title="title" :visible.sync="visiable" width="500px">
      <el-form :model="form" ref="form" label-width="80px" :rules='rulesobj'>
        <el-form-item label="分类名" prop="Name">
          <el-input placeholder="请输入分类名" v-model="form.Name"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="Src">
          <el-input
            id="file"
            type="file"
            v-model="form.file"
            @change="selectFile($event)"
            style="opacity:0;position:absolute;width:100%;height:40px;z-index:999;"
          ></el-input>
          <el-input id="src" placeholder="点击选择要上传的图片" v-model="form.Src"></el-input>
        </el-form-item>
        <el-form-item label="排序号">
          <el-input v-model="form.SortNum"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.Enable" style="width:100%;">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer">
       
        <el-button type="primary" @click="save('form')">确 定</el-button>
         <el-button @click="visiable=fales">取 消</el-button>
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
      fales:false,
      rulesobj:{
        Name:[{required:true,message:'分类名必须填写'},{ min: 2, max: 12, message: '长度在 2 到 16 个字符' }],
        Src:[{required:true,message:'图片必须上传'}]
      },
      title: "",
      list: [],
      keyword: "",
      form:{
        Name:'',
      },
      visiable: false,
      input3: ""
    };
  },
  methods:{
    deleteRow: function(index) {
      console.log(this.list[index]);
      //.get('url',{要post提交的数据},{配置对象})
      this.axios
        .post("/api/category/delete", {
          id: this.list[index].Id
        })
        .then(result => {
          if (!result.data.success) {
            this.$message({
              type: "error",
              message: result.data.message
            });
          }
          this.load();
        });
    },
    editRow: function(index) {
      var row = this.list[index];
      console.log(row);
      
      this.visiable = true;
      this.title = "修改";
      this.$nextTick(()=>{
          document.getElementById("file").value="";
      })
      this.form = {
        Id: row.Id,
        Name: row.Name,
        SortNum: row.SortNum,
        Enable: row.Enable,
        Src: row.Src
      };
    },
    search: function() {
      this.load();
    },
    showAddDialog: function() {
      this.visiable = true;
      this.title = "添加";
      this.$nextTick(()=>{
          document.getElementById("file").value="";
      })
      this.form = {
        Id: 0,
        Name: "",
        SortNum: 100,
        Enable: 1,
        Src: ""
      };
      this.$refs['form'].resetFields();//重置表单验证
    },
    selectFile: function(event) {
      if (event) {
          this.form.Src = document.getElementById("file").files[0].name;
      }else{
         this.form.Src ="";
      }
    },
    guanbi:function(){
      console.log(this.visible)
      this.visible=false
       
    },
    dele:function(index){
      this.axios.post('/api/category/del',{
        id:this.list[index].Id
      }).then((result)=>{
        if(!result.data.success){
          this.$message({
            type:"error" ,
             message: result.data.massage
          })
        }
        this.load()
      })
    },
    send:function(){
      this.load()
    },
    load:function(){
          this.$loading({
              text:"加载中"
          })
          this.axios.get('/api/category/get',{
            params:{
              keyword:this.keyword
            }
          }).then((result)=>{
              this.list=result.data.rows
              this.$loading().close()
          })
      },
      save: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           var formData=new FormData();
      formData.append("id",this.form.Id);
      formData.append("name",this.form.Name)
      formData.append("enable",this.form.Enable)
      formData.append("sortnum",this.form.SortNum);
      if(document.getElementById("file").files.length>0){
         formData.append("file",document.getElementById("file").files[0]);
      }
      var url="";
      console.log(this.form.Name)
      if(this.form.Id==0){
        //添加
         if(this.form.Name.length>2&&this.form.Name.length<16){
          url="/api/category/add";
        }
      }else{
        url="/api/category/edit";
      }
      this.axios.post(url,formData).then(result=>{
        this.load(); //重新加载表格
        this.visiable=false; //关闭对话框
        if(!result.data.success){
          //出错报错
          this.$message({
            type:"error",
            message:result.data.message
          })
        }
      })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    },
  },
  mounted() {
    this.$parent.mianbao = "门票分类";
    this.load();
  }
};
</script>
<style >

</style>