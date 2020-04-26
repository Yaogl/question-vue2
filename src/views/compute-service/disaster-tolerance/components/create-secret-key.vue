<template lang="html">
  <el-dialog
    title="创建容灾组"
    :visible.sync="visible"
    custom-class="create-secret-key"
    width="800px"
    :before-close="handleClose">
    <div class="dialog-body">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="名称：" prop="name">
          <el-input v-model="formData.name" class="input-width-2"></el-input>
        </el-form-item>
        <el-form-item label="策略：" prop="name">
          反亲和
        </el-form-item>
        <el-form-item label="区域：" prop="name">
          <el-select v-model="formData.name" class="mgr20" placeholder="请选择区域">
            <el-option label="容灾组1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="容量：" prop="name">
          10
        </el-form-item>
        <el-form-item label="描述：" prop="name" >
          <el-input placeholder="请输入描述" class="input-width-percent-7" v-model="formData.desc" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" />
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
    filter: { // 当前列表查询条件
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData: {
        name: 'all', // 范围
        desc: '#333333'
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
