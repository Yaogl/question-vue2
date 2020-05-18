<template lang="html">
  <div class="certificate-manage-list-container">
    <el-row>
      <el-col :span="12">
        <el-button type="ghost" v-if="authBtns.CERTIFICATE_REFRESH_BTN">
          <i class="el-icon-refresh"></i>
          刷新
        </el-button>
        <el-button type="primary" v-if="authBtns.CERTIFICATE_CREATE_BTN">创建证书</el-button>
        <el-button type="primary" v-if="authBtns.CERTIFICATE_DELETE_BTN">删除</el-button>
        <span>&nbsp;</span>
      </el-col>
      <el-col :span="12" align="right">
        <el-select
          v-model="showList"
          multiple
          collapse-tags
          class="no-select-header"
          style="margin-left: 20px;width: 150px;"
          placeholder="请选择">
          <template slot="prefix">
            <el-button type="primary">
              <i class="iconfont">&#xe62b;</i>
            </el-button>
          </template>
          <el-option
            v-for="item in headerList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-button type="primary" v-if="authBtns.CERTIFICATE_EXPORT_BTN">
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
        <el-table-column type="selection" width="55" />
        <el-table-column label="名称" prop="name" v-if="showList.includes('1')" />
        <el-table-column label="域名" prop="name" v-if="showList.includes('2')">
          <template slot-scope="scope">
            ---
          </template>
        </el-table-column>
        <el-table-column label="监听器" prop="name" v-if="showList.includes('3')" />
        <el-table-column label="描述" v-if="showList.includes('4')" />
        <el-table-column label="项目" prop="project_name" v-if="showList.includes('5')" />
        <el-table-column label="创建时间" prop="created_at" v-if="showList.includes('6')" />

      </el-table>
    </el-card>
    <el-row style="margin: 20px;">
      <el-col :span="12">
        <p>第{{ query.page }}页，共{{ Math.ceil(total/query.size) }}页，共{{ total }}条</p>
      </el-col>
      <el-col :span="12" align="right">
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
import { getNetworkList } from '@/api/network-service'
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
      headerList: [
        { label: '名称', value: '1', key: 'name' },
        { label: '域名', value: '2', key: 'availability_zone' },
        { label: '监听器', value: '3', key: 'flavor' },
        { label: '描述', value: '4', key: 'subnet_num' },
        { label: '项目', value: '5', key: 'project_name' },
        { label: '创建时间', value: '6', key: 'created_at' }
      ],
      showList: ['1', '2', '3', '4', '5', '6'],
      visible: false,
      curRow: {}, // 点击的当前行数据
      componentName: ''
    }
  },
  computed: {
    ...mapGetters([
      'pageList',
      'authBtns'
    ])
  },
  methods: {
    fetchApi: getNetworkList,
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
    },
    formatData(list) {
      list.map(item => {
        item.project_name = '开发项目'
        item.created_at = dateFormat('YYYY-mm-dd HH:MM', item.created_at)
      })
      return list
    }
  }
}
</script>

<style lang="scss" scoped>
.certificate-manage-list-container{
  padding: 20px;
  .table-box{
    margin: 20px 0;
  }
}
</style>
