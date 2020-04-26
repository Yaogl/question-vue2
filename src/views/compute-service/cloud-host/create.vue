<template lang="html">
  <div class="create-cloud-host-container">
    <el-form :model="formData" ref="numberValidateForm" label-width="140px">
      <el-card shadow="never">
        <p class="header-title">费用和地域</p>
        <el-form-item label="计费方式：" prop="age">
          <el-radio-group v-model="formData.radio1">
            <el-radio-button label="包年包月"></el-radio-button>
            <el-radio-button label="按量付费"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属项目：" prop="age">
          开发项目
        </el-form-item>
        <el-form-item label="云提供商：" prop="age">
          开发项目
        </el-form-item>
        <el-form-item label="地域和可用区：" prop="age">
          开发项目
        </el-form-item>
      </el-card>

      <el-card shadow="never">
        <p class="header-title">基本配置（容灾组）</p>
        <el-form-item label="类型：" prop="age">
          <el-radio-group v-model="formData.radio1">
            <el-radio-button label="云主机"></el-radio-button>
            <el-radio-button label="GPU服务器"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="配置：" prop="age">
          <el-radio-group v-model="formData.radio1">
            <el-radio-button label="通用型"></el-radio-button>
            <el-radio-button label="计算型"></el-radio-button>
            <el-radio-button label="内存型"></el-radio-button>
            <el-radio-button label="高主频型"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="系统镜像：" prop="age">
          <el-radio-group v-model="formData.radio1">
            <el-radio-button label="公共镜像"></el-radio-button>
            <el-radio-button label="私有镜像"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="" prop="age">
              <el-select v-model="formData.radio" class="mgr20" placeholder="请选择容灾组">
                <el-option label="容灾组1" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="" label-width="0">
              <el-select v-model="formData.radio" class="mgr20" placeholder="请选择容灾组">
                <el-option label="容灾组1" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="容灾组：" prop="age">
          <el-select v-model="formData.radio" class="mgr20" placeholder="请选择容灾组">
            <el-option label="容灾组1" value="1"></el-option>
          </el-select>
          <el-button type="text" @click="createRecovery">
            点击创建
            <i class="el-icon-d-arrow-right"></i>
          </el-button>
        </el-form-item>
      </el-card>

      <el-card shadow="never">
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
      </el-card>

      <el-card shadow="never">
        <p class="header-title">网络</p>
        <el-form-item label="VPC网络：" prop="age">
          <el-select v-model="formData.radio" class="mgr20" placeholder="请选择容灾组">
            <el-option label="容灾组1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择子网：" prop="age">
          <el-select v-model="formData.radio" class="mgr20" placeholder="请选择容灾组">
            <el-option label="容灾组1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="IPV4地址：" prop="age">
          <div style="display: flex; ">
            <el-radio-group v-model="formData.radio1">
              <el-radio-button label="自动分配"></el-radio-button>
              <el-radio-button label="指定IP"></el-radio-button>
            </el-radio-group>
            <ip-input v-model="formData.ipv4" @status="statusSay" format="ipv4" maxWidth="200" @error="error" @input="inputTest" />
          </div>
        </el-form-item>
        <el-form-item label="安全组：" prop="age">
          <el-select v-model="formData.radio" class="mgr20" placeholder="请选择容灾组">
            <el-option label="容灾组1" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-card>

      <el-card shadow="never">
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
            <el-radio-button label="2月"></el-radio-button>
            <el-radio-button label="3月"></el-radio-button>
            <el-radio-button label="4月"></el-radio-button>
            <el-radio-button label="5月"></el-radio-button>
            <el-radio-button label="6月"></el-radio-button>
            <el-radio-button label="7月"></el-radio-button>
            <el-radio-button label="8月"></el-radio-button>
            <el-radio-button label="9月"></el-radio-button>
            <el-radio-button label="10月"></el-radio-button>
            <el-radio-button label="11月"></el-radio-button>
            <el-radio-button label="1年"></el-radio-button>
            <el-radio-button label="2年"></el-radio-button>
            <el-radio-button label="3年"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-card>

      <el-card shadow="never">
        <p class="header-title">系统信息</p>
        <el-form-item label="云主机名称：" prop="age">
          <el-input placeholder="请输入云主机名称" v-model="formData.age" class="input-width-2"></el-input>
        </el-form-item>
        <el-form-item label="系统用户：" prop="age">
          root
        </el-form-item>
        <el-form-item label="管理员密码：" prop="age">
          <el-radio-group v-model="formData.radio1">
            <el-radio-button label="密码"></el-radio-button>
            <el-radio-button label="秘钥"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <el-input class="input-width-2" placeholder="请输入密码" v-model="formData.radio1"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input class="input-width-2" placeholder="请再次输入密码" v-model="formData.radio1"></el-input>
        </el-form-item>

        <el-form-item label="" prop="age">
          <el-select v-model="formData.radio" class="mgr20 input-width-2" placeholder="请选择秘钥对">
            <el-option label="秘钥对1" value="1"></el-option>
          </el-select>
          <el-button type="text">创建密钥对</el-button>
        </el-form-item>
      </el-card>

      <el-card shadow="never">
        <p class="header-title">购买信息</p>
        <el-form-item label="购买时长：" prop="age">
          <el-radio-group v-model="formData.radio1">
            <el-radio-button label="1月"></el-radio-button>
            <el-radio-button label="2月"></el-radio-button>
            <el-radio-button label="3月"></el-radio-button>
            <el-radio-button label="4月"></el-radio-button>
            <el-radio-button label="5月"></el-radio-button>
            <el-radio-button label="6月"></el-radio-button>
            <el-radio-button label="7月"></el-radio-button>
            <el-radio-button label="8月"></el-radio-button>
            <el-radio-button label="9月"></el-radio-button>
            <el-radio-button label="10月"></el-radio-button>
            <el-radio-button label="11月"></el-radio-button>
            <el-radio-button label="1年"></el-radio-button>
            <el-radio-button label="2年"></el-radio-button>
            <el-radio-button label="3年"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="购买数量：" prop="age">
          <el-input-number v-model="formData.num" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
      </el-card>
    </el-form>

    <el-card shadow="never" class="computed-info">
      <el-row>
        <el-col :span="8">
          <p>云服务器</p>
          <p>北京6区（可用区A），计费方式：预付费（包年包月）</p>
          <p>配置：1核2GB（标准型S3）磁盘：1块本地SSD系统盘</p>
          <p>镜像：Centos7.6.64位 购买量：1个月 * 1</p>
        </el-col>
        <el-col :span="8">
          <p>弹性ip</p>
          <p>计费方式：预付费 配置：BGP 10Mbps</p>
          <p>购买量：1个月 * 1</p>
        </el-col>
        <el-col :span="8">
          <p>预估费用： 1010</p>
        </el-col>
      </el-row>
    </el-card>
    <CreateRecoveryDialog :visible.sync="showRecovery" />
  </div>
</template>

<script>
import CreateRecoveryDialog from './create-components/create-recovery-dialog.vue'
import IpInput from '@/components/ip-input'

export default {
  components: {
    CreateRecoveryDialog,
    IpInput
  },
  data() {
    return {
      formData: {
        age: 1,
        radio1: '',
        radio: '',
        storage: [{
          value: 10
        }],
        ipv4: '',
        value4: 0,
        num: 1
      },
      showRecovery: false
    }
  },
  methods: {
    formatTooltip(val) {
      return val * 2 + 'Mbps';
    },
    createRecovery() {
      this.showRecovery = true
    },
    statusSay(val) {
      console.log(val);
    },
    inputTest() {
        // this.ipv4Model = this.ipv4;
        console.log(this.formData.ipv4);
    },
    error(ip) {
            // console.log('error', ip)
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
