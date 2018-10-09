<template>
  <div class="aside">
    <div class="logo">
      <span v-if="!isCollapse" class="text-span">OpenSDS</span>
      <span class="img-span" v-if="isCollapse"><img class="logo-img" src="https://pt-starimg.didistatic.com/static/starimg/img/kd09dBTlVw5uaosvhLS.png"></span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      background-color="#20222A"
      text-color="#ffffff"
      :collapse="isCollapse"
      :router="true"
      :unique-opened="true"
      active-text-color="#009688">
      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont adSys-yingyongAPP"></i>
          <span>应用和应用组</span>
        </template>
        <el-menu-item index="/applicationGroup">应用组</el-menu-item>
        <el-menu-item index="/applyName">应用</el-menu-item>
      </el-submenu>
      <!-- <el-menu-item index="2">
        <i class="iconfont adSys-CPhezuo_o"></i>
        <span slot="title">导航二</span>
      </el-menu-item> -->
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont adSys-CPhezuo_o"></i>
          <span>降级策略</span>
        </template>
        <el-menu-item index="/applicationGroup">策略组</el-menu-item>
        <el-menu-item index="/applyName">降级点与策略</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        <i class="iconfont adSys-thunderbolt"></i>
        <span slot="title">限流降级大盘</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="iconfont adSys-setup_fill"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import "aside.scss";
</style>
<script type="text/babel">
  export default{
    name:'v-aside',
    props: {
      isCollapse: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data(){
      return {
        logoClass: ''
      }
    },
    watch: {
      "isCollapse": function(newVal, oldVal) {
        if(newVal) {
          this.logoClass = 'small-img'
        } else {
          this.logoClass = ''
        }
      }
    },
    mounted() {
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
  }
</script>
