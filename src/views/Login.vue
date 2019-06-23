<template>
  <div class="login">
    <div class="login-box">
      <img class="logo" src="../assets/logo.png" alt>
      <el-form ref="loginform" :model="loginform" :rules="loginrule">
          <el-form-item prop="username">
          <el-input v-model="loginform.username" prefix-icon="el-icon-s-check" placeholder="账号"></el-input>
          </el-form-item>
           <el-form-item prop="password">
          <el-input type="password" v-model="loginform.password" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
           </el-form-item>
          <div>
            <el-button @click="loginsubmit" type="primary">登录</el-button>
            <el-button>重置</el-button>
        </div>
        </el-form>
        
    </div>
  </div>
</template>

<script>
export default {
    data (){
        return {
            loginform:{
                username: '',
                password: ''
            },
            loginrule:{
                username:[
                     { required: true, message: '账号不能为空', trigger: 'blur' },
                ],
                password:[
                     { required: true, message: '密码不能为空', trigger: 'blur' },
                ]
            }
            
        }
    },
    methods: {
        loginsubmit(){
            // 先验证表单,验证通过在执行
            this.$refs.loginform.validate(async ok=>{
                if(ok){
                    const {data:res} = await this.axios.post('/login',this.loginform)
                    console.log(res.meta.status)
                    if(res.meta.status!=200) return this.$message.error('用户或密码错误')
                    // 保存令牌到本地 sessionStorage:关闭浏览器就要重新登录
                    sessionStorage.setItem('token',res.data.token)
                    this.$router.push('./')
                }
            })
        }
    },
};
</script>

<style>
.login {
  height: 100%;
  background-color: #294a69;
}
.login-box .el-form{
    bottom: 0px;
}
.login .login-box {
  width: 450px;
  height: 304px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login-box .logo {
  width: 130px;
  height: 130px;
  border: 7px solid #fff;
  background-color: #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #ccc;
  position: absolute;
  left: 50%;
  top: -50%;
  transform: translate(-50%, 50%);
}
.login-box .el-form{
    width: 100%;
    padding: 20px;
    position: absolute;
    /* bottom: 20px; */
    /* 内边距向内压挤，不会影响最终宽 */
    box-sizing: border-box;
    text-align: right;
    
}
.login-box .el-input{
    margin-bottom: 10px;
}
</style>