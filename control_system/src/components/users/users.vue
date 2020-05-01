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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column  type="index" label="#" width="60"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="80"></el-table-column>
        <el-table-column prop="email" label="电话" ></el-table-column>
        <el-table-column prop="email" label="创建时间"></el-table-column>
        <el-table-column prop="email" label="用户操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      input3: "",
      pagenum:'1',
      pagesize:"5"
    };
  },
  methods: {
    //   获取用户信息
    
    async  getUserlist(){
        const AUTH_TOKEN =localStorage.getItem("token")
        console.log('AUTH_TOKEN: ', AUTH_TOKEN);
        this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
         const data = await this.$http.get(`http://127.0.0.1:8888/api/private/v1/users?query=${this.input3}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`) 
          
         console.log('data: ', data);
      }
  },
  created () {
      this.getUserlist()
  }
};
</script>

<style >
.ipts {
  width: 300px;
}
</style>