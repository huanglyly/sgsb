<template>
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header/index'
export default {
  components: {
    Header,
  }

}
</script>

<style lang="less" scoped></style>