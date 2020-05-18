<template lang="html">
  <div class="secret-key-list-container">
    <el-row>
      <el-col :span="12">
        <el-button type="ghost" @click="clearQuery" v-if="authBtns.SSHKEY_REFRESH_BTN">
          <i class="el-icon-refresh"></i>
          刷新
        </el-button>
        <el-button type="primary" v-if="authBtns.SSHKEY_CREATE_BTN" @click="createSecret('add')">创建秘钥对</el-button>
        <el-button type="primary" v-if="authBtns.SSHKEY_IMPORT_BTN" @click="createSecret('export')">导入秘钥对</el-button>
        <el-button type="primary" v-if="authBtns.SSHKEY_DELETE_BTN">删除</el-button>
        <span>&nbsp;</span>
      </el-col>
      <el-col :span="12" align="right" v-if="authBtns.SSHKEY_EXPORT_BTN">
        <el-button type="primary">
          <i class="el-icon-bottom"></i>
        </el-button>
      </el-col>
    </el-row>
    <el-card shadow="never" class="table-box">
      <el-form label-width="100px" @submit.native.prevent>
        <el-row>
          <el-col :span="12">
            <el-form-item label="每页显示：">
              <el-select v-model="query.size" placeholder="请选择" class="input-width-1" @change="changePages">
                <el-option v-for="item in pageList" :key="item" :value="item" :label="item + '条'">{{ item }}条/每页</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" align="right">
            <el-form-item label="">
              <el-input placeholder="请输入关键字搜索" v-model.trim="query.name" @keyup.enter.native="search" class="input-width-2">
                <i slot="suffix" class="el-icon-search" @click="search"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :ref="tableRefs"
        :row-style="{height: '45px'}"
        :header-row-style="{height: '50px'}"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">

        <el-table-column
          type="selection"
          width="55" />
        </el-table-column>

        <el-table-column type="expand">
          <template slot-scope="props">
            <p style="font-weight: 600;font-size: 13px;">公钥</p>
            <p style="line-height: 20px;word-break: break-all;">{{ props.row.keypair.public_key }}</p>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="名称">
          <template slot-scope="scope">
            {{ scope.row.keypair.name }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="指纹">
          <template slot-scope="scope">
            {{ scope.row.keypair.fingerprint }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="项目">
          <template slot-scope="scope">
            测试
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" v-if="authBtns.SSHKEY_DELETE_BTN">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row style="margin: 20px;">
      <el-col :span="8">
        <p>第{{ query.page }}页，共{{ Math.ceil(total/query.size) }}页，共{{ total }}条</p>
      </el-col>
      <el-col :span="16" align="right">
        <el-pagination
          :current-page="query.page"
          :page-sizes="pageList"
          :page-size="query.size"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="changePages"
          @current-change="currentChange"/>
      </el-col>
    </el-row>

    <create-secret-key :visible.sync="visible" :operate="operate" />
  </div>
</template>

<script>
import List from '@/components/list'
import CreateSecretKey from './components/create-secret-key.vue'
import { getSshkeyList } from '@/api/cloud-host'
import { mapGetters } from 'vuex'

export default {
  extends: List,
  components: {
    CreateSecretKey
  },
  computed: {
    ...mapGetters([
      'pageList',
      'authBtns'
    ])
  },
  data() {
    return {
      tableRefs: 'secret-key-list',
      query: {
        name: '',
        page: 1,
        size: 10
      },
      visible: false,
      operate: ''
    }
  },
  methods: {
    fetchApi: getSshkeyList,
    createSecret(operate){
      this.operate = operate
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.secret-key-list-container{
  padding: 20px;
  .table-box{
    margin: 20px 0;
  }
}
</style>
