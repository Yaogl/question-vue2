<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    custom-class="adjust-configuration-cloud"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">调整配置</span>
    </div>
    <div class="body">
      <el-table
        :row-style="{height: '50px'}"
        :header-row-style="{height: '50px'}"
        :data="tableList"
        style="width: 100%">
        <el-table-column  prop="name" label="姓名"/>
      </el-table>
      <p class="title">选择配置</p>
      <el-form label-width="100px">
        <el-form-item label="cpu：">
          <el-radio-group v-model="formData.password">
            <el-radio-button label="1">1核</el-radio-button>
            <el-radio-button label="2">2核</el-radio-button>
            <el-radio-button label="3">4核</el-radio-button>
            <el-radio-button label="4">8核</el-radio-button>
            <el-radio-button label="5">16核</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内存：">
          <el-radio-group v-model="formData.password">
            <el-radio-button label="1">2GB</el-radio-button>
            <el-radio-button label="2">4GB</el-radio-button>
            <el-radio-button label="3">8GB</el-radio-button>
            <el-radio-button label="4">16GB</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="系统盘：">
          40GB
        </el-form-item>
      </el-form>
      <div class="charging">
        <p class="head">需支付：<span class="money">￥25</span></p>
        <div class="tips">
          <p>注意：</p>
          <p>1、包年包月的云主机只支持扩容，不支持缩小。按需计费支持缩小配置。</p>
          <p>2、变更操作云主机会重启。</p>
          <p>3、系统会根据选择的cpu和资源做自动适配。</p>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  name: 'adjust-configuration',
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
        password: '1',
        macksure: ''
      },
      query: {
        name: ''
      },
      tableList: [{ name: '11111' }]
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
.adjust-configuration-cloud{
  .title{
    font-size: 16px;
    font-weight: 600;
    margin: 30px 0;
  }
  .body{
    padding: 20px;
  }
  .charging{
    background: #eee;
    padding: 10px;
    border-radius: 5px;
    .head{
      color: red;
      margin-bottom: 20px;
      .money{
        font-size: 28px;
      }
    }
  }
}
</style>
