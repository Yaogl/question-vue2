<template lang="html">
  <el-dialog
    :visible.sync="visible"
    width="700px"
    :before-close="handleClose">
    <div slot="title">
      <span class="title">分配用户(点击确定保存)</span>
    </div>
    <div class="body">
      <el-transfer v-model="userArr"
        :titles="['待选择用户', '已配置用户']"
        :render-content="renderFunc"
        filterable
        :filter-method="filterMethod"
        @change="handleChange"
        :data="userData">
      </el-transfer>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'add-tree-node',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        Object.assign(this.$data, this.$options.data())
      }
    }
  },
  data() {
    return {
      userArr: [],
      userData: [
        { key: 1, value: '张三' },
        { key: 2, value: '李四' },
        { key: 3, value: '王五' },
        { key: 4, value: '马六' }
      ],
      renderFunc(h, option) {
        return <span>{ option.key } - { option.value }</span>
      },
      filterMethod(query, item) {
        return item.value.indexOf(query) > -1;
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    handleChange(value, direction, movedKeys) {
      return false
      console.log(value, direction, movedKeys);
    },
    confirm() {
      this.$emit('confirm', this.formData)
      setTimeout(() => {
        this.handleClose()
      }, 0)
    }
  }
}
</script>

<style lang="scss">

</style>
