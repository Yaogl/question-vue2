<template lang="html">
  <div class="mirror-image-private-components">
    <el-row>
      <el-col :span="12">
        <el-button type="ghost" @click="clearQuery">
          <i class="el-icon-refresh"></i>
          刷新
        </el-button>
        <el-button type="primary">删除</el-button>
        <el-button type="primary">共享</el-button>
        <el-button type="primary">跨区复制</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-select
          v-model="showList"
          multiple
          collapse-tags
          class="no-select-header"
          style="margin-left: 20px;width: 200px;"
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
        <el-button type="primary">
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
        :ref="tableRefs"
        v-loading="loading"
        :row-style="{height: '45px'}"
        :header-row-style="{height: '50px'}"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column label="名称" prop="name" min-width="200px" v-if="showList.includes('1')" />
        <el-table-column prop="date" label="系统" v-if="showList.includes('2')">
          <template slot-scope="scope">
            <i class="iconfont" v-if="scope.row.size > 4" style="color: #0078D7;">&#xe86f;</i>
            <i class="iconfont" v-else style="color: red;">&#xe900;</i>
          </template>
        </el-table-column>
        <el-table-column prop="disk_format" label="格式" v-if="showList.includes('3')"/>
        <el-table-column prop="size" label="镜像大小" v-if="showList.includes('4')">
          <template slot-scope="scope">
            {{ scope.row.size }}G
          </template>
        </el-table-column>
        <el-table-column prop="date" label="状态" v-if="showList.includes('5')">
          <template slot-scope="scope">
            <p v-if="scope.row.status === 'active'" class="circle-before green">
              可用
            </p>
            <p v-else class="circle-before gray">
              不可用
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="项目" v-if="showList.includes('6')">
          <template slot-scope="scope">
            开发
          </template>
        </el-table-column>
        <el-table-column prop="created_at" width="160" label="创建时间" v-if="showList.includes('7')"/>


        <!-- <el-table-column prop="date" label="操作" width="230">
          <template slot-scope="scope">
            <el-button type="text" @click="createInstance">创建虚拟机</el-button>
            <el-dropdown placement="bottom-start" trigger="click">
              <el-button class="el-dropdown-link">
                更多操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="operate-dropdown">
                <el-dropdown-item>
                  <p style="min-width: 80px;">更新</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p>跨区拷贝</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p>分享</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p>删除</p>
                </el-dropdown-item>
                <el-dropdown-item>
                  <p>设置删除保护</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column> -->
      </el-table>
    </el-card>
    <el-row>
      <el-col :span="12">
        <p>第{{ query.page }}页，共{{ Math.ceil(total/query.size) }}页，共{{ total }}条</p>
      </el-col>
      <el-col :span="12" align="right">
        <el-pagination
          :current-page="query.page"
          :page-sizes="pageList"
          :page-size="query['per-page']"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="changePages"
          @current-change="currentChange"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import List from '@/components/list'
import { getImageList } from '@/api/cloud-host'
import { dateFormat } from '@/utils'

export default {
  extends: List,
  data() {
    return {
      pageList: [5, 10, 15, 20, 40, 100],
      tableRefs: 'private-list',
      query: {
        name: '',
        visibility: 'private',
        page: 1,
        size: 10
      },
      showList: ['1', '2', '3', '4', '5', '6', '7'],
      headerList: [
        { label: '名称', value: '1' },
        { label: '系统', value: '2' },
        { label: '格式', value: '3' },
        { label: '镜像大小', value: '4' },
        { label: '状态', value: '5' },
        { label: '项目', value: '6' },
        { label: '创建时间', value: '7' },
        // { label: '删除保护', value: '9' },
        // { label: '平台', value: '10' },
        // { label: '区域', value: '11' }
      ]
    }
  },
  methods: {
    fetchApi: getImageList,
    formatData(list) {
      list.map(item => {
        item.created_at = dateFormat('YYYY-mm-dd HH:MM', item.created_at)
      })
      return list
    },
    createInstance() {
      this.$router.push('/compute-service/cloud-host-create')
    }
  }
}
</script>

<style lang="scss" scoped>
.mirror-image-private-components{
  padding-bottom: 20px;
  .table-box{
    margin: 20px 0;
  }
}
</style>
