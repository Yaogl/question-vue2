<template lang="html">
  <div class="mirror-image-pub-components">
    <el-row>
      <el-col :span="12">
        <el-button type="ghost" @click="clearQuery" v-if="authBtns.IMAGE_REFRESH_BTN">
          <i class="el-icon-refresh"></i>
          刷新
        </el-button>
        <span>&nbsp;</span>
      </el-col>
      <!-- <el-col :span="12" align="right" v-if="authBtns.IMAGE_EXPORT_BTN">
        <el-button type="primary">
          <i class="el-icon-bottom"></i>
        </el-button>
      </el-col> -->
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
        :row-style="{height: '45px'}"
        :header-row-style="{height: '50px'}"
        :data="tableList"
        v-loading="loading"
        style="width: 100%">
        <el-table-column prop="name" label="名称" min-width="200px"/>
        <el-table-column prop="date" label="系统">
          <template slot-scope="scope">
            <i class="iconfont" v-if="scope.row.size > 4" style="color: #0078D7;">&#xe86f;</i>
            <i class="iconfont" v-else style="color: red;">&#xe900;</i>
          </template>
        </el-table-column>
        <el-table-column prop="disk_format" label="格式" />
        <el-table-column prop="size" label="镜像大小">
          <template slot-scope="scope">
            {{ scope.row.size }}G
          </template>
        </el-table-column>
        <el-table-column prop="date" label="状态" >
          <template slot-scope="scope">
            <p v-if="scope.row.status === 'active'" class="circle-before green">
              可用
            </p>
            <p v-else class="circle-before gray">
              不可用
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="项目">
          <template slot-scope="scope">
            {{ curProjectInfo.name }}
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="160"/>
      </el-table>
    </el-card>
    <el-row>
      <el-col :span="8">
        <p>第{{ query.page }}页，共{{ Math.ceil(total/query.size) }}页，共{{ total }}条</p>
      </el-col>
      <el-col :span="16" align="right">
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
import { mapGetters } from 'vuex'

export default {
  extends: List,
  computed: {
    ...mapGetters([
      'pageList',
      'authBtns',
      'curProjectInfo'
    ])
  },
  data() {
    return {
      tableRefs: 'pub-list',
      query: {
        name: '',
        visibility: 'public, shared',
        page: 1,
        size: 10
      }
    }
  },
  methods: {
    fetchApi: getImageList,
    createInstance() {
      this.$router.push('/compute-service/cloud-host-create')
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
.mirror-image-pub-components{
  padding-bottom: 20px;
  .table-box{
    margin: 20px 0;
  }
}
</style>
