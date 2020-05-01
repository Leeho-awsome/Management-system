<template>
   <el-container class="container">
  <el-header class="header">
<el-row>
  <el-col :span="4" class="h-left">
    <img class="img" src="../../assets/logo.png" alt="">
    </el-col>
  <el-col :span="18" class="h-center">
    <h2>电商管理系统</h2>
  </el-col>
  <el-col :span="2" class="h-right">
    <a href="#" @click="handleSignout()">退出</a>
  </el-col>
</el-row>

  </el-header>
  <el-container >
    <el-aside width="200px" class="aside">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
    >
        <!-- ! -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
          <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>用户列表</span>
          </el-menu-item>
          
      </el-submenu>
        <!-- ! -->
       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
          <el-menu-item index="2-1">
              <i class="el-icon-location"></i>
              <span>角色列表</span>
          </el-menu-item>
          <el-menu-item index="2-2">
              <i class="el-icon-location"></i>
              <span>权限列表</span>
          </el-menu-item>
          
      </el-submenu>
       <!-- ! -->
       <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
          <el-menu-item index="3-1">
              <i class="el-icon-location"></i>
              <span>商品列表</span>
          </el-menu-item>
           <el-menu-item index="3-2">
              <i class="el-icon-location"></i>
              <span>商品列表</span>
          </el-menu-item>
           <el-menu-item index="3-3">
              <i class="el-icon-location"></i>
              <span>商品列表</span>
          </el-menu-item>
          
      </el-submenu>
       <!-- ! -->
       <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
          <el-menu-item index="4-1">
              <i class="el-icon-location"></i>
              <span>订单列表</span>
          </el-menu-item>
          
      </el-submenu>
       <!-- ! -->
       <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
          <el-menu-item index="5-1">
              <i class="el-icon-location"></i>
              <span>数据列表</span>
          </el-menu-item>
          
      </el-submenu>
    
    </el-menu>

    </el-aside>
    <el-main class="main">Main</el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
    name:"home",
    data () {
      return {
        
      }
    },
    beforeCreate() {
      const token=localStorage.getItem("token");
      if(!token){
        this.$router.push({name:"login"})
      }
    },
    methods: {
      handleSignout(){
        localStorage.clear();
        this.$message.success("退出成功");
        this.$router.push({name:"login"})

      }
    },
}
</script>
<style >
    .container{
height: 100%;
    }
    .header{
     background: #b3c0d1;
    }
   
    .aside{
     background: #d3dce6;
    }
    .main{
        background: #e9eef3;
    }
     .h-center{
      text-align: center;
    }
     .h-right{
      padding-top: 15px;
    }
      .img{
        margin-left: 40px;
        width: 65px;
        height: 100%;
      }
</style>