<template lang="html">
  <div class="disaster-tolerance-list-container">
    <el-row>
      <el-col :span="12">
        <el-button type="ghost" @click="clearQuery">
          <i class="el-icon-refresh"></i>
          刷新
        </el-button>
        <el-button type="primary" @click="createSecret('add')">创建容灾组</el-button>
        <el-button type="primary">删除</el-button>
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
        v-loading="loading"
        :ref="tableRefs"
        :row-style="{height: '45px'}"
        :header-row-style="{height: '50px'}"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column type="selection" width="55" />

        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="expandRow">
              <p>
                <span class="item">名称：<EllipsisText :textContent="props.row.name" :displayLength="30"/></span>
                <span class="item">已加入云主机：1</span>
                <span class="item">剩余空间：9</span>
                <span class="item">策略：反亲和</span>
                <span class="item">区域：保定</span>
                <span class="item">创建时间：2020-04-02</span>
              </p>
              <p>
                <span class="item gray">描述：用于容灾</span>
              </p>

            </div>
            <el-table
              :row-style="{height: '45px'}"
              :header-row-style="{height: '50px'}"
              :data="tableList"
              style="width: 100%">
              <el-table-column prop="name" label="云主机名称"></el-table-column>
              <el-table-column prop="" label="系统"></el-table-column>
              <el-table-column prop="" label="区域"></el-table-column>
              <el-table-column prop="" label="IP地址"></el-table-column>
              <el-table-column prop="" label="状态"></el-table-column>
              <el-table-column prop="" label="操作"></el-table-column>
            </el-table>

          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="" label="策略"></el-table-column>
        <el-table-column prop="" label="云主机数量"></el-table-column>
        <el-table-column prop="" label="区域"></el-table-column>
        <el-table-column prop="" label="创建时间"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="text">删除</el-button>
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

    <create-secret-key :visible.sync="visible" :operate="operate" />
  </div>
</template>

<script>
import List from '@/components/list'
import CreateSecretKey from './components/create-secret-key.vue'
import { mapGetters } from 'vuex'
import { getServerGroupList } from '@/api/cloud-host'
import EllipsisText from '@/components/ellipsis-text'

export default {
  extends: List,
  components: {
    CreateSecretKey,
    EllipsisText
  },
  computed: {
    ...mapGetters([
      'pageList'
    ])
  },
  data() {
    return {
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
    fetchApi: getServerGroupList,
    createSecret(operate){
      this.operate = operate
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.disaster-tolerance-list-container{
  padding: 20px;
  .table-box{
    margin: 20px 0;
  }
  .expandRow{
    padding: 20px;
    background: #eee;
    .item{
      padding-right: 20px;
      line-height: 24px;
    }
    .gray{
      color: #999;
    }
  }
}
</style>
