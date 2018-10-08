<template>
  <div class="aside">
    <div class="logo">
      <span>OpenSds</span>
      <!-- <span class="img-span"><img class="logo-class" src="https://pt-starimg.didistatic.com/static/starimg/img/kd09dBTlVw5uaosvhLS.png"></span> -->
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
          <i class="el-icon-location"></i>
          <span>应用和应用组</span>
        </template>
        <el-menu-item index="/applicationGroup">应用组</el-menu-item>
        <el-menu-item index="/applyName">应用</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
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
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
