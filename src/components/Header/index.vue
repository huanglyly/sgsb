<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router @select="handleSiteTabChange">
      <el-image :src="require('@/assets/icon/logo.png')" class="site-logo"></el-image>
      <span class="site-title">时光拾贝</span>
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/create">创作</el-menu-item>
    </el-menu>
    <el-dropdown class="login-user-drop-wrap">
      <span class="el-dropdown-link">
        <el-image :src="require('@/assets/images/head_image_default.png')" style="width:30px;height:30px;"></el-image>
        <span class="login-user-name-wrap">登录用户</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>我的</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSiteTabChange(key, keyPath) {
      console.log('导航索引', key, '导航索引数组', keyPath);
      // this.$router.push(`${key}`)
    }
  }

}
</script>

<style lang="less" scoped>
.site-logo {
  position: absolute;
  left: 10px;
  top: 7px;
}

.site-title {
  position: absolute;
  left: 70px;
  top: 15px;
  font-size: 24px;
  color: #13227a;

}

::v-deep .el-menu-demo.el-menu--horizontal.el-menu {
  padding-left: 300px;

}

::v-deep .login-user-drop-wrap.el-dropdown {
  position: absolute;
  right: 70px;
  top: 20px;

  .el-dropdown-link {
    display: flex;
    align-items: center;

    .login-user-name-wrap {
      margin: 0 10px 0 10px;
    }
  }
}
</style>