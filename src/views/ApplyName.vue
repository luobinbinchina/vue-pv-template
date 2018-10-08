<template>
  <div class="apply-name">
    <div class="apply-name-search">
     <el-form :inline="true">
       <el-form-item label="应用名称">
         <el-input v-model="form.applyName"  placeholder=""></el-input>
       </el-form-item>
       <el-form-item label="应用组">
         <el-select v-model="form.applyGroup" placeholder="">
           <el-option label="应用1" value="1"></el-option>
           <el-option label="应用2" value="2"></el-option>
         </el-select>
       </el-form-item>
       <!-- <el-form-item>
         <el-button type="primary" @click="addApplicationGroup">新增应用组</el-button>
       </el-form-item> -->
       <el-form-item>
         <el-button type="primary" @click="addApply">新增应用</el-button>
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
          prop="applyName"
          label="应用名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="usingPolicyGroup"
          label="当前使用的策略组"
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
        layout="prev, next"
        >
      </el-pagination>
    </div>
    <el-dialog title="新增应用" :visible.sync="dialogAddApply">
      <el-form :inline="true" class="add-apply">
        <p class="add-apply-input">
          <span>应用组名称</span>
          <el-input v-model="form.applyName"></el-input>
          <el-tooltip class="item-warning" effect="dark" content="注意：只能使用字母和-" placement="bottom">
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </p>
        <p class="add-application-group-btn">
          <el-form-item>
            <el-button type="primary" @click="closeDialogAddApply">取消</el-button>
            <el-button type="primary" @click="doSubmitAddApply">确定</el-button>
          </el-form-item>
        </p>
      </el-form>
    </el-dialog>
  </div>
</template>

<style lang="scss">
  .apply-name {
    min-height: 600px;
  }
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
  import Api from '../api/api'
  let mockTableData = [
    {
      applicationGroupName: '青桔',
      applyName: 'apply1',
      usingPolicyGroup: 'group1',
      operatorTime: '2016-05-02',
      operatorName: '小明',
      createTime: '2016-04-02'
    },
    {
      applicationGroupName: '王者荣耀',
      applyName: 'apply2',
      usingPolicyGroup: 'group2',
      operatorTime: '2016-06-02',
      operatorName: '小彬',
      createTime: '2016-04-02'
    },
    {
      applicationGroupName: '今日头条',
      applyName: 'apply3',
      usingPolicyGroup: 'group3',
      operatorTime: '2016-07-02',
      operatorName: '小杨',
      createTime: '2016-04-02'
    },
    {
      applicationGroupName: '美团外卖',
      applyName: 'apply4',
      usingPolicyGroup: 'group4',
      operatorTime: '2016-08-02',
      operatorName: '小小',
      createTime: '2016-06-02'
    },
    {
      applicationGroupName: '青桔',
      applyName: 'apply5',
      usingPolicyGroup: 'group5',
      operatorTime: '2016-05-02',
      operatorName: '小明',
      createTime: '2016-04-02'
    },
    {
      applicationGroupName: '王者荣耀',
      applyName: 'apply6',
      usingPolicyGroup: 'group6',
      operatorTime: '2016-06-02',
      operatorName: '小彬',
      createTime: '2016-04-02'
    },
    {
      applicationGroupName: '今日头条',
      applyName: 'apply7',
      usingPolicyGroup: 'group7',
      operatorTime: '2016-07-02',
      operatorName: '小杨',
      createTime: '2016-04-02'
    },
    {
      applicationGroupName: '美团外卖',
      applyName: 'apply8',
      usingPolicyGroup: 'group8',
      operatorTime: '2016-08-02',
      operatorName: '小小',
      createTime: '2016-06-02'
    }
  ]
  export default {
    data () {
      return {
        dialogAddApply: false,
        applicationGroup: "",
        tableData: [],
        form: {
          applyName: '',
          applyGroup: ''
        }
      }
    },
    methods: {
      doSubmitAddApply() {

      },
      closeDialogAddApply() {
        this.dialogAddApply = false
      },
      addApply() {
        this.dialogAddApply = true
      },
      handleEdit() {

      },
      handleDelete() {

      },
      addApplicationGroup() {
        let params = {
          "appGroupName": "applyOne",
          "operatorId": 1
        }
        Api.appgroupAdd(params)
      },
      doSearch() {

      }
    }
  }
</script>
