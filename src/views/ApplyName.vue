<template>
  <dd-table :list="list" :index.sync="index" :total="total" :page-size="pageSize">
   <div slot="search">
     <el-form :inline="true">
       <el-form-item label="审批人">
         <el-input v-model="param1"  placeholder="审批人"></el-input>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="doSearch">查询</el-button>
       </el-form-item>
     </el-form>
   </div>
   <el-table-column prop="date" label="日期" width="180"></el-table-column>
   <el-table-column prop="name" label="姓名" width="180"></el-table-column>
   <el-table-column prop="address" label="地址" width="300"></el-table-column>
   <el-table-column label="操作">
     <template scope="scope">
       <el-button type="primary" @click="doDelete(scope.row)">删除</el-button>
     </template>
   </el-table-column>
 </dd-table>
</template>
<style lang="scss">

</style>
<script>
  export default {
    data () {
      return {
        list: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      index: 1,
      total: 10,
      pageSize: 10,
      param1: ''
      }
    },
    methods: {
      doSearch: function() {
        console.log(111)
      },
      doDelete: function(a) {
        console.log(222)
      }
    }
  }
</script>
