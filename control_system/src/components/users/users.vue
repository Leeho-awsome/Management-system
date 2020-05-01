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
            <el-button @click="searchUser" slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="success">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table :data="userlist" style="width: 100%">
        <el-table-column type="index" label="#" width="60"></el-table-column>
        <el-table-column prop="username" label="姓名" width="100"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="userlist">{{userlist|fmtdate}}</template>
        </el-table-column>
        <el-table-column prop="mg_state" label="用户状态">
          <template slot-scope="scope">
              
          <el-switch
            style="display: block"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="mg_state" label="用户操作">
            <template slot-scope="scope">
  <el-button  plain type="primary" icon="el-icon-edit" circle></el-button>
  <el-button plain  type="success" icon="el-icon-check" circle></el-button>
  <el-button  plain   type="danger" icon="el-icon-delete" circle></el-button>
            </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      input3: "",
      pagenum: "1",
      pagesize: "2",
      userlist: [],
      total: -1
    };
  },
  methods: {
      //搜索用户
      searchUser(){
      this.getUserlist();
      },
    //   获取用户信息
    async getUserlist() {
      const AUTH_TOKEN = localStorage.getItem("token");
      console.log("AUTH_TOKEN: ", AUTH_TOKEN);
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const data = await this.$http.get(
        `http://127.0.0.1:8888/api/private/v1/users?query=${this.input3}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      console.log("data: ", data);
      console.log("data.data: ", data.data);
      const {
        meta: { status, msg },
        data: { total, users }
      } = data.data;

      if (status === 200) {
        //  1给表格赋值,
        this.userlist = users;
        // 分页赋值
        this.total = total;
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    },
    //分页
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize=val;
       this.getUserlist();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum=val;
          this.getUserlist();
      }

  },
  created() {
    this.getUserlist();
  }
};
</script>

<style >
.ipts {
  width: 300px;
}
</style>