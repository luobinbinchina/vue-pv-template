<template>
  <div class="header-controller">
    <ul class="hd-ct-left">
      <li @click="changeAside">
        <a class="iconfont adSys-outdent" href="javascript:;"></a>
      </li>
      <li>
        <a class="iconfont adSys-reload" href="javascript:;"></a>
      </li>
      <li>
        <a class="iconfont" href="javascript:;">
          <input class="search-input" type="text" placeholder="搜索...">
        </a>
      </li>
    </ul>
    <ul class="hd-ct-right">
      <li>
        <el-dropdown>
          <span class="el-dropdown-link">
            <a href="javascript:;">
              <a class="iconfont adSys-user user-li" href="javascript:;"></a>
              <span class="user-name">不懂小彬</span>
              <a class="iconfont adSys-down user-li" href="javascript:;"></a>
            </a>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        
      </li>
    </ul>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  @import "./header.scss";
</style>
<script type="text/babel">
  export default{
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
      }
    },
    computed:{
    },
    mounted(){
    },
    methods: {
      changeAside() {
        eventHub.$emit('changeAside')
      }
    }
  }
</script>
