<template lang="html">
  <div class="firewall-list-container">
    <el-row>
      <el-col :span="12">
        <el-button type="ghost" @click="clearQuery" v-if="authBtns.FIREWALL_REFRESH_BTN">
          <i class="el-icon-refresh"></i>
          刷新
        </el-button>
        <el-button type="primary" v-if="authBtns.FIREWALL_CREATE_BTN">创建防火墙</el-button>
        <el-button type="primary" v-if="authBtns.FIREWALL_DELETE_BTN">删除</el-button>
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
        v-loading="loading"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="状态" prop="name" >
          <template slot-scope="scope">
            {{ scope.row.status === 'ACTIVE' ? '可用' : '不可用' }}
          </template>
        </el-table-column>
        <el-table-column label="关联子网数量" prop="port_num" />
        <el-table-column label="项目" prop="project_name">
          <template lang="html" slot-scope="scope">
            {{ curProjectInfo.name }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template lang="html" slot-scope="scope">
            <el-button type="text" v-if="authBtns.FIREWALL_EDIT_BTN">修改</el-button>
            <el-button type="text" v-if="authBtns.FIREWALL_DELETE_BTN">删除</el-button>
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

    <component :is="componentName" :visible.sync="visible" />
  </div>
</template>

<script>
import List from '@/components/list'
import TagsManage from '@/components/tags-manage/index.vue'
import { getFirewallList } from '@/api/network-service'
import { mapGetters } from 'vuex'
import { dateFormat } from '@/utils'

export default {
  extends: List,
  components: {
    TagsManage
  },
  data() {
    return {
      query: {
        page: 1,
        size: 10,
        name: ''
      },
      tableRefs: 'network-table',
      listMoreOperate: [
        { label: '编辑标签', value: 1 },
        { label: '同步状态', value: 2 },
        { label: '修改项目', value: 3 },
        { label: '设置删除保护', value: 4 },
        { label: '删除', value: 5 }
      ],
      visible: false,
      curRow: {}, // 点击的当前行数据
      componentName: ''
    }
  },
  computed: {
    ...mapGetters([
      'pageList',
      'authBtns',
      'curProjectInfo'
    ])
  },
  methods: {
    fetchApi: getFirewallList,
    clickOperate(item) {
      console.log(item);
    },
    createSecret(operate){
      this.$router.push('/network-service/vpc-network-create')
    },
    editCur(row, name) {
      this.curRow = row
      this.componentName = name
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.firewall-list-container{
  padding: 20px;
  .table-box{
    margin: 20px 0;
  }
}
</style>
