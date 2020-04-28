<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    custom-class="unbind-host-subinfo"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">解绑云主机</span>
    </div>
    <div class="body">
      <el-input placeholder="请输入关键字搜索" v-model.trim="query.name" @keyup.enter.native="search" class="input-width-2 mgb20">
        <i slot="suffix" class="el-icon-search" @click="search"></i>
      </el-input>
      <el-table
        :row-style="{height: '40px'}"
        :header-row-style="{height: '45px'}"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column  prop="name" label="姓名"/>
        <el-table-column  prop="name" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="unbind(scope.row)">解绑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
    </span>
  </el-dialog>
</template>

<script>
import List from '@/components/list'

export default {
  extends: List,
  name: 'unbind-host-dialog',
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
      },
      tableList: [
        {name: '1122222'}
      ]
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    unbind(row) {
      console.log(row)
    }
  }
}
</script>

<style lang="scss">
.unbind-host-subinfo{
  .title{
    font-size: 16px;
    font-weight: 600;
  }
  .tip{
    color: red;
  }
  .body{
    padding: 10px;
  }
}
</style>
