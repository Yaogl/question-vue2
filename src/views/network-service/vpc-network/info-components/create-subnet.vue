<template lang="html">
  <el-dialog
    :title="subhetInfo && subhetInfo.id ? '编辑子网' : '创建子网'"
    :visible.sync="visible"
    custom-class="create-subhet-vpc"
    width="800px"
    :before-close="handleClose">
    <div class="dialog-body">
      <el-form :model="formData" label-width="140px">
        <el-form-item label="可用区：" prop="name">
          <el-select v-model="formData.sit" placeholder="请选择可用区">
            <el-option label="可用区11" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称：" prop="name">
          <el-input v-model="formData.name" class="input-width-2" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="子网网段：" prop="name">
          <div class="flex">
            <ip-input v-model="formData.name" format="ipv4" maxWidth="320"/>
            <el-select v-model="formData.sit" class="mgr20 input-width-1" placeholder="16">
              <el-option label="16" value="1"></el-option>
              <el-option label="18" value="2"></el-option>
            </el-select>
          </div>
        </el-form-item>

        <p class="senior">
          <span @click="showSenior">
            高级设置
            <i v-if="!seniorSet" class="iconfont">&#xe629;</i>
            <i v-else class="iconfont">&#xe62c;</i>
          </span>
        </p>

        <div v-if="seniorSet">
          <el-form-item label="网关：" prop="name">
            <div class="flex">
              <ip-input v-model="formData.name" format="ipv4" maxWidth="320"/>
              <el-select v-model="formData.sit" class="mgr20 input-width-1" placeholder="16">
                <el-option label="16" value="1"></el-option>
                <el-option label="18" value="2"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="DNS地址：" prop="name">
                <el-input placeholder="请输入DNS地址" v-model="formData.desc" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="DHCP地址池：" prop="name">
                <el-input placeholder="请输入DHCP地址池" v-model="formData.desc" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="是否开启DHCP：" prop="name">
            <el-switch v-model="formData.open" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import IpInput from '@/components/ip-input'

export default {
  components: {
    IpInput
  },
  name: 'create-subnet',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    subhetInfo: { // 需要编辑的子网信息
      type: Object,
      default: () => {}
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        Object.assign(this.$data, this.$options.data())
      }
    }
  },
  data() {
    return {
      formData: {
        name: 'all', // 范围
        desc: '',
        sit: '',
        open: false
      },
      seniorSet: false
    }
  },
  created() {
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    showSenior() {
      this.seniorSet = !this.seniorSet
      if (!this.seniorSet) {
        // 如果关闭了，清空高级设置
      }
    }
  }
}
</script>

<style lang="scss">
// 自定义class
.create-subhet-vpc{
  .senior{
    line-height: 40px;
    padding-left: 20px;
    span{
      cursor: pointer;
    }
  }
}
</style>
