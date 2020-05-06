<template lang="html">
  <div class="cloud-host-info-conotainer" v-loading="loading">
    <el-row class="batch-handle-row">
      <!-- <i class="el-icon-refresh-right mgr20"></i> -->
      <el-button type="primary" :disabled="instanceInfo.status ==='ACTIVE' || polling" @click="instanceStart">开机</el-button>
      <el-button type="primary" :disabled="instanceInfo.status !=='ACTIVE' || polling" @click="instanceStop">关机</el-button>
      <el-button type="primary" @click="instanceRestart">重启</el-button>

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
    </el-row>

    <el-row class="cloud-host-info" v-if="instanceInfo.id">
      <el-col :span="7">
        <div class="left-card mgb20">
          <p class="title">基本信息</p>
          <el-form label-width="100px">
            <el-form-item label="名称：">
              {{ instanceInfo.name }}
            </el-form-item>
            <el-form-item label="ID：">
              {{ instanceInfo.id }}
            </el-form-item>
            <el-form-item label="类型：">
              通用型
            </el-form-item>
            <el-form-item label="内存：">
              {{ instanceInfo.flavor_info.ram }} MB
            </el-form-item>
            <el-form-item label="CPU：">
              {{ instanceInfo.flavor_info.vcpus }} 核
            </el-form-item>
            <el-form-item label="系统盘：">
              {{ instanceInfo.flavor_info.disk }} GB
            </el-form-item>
            <el-form-item label="SSH秘钥：">

            </el-form-item>
            <el-form-item label="系统：">
              centos7.6 64位
            </el-form-item>
            <el-form-item label="主机名：">
              {{ instanceInfo.name }}
            </el-form-item>
            <el-form-item label="云提供商：">
              OpenStack
            </el-form-item>
            <el-form-item label="区域：">
              保定-lvm
            </el-form-item>
            <el-form-item label="项目：">
              开发项目
            </el-form-item>
            <el-form-item label="创建时间：">
              {{ instanceInfo.created }}
            </el-form-item>
            <el-form-item label="状态：">
              <div :class="this.polling ? 'animation' : ''">
                <p v-if="instanceInfo.status === 'ACTIVE'" class="circle-before green">
                  运行中
                </p>
                <p v-if="instanceInfo.status === 'SHUTOFF'" class="circle-before gray">
                  关闭
                </p>
                <p v-if="instanceInfo.status === 'ERROR'" class="circle-before red">
                  失败
                </p>
                <p v-if="!['ACTIVE', 'SHUTOFF', 'ERROR'].includes(instanceInfo.status)" class="circle-before gray">
                  未知
                </p>
              </div>
            </el-form-item>
            <el-form-item label="容灾组：">

            </el-form-item>
            <el-form-item label="镜像：">
              {{ instanceInfo.image.name }}
            </el-form-item>
            <el-form-item label="删除保护：">
              <el-switch v-model="deleteProtect" active-color="#13ce66"></el-switch>
            </el-form-item>
          </el-form>
        </div>

        <div class="left-card mgb20">
          <p class="title">网络和硬盘</p>
          <el-form label-width="100px">
            <div v-for="(item, index) in instanceInfo.addresses" :key="index + 'addresses'">
              <p class="subtitle">{{ item.name }}：</p>
              <el-form-item label="VPC网络：">
                {{ item.name }}
              </el-form-item>
              <el-form-item label="IP地址：">
                {{ item.addr }}
              </el-form-item>
              <el-form-item label="mac地址：">
                {{ item['OS-EXT-IPS-MAC:mac_addr'] }}
              </el-form-item>
              <el-form-item label="安全组：">
                {{ instanceInfo.security_groups[0].name }}
              </el-form-item>
            </div>

            <p class="subtitle">数据盘：</p>
            <div v-for="(item, index) in instanceInfo.volume_info" :key="index + 'volume'">
              <el-form-item :label="item.name + '：'">
                {{ item.size }} GB
              </el-form-item>
            </div>
          </el-form>
        </div>

        <div class="left-card mgb20">
          <p class="title">费用相关</p>
          <el-form label-width="100px">
            <el-form-item label="计费方式：">
              包年包月
            </el-form-item>
            <el-form-item label="开始计费：">
              2020-02-20 12:23:32
            </el-form-item>
            <el-form-item label="到期时间：">
              2021-02-20 12:23:32
            </el-form-item>
          </el-form>

        </div>
      </el-col>
      <el-col :offset="1" :span="16">
        <el-tabs v-model="activeName">
          <el-tab-pane label="监控" name="first">
            <monitor-charts />
          </el-tab-pane>
          <el-tab-pane label="告警" name="second">告警</el-tab-pane>
          <el-tab-pane label="拓扑" name="third">
            <img src="../../../assets/img/topology.jpg" style="width: 100%;" alt="">
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as Config from './config'
import MonitorCharts from './info-components/monitor-charts.vue'
import * as instanceApi from '@/api/cloud-host'

export default {
  components: {
    MonitorCharts
  },
  data() {
    return {
      query: {
        value: ''
      },
      loading: false,
      activeName: 'first',
      moreOperate: Config.moreOperate,
      uuid: '',
      deleteProtect: true, // 删除保护
      instanceInfo: {},
      polling: false // 轮询开关
    }
  },
  created() {
    this.uuid = this.$route.query.uuid
    this.getDetails()
  },
  methods: {
    getDetails() {
      this.loading = true
      instanceApi.getInstanceDetail(this.uuid).then(res => {
        if (res.data && res.data[0]) {
          this.instanceInfo = this.format(res.data[0])
        }
        this.loading = false
      })
    },
    format(info) {
      let arr = []
      Object.keys(info.addresses).map(key => {
        arr.push({
          name: key,
          ...info.addresses[key][0]
        })
      })
      info.addresses = arr
      return info
    },
    instanceStop() {
      instanceApi.stopInstance({ uuid: this.uuid }).then(res => {
        if (res.ret_code === 200) {
          this.$message.success('操作成功，正在为您关机')
          this.polling = true
          this.pollingInfo()
        } else {
          this.$message.error('操作失败，请稍后重试')
        }
      })
    },
    instanceStart() {
      instanceApi.startInstance({ uuid: this.uuid }).then(res => {
        if (res.ret_code === 200) {
          this.$message.success('操作成功，正在为您开机')
          this.polling = true
          this.pollingInfo()
        } else {
          this.$message.error('操作失败，请稍后重试')
        }
      })
    },
    instanceRestart() {
      instanceApi.restartInstance({ uuid: this.uuid }).then(res => {
        if (res.ret_code === 200) {
          this.$message.success('操作成功，正在为您重启')
        } else {
          this.$message.error('操作失败，请稍后重试')
        }
      })
    },
    pollingInfo() {
      this.pollingTimeout && clearTimeout(this.pollingTimeout)
      this.pollingTimeout = setTimeout(() => {
        if (!this.polling) {
          return
        }
        this.queryInfo()
      }, 3000)
    },
    queryInfo () {
      instanceApi.getInstanceStatus(this.uuid).then((res) => {
        if (this.instanceInfo.status === res.data[0].status) {
          this.pollingInfo()
        } else {
          this.instanceInfo.status = res.data[0].status
          this.$message.success('操作完成')
          this.polling = false
        }
      })
    }
  },
  beforeDestroy () {
    this.pollingTimeout && clearTimeout(this.pollingTimeout)
  }
}
</script>

<style lang="scss" scoped>
.cloud-host-info-conotainer{
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  .el-form-item{
    margin-bottom: 0;
  }
  .batch-handle-row{
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
  }
  .cloud-host-info{
    flex: 1;
    padding: 10px;
    color: #333;
    .left-card{
      background: #DAEDC9;
      border-radius: 6px;
      padding: 10px 20px;
      .title{
        font-size: 16px;
        line-height: 40px;
        font-weight: 600;
      }
      .subtitle{
        font-weight: 600;
        line-height: 30px;
        font-size: 14px;
      }
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
