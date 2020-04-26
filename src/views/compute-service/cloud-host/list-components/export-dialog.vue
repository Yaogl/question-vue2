<template lang="html">
  <el-dialog
    title="导出数据"
    :visible.sync="visible"
    custom-class="cloud-host-export"
    width="800px"
    :before-close="handleClose">
    <div class="dialog-body">
      <div class="top-row">
        <div class="mgb20">
          <p class="title">导出范围：</p>
          <el-radio-group v-model="formData.range">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="some">导出当前条件查询记录</el-radio-button>
          </el-radio-group>
        </div>

        <div class="">
          <p class="title">导出数据列：</p>
          <el-radio v-model="formData.clounm" label="all">全部</el-radio>
        </div>
      </div>
      <div class="">
        {{ checkList }}
        <el-checkbox-group v-model="checkList">
          <el-row>
            <el-col style="margin: 10px 0;" :span="6" v-for="(item, index) in exportList" :key="index">
              <el-checkbox :label="item.id">
                <EllipsisText :textContent="item.name" :displayLength="14" />
              </el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import EllipsisText from '@/components/ellipsis-text'

export default {
  name: 'export-dialog',
  components: {
    EllipsisText
  },
  watch: {
    visible(val) {
      if (!val) {
        Object.assign(this.$data, this.$options.data())
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    filter: { // 当前列表查询条件
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData: {
        range: 'all', // 范围
        clounm: 'all',
        name: '',
        desc: '',
        region: '',
        capacity: ''
      },
      checkList: [],
      exportList: [
        { name: '名称圣诞节大家大胜靠德', id: 1 },
        { name: '弹性ip', id: 2 },
        { name: '状态', id: 3 },
        { name: '区域', id: 4 },
        { name: '名称', id: 5 },
        { name: '名称', id: 6 },
        { name: '名称', id: 7 },
        { name: '名称', id: 8 },
        { name: '名称', id: 9 },
        { name: '名称', id: 10 },
        { name: '名称', id: 11 },
        { name: '名称', id: 12 },
        { name: '名称', id: 13 },
        { name: '名称', id: 14 },
        { name: '名称', id: 15 },
        { name: '名称', id: 16 },
      ]
    }
  },
  created() {
    console.log(process.env, 8338);
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss">
// 自定义class
.cloud-host-export{
  .top-row{
    border-top: 2px solid #ccc;
    border-bottom: 2px solid #ccc;
    padding: 20px 0;
    .title{
      padding-bottom: 20px;
    }
  }
}
</style>
