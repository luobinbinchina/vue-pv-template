<template>
  <div class="apply-name">
    <div class="apply-name-search">
     <el-form :inline="true">
       <el-form-item label="应用组">
         <el-select v-model="form.applyGroup" placeholder="">
           <p v-for="(item, index) in applyGroupData" :key="index">
             <el-option :label="item" :value="item"></el-option>
           </p>
         </el-select>
       </el-form-item>
       <el-form-item label="应用名称">
         <el-select v-model="form.appName" placeholder="">
           <p v-for="(item, index) in appNameData" :key="index">
             <el-option :label="item" :value="item"></el-option>
           </p>
         </el-select>
       </el-form-item>
       <el-form-item label="策略组">
         <el-select v-model="form.strategyGroup" placeholder="">
           <p v-for="(item, index) in strategyGroupData" :key="index">
             <el-option :label="item" :value="item"></el-option>
           </p>
         </el-select>
       </el-form-item>
       <el-form-item label="降级点">
         <el-input v-model="form.demotePoint" placeholder=""></el-input>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="addDemotePoint">新增降级点</el-button>
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
          width="100">
        </el-table-column>
        <el-table-column
          prop="appName"
          label="应用名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="point"
          label="降级点"
          width="100">
        </el-table-column>
        <el-table-column
          prop="strategyGroupName"
          label="策略组"
          width="100">
        </el-table-column>
        <el-table-column
          prop="visitThreshold"
          label="访问量阈值"
          width="100">
        </el-table-column>
        <el-table-column
          prop="concurrentThreshold"
          label="并发量阈值"
          width="100">
        </el-table-column>
        <el-table-column
          prop="exceptionThreshold"
          label="异常量阈值"
          width="100">
        </el-table-column>
        <el-table-column
          prop="exceptionRateThreshold"
          label="异常率阈值"
          width="100">
        </el-table-column>
        <el-table-column
          prop="exceptionRateStart"
          label="异常率起始阈值"
          width="100">
        </el-table-column>
        <el-table-column
          prop="timeoutThreshold"
          label="超时时间阈值"
          width="100">
        </el-table-column>
        <el-table-column
          prop="timeoutCountThreshold"
          label="超时量阈值"
          width="100">
        </el-table-column>
        <el-table-column
          prop="visitGrowthRate"
          label="访问量增长比率"
          width="100">
        </el-table-column>
        <el-table-column
          prop="visitGrowthThreshold"
          label="访问量增长阈值"
          width="100">
        </el-table-column>
        <el-table-column
          prop="downgradeRate"
          label="降级比例"
          width="100">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="100">
        </el-table-column>
        <el-table-column
          prop="operatorId"
          label="操作人">
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
        <el-table-column label="操作" width="220">
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
    <el-dialog title="新增降级点" :visible.sync="dialogAddDemotePoint">
      <el-form :inline="true" class="add-apply" label-position="right" label-width="140px">
        <p class="of-application-group">
          <el-form-item label="应用组">
            <el-select v-model="addApplyGroupName" placeholder="">
              <p v-for="(item, index) in applyGroupData" :key="index">
                <el-option :label="item" :value="item"></el-option>
              </p>
            </el-select>
          </el-form-item>
        </p>
        <p class="of-application-group">
          <el-form-item label="应用名称">
            <el-select v-model="addApplyName" placeholder="">
              <p v-for="(item, index) in someApplyData" :key="index">
                <el-option :label="item" :value="item"></el-option>
              </p>
            </el-select>
          </el-form-item>
        </p>
        <div class="strategy-group">
          <el-form-item label="策略组">
            <el-select v-model="addStrategyGroup">
              <p v-for="(item, index) in addStrategyGroupData" :key="index">
                <el-option :label="item" :value="item"></el-option>
              </p>
            </el-select>
          </el-form-item>
        </div>
        <p class="add-apply-name">
          <el-form-item label="降级点名称">
            <el-input v-model="addDemotePointName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：只能使用字母和-" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="访问量阈值">
            <el-input v-model="accessThreshold"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：每10秒单台的访问量阈值,-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="并发量阈值">
            <el-input v-model="concurrencyThreshold"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：单台的并发量阈值,-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="降级比例">
            <el-input v-model="downgradeRatio"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：触发策略后被降级的概率，取值[0-100],比如50表示50%的概率被降级掉" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="of-application-group">
          <el-form-item label="状态">
            <el-select v-model="demotePointStatus" placeholder="">
              <el-option :label="0" :value="0"></el-option>
              <el-option :label="1" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：0表示不启用, 1表示启用" placement="bottom">
              <i class="el-icon-question"></i>
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
        <p class="dialog-footer">
          <el-form-item>
            <el-button type="primary" @click="advancedConfig">高级配置</el-button>
            <el-button type="primary" @click="closeDialogAddDemotePoint">取消</el-button>
            <el-button type="primary" @click="doSubmitAddDemotePoint">确定</el-button>
          </el-form-item>
        </p>
      </el-form>
    </el-dialog>
    <el-dialog title="修改降级点" :visible.sync="dialogEditDemotePoint">
      <el-form :inline="true" class="add-apply"  label-position="right" label-width="140px">
        <p class="of-application-group">
          <el-form-item label="应用组名称">
            <el-select v-model="editRowData.appGroupName" placeholder="" disabled>
              <p v-for="(item, index) in applyGroupData" :key="index">
                <el-option :label="item" :value="item"></el-option>
              </p>
            </el-select>
          </el-form-item>
        </p>
        <p class="of-application-group">
          <el-form-item label="应用名称">
            <el-select v-model="editRowData.appName" placeholder="" disabled>
              <p v-for="(item, index) in someApplyData" :key="index">
                <el-option :label="item" :value="item"></el-option>
              </p>
            </el-select>
          </el-form-item>
        </p>
        <p>
          <el-form-item label="策略组">
            <el-select v-model="editRowData.strategyGroupName" placeholder="">
              <p v-for="(item, index) in editStrategyGroupData" :key="index">
                <el-option :label="item" :value="item"></el-option>
              </p>
            </el-select>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="降级点名称">
            <el-input v-model="editRowData.point"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：只能使用字母和-" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="访问量阈值">
            <el-input v-model="editRowData.visitThreshold"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：每10秒单台的访问量阈值,-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="并发量阈值">
            <el-input v-model="editRowData.concurrentThreshold"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：单台的并发量阈值,-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="降级比例">
            <el-input v-model="editRowData.downgradeRate"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：触发策略后被降级的概率，取值[0-100],比如50表示50%的概率被降级掉" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="of-application-group">
          <el-form-item label="状态">
            <el-select v-model="editRowData.status" placeholder="">
              <el-option :label="0" :value="0"></el-option>
              <el-option :label="1" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：0表示不启用, 1表示启用" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="dialog-footer">
          <el-form-item>
            <el-button type="primary" @click="editAdvancedConfig">高级配置</el-button>
            <el-button type="primary" @click="closeDialogEditDemotePoint">取消</el-button>
            <el-button type="primary" @click="doSubmitEditDemotePoint">确定</el-button>
          </el-form-item>
        </p>
      </el-form>
    </el-dialog>
    <el-dialog title="高级配置" :visible.sync="dialogAdvancedConfig">
      <el-form :inline="true" class="edit-apply" label-position="right" label-width="140px">
        <p class="add-apply-name">
          <el-form-item label="访问量增长比率">
            <el-input v-model="visitGrowthRate"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：每秒内能增长的访问量比例，例如15表示15%，280表示280%，这1秒访问量上线 = 上1秒访问量 + (1秒 * 访问量增长率 / 100)" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="访问量增长阈值">
            <el-input v-model="visitGrowthThreshold"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：上一秒访问量超过这个值，访问量增长比率的限制才生效，-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="异常量阈值">
            <el-input v-model="exceptionThreshold"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：每10秒单台的异常量阈值,-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="异常率阈值">
            <el-input v-model="exceptionRateThreshold"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：取值为[0-100],-1表示不生效,15表示异常率阈值为15%" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="异常率起始阈值">
            <el-input v-model="exceptionRateStart"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：访问量超过该值，异常率才生效，-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="超时时间阈值">
            <el-input v-model="timeoutThreshold"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：耗时超过该时间的请求会计入超时计时器中，单位毫秒，-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="超时量阈值">
            <el-input v-model="timeoutCountThreshold"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：每10秒单台的超时量阈值,-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="降级延长时间">
            <el-input v-model="delayTime"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：表示降级的持续时间，单位毫秒，最小值为10000，-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="降级延长重试间隔">
            <el-input v-model="retryInterval"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：降级延长时间的重试请求的时间间隔，单位毫秒，-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="dialog-footer">
          <el-form-item>
            <el-button type="primary" @click="closeDialogAdvancedConfig">取消</el-button>
            <el-button type="primary" @click="closeDialogAdvancedConfig">确定</el-button>
          </el-form-item>
        </p>
      </el-form>
    </el-dialog>
    <el-dialog title="高级配置" :visible.sync="dialogEditAdvancedConfig">
      <el-form :inline="true" class="edit-apply" label-position="right" label-width="140px">
        <p class="add-apply-name">
          <el-form-item label="访问量增长比率">
            <el-input v-model="editRowData.visitGrowthRate"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：每秒内能增长的访问量比例，例如15表示15%，280表示280%，这1秒访问量上线 = 上1秒访问量 + (1秒 * 访问量增长率 / 100)" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="访问量增长阈值">
            <el-input v-model="editRowData.visitGrowthThreshold"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：上一秒访问量超过这个值，访问量增长比率的限制才生效，-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="异常量阈值">
            <el-input v-model="editRowData.exceptionThreshold"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：每10秒单台的异常量阈值,-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="异常率阈值">
            <el-input v-model="editRowData.exceptionRateThreshold"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：取值为[0-100],-1表示不生效,15表示异常率阈值为15%" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="异常率起始阈值">
            <el-input v-model="editRowData.exceptionRateStart"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：访问量超过该值，异常率才生效，-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="超时时间阈值">
            <el-input v-model="editRowData.timeoutThreshold"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：耗时超过该时间的请求会计入超时计时器中，单位毫秒，-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="超时量阈值">
            <el-input v-model="editRowData.timeoutCountThreshold"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：每10秒单台的超时量阈值,-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="降级延长时间">
            <el-input v-model="editRowData.delayTime"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：表示降级的持续时间，单位毫秒，最小值为10000，-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="add-apply-name">
          <el-form-item label="降级延长重试间隔">
            <el-input v-model="editRowData.retryInterval"></el-input>
          </el-form-item>
          <el-form-item>
            <el-tooltip class="item-warning" effect="dark" content="注意：降级延长时间的重试请求的时间间隔，单位毫秒，-1表示不生效" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-form-item>
        </p>
        <p class="dialog-footer">
          <el-form-item>
            <el-button type="primary" @click="closeDialogEditAdvancedConfig">取消</el-button>
            <el-button type="primary" @click="closeDialogEditAdvancedConfig">确定</el-button>
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
        oldStrategyGroupName: '',
        editNewStrategyGroupName: '',
        editStrategyGroupData: [],
        newStrategyGroupName: '',
        dialogEditAdvancedConfig: false,
        appNameData: [],
        addStrategyGroupData: [],
        addStrategyGroup: '',
        demotePointStatus: '',
        timeoutCountThreshold: '',
        editConcurrencyThreshold: '',
        retryInterval: '',
        delayTime: '',
        exceptionRateThreshold: '',
        exceptionRateThreshold: '',
        visitGrowthThreshold: '',
        visitGrowthRate: '',
        editDowngradeRatio: '',
        editAccessThreshold: '',
        editDemotePointName: '',
        dialogEditDemotePoint: false,
        timeoutThreshold: '',
        exceptionThreshold: '',
        exceptionRateStart: '',
        someApplyData: '',
        downgradeRatio: '',
        concurrencyThreshold: '',
        accessThreshold: '',
        addDemotePointName: '',
        addApplyName: '',
        addApplyGroupName: '',
        dialogAddDemotePoint: false,
        dialogAdvancedConfig: false,
        strategyGroupData: [],
        editStrategyGroup: '',
        editApplyName: '',
        editRowData: {},
        dialogEditApply: false,
        dialogAddApply: false,
        applicationGroup: "",
        tableData: [],
        applyGroupData: [],
        form: {
          appName: '',
          applyGroup: '',
          strategyGroup: '',
          demotePoint: ''
        }
      }
    },
    created () {
      this.appgroupListall()
    },
    watch: {
      'editRowData.strategyGroupName' (newVal) {
        this.editNewStrategyGroupName = newVal
      },
      //监听编辑case下面某应用的所有策略组
      'editRowData' (newVal) {
        this.editRowData.strategyGroup = ''
        this.strategygroupListall(newVal.appGroupName, newVal.appName).then((res) => {
          if (res.code === 200) {
            this.editStrategyGroupData = res.data
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          this.$message({
            message: "查询该应用下的所有策略组失败",
            type: 'warning'
          })
        })
      },
      //监听查询case下的应用组变化
      'form.applyGroup' (newVal, oldVal) {
        this.form.appName = ''
        this.getAppinfoListall(newVal).then((res) => {
          if(res.code === 200) {
            this.appNameData = res.data
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          this.$message({
            message: "查询该应用组下的所有应用失败",
            type: 'warning'
          })
        })
      },
      //监听查询状态下的应用变化
      'form.appName' (newVal, oldVal) {
        this.form.strategyGroup = ''
        this.strategygroupListall(this.form.applyGroup, newVal).then((res) => {
          if (res.code === 200) {
            this.strategyGroupData = res.data
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          this.$message({
            message: "查询该应用下的所有策略组失败",
            type: 'warning'
          })
        })
      },
      //监听应用组变化 获取该应用组下所有应用
      addApplyGroupName (newVal, oldVal) {
        this.addApplyName = ''
        this.getAppinfoListall(newVal).then((res) => {
          if(res.code === 200) {
            this.someApplyData = res.data
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          this.$message({
            message: "查询该应用组下的所有应用失败",
            type: 'warning'
          })
        })
      },
      //监听增加策略点case下 获取所有策略组
      addApplyName (newVal, oldVal) {
        this.addStrategyGroup = '',
        this.strategygroupListall(this.addApplyGroupName, newVal).then((res) => {
          if (res.code === 200) {
            console.log('strategygroupListall', res.data)
            this.addStrategyGroupData = res.data
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
      }
    },
    methods: {
      closeDialogEditDemotePoint () {
        this.dialogEditDemotePoint = false
      },
      closeDialogEditAdvancedConfig () {
        this.dialogEditAdvancedConfig = false
      },
      closeDialogEditAdvancedConfig () {
        this.dialogEditAdvancedConfig = false
      },
      //点击修改case中高级配置按钮
      editAdvancedConfig () {
        this.dialogEditAdvancedConfig = true
      },
      //修改降级点
      doSubmitEditDemotePoint () {
        let params = {
          appGroupName: this.editRowData.appGroupName, //应用组
          appName: this.editRowData.appName,//应用名称
          strategyGroupName: this.oldStrategyGroupName, //策略组名称
          newStrategyGroupName: this.editRowData.strategyGroupName, //新策略组名
          point: this.editRowData.point, //降级点名称
          visitThreshold: this.editRowData.visitThreshold, //访问量阈值
          concurrentThreshold: this.editRowData.concurrentThreshold, //并发量阈值
          downgradeRate: this.editRowData.downgradeRate, //降级比例
          status: this.editRowData.status, //状态
          visitGrowthRate: this.editRowData.visitGrowthRate, //访问量增长比率
          visitGrowthThreshold: this.editRowData.visitGrowthThreshold,
          exceptionThreshold: this.editRowData.exceptionThreshold, // 异常量阈值
          exceptionRateThreshold: this.editRowData.exceptionRateThreshold, //异常率阈值
          exceptionRateStart: this.editRowData.exceptionRateStart, // 异常率起始阈值
          timeoutThreshold: this.editRowData.timeoutThreshold, //超时时间阈值
          timeoutCountThreshold: this.editRowData.timeoutCountThreshold, //超时量阈值
          delayTime: this.editRowData.delayTime, //降级延长时间，单位ms
          retryInterval: this.editRowData.retryInterval, //降级延长重试间隔，单位ms
          operatorId: 183802
        }
        Api.pointStrategyEdit(params).then((res) => {
          if (res.code === 200) {
            this.$message({
              message: "修改降级点成功",
              type: 'success'
            })
            this.dialogEditDemotePoint = false
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          this.$message({
            message: "修改降级点失败",
            type: 'warning'
          })
        })
      },
      //关闭增加降级点的高级设置弹窗
      closeDialogAdvancedConfig () {
        this.dialogAdvancedConfig = false
      },
      //查询某应用组下面的所有应用
      getAppinfoListall (appGroup) {
        let params = {
          appGroupName: appGroup
        }
        return Api.appinfoListall(params)
      },
      advancedConfig () {
        this.dialogAdvancedConfig = true;
      },
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
      strategygroupListall (appGroupName, appName) { // todo
        let params = {
          appGroupName: appGroupName,
          appName: appName
        }
        return Api.strategygroupListall(params)
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
      //增加降级点
      doSubmitAddDemotePoint() {
        let params = {
          appGroupName: this.addApplyGroupName, //应用组
          appName: this.addApplyName,//应用名称
          strategyGroupName: this.addStrategyGroup, //策略组名称
          point: this.addDemotePointName, //降级点名称
          visitThreshold: this.accessThreshold, //访问量阈值
          concurrentThreshold: this.concurrencyThreshold, //并发量阈值
          downgradeRate: this.downgradeRatio, //降级比例
          status: this.demotePointStatus, //状态
          visitGrowthRate: this.visitGrowthRate, //访问量增长比率
          visitGrowthThreshold: this.visitGrowthThreshold,
          exceptionThreshold: this.exceptionThreshold, // 异常量阈值
          exceptionRateThreshold: this.exceptionRateThreshold, //异常率阈值
          exceptionRateStart: this.exceptionRateStart, // 异常率起始阈值
          timeoutThreshold: this.timeoutThreshold, //超时时间阈值
          timeoutCountThreshold: this.timeoutCountThreshold, //超时量阈值
          delayTime: this.delayTime, //降级延长时间，单位ms
          retryInterval: this.retryInterval, //降级延长重试间隔，单位ms
          operatorId: 183802
        }
        Api.pointStrategyAdd(params).then((res) => {
          if(res.code === 200) {
            this.$message({
              message: "新增降级点成功",
              type: 'success'
            })
            this.dialogAddDemotePoint = false
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          this.$message({
            message: "新增降级点失败",
            type: 'warning'
          })
        })
        this.dialogAddDemotePoint = false
      },
      closeDialogAddDemotePoint() {
        this.dialogAddDemotePoint = false
      },
      addDemotePoint() {
        this.dialogAddDemotePoint = true
      },
      handleEdit(row) {
        this.dialogEditDemotePoint = true
        this.editRowData = row
        this.oldStrategyGroupName = row.strategyGroupName
      },
      //删除降级点
      handleDelete(rowData) {
        let params = {
          appGroupName: rowData.appGroupName,
          appName: rowData.appName,
          point: rowData.point,
          strategyGroupName: rowData.strategyGroupName,
          operatorId: rowData.operatorId
        }
        Api.pointStrategyDelete(params).then((res) => {
          if(res.code === 200) {
            this.$message({
              message: "删除降级点成功",
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
            message: "删除降级点失败",
            type: 'warning'
          })
        }))
      },
      pointStrategyListpage (page, pageSize) {
        let params = {
          appGroupName: this.form.applyGroup,
          appName: this.form.appName,
          strategyGroupName: this.form.strategyGroup,
          point: this.form.demotePoint,
          page: page || 1,
          pageSize: pageSize || 8
        }
        return Api.pointStrategyListpage(params)
      },
      //查询应用
      doSearch() {
         this.pointStrategyListpage().then((res) => {
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
            message: "查询策略点失败",
            type: 'warning'
          })
        })
      }
    }
  }
</script>
