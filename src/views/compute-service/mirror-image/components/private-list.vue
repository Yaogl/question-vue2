<template lang="html">
  <div class="mirror-image-private-components">
    <el-row>
      <el-col :span="12">
        <el-button type="primary">
          <i class="el-icon-refresh"></i>
        </el-button>
        <el-button type="primary">删除</el-button>
        <el-button type="primary">共享</el-button>
        <el-button type="primary">跨区复制</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <!-- {{ showedHeaderList }} -->
        <el-select
          v-model="showList"
          multiple
          collapse-tags
          style="margin-left: 20px;width: 200px;"
          placeholder="请选择">
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
        :row-style="{height: '60px'}"
        :header-row-style="{height: '60px'}"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column v-for="(item, index) in showedHeaderList" :key="index" prop="name" :label="item.label" />
        <!-- <el-table-column prop="address" label="地址" width="120">
          <template slot="header" slot-scope="scope">
            <el-select v-model="query.value" placeholder="状态">
              <el-option
                v-for="item in moreOperate"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column> -->
      </el-table>
    </el-card>
    <el-row>
      <el-col :span="12">
        <p>第{{ query.page }}页，共10页，共2344条</p>
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

export default {
  extends: List,
  data() {
    return {
      pageList: [5, 10, 15, 20, 40, 100],
      createdSearch: false,
      query: {
        name: '',
        page: 1,
        size: 10
      },
      showList: ['1'],
      headerList: [
        { label: '名称', value: '1' },
        { label: '系统', value: '2' },
        { label: '版本', value: '3' },
        { label: '格式', value: '4' },
        { label: '容量', value: '5' },
        { label: '项目', value: '6' },
        { label: '状态', value: '7' }
      ],
      tableList: [
        { name: 11222 },
        { name: 11222 },
        { name: 11222 },
        { name: 11222 },
        { name: 11222 }
      ]
    }
  },
  computed: {
    showedHeaderList() {
      return this.headerList.filter(item => this.showList.includes(item.value))
    }
  },
  methods: {
    search() {
      alert(1)
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
