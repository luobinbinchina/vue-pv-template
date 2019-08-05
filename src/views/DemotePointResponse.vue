<template>
  <div class="b-wrapper demote-point-response">
    <el-row :gutter="24">
      <el-form ref="form" :model="searchForm" label-position="top" label-width="80px">
          <el-col :span="6">
            <el-form-item label="应用组">
              <el-select v-model="searchForm.region" placeholder="应用组">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="应用">
              <el-select v-model="searchForm.region" placeholder="应用组">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="降级点">
                <el-input v-model="searchForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="降级返回值">
                <el-input v-model="searchForm.name"></el-input>
            </el-form-item>
          </el-col>
      </el-form>
    </el-row>
   
    <div class="search-btn-wrapper">
      <el-button type="primary" size="medium" icon="el-icon-plus"> 新 增 </el-button>
      <el-button type="primary" size="medium" icon="el-icon-search"> 查 询 </el-button>
    </div>
  </div>
</template>

<style lang="scss">

  .demote-point-response {
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }

    .el-select {
      width: 100%;
    }

    .el-form-item__label {
      line-height: 1;
    }

    .el-form-item {
      margin-bottom: 0;
    }
  }
  
  
</style>

<script>
  /* eslint-disable */
  import Api from '../api/api'
  import TimeFormat from '../utils/timeFormat'
  export default {
    data () {
      return {
        searchForm: {},
        demotePointResponse: {}
      }
    },
    created () {
      this.querypointreturnvalue()
    },
    watch: {
    },
    methods: {
      querypointreturnvalue () {
        Api.querypointreturnvalue({
          appGroupName: 'hm',
          appName: 'yzq-dubbo1',
          point: 'Dubbo2Service1-kiss-ConsumerPoint',
          returnValueStr: '',
          start: 1,
          size: 10
        }).then((res) => {
          if(res.code === 200) {
            this.strategygrouptips = res.data
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          this.$message({
            message: "获取应用策略组失败",
            type: 'warning'
          })
        })
      },
    }
  }
</script>
