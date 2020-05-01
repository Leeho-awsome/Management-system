<template>
    <div class="login">
        <div class="logininner">
      <h2>用户登录</h2>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="用户名">
    <el-input v-model="formLabelAlign.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formLabelAlign.password"></el-input>
  </el-form-item>
</el-form>
 <el-button class="loginBtn" type="primary" @click="hardleLogin">登录</el-button>
 </div>
    </div>
</template>

<script>
export default {
    name:"login",
    data(){    
        return{
        labelPosition: 'top',
        formLabelAlign: {
          username: 'admin',
          password:"123456",
         
        }
        }
    },
     methods: {
         //希望让我的异步操作,看起来想同步代码
        //  ES7 async await
        //在异步操作有结果的前面加 await 在距离结果最近的函数加async 
          async hardleLogin(){

        const res= await this.$http.post("http://127.0.0.1:8888/api/private/v1/login",this.formLabelAlign)
                // console.log('res: ', res);
                const{
                 meta:{msg,status}
                } = res.data

                    if(status===200){
                        this.$message.success(msg)
                        this.$router.push({name:"home"})
                    }else{
                           this.$message.warning(msg)
                    }
            
         }
        //  hardleLogin(){

        //  this.$http.post("http://127.0.0.1:8888/api/private/v1/login",this.formLabelAlign).then(res=>{
        //         // console.log('res: ', res);
        //         const{
        //          meta:{msg,status}
        //         } = res.data
        //             if(status===200){
        //                 this.$message.success(msg)
        //                 this.$router.push({name:"home"})
        //             }else{
        //                    this.$message.warning(msg)
        //             }
        //     })
        //  }
     },
      mounted () {
     
    }
}
</script>

<style >
.login{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #324152;
}
.logininner{
    background: white;
     width: 450px;
  height: 360px;
  background-color: #fff;
  border-radius: 3px;
  padding: 10px 20px 20px 20px;
}
.loginBtn{
    margin-top: 10px;
    width: 100%;
    text-align: center;
}
    
</style>