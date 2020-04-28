<template lang="html">
  <el-dialog
    :title="routeInfo && routeInfo.id ? '修改路由' : '添加路由'"
    :visible.sync="visible"
    custom-class="create-subhet-vpc"
    width="600px"
    :before-close="handleClose">
    <div class="dialog-body">
      <el-form :model="formData" label-width="140px" @submit.native.prevent>
        <el-form-item label="当前子网：" prop="name">
          <p>sub-test</p>
          <p style="color: #ccc;">网段：192.168.0.1</p>
        </el-form-item>
        <el-form-item label="创建方式：" prop="name">
          <el-radio-group v-model="formData.way">
            <el-radio-button label="1">自动分配</el-radio-button>
            <el-radio-button label="2">手动分配</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="ip地址：" prop="name" v-if="formData.way === '2'">
          <ip-input v-model="formData.name" format="ipv4" maxWidth="320"/>
        </el-form-item>
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
  name: 'create-virtual-ip',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    routeInfo: { // 需要编辑的路由信息
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
        name: [], // 范围
        way: '1'
      }
    }
  },
  created() {
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss">
// 自定义class
.create-route-vpc{
}
</style>
