<template>
  <el-container class="home">
    <el-header>
      <div class="loge-box">
        <!-- 顶部-左侧 -->
        <img width="50px" src="../assets/logo.png" alt>
        <span class="txt">电商管理系统</span>
      </div>
      <!-- 顶部-右侧 -->
      <el-button @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 页面左侧 -->
      
      <el-aside :width="cllicot ? '65px' : '200px'">
        <div class="button-bo" @click="cllicot=!cllicot">|||</div>
        <el-menu
          :collapse-transition="false"
          :collapse="cllicot"
          default-active="2"
          :router=true
          background-color="#333743"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu v-for="(item, index) in menulist" :key="index" :index="item.path">
            <template  slot="title">
              <i :class="['iconfont' , iconlist[index]]"></i>
              <span>{{item.authName}}</span>
            </template>
           <el-menu-item v-for="(item1, index1) in item.children" :key="index1" :index="item1.path">
                <i class="iconfont icon-iconfont1"></i>
              <span>{{item1.authName}}</span>
            </el-menu-item>
           </el-submenu>
    </el-menu>
      </el-aside>
      <!-- 页面主题 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return{
      cllicot:false,
      iconlist:[
        'icon-yonghu','icon-suo','icon-shangpingouwudai2','icon-weibiaoti1','icon-tianchongxing-'
      ],
      menulist:[

      ]
    }
  },
  async created(){
   const menus= await this.axios.get('/menus')
  //  console.log(menus)
   if(menus.data.meta.status!=200) return this.$message.error('获取列表失败')
   this.menulist=menus.data.data
  },
  methods: {
    logout() {
      sessionStorage.removeItem("token");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.home,
.el-container {
  height: 100%;
  background-color: #ccc;
}
.home .iconfont{
  margin-right: 10px;
}
.el-menu-item .iconfont{
  margin-right: 10px;
}
.home .el-menu{
  border-right:none;
}

.el-aside .button-bo{
  background-color: #4a4f63;
  color: #fff;
  text-align: center;
  letter-spacing: 3px;
  user-select: none;
  cursor: pointer;
  font-size: 5px;
}
.home .el-header {
  background-color: #373d41;
  /* flex 布局 */
  display: flex;
  /* 一左 一右 */
  justify-content: space-between;
  /* 垂直居中 */
  align-items: center;
  /* 内容无法选中 */
  user-select: none;
}
.home .el-header img {
  /* 图片和文字垂直中线对齐 */
  vertical-align: middle;
}
.loge-box .txt {
  color: #fff;
  font-size: 22px;
  margin-left: 10px;
}
.home .el-aside {
  background-color: #333743;
}
</style>