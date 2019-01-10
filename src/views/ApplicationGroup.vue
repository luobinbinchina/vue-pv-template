<template>
  <div class="application-group">
    <div class="application-group-search">
     <el-form :inline="true" @submit.native.prevent>
       <el-form-item label="应用组">
         <el-input v-model="applicationGroup" placeholder="请输入关键字进行搜索" @keyup.enter.native="doSearch"></el-input>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="doSearch">查找</el-button>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="addApplicationGroup">新增应用组</el-button>
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
          prop="operatorName"
          label="操作人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="creatorName"
          label="创建人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="modifiedTime"
          label="更新时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
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
        @current-change="currentChangeData"
        >
      </el-pagination>
    </div>
    <el-dialog title="新增应用组" :visible.sync="dialogAddApplicationGroup">
      <el-form :inline="true" class="add-application-group" label-position="right" label-width="120px">
        <p class="add-application-group-input">
          <span>应用组名称</span>
          <el-input v-model="applyGroupName"></el-input>
          <el-tooltip class="item-warning" effect="dark" content="注意：只能使用字母和-" placement="bottom">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </p>
        <p class="add-application-group-btn dialog-footer">
          <el-form-item>
            <el-button type="primary" @click="closeialogAddApplicationGroup">取消</el-button>
            <el-button type="primary" @click="doSubmitAddApplicationGroup">确定</el-button>
          </el-form-item>
        </p>
      </el-form>
    </el-dialog>
    <el-dialog title="修改应用组" :visible.sync="dialogEditApplicationGroup">
      <el-form :inline="true" class="edit-application-group" label-position="right" label-width="120px">
        <p class="edit-application-group-input">
          <span>原应用组名称</span>
          <el-input v-model="editRowData.appGroupName"></el-input>
        </p>
        <p class="edit-application-group-input edit-application-group-input-new">
          <span>新应用组名称</span>
          <el-input v-model="newAppGroupName"></el-input>
          <el-tooltip class="item-warning" effect="dark" content="注意：只能使用字母和-" placement="bottom">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </p>
        <p class="edit-application-group-btn dialog-footer">
          <el-form-item>
            <el-button type="primary" @click="closedialogEditApplicationGroup">取消</el-button>
            <el-button type="primary" @click="doSubmitEditApplicationGroup">确定</el-button>
          </el-form-item>
        </p>
      </el-form>
    </el-dialog>

  </div>
</template>

<style lang="scss">
  .application-group {
  }
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
  .el-table td {
    padding: 8px 0;
  }
  .el-input__inner {
    height: 34px;
    line-height: 34px;
  }
  .application-group-search .el-button {
    padding: 10px 14px;
  }
  .el-dialog__header {
    padding: 20px;
    border-bottom: 1px solid #dcdfe6;
  }
  .dialog-footer {
    padding-left: 80px;
  }
</style>

<script>
/* eslint-disable */
  import Api from '../api/api'
  import TimeFormat from '../utils/timeFormat'
  export default {
    data () {
      return {
        editRowData: {},
        newAppGroupName: '',
        applicationGroup: '',
        tableData: [],
        dialogAddApplicationGroup: false,
        applyGroupName: '',
        dialogEditApplicationGroup: false
      }
    },
    created() {
    },
    mounted() {
      this.doSearch()
    },
    methods: {
      //编辑应用组
      doSubmitEditApplicationGroup() {
        let params = {
          appGroupName: this.editRowData.appGroupName,
          newAppGroupName: this.newAppGroupName,
          operatorId: 183802
        }
        Api.appgroupEdit(params).then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '修改应用组成功',
              type: 'success'
            })
            this.doSearch()
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          this.$message({
            message: "修改应用组失败",
            type: 'warning'
          })
        })
        this.closedialogEditApplicationGroup()
      },
      closedialogEditApplicationGroup() {
        this.dialogEditApplicationGroup = false
      },
      handleEdit(rowData) {
        this.editRowData = rowData
        this.dialogEditApplicationGroup = true
      },
      //删除应用组
      handleDelete(appGroupName, operatorId) {
        let params = {
          appGroupName: appGroupName,
          operatorId: operatorId
        }
        this.$confirm('确定删除该应用组吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.appgroupDelete(params).then((res) => {
            if (res.code === 200) {
              this.$message({
                message: '删除应用组成功',
                type: 'success'
              })
              this.doSearch()
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          }).catch((err) => {
            this.$message({
              message: "删除应用组失败",
              type: 'warning'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      currentChangeData(page) {
        this.appGroupListpage(page).then((res) => {
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
            message: "分页查询应用组失败",
            type: 'warning'
          })
        })
      },
      appGroupListpage(page, pageSize) {
        let params = {
          appGroupName: this.applicationGroup,
          page: page || 1,
          pageSize: pageSize || 8
        }
        return Api.appgroupListpage(params)
      },
      addApplicationGroup() {
        this.dialogAddApplicationGroup = true
      },
      //查询应用组
      doSearch() {
        this.appGroupListpage().then((res) => {
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
            message: "查询应用组失败",
            type: 'warning'
          })
        })
      },
      //新增应用组
      doSubmitAddApplicationGroup() {
        let params = {
          appGroupName: this.applyGroupName,
          operatorId: new Date().getTime()
        }
        Api.appgroupAdd(params).then((res) => {
          if (res.code === 200) {
            this.$message({
              message: '新增成功',
              type: 'success'
            })
            this.doSearch()
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          this.$message({
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
