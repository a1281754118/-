<template>
  <div class="zuo">
      <div class="dd">
    <div class="toolbar">
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
      <el-table-column label="用户Id" width="120" prop="Id"></el-table-column>
        <el-table-column label="用户唯一标识"  prop="AppOpenId"></el-table-column>
        <el-table-column label="用户信息" width="200" prop="NickName">
             <template slot-scope="scope">
                 <el-avatar class="img" :src=scope.row.AvatarUrl></el-avatar>
                 <span class="nickname">{{scope.row.NickName}}</span>
          </template>
        </el-table-column>
       
        <el-table-column label="性别" width="80" prop="Sex">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.Sex==0">未知</el-tag>
            <el-tag type="primary" v-if="scope.row.Sex==1">男</el-tag>
            <el-tag type="danger" v-if="scope.row.Sex==2">女</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="地区"  prop="Country">
            <template slot-scope="scope">
           {{scope.row.Country}}-{{scope.row.Province}}-{{scope.row.City}}
          </template>
        </el-table-column>
       
        <el-table-column label="联系电话" prop="WeChatBindPhone"></el-table-column>
        <el-table-column label="余额" prop="Account">
            
        </el-table-column>
        <el-table-column label="状态" width="130" prop="Status">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="点击切换使用状态" placement="bottom">
            <el-tag @click="zhuangtai(scope.$index)" :type="scope.row.Status?'success':'danger'">{{scope.row.Status?'启用':"禁用"}}</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
    </el-table>
    </div>
     <el-pagination
      @size-change="load"
      @current-change="load"
      :current-page.sync="currentPage"
      :page-sizes="[5,8, 12, 20, 40, 80, 100]"
      :page-size.sync="pageSize"
      layout="sizes,->, prev, pager, next, jumper,total"
      :total="totalNum" background>
    </el-pagination>
   
  </div>
</template>
<script>
import './abc.less'
export default {
  data() {
    return {
     pageSize:8,
     totalNum:100,
        totalname:'',
        currentPage: 1,
        delivery:true,
        value:'',
      fales:false,
      rulesobj:{
        Name:[{required:true,message:'分类名必须填写'},{ min: 2, max: 12, message: '长度在 2 到 16 个字符' }],
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
      
      zhuangtai:function(index){
          console.log(this.list[index])
          this.axios.post("/api/category/add1",{
              status: this.list[index].Status,
              id: this.list[index].Id
          }).then(result => {
          if (!result.data.success) {
            this.$message({
              type: "error",
              message: result.data.message
            });
          }
          this.load();
        });
      },
    send:function(){
      this.load()
    },
    load:function(){
      console.log({
        pageSize:this.pageSize,
        currentPage:this.currentPage
      })
       this.$loading({
        text: "加载中"
      });
      this.axios.get('/api/customer/get',{
        params:{
          keyword:this.keyword,
          size:this.pageSize,
          page:this.currentPage
        } 
      }).then(result=>{
         setTimeout(() => {
           this.$loading().close();
         }, 100);
         this.totalNum=result.data.total;
        this.list=result.data.rows;
      })
      },
    },
  mounted() {
    this.load();
    this.$parent.mianbao = "用户管理";
    
  }

}
</script>
<style >

</style>
