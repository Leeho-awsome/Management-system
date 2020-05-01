<template>
  <div class="users">
    <el-card class="carl-box">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索栏 -->
      <el-row class="rows">
        <el-col class="col">
          <el-input placeholder="请输入内容" v-model="input3" class="ipts">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="success">成功按钮</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
    </el-card>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
        input3:"",
    };
  }
};
</script>

<style >
.ipts{
    width: 300px; ;
}
</style>