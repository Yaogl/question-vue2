<template lang="html">
  <el-dialog
    title="创建标签"
    :visible.sync="visible"
    custom-class="create-tag"
    width="800px"
    :before-close="handleClose">
    <div class="dialog-body">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="名称：" prop="name">
          <el-input v-model="formData.name" class="input-width-2"></el-input>
        </el-form-item>
        <el-form-item label="颜色：" prop="name">
          <div style="display: flex;">
            <el-input v-model="formData.color" class="input-width-2"></el-input>
            <el-color-picker v-model="formData.color"></el-color-picker>
          </div>
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
  name: 'create-tag',
  props: {
    visible: {
      type: Boolean,
      default: false
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
        name: 'all', // 范围
        color: '#333333'
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
.create-tag{
}
</style>
