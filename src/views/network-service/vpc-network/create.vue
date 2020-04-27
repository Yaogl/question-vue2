<template lang="html">
  <div class="create-vpc-network-container">
    <el-form :model="formData" ref="numberValidateForm" label-width="140px">
      <el-card shadow="never">
        <p class="header-title">基本信息</p>
        <el-form-item label="名称：" prop="age">
          <el-input placeholder="请输入名称" v-model="formData.name" class="input-width-2"></el-input>
        </el-form-item>
        <el-form-item label="所属项目：" prop="age">
          开发项目
        </el-form-item>
        <el-form-item label="云提供商：" prop="age">
          <el-select v-model="formData.radio" class="mgr20" placeholder="请选择云提供商">
            <el-option label="openstack" value="1"></el-option>
            <el-option label="金山云" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地域：" prop="age">
          <el-select v-model="formData.radio" class="mgr20" placeholder="请选择地域">
            <el-option label="openstack" value="1"></el-option>
            <el-option label="金山云" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网段：">
          <div class="flex">
            <ip-input v-model="formData.ipv4" @status="statusSay" format="ipv4" maxWidth="320" @error="error" @input="inputTest" />
            / &nbsp;<el-select v-model="formData.radio" class="mgr20 input-width-1" placeholder="16">
              <el-option label="16" value="1"></el-option>
              <el-option label="18" value="2"></el-option>
            </el-select>
          </div>
        </el-form-item>
      </el-card>

      <el-card shadow="never">
        <p class="header-title">默认子网</p>
        <el-form-item label="可用区：" prop="age">
          <el-select v-model="formData.radio" class="mgr20" placeholder="请选择地域">
            <el-option label="openstack" value="1"></el-option>
            <el-option label="金山云" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称：" prop="age">
          <el-input placeholder="请输入名称" v-model="formData.name" class="input-width-2"></el-input>
        </el-form-item>
        <el-form-item label="子网网段：" prop="age">
          <div class="flex">
            <ip-input v-model="formData.ipv4" @status="statusSay" format="ipv4" maxWidth="320" @error="error" @input="inputTest" />
            / &nbsp;<el-select v-model="formData.radio" class="mgr20 input-width-1" placeholder="16">
              <el-option label="16" value="1"></el-option>
              <el-option label="18" value="2"></el-option>
            </el-select>
          </div>
        </el-form-item>
      </el-card>

      <el-card shadow="never">
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
  </div>
</template>

<script>
import IpInput from '@/components/ip-input'

export default {
  components: {
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
      // console.log(val);
    },
    inputTest() {
        // this.ipv4Model = this.ipv4;
        // console.log(this.formData.ipv4);
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
.create-vpc-network-container{
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
