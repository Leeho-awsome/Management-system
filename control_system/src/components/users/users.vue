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
          <el-button type="success" @click="showpage">添加用户</el-button>
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
              @change="changeUser(scope.row)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="mg_state" label="用户操作">
          <template slot-scope="scope">
            <el-button plain type="primary" icon="el-icon-edit" circle @click="editUser(scope.row)"></el-button>
            <el-button plain type="success" icon="el-icon-check" circle @click="pickRole(scope.row)" ></el-button>
            <el-button
              plain
              type="danger"
              icon="el-icon-delete"
              circle
              @click="delUser(scope.row.id,scope.row.username)"
            ></el-button>
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
        :total="total"
      ></el-pagination>

      <!-- 添加对话框 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisibleadd">
        <el-form :model="form">
          <el-form-item label="用户名" label-width="100px">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="100px">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" label-width="100px">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="100px">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleadd = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑对话框 -->
      <el-dialog title="编辑用户" :visible.sync="dialogFormVisiblEdit">
        <el-form :model="form">
          <el-form-item label="用户名" label-width="100" disabled>
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" label-width="100">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="100">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisiblEdit = false">取 消</el-button>
          <el-button type="primary" @click="makeEdit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 角色对话框 -->
      <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
  <el-form :model="form">
    <el-form-item label="用户名" label-width="100px">
      {{"当前用户名"}}
    </el-form-item>
    <el-form-item label="角色" label-width="100px">
      <el-select v-model="currentId" >
        <el-option label="请选择" :value="-1"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      input3: "",
      pagenum: 1,
      pagesize: 2,
      userlist: [],
      total: -1,
      dialogFormVisibleadd: false,
      dialogFormVisiblEdit: false,
      dialogFormVisibleRole:false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      currentId:-1,
    };
  },
  methods: {
    //改变用户状态
    async changeUser(user) {
      //  console.log('user: ', user);
      const data = await this.$http.put(
        `http://127.0.0.1:8888/api/private/v1/users/${user.id}/state/${user.mg_state}`
      );
      const {
        meta: { status, msg },
        data: { total, users }
      } = data.data;

      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    },
    //搜索用户
    searchUser() {
      this.getUserlist();
    },
    //   获取用户信息
    async getUserlist() {
      const AUTH_TOKEN = localStorage.getItem("token");
      // 按要求设置接口请求头
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const data = await this.$http.get(
        `http://127.0.0.1:8888/api/private/v1/users?query=${this.input3}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      // console.log("data: ", data);
      // console.log("data.data: ", data.data);
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
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getUserlist();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUserlist();
    },
    showpage() {
      this.dialogFormVisibleadd = true;
    },
    async addUser() {
      this.form = {};
      this.dialogFormVisibleadd = false;
      const res = await this.$http.post(
        "http://127.0.0.1:8888/api/private/v1/users",
        this.form
      );
      const {
        meta: { status, msg },
        data
      } = res.data;
      //  console.log('status: ', status);
      if (status === 201) {
        //    1提示成功;
        this.$message.success(msg);
        //g更新视图;
        this.getUserlist();
        //清空文本框
        this.form = {};
      }
    },
    // 删除用户
    delUser(id, username) {
      const h = this.$createElement;
      this.$msgbox({
        title: "删除用户",
        message: h("p", null, [
          h("span", null, "确定要删除用户 "),
          h("i", { style: "color: teal" }, `${username}`)
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 1000);
          } else {
            done();
          }
        }
      }).then(async action => {
        const res = await this.$http.delete(
          `http://127.0.0.1:8888/api/private/v1/users/${id}`
        );
        // console.log('id: ', id);
        // console.log('res: ', res);
        const {
          meta: { msg, status }
        } = res.data;

        if (status === 200) {
          //g更新视图;
          this.pagenum = 1;
          this.getUserlist();

          this.$message({
            type: "info",
            message: msg
          });
        } else {
          this.$message({
            type: "info",
            message: msg
          });
        }
      });
    },
    //编辑用户
    editUser(user) {
      this.form = user;
      this.dialogFormVisiblEdit = true;
    },
    //编辑请求
    async makeEdit() {
      const res = await this.$http.put(
        `http://127.0.0.1:8888/api/private/v1/users/${this.form.id}`,
        this.form
      );
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        //g更新视图;

        this.getUserlist();
        this.dialogFormVisiblEdit = false;
        this.$message({
          type: "info",
          message: msg
        });
      } else {
        this.$message({
          type: "info",
          message: msg
        });
      }
    },
    //分配角色
    pickRole(user){
        this.dialogFormVisibleRole=true
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