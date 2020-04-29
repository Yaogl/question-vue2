<template lang="html">
  <div class="mirror-image-pub-components">
    <el-row>
      <el-col :span="12">
        <el-button type="primary">
          <i class="el-icon-refresh"></i>
        </el-button>
      </el-col>
      <el-col :span="12" align="right">
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
        :row-style="{height: '45px'}"
        :header-row-style="{height: '50px'}"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="date" label="系统" width="180">
          <template slot-scope="scope">
            <i class="iconfont" v-if="scope.row.protected" style="color: #0078D7;">&#xe86f;</i>
            <i class="iconfont" v-else style="color: red;">&#xe900;</i>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="版本" width="180" />
        <el-table-column prop="disk_format" label="格式" width="180" />
        <el-table-column prop="size" label="镜像大小" width="100">
          <template slot-scope="scope">
            {{ scope.row.size }}G
          </template>
        </el-table-column>
        <el-table-column prop="date" label="状态" width="180" >
          <template slot-scope="scope">
            <p v-if="scope.row.status === 'active'" class="circle-before green">
              运行中
            </p>
            <p v-if="scope.row.status === 'uploading'" class="circle-before gray">
              关闭
            </p>
            <p v-if="scope.row.status === 'error'" class="circle-before red">
              失败
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text">创建虚拟机</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row>
      <el-col :span="12">
        <p>第{{ query.page }}页，共{{ Math.ceil(total/query.size) }}页，共{{ total }}条</p>
      </el-col>
      <el-col :span="12" align="right">
        <el-pagination
          :current-page="query.page"
          :page-sizes="[5, 10, 20, 30, 40]"
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

export default {
  extends: List,
  data() {
    return {
      tableRefs: 'pub-list',
      pageList: [5, 10, 15, 20, 40, 100],
      query: {
        name: '',
        visibility: 'public',
        page: 1,
        size: 10
      }
    }
  },
  methods: {
    fetchApi: getImageList
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
