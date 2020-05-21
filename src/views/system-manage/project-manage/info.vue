<template lang="html">
  <div class="project-info-container">
    <el-card class="mgb20" shadow="never" v-loading="loading">
      <el-row>
        <el-form label-width="120px">
          <el-col :span="12">
            <el-form-item label="项目名称：">
              {{ projectInfo.name }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目描述：">
              {{ projectInfo.desc || '暂无' }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间：">
              {{ projectInfo.createAt }}
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>

    <el-card class="mgb20" shadow="never" v-loading="loading">
      <el-row v-if="quotaList.length">
        <el-col :span="12" v-for="item in quotaList" :key="item.id" style="height: 70px;">
          <el-form
            label-width="130px"
            @submit.native.prevent>
            <el-form-item :label="item.resoureName + '：'">
              <div v-if="!item.isEdit">
                {{ item.used }} / {{ item.limit }}
                <el-button style="margin-left: 20px;" type="text" @click="editQuota(item)">编辑</el-button>
              </div>
              <div v-else>
                <el-input-number v-model="item.tempLimit" step-strictly controls-position="right" :min="item.tempUsed"></el-input-number>
                <el-button :loading="item.loading" :disabled="item.loading" type="primary" size="mini" @click="submit(item)">保存</el-button>
                <el-button :disabled="item.loading" type="ghost" size="mini" @click="cancel(item)">取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row v-else class="no-quota">
        暂无配额信息
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getProjectInfo, getProjectQuota, updateQuota } from '@/api/system-manage'
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      'storeQuota': 'quotaList',
      'curProjectInfo': 'curProjectInfo'
    })
  },
  data() {
    return {
      projectInfo: {},
      quotaList: [],
      loading: false
    }
  },
  created() {
    this.projectInit()
  },
  methods: {
    ...mapMutations([
      'SET_QUOTA_LIST'
    ]),
    editQuota(item) {
      item.tempLimit = Number(item.limit)
      item.tempUsed = Number(item.used)
      item.isEdit = true
    },
    cancel(item) {
      item.isEdit = false
    },
    submit(item) {
      item.loading = true
      const data = { // 组织需要提交的数据
        projectUuid: this.projectInfo.uuid,
        quotaList: [{
          quotaCode: item.resoure,
          quotaVaule: item.tempLimit
        }]
      }
      updateQuota(data).then(res => {
        if (res.code === 200) {
          item.limit = item.tempLimit // 保存成功后更新页面
          this.$message.success('保存成功')
          // 如果全局的项目为当前更新项目，需更新vuex里的数据
          if (this.curProjectInfo.id == this.$route.query.id) {
            this.SET_QUOTA_LIST(this.quotaList)
          }
        }
        item.isEdit = false
        item.loading = false
      })
    },
    async projectInit() {
      this.loading = true
      this.projectInfo = (await getProjectInfo(this.$route.query.id)).result
      let { result } = await getProjectQuota(this.projectInfo.uuid)
      result.map(item => {
        item.isEdit = false
        item.loading = false
        item.tempUsed = ''
        item.tempLimit = ''
      })
      this.quotaList = result
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.project-info-container {
  padding: 20px;
  .no-quota{
    line-height: 200px;
    font-size: 16px;
    color: #999;
    text-align: center;
  }
}
</style>
