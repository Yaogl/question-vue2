<template lang="html">
  <el-dialog
    :title="routeInfo && routeInfo.id ? '修改路由' : '添加路由'"
    :visible.sync="visible"
    custom-class="create-subhet-vpc"
    width="800px"
    :before-close="handleClose">
    <div class="dialog-body">
      <el-form :model="formData" label-width="140px">
        <el-form-item label="目标地址：" prop="name">
          <div class="flex">
            <ip-input v-model="formData.name" format="ipv4" maxWidth="320"/>
            <el-select v-model="formData.sit" class="mgr20 input-width-1" placeholder="16">
              <el-option label="16" value="1"></el-option>
              <el-option label="18" value="2"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="下一跳地址：" prop="name">
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
  name: 'create-route',
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
.create-route-vpc{
}
</style>
