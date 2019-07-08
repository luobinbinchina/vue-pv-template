<template>
  <div class="aside">
    <div class="logo">
      <span v-if="!isCollapse" class="text-span"><img class="logo-img-big" src="https://pt-starimg.didistatic.com/static/starimg/img/X14XBQ3fAV1543570935761.png"></span>
      <span class="img-span" v-if="isCollapse"><img class="logo-img" src="https://pt-starimg.didistatic.com/static/starimg/img/kd09dBTlVw5uaosvhLS.png"></span>
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      background-color="#20222A"
      text-color="#ffffff"
      :collapse="isCollapse"
      :router="true"
      active-text-color="#d4a266">
      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont adSys-yingyongAPP"></i>
          <span>应用和应用组</span>
        </template>
        <el-menu-item index="/applicationGroup">应用组</el-menu-item>
        <el-menu-item index="/applyName">应用</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont adSys-thunderbolt"></i>
          <span>降级策略</span>
        </template>
        <el-menu-item index="/strategyGroup">策略组</el-menu-item>
        <el-menu-item index="/demotePoint">降级点策略</el-menu-item>
        <el-menu-item index="/demotePointResponse">降级返回值</el-menu-item>
      </el-submenu>
      <el-menu-item index="/downgradeChart">
        <i class="iconfont adSys-barchart"></i>
        <span slot="title">限流降级大盘</span>
      </el-menu-item>
      <el-menu-item index="/settingUp">
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
    computed: {
      activeIndex: function () {
        return this.$route.path;
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
      },
      handleClose(key, keyPath) {
      }
    }
  }
</script>
