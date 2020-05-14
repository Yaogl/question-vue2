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
        filterable
        :filter-method="filterMethod"
        :render-content="renderFunc"
        @change="handleChange"
        :data="allUserList">
      </el-transfer>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { setRoleUser } from '@/api/system-manage'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    roleId: {
      default: ''
    },
    userIds: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        this.userArr = []
      } else {
        this.$nextTick(() => {
          this.userArr = this.userIds
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'allUserList'
    ])
  },
  data() {
    return {
      userArr: [],
      renderFunc(h, option) {
        return <span>{ option.index } - { option.uname }</span>
      },
      filterMethod(query, item) {
        return item.uname.indexOf(query) > -1;
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
      setRoleUser(this.roleId, this.userArr ).then(res => {
        this.$message.success('分配成功')
        setTimeout(() => {
          this.handleClose()
        }, 0)
      })
    }
  }
}
</script>

<style lang="scss">

</style>
