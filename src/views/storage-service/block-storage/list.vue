<template lang="html">
  <div class="block-storage-list-container">
    <el-row>
      <el-col :span="12">
        <el-button type="primary">
          <i class="el-icon-refresh"></i>
        </el-button>
        <el-button type="primary" @click="createSecret('add')">创建云硬盘</el-button>
        <el-button type="primary">删除</el-button>
        <el-dropdown placement="bottom-start" trigger="click">
          <el-button class="el-dropdown-link">
            更多操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="operate-dropdown">
            <el-dropdown-item v-for="item in listMoreOperate"
              @click.stop.native="clickOperate(item)"
              :key="item.value"
              :label="item.label"
              :value="item.value">{{ item.label }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="12" align="right">
        <!-- <tags-manage v-model="query.tag"/> -->

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

        <el-button type="primary" @click="downLoad">
          <i class="el-icon-bottom"></i>
        </el-button>
      </el-col>
    </el-row>
    <el-card shadow="never" class="table-box">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="每页显示：">
              <el-select v-model="query.size" placeholder="请选择" class="input-width-1">
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
        v-loading="loading"
        :ref="tableRefs"
        :row-style="{height: '45px'}"
        :header-row-style="{height: '50px'}"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column label="名称" prop="name" v-if="showList.includes('1')" >
          <template slot-scope="scope">
            <span class="pointer" @click="toDetail(scope.row)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="volume_type" v-if="showList.includes('2')" />
        <el-table-column label="状态" prop="status" v-if="showList.includes('3')">
          <template slot-scope="scope">
            {{ scope.row.status === 'in-use' ? '已挂载' : '未挂载' }}
          </template>
        </el-table-column>
        <el-table-column label="容量" prop="size" v-if="showList.includes('4')">
          <template slot-scope="scope">
            {{ scope.row.size }} GB
          </template>
        </el-table-column>

        <el-table-column label="计费方式" prop="size" v-if="showList.includes('5')">
          <template slot-scope="scope">

          </template>
        </el-table-column>

        <el-table-column label="绑定实例" prop="size" v-if="showList.includes('6')">
          <template slot-scope="scope">

          </template>
        </el-table-column>

        <el-table-column label="创建时间" prop="created_at" v-if="showList.includes('7')" />

        <el-table-column label="操作" width="180">
          <template lang="html" slot-scope="scope">
            <el-button type="text" @click.stop="editCur(scope.row, 'edit-vpc')">挂载</el-button>
            <!-- <el-dropdown placement="bottom-start" trigger="click">
              <el-button class="el-dropdown-link">
                更多操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="operate-dropdown">
                <el-dropdown-item>
                  <p style="min-width: 80px;">扩容</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p>快照</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p>备份</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p>续费</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p>克隆</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p>转包年包月</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p>删除</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p>修改项目</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p @click="showComponents(scope.row, 'bind-tags')">标签</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
          </template>
        </el-table-column>
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
import ExportDialog from './components/export-dialog.vue'
import BindTags from './components/bind-tags.vue'
import { getBlockList } from '@/api/storage-service'
import { mapGetters } from 'vuex'
import { dateFormat } from '@/utils'

export default {
  extends: List,
  components: {
    TagsManage,
    ExportDialog,
    BindTags
  },
  data() {
    return {
      query: {
        name: '',
        page: 1,
        size: 10
      },
      tableRefs: 'block-table-refs',
      listMoreOperate: [
        { label: '编辑标签', value: 1 },
        { label: '同步状态', value: 2 },
        { label: '修改项目', value: 3 },
        { label: '设置删除保护', value: 4 },
        { label: '删除', value: 5 }
      ],
      headerList: [
        { label: '名称', value: '1' },
        { label: '类型', value: '2' },
        { label: '状态', value: '3' },
        { label: '容量', value: '4' },
        { label: '计费方式', value: '5' },
        { label: '绑定实例', value: '6' },
        { label: '创建时间', value: '7' }
      ],
      showList: ['1', '2', '3', '4', '5', '6', '7'],
      visible: false,
      curRow: {}, // 点击的当前行数据
      componentName: ''
    }
  },
  computed: {
    showedHeaderList() {
      return this.headerList.filter(item => this.showList.includes(item.value))
    },
    ...mapGetters([
      'pageList'
    ])
  },
  methods: {
    fetchApi: getBlockList,
    downLoad() {
      this.componentName = 'export-dialog'
      this.visible = true
    },
    toDetail(row) {
      this.$router.push(`/storage-service/block-storage-info?volume_id=${row.id}`)
    },
    showComponents(row, name) {
      this.curRow = row
      this.componentName = name
      this.visible = true
    },
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
        item.created_at = dateFormat('YYYY-mm-dd HH:MM', item.created_at)
      })
      return list
    }
  }
}
</script>

<style lang="scss" scoped>
.block-storage-list-container{
  padding: 20px;
  .table-box{
    margin: 20px 0;
  }
}
</style>
