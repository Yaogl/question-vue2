<template lang="html">
  <div class="create-cloud-host-container">
    <el-form :model="formData" :rules="rules" ref="create_instance" label-width="140px">
      <el-card shadow="never">
        <p class="header-title">费用和地域</p>
        <el-form-item label="所属项目：" prop="age">
          <el-select v-model="otherParams.projectId" placeholder="请选择项目">
            <el-option v-for="(item, index) in projectList" :key="item.uuid" :label="item.name" :value="item.uuid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地域和可用区：" prop="availability_zone">
          <el-select v-model="otherParams.zone" placeholder="请选择地域">
            <el-option label="保定" value="1"></el-option>
          </el-select>
          <el-select v-model="formData.availability_zone" placeholder="请选择可用区">
            <el-option label="LVM" value="lvm"></el-option>
          </el-select>
        </el-form-item>
      </el-card>

      <el-card shadow="never">
        <p class="header-title">基本配置（容灾组）</p>
        <el-form-item label="类型：">
          <el-radio-group v-model="otherParams.group_type">
            <el-radio-button label="1">云主机</el-radio-button>
            <el-radio-button disabled label="2">GPU服务器</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="配置：" prop="flavor">
          <el-radio-group v-model="otherParams.group_type" class="mgb20">
            <el-radio-button label="1">通用型</el-radio-button>
            <el-radio-button disabled label="2">计算型</el-radio-button>
            <el-radio-button disabled label="3">内存型</el-radio-button>
            <el-radio-button disabled label="4">高主频型</el-radio-button>
          </el-radio-group>
          <br />
          <el-radio-group v-model="formData.flavor" style="width: 100%;">
            <el-table
              :row-style="{height: '45px'}"
              :header-row-style="{height: '45px'}"
              :data="flavorList"
              :max-height="500"
              style="width: 100%">
              <el-table-column label="选择" align="center" width="80">
                <template slot-scope="scope">
                  <el-radio :label="scope.row.id">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="名称" />
              <el-table-column label="内存" prop="ram" sortable>
                <template slot-scope="scope">
                  {{ scope.row.ram }} MB
                </template>
              </el-table-column>
              <el-table-column prop="vcpus" label="CPU" sortable>
                <template slot-scope="scope">
                  {{ scope.row.vcpus }} 核
                </template>
              </el-table-column>
              <el-table-column prop="disk" label="系统盘" sortable>
                <template slot-scope="scope">
                  {{ scope.row.disk }} GB
                </template>
              </el-table-column>
              <el-table-column label="CPU型号">
                <template slot-scope="scope">
                  Intel Xeon E5-2620
                </template>
              </el-table-column>
            </el-table>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="系统镜像：" prop="image">
          <el-radio-group v-model="otherParams.image_type" class="mgb20">
            <el-radio-button label="1">公共镜像</el-radio-button>
            <el-radio-button label="2">私有镜像</el-radio-button>
          </el-radio-group>
          <br/>
          <el-select v-model="otherParams.system" class="mgr20" placeholder="请选择系统">
            <el-option label="windows" value="1"></el-option>
            <el-option label="linux" value="2"></el-option>
          </el-select>
          <el-select v-model="formData.image" class="mgr20" placeholder="请选择镜像">
            <el-option v-for="(item, index) in computedImageList" :key="item.uuid" :label="item.name" :value="item.uuid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="容灾组：">
          <el-select v-model="formData.server_group" class="mgr20" placeholder="请选择容灾组">
            <el-option v-for="item in serverGroupList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <!-- <el-button type="text" @click="createRecovery">
            点击创建
            <i class="el-icon-d-arrow-right"></i>
          </el-button> -->
        </el-form-item>
      </el-card>

      <!-- <el-card shadow="never">
        <p class="header-title">存储</p>
        <el-form-item label="数据盘：" prop="age">
          <div v-for="(item, index) in formData.storage" :key="index">
            <el-input placeholder="请输入" v-model="item.value" class="input-width-2 mgr20"></el-input>
            <span class="mgr20">GB</span>
            <i class="el-icon-remove-outline" @click="changeStorage('sub', index)"></i>
          </div>
          <div class="">
            <el-button type="text" v-if="formData.storage.length < 6" @click="changeStorage('add')">
              <i class="el-icon-circle-plus-outline"></i>
              添加数据盘
            </el-button>
            您还可以添加{{ 6 - formData.storage.length }}块
          </div>
        </el-form-item>
      </el-card> -->

      <el-card shadow="never">
        <p class="header-title">网络</p>
        <el-form-item label="VPC网络：" prop="network_id">
          <el-select v-model="formData.network_id" class="mgr20" placeholder="请选择网络">
            <el-option v-for="item in netWorkList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="选择子网：" prop="age">
          <el-select v-model="formData.radio" class="mgr20" placeholder="请选择容灾组">
            <el-option label="容灾组1" value="1"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="IPV4地址：" prop="age">
          <div style="display: flex; ">
            <el-radio-group v-model="otherParams.ip_type">
              <el-radio-button label="1">自动分配</el-radio-button>
              <!-- <el-radio-button disabled label="2">指定IP</el-radio-button> -->
            </el-radio-group>
            <ip-input v-if="otherParams.ip_type === '2'" format="ipv4" maxWidth="320" />
          </div>
        </el-form-item>
        <el-form-item label="安全组：" prop="age">
          <el-select v-model="formData.security_groups" class="input-width-4" multiple placeholder="请选择安全组">
            <el-option v-for="item in securityGroupList" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-card>

      <!-- <el-card shadow="never">
        <p class="header-title">弹性ip</p>
        <el-form-item label="弹性ip地址：" prop="age">
          <el-radio-group v-model="formData.age">
            <el-radio :label="3">购买弹性ip</el-radio>
            <el-radio :label="6">稍后购买</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="计费方式：" prop="age">
          <el-radio-group v-model="formData.radio1">
            <el-radio-button label="包年包月"></el-radio-button>
            <el-radio-button label="按小时计费"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="链路类型：" prop="age">
          <el-select v-model="formData.radio" class="mgr20" placeholder="请选择容灾组">
            <el-option label="容灾组1" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="宽带值：" prop="age">
          <el-row>
            <el-col :span="7">
              <el-slider v-model="formData.value4" :format-tooltip="formatTooltip" :marks="{0: '0', 100: '200'}"></el-slider>
            </el-col>
            <el-col :offset="1" :span="14">
              <el-input :value="formData.value4 * 2" class="input-width-1"></el-input>Mbps
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="购买时长：" prop="age">
          <el-radio-group v-model="formData.radio1">
            <el-radio-button label="1月"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-card> -->

      <el-card shadow="never">
        <p class="header-title">系统信息</p>
        <el-form-item label="云主机名称：" prop="name">
          <el-input placeholder="请输入云主机名称" v-model.trim="formData.name" class="input-width-2"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码：" prop="age">
          <el-radio-group v-model="otherParams.key_type" @change="changePassType">
            <el-radio-button label="1">密码</el-radio-button>
            <el-radio-button label="2">秘钥</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="" v-if="otherParams.key_type === '1'">
          <el-input class="input-width-2" show-password placeholder="请输入密码" v-model.trim="formData.adminPass"></el-input>
        </el-form-item>
        <el-form-item label="" prop="againPass" v-if="otherParams.key_type === '1'">
          <el-input class="input-width-2" show-password placeholder="请再次输入密码" v-model.trim="formData.againPass"></el-input>
        </el-form-item>

        <el-form-item label="" prop="age" v-if="otherParams.key_type === '2'">
          <el-select v-model="formData.key_name" class="mgr20 input-width-2" placeholder="请选择秘钥对">
            <el-option v-for="(item, index) in secretkeyList" :key="index" :label="item.keypair.name" :value="item.keypair.name"></el-option>
          </el-select>
        </el-form-item>
      </el-card>

      <!-- <el-card shadow="never">
        <p class="header-title">购买信息</p>
        <el-form-item label="购买时长：" prop="age">
          <el-radio-group v-model="formData.radio1">
            <el-radio-button label="1月"></el-radio-button>
            <el-radio-button label="2月"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="购买数量：" prop="age">
          <el-input-number v-model="formData.num" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
      </el-card> -->
    </el-form>

    <el-card shadow="never" class="computed-info">
      <el-row>
        <el-col :span="23" align="right">
          <el-button :loading="loading" @click="submitInstance" type="primary" style="padding: 12px 30px;">创 建</el-button>
        </el-col>
      </el-row>
    </el-card>
    <CreateRecoveryDialog :visible.sync="showRecovery" />
  </div>
</template>

<script>
import CreateRecoveryDialog from './create-components/create-recovery-dialog.vue'
import IpInput from '@/components/ip-input'
import { mapGetters, mapActions } from 'vuex'
import { createInstance } from '@/api/cloud-host'
import * as Config from './config'

export default {
  components: {
    CreateRecoveryDialog,
    IpInput
  },
  computed: {
    ...mapGetters([
      'imageList',
      'securityGroupList',
      'secretkeyList',
      'netWorkList',
      'serverGroupList',
      'flavorList',
      'instanceStored',
      'projectList',
      'curProjectInfo'
    ]),
    computedImageList() {
      if (this.otherParams.image_type === '2') {
        return this.imageList.filter(item => item.visibility === 'private')
      } else {
        return this.imageList.filter(item => item.visibility !== 'private')
      }
    }
  },
  data() {
    return {
      formData: {
        name: '',
        image: '',
        flavor: '',
        security_groups: [],
        adminPass: '',
        againPass: '',
        key_name: '',
        availability_zone: '',
        network_id: '',
        server_group: ''
      },
      rules: Config.instanceRules(this),
      otherParams: { // 未完成前，控制一些参数
        zone: '1',
        group_type: '1',
        image_type: '1',
        system: '1',
        ip_type: '1',
        key_type: '1',
        projectId: ''
      },
      loading: false,
      showRecovery: false
    }
  },
  created() {
    this.otherParams.projectId = this.curProjectInfo.uuid // 暂时取假值
    !this.instanceStored && this.createInstanceInit()
  },
  methods: {
    ...mapActions([
      'createInstanceInit'
    ]),
    formatTooltip(val) {
      return val * 2 + 'Mbps';
    },
    createRecovery() {
      this.showRecovery = true
    },
    submitInstance() {
      // console.log(JSON.stringify(this.formData, null, 2))
      // return
      this.$refs.create_instance.validate(valid => {
        if (valid) {
          this.loading = true
          const clone = JSON.parse(JSON.stringify(this.formData))
          delete clone.againPass
          createInstance(clone).then(res => {
            if (res.code === 200) {
              this.$message.success('保存成功')
              this.$router.push('/compute-service/cloud-host-list')
            }
            this.loading = false
          }).catch(err => {
            this.loading = false
          })
        }
      })
    },
    changePassType(type) {
      if (type === '1') {
        this.formData.key_name = ''
      } else {
        this.formData.adminPass = ''
        this.formData.againPass = ''
      }
    },
    changeStorage(operate, index) {
      if (operate === 'add') {
        this.formData.storage.push({ value: 10 })
      } else {
        this.formData.storage.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.create-cloud-host-container{
  padding: 20px;
  .el-card{
    margin-bottom: 20px;
  }
  .border{
    padding: 15px;
    border: 1px solid #ccc;
  }
  .header-title{
    padding-bottom: 20px;
    color: #666;
  }
  .computed-info{
    font-size: 12px;
    color: #606266;
  }
}
</style>
