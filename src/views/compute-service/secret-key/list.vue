<template lang="html">
  <div class="secret-key-list-container">
    <el-row>
      <el-col :span="12">
        <el-button type="primary">
          <i class="el-icon-refresh"></i>
        </el-button>
        <el-button type="primary" @click="createSecret('add')">创建秘钥对</el-button>
        <el-button type="primary" @click="createSecret('export')">导入秘钥对</el-button>
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
        :ref="tableRefs"
        :row-style="{height: '40px'}"
        :header-row-style="{height: '45px'}"
        :data="tableList"
        @select-all="changeSelect"
        @select="changeSelect"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55" />
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
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

    <create-secret-key :visible.sync="visible" :operate="operate" />
  </div>
</template>

<script>
import List from '@/components/list'
import CreateSecretKey from './components/create-secret-key.vue'

export default {
  extends: List,
  components: {
    CreateSecretKey
  },
  data() {
    return {
      pageList: [5, 10, 15, 20, 40, 100],
      createdSearch: false,
      query: {
        name: '',
        page: 1,
        size: 10
      },
      tableList: [
        { name: 11222 },
        { name: 11222 },
        { name: 11222 },
        { name: 11222 },
        { name: 11222 }
      ],
      visible: false,
      operate: ''
    }
  },
  methods: {
    search() {
      alert(1)
    },
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
