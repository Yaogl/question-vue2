<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    custom-class="roll-back-snapshot"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">确定云硬盘disk1的数据回滚到---时刻吗？</span>
    </div>
    <div class="body">
      <p class="mgb20">
        如果回滚，该时刻之后的数据会被清除，请谨慎
      </p>
      <el-table
        :row-style="{height: '40px'}"
        :header-row-style="{height: '45px'}"
        :data="tableList"
        style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column  prop="name" label="姓名"/>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import List from '@/components/list'

export default {
  extends: List,
  name: 'roll-back',
  props: {
    visible: {
      type: Boolean,
      default: false
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
        password: '',
        macksure: ''
      },
      query: {
        name: ''
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    confirm() {
    }
  }
}
</script>

<style lang="scss">
.roll-back-snapshot{
  .title{
    font-size: 16px;
    font-weight: 600;
  }
  .body{
    padding: 10px;
  }
}
</style>
