<template lang="html">
  <div class="cloud-host-container">
    <el-row class="batch-handle-row">
      <el-col :span="16">
        <i class="el-icon-refresh-right mgr20"></i>
        <el-button type="primary" class="mgr20" @click="jumpToCreate">创建云主机</el-button>
        <el-button type="primary">开机</el-button>
        <el-button type="primary">关机</el-button>
        <el-button type="primary">重启</el-button>

        <el-dropdown placement="bottom-start" class="mgr20">
          <el-button class="el-dropdown-link">
            更多操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="operate-dropdown">
            <el-dropdown-item v-for="item in moreOperate"
              :key="item.value"
              :label="item.label"
              :value="item.value">{{ item.label }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="8" align="right">
        <!-- 标签管理 -->
        <tags-manage v-model="query.tag" />
        <el-select
          v-model="showList"
          multiple
          collapse-tags
          class="no-select-header"
          style="margin-left: 20px;width: 150px;"
          placeholder="请选择">
          <template slot="prefix">
            <el-button type="primary">
              <i class="iconfont">&#xe62b;</i>
            </el-button>
          </template>
          <el-option
            v-for="item in headerList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-button type="primary" @click="downLoad">
          <i class="el-icon-bottom"></i>
        </el-button>
      </el-col>

    </el-row>

    <el-row class="search-row">
      <el-col :span="10">
        <span>每页显示：</span>
        <el-select v-model="query.value" placeholder="请选择" class="input-width-1">
          <el-option
            v-for="item in moreOperate"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="14" align="right">
        <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="query.name" class="input-width-2"/>
      </el-col>
    </el-row>

    <div class="table-container">
      <el-table
        :ref="tableRefs"
        :row-style="{height: '60px'}"
        :header-row-style="{height: '60px'}"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
        @sort-change="sortChange"
        style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column label="日期" prop="name" sortable="custom" />
        <el-table-column v-for="(item, index) in showedHeaderList" :key="index" prop="name" :label="item.label" />
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-select v-model="query.value" placeholder="状态">
              <el-option
                v-for="item in moreOperate"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
          <template slot-scope="scope">
            dd
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="200">

          <template slot-scope="scope">
            <el-dropdown placement="bottom-start" trigger="click">
              <el-button class="el-dropdown-link">
                更多操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="operate-dropdown">
                <el-dropdown-item v-for="item in listMoreOperate"
                  @click.stop.native="clickOperate(item)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">{{ item.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <component :is="dialogName" :visible.sync="dialogVisible" />
  </div>
</template>

<script>
import List from '@/components/list'
import * as Config from './config'
import ExportDialog from './list-components/export-dialog.vue'
import ResetPassword from './list-components/reset-password.vue'
import ResetSystem from './list-components/reset-system.vue'
import GenerateImage from './list-components/generate-image.vue'
import BindIp from './list-components/bind-ip.vue'
import AdjustConfiguration from './list-components/adjust-configuration.vue'
import TagsManage from '@/components/tags-manage'

export default {
  extends: List,
  components: {
    ExportDialog, // 导出弹窗
    ResetPassword, // 重置密码弹窗
    ResetSystem, // 重置系统弹窗
    GenerateImage, // 生成镜像弹窗
    BindIp, // 绑定ip弹窗
    AdjustConfiguration, // 调整配置弹窗
    TagsManage
  },
  computed: {
    showedHeaderList() {
      return this.headerList.filter(item => this.showList.includes(item.value))
    }
  },
  data() {
    return {
      query: {
        name: '',
        value: '',
        tag: []
      },
      tableRefs: 'cloud-host-table',
      moreOperate: Config.moreOperate,
      listMoreOperate: Config.listMoreOperate,
      tableList: [
        { name: 111, id: 1 },
        { name: 222, id: 1 },
        { name: 333, id: 1 }
      ],
      headerList: [
        { label: '名称', value: '1' },
        { label: '系统', value: '2' },
        { label: '版本', value: '3' },
        { label: '格式', value: '4' },
        { label: '容量', value: '5' },
        { label: '项目', value: '6' },
        { label: '状态', value: '7' }
      ],
      showList: ['1'],
      createdSearch: false,
      dialogVisible: false, // 弹窗共用组件显隐状态值
      dialogName: '', // 弹窗组件过多，通过name区分需要点击显示某一个弹窗
    }
  },
  created() {

  },
  methods: {
    jumpToCreate() {
      this.$router.push('/compute-service/cloud-host-create')
    },
    downLoad() {
      this.dialogName = 'export-dialog'
      this.dialogVisible = true
    },
    clickOperate(item) {
      this.dialogName = item.componentName
      this.dialogVisible = true
    },
    sortChange(sort) { // 监听table排序参数，例如返回prop：name,order: descending 降序 ascending 升序 null 清空
      console.log(sort)
    }
  }
}
</script>

<style lang="scss" scoped>
.cloud-host-container {
  padding: 20px;
  .batch-handle-row {
    border-bottom: 2px solid #eee;
    padding-bottom: 20px;
  }
  .search-row {
    padding: 20px 0;
  }
  thead{
    .el-select--small{
      padding-left: 0;
      margin-left: -10px;
    }
  }

}
</style>
