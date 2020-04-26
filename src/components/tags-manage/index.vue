<!-- 整站tags标签组件, v-model 绑定同select，其他数据都是整站通用，不用考虑 -->

<template lang="html">
  <div class="tag-manage-components">
    <el-select
      :value="value"
      multiple
      collapse-tags
      @change="changeSelect"
      class="no-select-header"
      style="margin-left: 20px;width: 100px;"
      placeholder="请选择">
      <template slot="prefix">
        <el-button type="primary">
          <i class="iconfont">&#xe60b;</i>
          标签
        </el-button>
      </template>
      <el-option v-for="item in tagList" :key="item.value" :value="item.value" :label="item.name">
        <span :style="{ background: item.color, padding: '4px 10px', borderRadius: '4px', color: '#fff' }">{{ item.name }}</span>
      </el-option>
      <p class="select-slot">
        <el-button @click="createTag">创建标签</el-button>
      </p>
      <p class="select-slot">
        <el-button>管理标签</el-button>
      </p>
    </el-select>
    <!-- 创建tags弹窗 -->
    <el-dialog
      title="创建标签"
      :visible.sync="tagsVisible"
      :append-to-body="true"
      width="600px"
      :before-close="handleClose">
      <div class="dialog-body">
        <el-form :model="formData" label-width="100px">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="formData.name" class="input-width-2"></el-input>
          </el-form-item>
          <el-form-item label="颜色：" prop="name">
            <div style="display: flex;">
              <el-input disabled v-model="formData.color" class="input-width-2"></el-input>
              <el-color-picker v-model="formData.color"></el-color-picker>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tagList: [{
          name: 'test',
          color: 'red',
          value: '1'
        },
        {
          name: 'test1',
          color: 'green',
          value: '2'
        }
      ],
      formData: {
        name: '',
        color: ''
      },
      tagsVisible: false
    }
  },
  methods: {
    changeSelect(item) {
      this.$emit('input', item)
    },
    createTag() {
      this.tagsVisible = true
    },
    handleClose() {
      this.tagsVisible = false
      this.formData = {
        name: '',
        color: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-manage-components {
  display: inline-block;
}
</style>
