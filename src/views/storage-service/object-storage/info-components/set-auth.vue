<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    custom-class="set-auth-object"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">权限设置</span>
    </div>
    <div class="body">
      <el-table
        class="mgb20"
        :row-style="{height: '40px'}"
        :header-row-style="{height: '40px'}"
        :data="tableList"
        style="width: 100%">
        <el-table-column  prop="name" label="文件名"/>
        <el-table-column  prop="name" label="读写权限"/>
        <el-table-column  prop="name" label="大小"/>
      </el-table>
      <el-row>
        读写权限：<el-radio-group v-model="formData.auth">
          <el-radio-button label="1">本账号读写</el-radio-button>
          <el-radio-button label="2">本账号写公开读</el-radio-button>
          <el-radio-button label="3">公开读写</el-radio-button>
        </el-radio-group>
      </el-row>
      <el-row style="padding: 30px;line-height: 24px;">
        <p>本账号读写：只有用户本人可以读写bucket内的数据。</p>
        <p>本账号写公开读：所有人都可以读bucket数据，写操作需要key认证。</p>
        <p>公开读写：所有人都可以公开读写bucket内的数据，这种情况需谨慎，有可能损坏数据。</p>
      </el-row>
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
  name: 'set-auth',
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
        auth: '1',
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
.set-auth-object{
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
  .tag{
    padding: 4px 10px;
    border-radius: 4px;
  }
}
</style>
