<template lang="html">
  <div class="cloud-host-sub-com">
    <el-card shadow="never" class="mgb20">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="" label-width="0">
              <el-button @click="addVirtualIp">创建虚拟IP</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12" align="right">
            <el-form-item label="">
              <el-input placeholder="请输入关键字搜索" v-model.trim="query.name" @keyup.enter.native="search" class="input-width-2">
                <i slot="suffix" class="el-icon-search" @click="search"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :row-style="{height: '50px'}"
        :header-row-style="{height: '50px'}"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="bindHost(scope.row)">绑定云主机</el-button>
            <el-button type="text"  @click="unbindHost(scope.row)">解绑云主机</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row>
      <el-col :span="12">
        <p>第{{ query.page }}页，共10页，共2344条</p>
      </el-col>
      <el-col :span="12" align="right">
        <el-pagination
          :current-page="query.page"
          :page-sizes="[5, 10, 20, 30, 40]"
          :page-size="query['per-page']"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="changePages"
          @current-change="currentChange"/>
      </el-col>
    </el-row>
    <component :is="dialogName" :visible.sync="visible" />
  </div>
</template>

<script>
import List from '@/components/list'
import CreateVirtualIp from './create-virtual-ip.vue'
import BindHostDialog from './bind-host-dialog.vue'
import UnbindHostDialog from './unbind-host-dialog.vue'

export default {
  components: {
    CreateVirtualIp,
    BindHostDialog,
    UnbindHostDialog
  },
  extends: List,
  data() {
    return {
      pageList: [5, 10, 15, 20, 40, 100],
      createdSearch: false,
      query: {
        name: '',
        page: 1,
        size: 10
      },
      tableList: [
        { name: 1 }
      ],
      dialogName: '',
      visible: false,
      curRow: {} // 当前编辑行数据
    }
  },
  methods: {
    addVirtualIp() {
      this.dialogName = 'create-virtual-ip'
      this.visible = true
    },
    unbindHost(row) {
      this.dialogName = 'unbind-host-dialog'
      this.visible = true
    },
    bindHost(row) {
      this.dialogName = 'bind-host-dialog'
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.cloud-host-sub-com{
  padding-bottom: 20px;
}
</style>
