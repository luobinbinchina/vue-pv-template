<template>
  <div class="demote-point-response">
    <el-row :gutter="20">
      <el-col :span="2">
        <div class="m-lable">
          <label>111</label>
        </div>
      </el-col>
      <el-col :span="4">
        <el-select v-model="demotePointResponse.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="demotePointResponse.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
         <el-input v-model="demotePointResponse.user" placeholder="审批人"></el-input>
      </el-col>
      <el-col :span="4">
         <el-input v-model="demotePointResponse.user" placeholder="审批人"></el-input>
      </el-col>
    </el-row>
    <div class="search-btn-wrapper">
        <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
    </div>
  </div>
</template>

<style lang="scss">
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-select {
    width: 100%;
  }
  
</style>

<script>
  /* eslint-disable */
  import Api from '../api/api'
  import TimeFormat from '../utils/timeFormat'
  export default {
    data () {
      return {
        demotePointResponse: {}
      }
    },
    created () {
    },
    watch: {
    },
    methods: {
    }
  }
</script>
