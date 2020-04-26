<!-- 重置项目弹窗 -->
<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="800px"
    custom-class="reset-system-cloud"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">重置系统</span>
      <span class="tip">重置系统，系统盘所有数据会丢失</span>
    </div>
    <div class="body">
      <el-form :model="formData" label-width="120px">
        <el-form-item label="系统镜像：">
        </el-form-item>

        <el-form-item label="">
          <el-radio-group v-model="formData.macksure">
            <el-radio-button label="公共镜像"></el-radio-button>
            <el-radio-button label="私有镜像"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="">
          <el-select v-model="formData.password" class="mgr20 input-width-2" placeholder="请选择">
            <el-option v-for="(item, index) in systemList" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>

          <el-select v-model="formData.password" class="mgr20 input-width-2" placeholder="请选择">
            <el-option v-for="(item, index) in list" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <div class="line"></div>

        <el-form-item label="云主机名称：" prop="age">
          <el-input placeholder="请输入云主机名称" v-model="formData.password" class="input-width-2"></el-input>
        </el-form-item>
        <el-form-item label="系统用户：" prop="age">
          root
        </el-form-item>
        <el-form-item label="管理员密码：" prop="age">
          <el-radio-group v-model="formData.password">
            <el-radio-button label="密码"></el-radio-button>
            <el-radio-button label="秘钥"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <el-input class="input-width-2" placeholder="请输入密码" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input class="input-width-2" placeholder="请再次输入密码" v-model="formData.password"></el-input>
        </el-form-item>

        <el-form-item label="" prop="age">
          <el-select v-model="formData.password" class="mgr20 input-width-2" placeholder="请选择秘钥对">
            <el-option label="秘钥对1" value="1"></el-option>
          </el-select>
          <el-button type="text">创建密钥对</el-button>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'reset-system',
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
      systemList: [
        { name: 'Centos', value: 1 },
        { name: 'Window', value: 2 }
      ],
      list: [
        { name: '7.6 * 86  64', value: 1 },
        { name: '64', value: 2 }
      ]
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
.reset-system-cloud{
  .title{
    font-size: 16px;
    font-weight: 600;
  }
  .tip{
    color: red;
  }
}
</style>
