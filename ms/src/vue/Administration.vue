<template>
  <div class="zuo">
    <div class="toolbar">
      <el-button id="tianjia" @click="add" type="success">
        <i class="el-icon-circle-plus-outline"></i>
        添加
      </el-button>
      <div class="cc">
        <el-input
          @keypress.native.13="load"
          placeholder="请输入搜索内容"
          v-model="keyword"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="send()"></el-button>
        </el-input>
      </div>
      <el-button type="primary" @click="load()">
        <i class="el-icon-loading"></i> 刷新
      </el-button>
    </div>
    <el-table
      :data="list"
      stripe
      row-key="Id"
      default-expand-all
      :tree-props="{children:'children'}"
      :row-class-name="rowClass"
    >
      <el-table-column prop="Title" label="名称">
          <template slot-scope="scope">
            {{scope.row.Name}}
            <el-image
              style="max-width:80px;height:40px;vertical-align: middle;"
              fit="contain"
              :src=scope.row.Src
            ></el-image>
            {{scope.row.Title}}
            
          </template>
        </el-table-column>
      <el-table-column label="票价" prop="Price" width="120">
        <template slot-scope="scope" v-if="scope.row.Id>0">
          <span>￥{{scope.row.Price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="余票量" prop="Stock">
        <template slot-scope="scope" v-if="scope.row.Id>0">
          <span>{{scope.row.Stock}}张</span>
        </template>
      </el-table-column>
      <el-table-column label="商户信息" prop="SorNum">
        <template slot-scope="scope" v-if="scope.row.Id>0">
          <el-popover placement="left" title="店铺信息" width trigger="hover" content>
            <p>电话：{{scope.row.ShopPhone?scope.row.ShopPhone:"未填写"}}</p>
            <p>地址：{{scope.row.ShopAddress?scope.row.ShopAddress:"未填写"}}</p>
            <div style="float:left;" slot="reference">
              <!-- <el-tag :type="scope.row.ShopName?'success':'danger'">{{scope.row.ShopName?'启用':"禁用"}}</el-tag> -->
           
              <el-tag type="danger" v-if="!scope.row.ShopName" size="small">-未填写-</el-tag>
              
              <el-tag type="success" v-if="scope.row.ShopName" size="small">{{scope.row.ShopName}}</el-tag>
            </div>
            
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="Enable" width="80">
        <template slot-scope="scope" v-if="scope.row.Id>0">
          <span>
            <el-tag :type="scope.row.Enable?'success':'danger'">{{scope.row.Enable?'启用':"禁用"}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="排序号" prop="SortNum" >
        <template slot-scope="scope" v-if="scope.row.Id>0">
          <span>{{scope.row.SortNum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" v-if="scope.row.Id>0">
          <el-button  type="warning" size="small" @click="editRow(scope.row)">
            <i class="el-icon-edit"></i> 修改
          </el-button>
          <el-button type="danger" size="small" @click="dele(scope.row)">
            <i class="el-icon-close"></i> 删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="load"
      @current-change="load"
      :current-page.sync="currentPage"
      :page-sizes="[8, 12, 20, 40, 80, 100]"
      :page-size.sync="pageSize"
      layout="sizes,prev,pager,next,jumper,total"
      :total="totalNum"
      background
    ></el-pagination>
    <div class>
      <el-dialog
        class="kuandu"
        :title=title
        :visible.sync="visiable"
        width="1000px"
        style="opacity:0.95;"
      >
        <el-form :rules='rulesobj' :model="form" ref="form" label-width="80px">
          <el-container>
            <el-container>
              <el-header>
                <el-form-item label="门票名" prop="title">
                  <el-input v-model="form.title" placeholder></el-input>
                </el-form-item>

                <!-- Header content -->
              </el-header>
              <el-main>
                {{form}}
                <el-container>
                  <el-aside style="width:50%;">
                    <!-- Aside content -->
                    <el-form-item label="票价" prop="price">
                      <el-input v-model="form.price" placeholder></el-input>
                    </el-form-item>
                    <el-form-item label="余票" prop="stock">
                      <el-input v-model="form.stock" placeholder></el-input>
                    </el-form-item>
                    <el-form-item label="添加到" prop="CategoryId">
                     <el-select v-model="form.CategoryId" style="width:100%;" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.Name"
                            :value="item.Id">
                          </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户描述">
                      <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="form.content"
                        maxlength="30"
                        show-word-limit
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="Enable">
                      <el-select v-model="form.Enable" style="width:100%;">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
                    </el-form-item>
                    <el-form-item label="商户名" prop="ShopName">
                      <el-input v-model="form.ShopName" placeholder></el-input>
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
                  </el-aside>
                  <el-container>
                    <el-main style="padding:0;">
                      <el-form-item label="商户地址" > 
                        <baiduMap
                          @click="onClick"
                          ref="map"
                          @suggestSelect="onSelect"
                          map-style="width:100%;height:300px;"
                          suggestId="abc"
                        >
                          <el-form-item>
                            <el-input id="abc" v-model="form.shopAddress"></el-input>
                          </el-form-item>
                        </baiduMap>
                      </el-form-item>
                      <el-form-item label="排序号" prop="SortNum">
                  <el-input v-model="form.SortNum" placeholder></el-input>
                </el-form-item>
                <el-form-item label="商户电话" prop="shopphone">
                      <el-input v-model="form.shopphone" placeholder></el-input>
                    </el-form-item>
                    </el-main>
                  </el-container>
                </el-container>
              </el-main>
            </el-container>
          </el-container>
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
import "./abc.less";
import baiduMap from "./baidumap";
export default {
  data() {
    return {
      rulesobj:{
        title:[{required:true,message:'门票名必须填写'},{ min: 2, max: 20, message: '长度在 2 到 20 个字符' }],
        price:[{required:true,message:'票价必须填写'},{pattern:/^[1-9]\d*$/,message: '门票单价只能为正整数',trigger: 'blur'}],
        stock:[{required:true,message:'余票必须填写'},{pattern:/^[1-9]\d*$/,message: '门票数量只能为正整数',trigger: 'blur'}],
        CategoryId:[{required:true,message:'分组必须选择'}],
        Src:[{required:true,message:'图片必须上传'}],
        Enable:[{required:true,message:'分组必须选择 默认启用'}],
        ShopName:[{ min: 2, max: 10, message: '长度在 2 到 10 个字符' }],
        shopphone:[{pattern:/^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,message: '手机号格式错误',trigger: 'blur'}],
        accept:[{pattern:/true/,message:'请同意用户协议'}]
      },
      options:[

      ],
      pageSize: 8,
      totalNum: 100,
      totalname: "",
      currentPage: 1,
      delivery: true,
      value: "",
      fales: false,
      title: "",
      list: [],
      keyword: "",
      form: {
        Src:"",
        
      },
      visiable: false
    };
  },
  methods: {
    editRow:function(roww){
      var row=roww
      console.log(row);
      console.log(this.form.Id);
      
      this.visiable=true;
      this.title="修改";
       this.$nextTick(()=>{
          document.getElementById("file").value="";
      });
      this.form={
        Id:row.Id,
        title:row.Title,
        Enable:row.Enable,
        CategoryId:row.CategoryId,
        price:row.Price,
        stock:row.Stock,
        content:row.Content,
        shopAddress:row.ShopAddress,
        SortNum:row.SortNum,
        shopphone:row.ShopPhone,
        ShopName:row.ShopName,
        Src:row.Src,
        Lat:row.Lat,
        Log:row.Long
      }
      
    },
    save:function(form){
      this.$refs[form].validate((valid) => {
          if (valid) {
           var formData=new FormData();
      formData.append("id",this.form.Id);
      formData.append("categoryid",this.form.CategoryId);
      formData.append("title",this.form.title)
      formData.append("price",this.form.price)
      formData.append("stock",this.form.stock);
      formData.append("content",this.form.content);
      formData.append("enable",this.form.Enable);
      formData.append("sortnum",this.form.SortNum);
      formData.append("shopaddress",this.form.shopAddress);
      formData.append("shopphone",this.form.shopphone);
      formData.append("shopname",this.form.ShopName);
      formData.append("long",this.form.lng);
      formData.append("lat",this.form.lat);
      if(document.getElementById("file").files.length>0){
         formData.append("file",document.getElementById("file").files[0]);
      }
      var url="";
      console.log(this.form.CategoryId)
      if(this.form.Id==undefined){
        //添加
          url="/api/ticket/add";
        
      }else{
        url="/api/ticket/edit";
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
    

    onClick: function(event) {
      var point = event.point;
      this.form.lng = point.lng;
      this.form.lat = point.lat;
      this.$refs.map.clearMarker();
      this.$refs.map.addMarker(point);
    },
    onSelect: function(address,addressObj) {
      this.form.shopAddress = address;
      this.$refs.map.getSuggessPoint({
        address: address,
        success: point => {
          console.log(point);
          this.form.lng = point.lng;
          this.form.lat = point.lat;
          this.$refs.map.clearMarker();
          point.level = 16;
          this.$refs.map.center(point);
          this.$refs.map.addMarker(point);
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
    add() {
      this.visiable = true;
      this.title="添加";
      this.form = {
        CategoryId:"",
        ShopName:"",
        shopphone:"",
        title:"",
        content:"",
        stock:"",
        price:"",
        Name: "",
        lng: "",
        lat: "",
        shopAddress: "",
        SortNum: 100,
        Src:"",
        file:"",
        Enable: 1,
      };
      this.$nextTick(()=>{
      this.$refs['form'].resetFields();//重置表单验证
      })
    },
    //删除
    dele(row) {
    
      console.log(row);
      
      this.axios.post('/api/ticket/del',{
        id:row.Id
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
    showAddDialog() {},
    load: function() {
      this.$loading({
        text: "加载中"
      });
      this.axios
        .get("/api/ticket/get", {
          params: {
            keyword: this.keyword,
            size: this.pageSize,
            page: this.currentPage
          }
        })
        .then(result => {
          setTimeout(() => {
            this.$loading().close();
          }, 100);
          this.totalNum = result.data.total;
          this.list = result.data.rows;
          // for(var i=0;i<result.data.rows.length;i++){
          //   this.options.push(result.data.rows[i])
          // }
          // console.log(this.options);
        });
    },
    load1:function(){
      this.$loading({
        text: "加载中"
      });
      this.axios
        .get("/api/ticket/get1", {
          params: {
            
          }
        })
        .then(result => {
          setTimeout(() => {
            this.$loading().close();
          }, 100);
          // this.totalNum = result.data.total;
          // this.list = result.data.rows;
          for(var i=0;i<result.data.rows.length;i++){
            this.options.push(result.data.rows[i])
          }
          console.log(this.options);
        });
    },
    rowClass(obj) {
      if (obj.row.Id < 0) {
        return "gray";
      }
    }
  },
  mounted() {
    this.$parent.mianbao = "门票管理";
    this.load();
    this.load1();
  },
  components: {
    baiduMap: baiduMap
  }
};
</script>
<style>
tr.gray td {
  background: rgb(184, 207, 230) !important;
}
.tangram-suggestion-main {
  z-index: 99999;
}
.el-textarea__inner{
    min-height: 90px;
    height: 150px;
    max-height:  150px;
}
</style>