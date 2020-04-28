<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    custom-class="bind-host-subinfo"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">绑定云主机</span>
    </div>
    <div class="body">
      <p class="mgb20">选择云主机</p>
      <el-input placeholder="请输入关键字搜索" v-model.trim="query.name" @keyup.enter.native="search" class="input-width-2 mgb20">
        <i slot="suffix" class="el-icon-search" @click="search"></i>
      </el-input>
      <el-table
        v-loading="loading"
        :ref="tableRefs"
        :row-style="{height: '40px'}"
        :header-row-style="{height: '45px'}"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column  prop="name" label="姓名"/>
      </el-table>
      <el-row class="mgt20">
        <el-col :span="24" align="right">
          <el-pagination
            :current-page="query.page"
            :page-sizes="[5]"
            :page-size="query.size"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="changePages"
            @current-change="currentChange"/>
        </el-col>
      </el-row>
      <p class="mgb20 mgt20">选择网卡</p>
      <el-form :model="formData" label-width="100px" @submit.native.prevent>
        <el-form-item label="选择网卡：" prop="name">
          <el-select v-model="formData.port" class="mgr20" placeholder="请选择网卡">
            <el-option label="16" value="1"></el-option>
            <el-option label="18" value="2"></el-option>
          </el-select>
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
import List from '@/components/list'
import { getInstanceList } from '@/api/cloud-host'

export default {
  extends: List,
  name: 'bind-host-dialog',
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
        macksure: '',
        port: ''
      },
      tableRefs: 'bindHost',
      multiple: false,
      query: {
        name: '',
        page: 1,
        size: 5
      }
    }
  },
  methods: {
    fetchApi: getInstanceList,
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
.bind-host-subinfo{
  .title{
    font-size: 16px;
    font-weight: 600;
  }
  .tip{
    color: red;
  }
  .body{
    padding: 10px 20px;
  }
}
</style>
