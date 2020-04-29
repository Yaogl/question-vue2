<template lang="html">
  <div class="create-block-storage-container">
    <el-form :model="formData" ref="numberValidateForm" label-width="140px">
      <el-card shadow="never">
        <p class="header-title">费用和地区</p>
        <el-form-item label="计费方式：" prop="age">
          <el-radio-group v-model="formData.type">
            <el-radio-button label="1">包年包月</el-radio-button>
            <el-radio-button label="2">按量计费</el-radio-button>
          </el-radio-group>
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
        <el-form-item label="地域和可用区：" prop="age">
          <el-select v-model="formData.radio" class="mgr20" placeholder="请选择地域">
            <el-option label="openstack" value="1"></el-option>
            <el-option label="金山云" value="2"></el-option>
          </el-select>
          <el-select v-model="formData.radio" class="mgr20" placeholder="请选择地域">
            <el-option label="openstack" value="1"></el-option>
            <el-option label="金山云" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-card>

      <el-card shadow="never">
        <p class="header-title">基本信息</p>
        <el-form-item label="名称：" prop="age">
          <el-input placeholder="请输入名称" v-model="formData.name" class="input-width-2"></el-input>
        </el-form-item>
        <el-form-item label="类型：" prop="age">
          <el-select v-model="formData.radio" class="mgr20" placeholder="请选择地域">
            <el-option label="openstack" value="1"></el-option>
            <el-option label="金山云" value="2"></el-option>
          </el-select>
          <el-input-number v-model="formData.num" :min="1" :max="10" label="描述文字"></el-input-number>GB
        </el-form-item>
      </el-card>

      <el-card shadow="never">
        <p class="header-title">购买时长</p>
        <el-form-item label="购买时长：" prop="age">
          <el-radio-group v-model="formData.radio">
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
        <el-form-item label="">
          <el-checkbox v-model="formData.checked">自动续费</el-checkbox>
        </el-form-item>
        <el-form-item label="购买数量：" prop="age">
          <el-input-number v-model="formData.num" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
      </el-card>
    </el-form>

    <el-card shadow="never" class="computed-info">
      <el-row type="flex" align="middle">
        <el-col :span="12">
          云磁盘费用：<span style="font-size: 24px;color: red;">￥210</span>
        </el-col>
        <el-col :span="12" align="right">
          <el-button type="primary">购买创建</el-button>
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
        type: '1',
        radio: '',
        storage: [{
          value: 10
        }],
        ipv4: '',
        value4: 0,
        num: 1,
        checked: true
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
.create-block-storage-container{
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
    font-weight: 600;
    color: #666;
  }
  .computed-info{
    font-size: 12px;
    color: #606266;
  }
}
</style>
