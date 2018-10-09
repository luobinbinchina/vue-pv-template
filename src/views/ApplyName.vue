<template>
  <div class="apply-name">
    <div class="apply-name-search">
     <el-form :inline="true">
       <el-form-item label="应用名称">
         <el-input v-model="form.applyName"  placeholder=""></el-input>
       </el-form-item>
       <el-form-item label="应用组">
         <el-select v-model="form.applyGroup" placeholder="">
           <p v-for="(item, index) in applyGroupData" :key="index">
             <el-option :label="item" :value="item"></el-option>
           </p>
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
          prop="appGroupName"
          label="应用组"
          width="180">
        </el-table-column>
        <el-table-column
          prop="appName"
          label="应用名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="strategyGroupName"
          label="当前使用的策略组"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modifiedTime"
          label="更新时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="operatorId"
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
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="application-group-pagination">
      <el-pagination
        background
        layout="prev, next"
        @current-change="currentChangeData"
        >
      </el-pagination>
    </div>
    <el-dialog title="新增应用" :visible.sync="dialogAddApply">
      <el-form :inline="true" class="add-apply">
        <p class="of-application-group">
          <el-form-item label="所属应用组">
            <el-select v-model="form.applyGroup" placeholder="">
              <p v-for="(item, index) in applyGroupData" :key="index">
                <el-option :label="item" :value="item"></el-option>
              </p>
            </el-select>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="应 用 名 称">
            <el-input v-model="form.applyName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：只能使用字母和-" placement="bottom">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <!-- <p class="of-application-group">
          <el-form-item label="所用策略组">
            <el-select v-model="form.strategyGroup" placeholder="">
              <el-option label="策略组1" value="1"></el-option>
              <el-option label="策略组2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </p> -->
        <p class="add-application-group-btn">
          <el-form-item>
            <el-button type="primary" @click="closeDialogAddApply">取消</el-button>
            <el-button type="primary" @click="doSubmitAddApply">确定</el-button>
          </el-form-item>
        </p>
      </el-form>
    </el-dialog>
    <el-dialog title="修改应用" :visible.sync="dialogEditApply">
      <el-form :inline="true" class="edit-apply">
        <p class="of-application-group">
          <el-form-item label="所属应用组">
            <el-select v-model="form.applyGroup" placeholder="" disabled>
              <p v-for="(item, index) in applyGroupData" :key="index">
                <el-option :label="item" :value="item"></el-option>
              </p>
            </el-select>
          </el-form-item>
        </p>
        <p class="edit-apply-name">
          <el-form-item label="新应用名称">
            <el-input v-model="editApplyName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：只能使用字母和-" placement="bottom">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="of-application-group">
          <el-form-item label="所用策略组">
            <el-select v-model="editStrategyGroup" placeholder="">
              <p v-for="(item, index) in strategyGroupData" :key="index">
                <el-option :label="item" :value="item"></el-option>
              </p>
            </el-select>
          </el-form-item>
        </p>
        <p class="add-application-group-btn">
          <el-form-item>
            <el-button type="primary" @click="closeDialogEditApply">取消</el-button>
            <el-button type="primary" @click="doSubmitEditApply">确定</el-button>
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
  .apply-name-search .el-button {
    padding: 10px 14px;
  }
</style>

<script>
  /* eslint-disable */
  import Api from '../api/api'
  import TimeFormat from '../utils/timeFormat'
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
  let mockStrategyGroup = ['strategy1', 'strategy2', 'strategy3', 'strategy4', 'strategy5', 'strategy6']
  export default {
    data () {
      return {
        strategyGroupData: mockStrategyGroup,
        editStrategyGroup: '',
        editApplyName: '',
        editRowData: {},
        dialogEditApply: false,
        dialogAddApply: false,
        applicationGroup: "",
        tableData: [],
        applyGroupData: [],
        form: {
          applyName: '',
          applyGroup: '',
          strategyGroup: ''
        }
      }
    },
    created () {
      this.appgroupListall()
      // this.strategygroupListall()
    },
    methods: {
      //下一页前一页查询
      currentChangeData(page) {
        this.applyListpage(page).then((res) => {
          if(res.code === 200) {
            res.data.forEach(function(item){
              item.createTime = TimeFormat.timeFormat(item.createTime)
              item.modifiedTime = TimeFormat.timeFormat(item.modifiedTime)
            })
            this.tableData = res.data
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          this.$message({
            message: "分页查询应用失败",
            type: 'warning'
          })
        })
      },
      //查询所有策略组
      strategygroupListall () { // todo
        let params = {
          appGroupName: 'apply',
          appName: 'yy1'
        }
        Api.strategygroupListall(params).then((res) => {
          if (res.code === 200) {
            console.log('strategygroupListall', res.data)
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          this.$message({
            message: "查询所有策略组失败",
            type: 'warning'
          })
        })
      },
      doSubmitEditApply () {
        let params = {
          appGroupName: this.editRowData.appGroupName,
          appName: this.editRowData.appName,
          newAppName: this.editApplyName,
          newStrategyGroupName: this.editStrategyGroup,
          operatorId: this.editRowData.operatorId
        }
        console.log('params', params)
        Api.appinfoEdit(params).then((res) => {
          if(res.code === 200) {
            console.log('appinfoEdit', res.data)
            // this.applyGroupData = res.data
            this.$message({
              message: "修改应用成功",
              type: 'success'
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          console.log('err', err)
          this.$message({
            message: "编辑应用失败",
            type: 'warning'
          })
        })
      },
      closeDialogEditApply () {
        this.dialogEditApply = false
      },
      appgroupListall () {
        let params = {
        }
        Api.appgroupListall(params).then((res) => {
          if(res.code === 200) {
            // res.data.forEach(function(item){
            //   item.createTime = TimeFormat.timeFormat(item.createTime)
            //   item.modifiedTime = TimeFormat.timeFormat(item.modifiedTime)
            // })
            console.log('appgroupListall', res.data)
            this.applyGroupData = res.data
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          this.$message({
            message: "查询应用失败",
            type: 'warning'
          })
        })
      },
      //增加应用
      doSubmitAddApply() {
        let params = {
          appGroupName: this.form.applyGroup,
          appName: this.form.applyName,
          operatorId: new Date().getTime()
        }
        Api.appinfoAdd(params).then((res) => {
          if(res.code === 200) {
            console.log('doSubmitAddApply', res.data)
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          this.$message({
            message: "新增应用失败",
            type: 'warning'
          })
        })
        this.closeDialogAddApply()
      },
      closeDialogAddApply() {
        this.dialogAddApply = false
      },
      addApply() {
        this.dialogAddApply = true
      },
      handleEdit(row) {
        this.dialogEditApply = true
        console.log('row',row)
        this.editRowData = row
      },
      //删除应用
      handleDelete(rowData) {
        let params = {
          appGroupName: rowData.appGroupName,
          appName: rowData.appName,
          operatorId: rowData.operatorId
        }
        Api.appinfoDelete(params).then((res) => {
          if(res.code === 200) {
            this.$message({
              message: "删除应用成功",
              type: 'success'
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err => {
          console.log('err', err)
          this.$message({
            message: "删除应用失败",
            type: 'warning'
          })
        }))
      },
      addApplicationGroup() {
        let params = {
          "appGroupName": "applyOne",
          "operatorId": 1
        }
        Api.appgroupAdd(params)
      },
      applyListpage(page, pageSize) {
        let params = {
          appGroupName: this.form.applyGroup,
          applyName: this.form.applyName,
          page: page || 1,
          pageSize: pageSize || 8
        }
        return Api.appinfoListpage(params)
      },
      //查询应用
      doSearch() {
        console.log('doSearch', this.applyGroupData)
         this.applyListpage().then((res) => {
          if(res.code === 200) {
            res.data.forEach(function(item){
              item.createTime = TimeFormat.timeFormat(item.createTime)
              item.modifiedTime = TimeFormat.timeFormat(item.modifiedTime)
            })
            console.log('appinfoListpage', res.data)
            this.tableData = res.data
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          this.$message({
            message: "查询应用失败",
            type: 'warning'
          })
        })
      }
    }
  }
</script>
