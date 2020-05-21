<template lang="html">
  <div class="cloud-host-container">
    <el-row class="batch-handle-row mgb20">
      <el-col :span="16">
        <el-button type="ghost" class="mgr20" v-if="authBtns.INSTANCE_REFRESH_BTN" @click="clearQuery">
          <i class="el-icon-refresh-right"></i>
          刷新
        </el-button>
        <el-button type="primary" v-if="authBtns.INSTANCE_CREATE_BTN" class="mgr20" @click="jumpToCreate">创建云主机</el-button>
        <el-button type="primary" v-if="authBtns.INSTANCE_START_BTN" :disabled="btnLoading || openDisabled" @click="changeStatus('open')">开机</el-button>
        <el-button type="primary" v-if="authBtns.INSTANCE_STOP_BTN" :disabled="btnLoading || closeDisabled" @click="changeStatus('close')">关机</el-button>
        <el-button type="primary" v-if="authBtns.INSTANCE_RESTART_BTN" :disabled="btnLoading" @click="restart">重启</el-button>
        <!-- 占位放置没有权限，布局错乱 -->
        <span>&nbsp;</span>
        <!-- <el-dropdown placement="bottom-start" class="mgr20">
          <el-button class="el-dropdown-link">
            更多操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="operate-dropdown">
            <el-dropdown-item v-for="item in moreOperate"
              :key="item.value"
              :label="item.label"
              :value="item.value">{{ item.label }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
      </el-col>
      <el-col :span="8" align="right">
        <!-- 标签管理 -->
        <tags-manage v-model="query.tag" v-if="authBtns.INSTANCE_TAGS_BTN"/>
        <el-select
          v-model="showList"
          multiple
          collapse-tags
          class="no-select-header"
          style="margin-left: 20px;width: 100px;"
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

        <el-button type="primary" @click="downLoad" v-if="authBtns.INSTANCE_EXPORT_BTN">
          <i class="el-icon-bottom"></i>
        </el-button>
      </el-col>
    </el-row>

    <el-card shadow="never" class="table-box">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="每页显示：">
              <el-select v-model="query.size" placeholder="请选择" class="input-width-1" @change="changePages">
                <el-option v-for="item in pageList" :key="item" :value="item" :label="item + '条'">{{ item }}条/每页</el-option>
              </el-select>
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
        :ref="tableRefs"
        :row-style="{height: '50px'}"
        :header-row-style="{height: '45px'}"
        :data="tableList"
        v-loading="loading"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column label="名称" prop="name" min-width="30%" v-if="showList.includes('1')">
          <template slot-scope="scope">
            <el-button type="text" @click="jumpToDetail(scope.row)">{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="系统" prop="flavor" v-if="showList.includes('2')" width="70">
          <template slot-scope="scope">
            <i class="iconfont" v-if="scope.row.flavor === '2' || scope.row.name.includes('win')" style="color: #0078D7;">&#xe86f;</i>
            <i class="iconfont" v-else style="color: red;">&#xe900;</i>
          </template>
        </el-table-column>
        <el-table-column label="配置" prop="flavor"  width="70" v-if="showList.includes('3')"/>
        <el-table-column align="center" label="网络" min-width="20%" prop="net_info" v-if="showList.includes('4')">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.net_info" :key="index">
              <p>（{{ item.name }}）</p>
              <p>{{ item.value }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="区域" prop="zone" min-width="10%" v-if="showList.includes('5')"/>
        <el-table-column label="创建时间" min-width="20%" prop="create_time" v-if="showList.includes('6')"/>
        <el-table-column label="项目" prop="flavor" width="80" v-if="showList.includes('7')">
          <template slot-scope="scope">
            {{ curProjectInfo.name }}
          </template>
        </el-table-column>
        <el-table-column width="100">
          <template slot="header" slot-scope="scope">
            <!-- <el-select v-model="query.value" placeholder="状态">
              <el-option
                v-for="item in moreOperate"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
            状态
          </template>
          <template slot-scope="scope">
            <div :class="scope.row.moreOperateLoading ? 'animation' : ''">
              <p v-if="scope.row.status === 'ACTIVE'" class="circle-before green">
                运行中
              </p>
              <p v-if="scope.row.status === 'SHUTOFF'" class="circle-before gray">
                关闭
              </p>
              <p v-if="scope.row.status === 'ERROR'" class="circle-before red">
                失败
              </p>
              <p v-if="!['ACTIVE', 'SHUTOFF', 'ERROR'].includes(scope.row.status)" class="circle-before gray">
                未知
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="170">

          <template slot-scope="scope">
            <div class="flex">
              <el-button type="text"
                @click="getOperateUrl(scope.row)"
                :disabled="scope.row.status !== 'ACTIVE'"
                v-if="authBtns.INSTANCE_VNC_BTN"
                :loading="scope.row.openVnc">
                <i class="iconfont">&#xe621;</i>
              </el-button>
              <el-dropdown placement="bottom-start" trigger="click">
                <el-button class="el-dropdown-link">
                  更多操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" class="operate-dropdown">
                  <el-dropdown-item
                    v-if="authBtns.INSTANCE_START_BTN"
                    @click.stop.native="clickOperate({label: '开机'}, scope.row)"
                    :disabled="scope.row.moreOperateLoading || scope.row.status === 'ACTIVE'"
                  >
                    <p style="min-width: 80px;">开机</p>
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="authBtns.INSTANCE_STOP_BTN"
                    @click.stop.native="clickOperate({label: '关机'}, scope.row)"
                    :disabled="scope.row.moreOperateLoading || scope.row.status !== 'ACTIVE'"
                  >
                    <p>关机</p>
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="authBtns.INSTANCE_RESTART_BTN"
                    @click.stop.native="restartOne(scope.row, 'SOFT')"
                    :disabled="scope.row.moreOperateLoading"
                  >
                    <p>软重启</p>
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="authBtns.INSTANCE_RESTART_BTN"
                    @click.stop.native="restartOne(scope.row, 'HARD')"
                    :disabled="scope.row.moreOperateLoading"
                  >
                    <p>硬重启</p>
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="authBtns.INSTANCE_DELETE_BTN"
                    @click.stop.native="deleteInstance(scope.row)"
                    :disabled="scope.row.moreOperateLoading"
                  >
                    <p>删除</p>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row style="margin: 20px;">
      <el-col :span="8">
        <p>第{{ query.page }}页，共{{ Math.ceil(total/query.size) }}页，共{{ total }}条</p>
      </el-col>
      <el-col :span="16" align="right">
        <el-pagination
          :current-page="query.page"
          :page-sizes="pageList"
          :page-size="query.size"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="changePages"
          @current-change="currentChange"/>
      </el-col>
    </el-row>
    <!-- 各种弹窗功能开发 -->
    <component :is="dialogName" :visible.sync="dialogVisible" />
  </div>
</template>

<script>
import * as instanceApi from '@/api/cloud-host'
import List from '@/components/list'
import * as Config from './config'
import ExportDialog from './list-components/export-dialog.vue'
import ResetPassword from './list-components/reset-password.vue'
import ResetSystem from './list-components/reset-system.vue'
import GenerateImage from './list-components/generate-image.vue'
import BindIp from './list-components/bind-ip.vue'
import AdjustConfiguration from './list-components/adjust-configuration.vue'
import TagsManage from '@/components/tags-manage'
import MountDisk from './list-components/mount-disk.vue'
import UnmountDisk from './list-components/unmount-disk.vue'
import { mapGetters } from 'vuex'
import { dateFormat } from '@/utils'

export default {
  extends: List,
  components: {
    ExportDialog, // 导出弹窗
    ResetPassword, // 重置密码弹窗
    ResetSystem, // 重置系统弹窗
    GenerateImage, // 生成镜像弹窗
    BindIp, // 绑定ip弹窗
    AdjustConfiguration, // 调整配置弹窗
    TagsManage, // 标签管理
    MountDisk, // 挂载磁盘
    UnmountDisk, // 卸载磁盘
    // 标记标签 和挂载磁盘一致 暂时不处理
  },
  computed: {
    showedHeaderList() {
      return this.headerList.filter(item => this.showList.includes(item.value))
    },
    ...mapGetters([
      'pageList',
      'authBtns',
      'curProjectInfo'
    ]),
    openDisabled() {
      let list = this.selectedItems.filter(item => item.status === 'ACTIVE')
      return !!list.length
    },
    closeDisabled() {
      let list = this.selectedItems.filter(item => item.status !== 'ACTIVE')
      return !!list.length
    }
  },
  data() {
    return {
      query: {
        page: 1,
        size: 10,
        name: ''
      },
      uniqueName: 'uuid', // 列表选择用
      moreOperate: Config.moreOperate,
      listMoreOperate: Config.listMoreOperate,
      headerList: [
        { label: '名称', value: '1', key: 'name' },
        { label: '系统', value: '2', key: 'flavor' },
        { label: '配置（模板id）', value: '3', key: 'flavor' },
        { label: '网络', value: '4', key: 'net_info' },
        { label: '区域', value: '5', key: 'zone' },
        { label: '创建时间', value: '6', key: 'create_time' },
        { label: '项目', value: '7', key: 'project' }
      ],
      showList: ['1', '2', '3', '4', '5', '6', '7'],
      dialogVisible: false, // 弹窗共用组件显隐状态值
      dialogName: '', // 弹窗组件过多，通过name区分需要点击显示某一个弹窗
      operateList: [], // 操作的列表,防止selecteditems报错情况出现
      curRow: {},
      polling: false, // 轮询开关，禁止页面其他操作
      btnLoading: false // 按钮loading控制
    }
  },
  methods: {
    fetchApi: instanceApi.getInstanceList,
    jumpToDetail(row) {
      this.$router.push({
        path: '/compute-service/cloud-host-info',
        query: {
          uuid: row.uuid
        }
      })
    },
    deleteInstance(row) {
      this.$confirm('您正在进行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        row.moreOperateLoading = true
        instanceApi.deleteInstance(row.uuid).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.deleteItem(row)
          }
          row.moreOperateLoading = false
        }).catch(err => {
          row.moreOperateLoading = false
        })
      }).catch((err) => {})
    },
    restartOne(row, restart_flag) {
      row.moreOperateLoading = true
      instanceApi.restartInstance({ uuid: row.uuid, restart_flag }).then(res => {
        if (res.code === 200) {
          this.$message.success('操作成功，正在为您重启')
        }
        row.moreOperateLoading = false
      }).catch(err => {
        row.moreOperateLoading = false
      })
    },
    restart() { // 批量重启
      this.btnLoading = true
      if (!this.selectedItems.length) {
        this.$message.warning('请选择需要操作的虚拟机！')
        return
      }
      let proAll = []
      this.selectedItems.map(item => {
        let pro = new Promise(resolve => [
          instanceApi.restartInstance({ uuid: item.uuid }).then(res => {
            resolve(true)
          })
        ])
        proAll.push(pro)
      })
      Promise.all(proAll).then(res => {
        this.clearSelection()
        this.btnLoading = false
        this.$message.success(`操作完成，正在为您重启`)
      })
    },
    changeStatus(operate) {
      if (!this.selectedItems.length) {
        this.$message.warning('请选择需要操作的虚拟机！')
        return
      }
      // 筛选需要操作的列数据
      this.batchOperate(this.selectedItems, operate)
    },
    batchOperate(list, operate) {
      const methods = operate === 'close' ? instanceApi.stopInstance : instanceApi.startInstance
      this.polling = true
      this.btnLoading = true
      let proAll = []
      list.map(item => {
        let pro = new Promise(resolve => [
          methods({ uuid: item.uuid }).then(res => {
            if (res.code === 200) {
              this.operateList.push(item)
            }
            resolve(true)
          })
        ])
        proAll.push(pro)
      })
      Promise.all(proAll).then(res => {
        this.clearSelection()
        this.btnLoading = false
        this.$message.success(`操作完成，正在为您${operate === 'close' ? '关机' : '开机'}`)
        this.queryInfo()
      })
    },
    clickOperate(item, row) {
      this.curRow = row
      if (item.componentName) {
        this.dialogName = item.componentName
        this.dialogVisible = true
        return
      }
      if (this.polling) {
        // 正在轮询
        this.$message.warning('关机或开机中，请稍后')
        return
      }
      switch (item.label) {
        case '开机':
          this.instanceStart(row)
          break
        case '关机':
          this.instanceStop(row)
          break
        default: ''
      }
    },
    instanceStart(row) {
      row.moreOperateLoading = true
      instanceApi.startInstance({ uuid: row.uuid }).then(res => {
        if (res.code === 200) {
          this.operateList = [row]
          this.$message.success('操作成功')
          this.polling = true
          this.pollingInfo()
        } else {
          row.moreOperateLoading = false
        }
      })
    },
    instanceStop(row) {
      row.moreOperateLoading = true
      instanceApi.stopInstance({ uuid: row.uuid }).then(res => {
        if (res.code === 200) {
          this.operateList = [row]
          this.$message.success('操作成功')
          this.polling = true
          this.pollingInfo()
        } else {
          row.moreOperateLoading = false
        }
      })
    },
    formatData(list) {
      list.map(item => {
        let arr = []
        Object.keys(item.net_info).map(key => {
          arr.push({
            name: key,
            value: item.net_info[key][0]
          })
        })
        item.net_info = arr
        item.create_time = dateFormat('YYYY-mm-dd HH:MM', item.create_time)
        item.openVnc = false // 给点击按钮加一个标识显示loading状态
        item.moreOperateLoading = false // 操作loading
      })
      return list
    },
    getOperateUrl(row) {
      row.openVnc = true
      instanceApi.getInstanceVnc(row.uuid).then(res => {
        try {
          row.openVnc = false
          const url = res.result[0].console.url
          window.open (url, "newwindow", "height=500, width=800, top=20, left=30, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no")
        } catch (e) {
          console.log(e);
        }
      })
    },
    pollingInfo () {
      this.pollingTimeout && clearTimeout(this.pollingTimeout)
      this.pollingTimeout = setTimeout(() => {
        if (!this.polling) {
          return
        }
        this.queryInfo()
      }, 3000)
    },
    queryInfo () {
      instanceApi.getInstanceList().then((results) => {
        this.totalList = this.formatData(results.result || [])

        const start = 0 + this.query.size * (this.query.page - 1)
        const end = start + this.query.size
        this.tableList = this.totalList.slice(start, end) //更新tablelist状态

        let fArray = this.operateList.filter(item => {
          let ope = this.totalList.find(to => to.uuid === item.uuid)
          ope.moreOperateLoading = ope && item.status === ope.status
          return item.status !== ope.status
        })
        if (fArray.length !== this.operateList.length) {
          this.pollingInfo()
        } else {
          this.$message.success('操作完成')
          this.polling = false
          this.operateList = []
        }
      })
    },
    jumpToCreate() {
      this.$router.push('/compute-service/cloud-host-create')
    },
    downLoad() {
      this.dialogName = 'export-dialog'
      this.dialogVisible = true
    }
  },
  beforeDestroy() {
    this.pollingTimeout && clearTimeout(this.pollingTimeout)
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
  thead{
    .el-select--small{
      padding-left: 0;
      margin-left: -10px;
    }
  }
  .flex{
    align-items: center;
    .iconfont{
      font-size: 20px;
      cursor: pointer;
      margin-right: 10px;
    }
  }
  .animation{
    animation: firstdiv 0.5s linear 0.4s infinite alternate;
  }
  @keyframes firstdiv{
    0% { opacity: 0.9; transform: scale(1.02); }
    25% { opacity: 0.8; transform: scale(1.01); }
    50% { opacity: 0.6; transform: scale(1); }
    75% { opacity: 0.4; transform: scale(0.99); }
    100% { opacity: 0.3; transform: scale(0.98); }
  }
}
</style>
