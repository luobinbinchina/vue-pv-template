<template>
  <div class="application-group">
    <div class="application-group-search">
     <el-form :inline="true">
       <el-form-item label="应用组">
         <el-input v-model="applicationGroup"  placeholder=""></el-input>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="addApplicationGroup">新增应用组</el-button>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="doSearch">查找</el-button>
       </el-form-item>
     </el-form>
    </div>
    <div class="application-group-table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="applicationGroupName"
          label="应用组"
          width="180">
        </el-table-column>
        <el-table-column
          prop="operatorTime"
          label="更新时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="operatorName"
          label="操作人">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="application-group-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </div>
  </div>
</template>

<style lang="scss">
  .application-group-pagination {
    text-align: center;
    margin-top: 10px;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    border: none;
  }
  .el-table--enable-row-transition .el-table__body td {
    text-align: center;
  }
  .el-table tr th {
    text-align: center;
  }
</style>

<script>
  let mockTableData = [{
    applicationGroupName: '青桔',
    operatorTime: '2016-05-02',
    operatorName: '小明',
    createTime: '2016-04-02'
  },
  {
    applicationGroupName: '王者荣耀',
    operatorTime: '2016-06-02',
    operatorName: '小彬',
    createTime: '2016-04-02'
  },
  {
    applicationGroupName: '今日头条',
    operatorTime: '2016-07-02',
    operatorName: '小杨',
    createTime: '2016-04-02'
  },
  {
    applicationGroupName: '美团外卖',
    operatorTime: '2016-08-02',
    operatorName: '小小',
    createTime: '2016-06-02'
  },
  {
    applicationGroupName: '青桔',
    operatorTime: '2016-05-02',
    operatorName: '小明',
    createTime: '2016-04-02'
  },
  {
    applicationGroupName: '王者荣耀',
    operatorTime: '2016-06-02',
    operatorName: '小彬',
    createTime: '2016-04-02'
  },
  {
    applicationGroupName: '今日头条',
    operatorTime: '2016-07-02',
    operatorName: '小杨',
    createTime: '2016-04-02'
  },
  {
    applicationGroupName: '美团外卖',
    operatorTime: '2016-08-02',
    operatorName: '小小',
    createTime: '2016-06-02'
  }
]
  export default {
    data () {
      return {
        applicationGroup: "",
        tableData: mockTableData
      }
    },
    methods: {
      handleEdit() {

      },
      handleDelete() {

      },
      addApplicationGroup() {

      },
      doSearch() {

      }
    }
  }
</script>
