<template lang="html">
  <el-dialog
    title="添加容灾组"
    :visible.sync="visible"
    width="700px"
    :before-close="handleClose">
    <div class="">
      <el-form :model="formData" label-width="120px">
        <el-form-item label="名称：">
          <el-input placeholder="请输入" class="input-width-2" v-model="formData.name"></el-input>
        </el-form-item>

        <el-form-item label="描述：">
          <el-input placeholder="说点什么吧...最少10个字符" v-model="formData.desc" type="textarea" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
        </el-form-item>

        <el-form-item label="容灾区域：">
          <el-radio-group v-model="formData.region">
            <el-radio-button label="保定"></el-radio-button>
            <el-radio-button label="徐水"></el-radio-button>
            <el-radio-button label="天津"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="容灾容量：">
          10台
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
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        desc: '',
        region: '',
        capacity: ''
      }

    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
