<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    custom-class="bind-tags-vpc"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">编辑标签</span>
    </div>
    <div class="body">
      <p class="mgb20">
        <span>云主机：test </span>
        <span>已绑定：
          <span class="tag" :style="{ background: '#ccc' }">test</span>
        </span>
      </p>
      <el-input placeholder="请输入关键字搜索" v-model.trim="query.name" @keyup.enter.native="search" class="input-width-2 mgb20">
        <i slot="suffix" class="el-icon-search" @click="search"></i>
      </el-input>
      <el-table
        :ref="tableRefs"
        :row-style="{height: '40px'}"
        :header-row-style="{height: '40px'}"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
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
  name: 'bind-tags',
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
      this.$message.success(`密码：${this.formData.password}`)
    }
  }
}
</script>

<style lang="scss">
.bind-tags-vpc{
  .title{
    font-size: 16px;
    font-weight: 600;
  }
  .tip{
    color: red;
  }
  .body{
    padding: 20px 50px;
  }
  .tag{
    padding: 4px 10px;
    border-radius: 4px;
  }
}
</style>
