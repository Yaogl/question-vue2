<template lang="html">
  <el-dialog
    :title="operate === 'add' ? '创建秘钥' : '导入秘钥'"
    :visible.sync="visible"
    custom-class="create-secret-key"
    width="800px"
    :before-close="handleClose">
    <div class="dialog-body">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="秘钥名称：" prop="name">
          <el-input v-model="formData.name" class="input-width-2" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="name">
          <el-input placeholder="请输入描述" class="input-width-percent-7" v-model="formData.desc" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
        </el-form-item>
        <el-form-item label="公钥内容：" prop="name" v-if="operate === 'export'">
          <el-input placeholder="请输入公钥" class="input-width-percent-7" v-model="formData.desc" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
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
export default {
  name: 'create-secret-key',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    operate: { // 操作，是添加还是导入
      type: String,
      default: ''
    },
    filter: { // 当前列表查询条件
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
        name: '',
        desc: ''
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
.create-secret-key{
}
</style>
