<template>
  <div class="application-group">
    <div class="application-group-search">
     <el-form :inline="true">
       <el-form-item label="应用组">
         <el-input v-model="applicationGroup" placeholder=""></el-input>
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
          prop="appGroupName"
          label="应用组"
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
              @click="handleEdit">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.appGroupName, scope.row.operatorId)">删除</el-button>
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
    <el-dialog title="新增应用组" :visible.sync="dialogAddApplicationGroup">
      <el-form :inline="true" class="add-application-group">
        <p class="add-application-group-input">
          <span>应用组名称</span>
          <el-input v-model="applyGroupName"></el-input>
          <el-tooltip class="item-warning" effect="dark" content="注意：只能使用字母和-" placement="bottom">
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </p>
        <p class="add-application-group-btn">
          <el-form-item>
            <el-button type="primary" @click="closeialogAddApplicationGroup">取消</el-button>
            <el-button type="primary" @click="doSubmitAddApplicationGroup">确定</el-button>
          </el-form-item>
        </p>
      </el-form>
    </el-dialog>
    <el-dialog title="修改应用组" :visible.sync="dialogEditApplicationGroup">
      <el-form :inline="true" class="edit-application-group">
        <p class="edit-application-group-input">
          <span>原应用组名称</span>
          <el-input v-model="oldApplyGroupName"></el-input>
        </p>
        <p class="edit-application-group-input edit-application-group-input-new">
          <span>新应用组名称</span>
          <el-input v-model="newApplyGroupName"></el-input>
          <el-tooltip class="item-warning" effect="dark" content="注意：只能使用字母和-" placement="bottom">
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </p>
        <p class="edit-application-group-btn">
          <el-form-item>
            <el-button type="primary" @click="closeialogEditApplicationGroup">取消</el-button>
            <el-button type="primary" @click="doSubmitEditApplicationGroup">确定</el-button>
          </el-form-item>
        </p>
      </el-form>
    </el-dialog>
  </div>
</template>

<style lang="scss">
  .application-group .application-group-search .el-form-item {
    margin-right: 25px;
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
  .add-application-group .add-application-group-input {
    padding-left: 20px
  }
  .add-application-group .add-application-group-input .el-input {
    width: 40%;
    margin-left: 20px;
    margin-right: 20px;
  }
  .add-application-group .add-application-group-input .el-input .el-input__inner {
    height: 35px;
  }
  .add-application-group .add-application-group-btn {
    margin-top: 40px;
  }
  //修改弹框样式
  .edit-application-group .edit-application-group-input {
    padding-left: 20px
  }
  .edit-application-group .edit-application-group-input .el-input {
    width: 40%;
    margin-left: 20px;
    margin-right: 20px;
  }
  .edit-application-group .edit-application-group-input .el-input .el-input__inner {
    height: 35px;
  }
  .edit-application-group .edit-application-group-input-new {
    margin-top: 15px;
  }
  .edit-application-group .edit-application-group-btn {
    margin-top: 40px;
  }
</style>

<script>
/* eslint-disable */
  import Api from '../api/api'
  import TimeFormat from '../utils/timeFormat'
  let mockTableData = [
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
        oldApplyGroupName: '',
        newApplyGroupName: '',
        applicationGroup: '',
        tableData: [],
        dialogAddApplicationGroup: false,
        applyGroupName: '',
        dialogEditApplicationGroup: false
      }
    },
    created() {

    },
    methods: {
      doSubmitEditApplicationGroup() {
        let _this = this
        let params = {
          appGroupName: this.oldApplyGroupName,
          newAppGroupName: this.newApplyGroupName,
          operatorId: new Date().getTime()
        }
        Api.appgroupEdit(params).then((res) => {
          if (res.code === 200) {
            _this.$message({
              message: '修改应用组成功',
              type: 'success'
            })
          } else {
            _this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          _this.$message({
            message: "修改应用组失败",
            type: 'warning'
          })
        })
        this.closeialogEditApplicationGroup() // todo 重新渲染页面
      },
      closeialogEditApplicationGroup() {
        this.dialogEditApplicationGroup = false
      },
      handleEdit() {
        this.dialogEditApplicationGroup = true
      },
      handleDelete(appGroupName, operatorId) {
        let _this = this
        let params = {
          appGroupName: appGroupName,
          operatorId: operatorId
        }
        Api.appgroupDelete(params).then((res) => {
          if (res.code === 200) {
            _this.$message({
              message: '删除应用组成功',
              type: 'success'
            })
          } else {
            _this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          _this.$message({
            message: "删除应用组失败",
            type: 'warning'
          })
        })
      },
      currentChangeData(page) {
        let _this = this
        this.appGroupListpage(page).then((res) => {
        res.data.forEach(function(item){
          item.createTime = timeFormat(item.createTime)
          item.modifiedTime = timeFormat(item.modifiedTime)
        })
        _this.tableData = res.data
        }).catch((err) => {
          console.log(222)
        })
      },
      appGroupListpage(page, pageSize) {
        let params = {
          appGroupName: this.applicationGroup,
          page: page || 1,
          pageSize: pageSize || 5
        }
        return Api.appgroupListpage(params)
      },
      appGroupListall() {
        Api.appgroupListall({})
      },
      addApplicationGroup() {
        this.dialogAddApplicationGroup = true
      },
      doSearch() {
        let _this = this
        this.appGroupListpage().then((res) => {
          res.data.forEach(function(item){
            item.createTime = TimeFormat.timeFormat(item.createTime)
            item.modifiedTime = TimeFormat.timeFormat(item.modifiedTime)
          })
          _this.tableData = res.data
        }).catch((err) => {
          console.log(222)
        })
      },
      //新增应用组逻辑 请求接口
      doSubmitAddApplicationGroup() {
        var _this = this
        let params = {
          appGroupName: this.applyGroupName,
          operatorId: new Date().getTime()
        }
        Api.appgroupAdd(params).then((res) => {
          if (res.code === 200) {
            _this.$message({
              message: '新增成功',
              type: 'success'
            })
          } else {
            _this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          _this.$message({
            message: "新增失败",
            type: 'warning'
          })
        })
        this.closeialogAddApplicationGroup()
      },
      closeialogAddApplicationGroup() {
        this.dialogAddApplicationGroup = false
      }
    }
  }
</script>
