<script setup>
import CommonAside from '@/components/CommonAside.vue'
// import CommonAside from '@/components/vv.vue'
import CommonHeader from '@/components/CommonHeader.vue'

</script>

<template>
  <div class="common-layout">
    <el-container class="container">
      <common-aside class="aside"></common-aside>
      <el-container>
        <el-header class="header">
          <common-header></common-header>
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.container{
  width: 100%;
  height: 100vh;
}
.header{
  padding: 0px;
}
.main{
  padding: 0px;
}

</style>
