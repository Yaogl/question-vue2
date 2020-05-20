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
      <el-row>
        <el-col :span="12" v-for="item in quotaList" :key="item.id" style="height: 70px;">
          <el-form
            label-width="120px"
            @submit.native.prevent>
            <el-form-item :label="item.resoureName + '：'">
              <div v-if="!item.isEdit">
                {{ item.used }} / {{ item.limit }}
                <el-button style="margin-left: 20px;" type="text" @click="editQuota(item)">编辑</el-button>
              </div>
              <div v-else>
                <el-input-number v-model="item.tempUsed" step-strictly controls-position="right" :min="0" :max="item.tempLimit"></el-input-number>
                <el-button :loading="item.loading" :disabled="item.loading" type="primary" size="mini" @click="submit(item)">保存</el-button>
                <el-button :disabled="item.loading" type="ghost" size="mini" @click="cancel(item)">取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {
  getProjectInfo,
  getProjectQuota,
  updateQuota
} from '@/api/system-manage'
export default {
  data() {
    return {
      projectInfo: {},
      quotaList: [
        {
          "createAt": "2020-05-19 17:31:50",
          "deleted": true,
          "deletedAt": 1589928186000,
          "id": 21,
          "limit": "2",
          "tempUsed": '',
          "tempLimit": '',
          "loading": false,
          "projectId": "787036cd-e837-42a1-90f2-8eae8f901e5e",
          "resoure": "10011001",
          "resoureName": "虚拟机个数",
          "updateAt": null,
          "isEdit": false,
          "used": "0"
        },
        {
          "createAt": "2020-05-19 17:31:50",
          "deleted": true,
          "deletedAt": 1589928186000,
          "id": 22,
          "isEdit": false,
          "tempUsed": '',
          "tempLimit": '',
          "limit": "4",
          "loading": false,
          "projectId": "787036cd-e837-42a1-90f2-8eae8f901e5e",
          "resoure": "10011002",
          "resoureName": "vcpu个数",
          "updateAt": "2020-05-19 17:37:38",
          "used": "3"
        },
        {
          "createAt": "2020-05-19 17:31:50",
          "deleted": true,
          "deletedAt": 1589928186000,
          "id": 24,
          "limit": "4",
          "isEdit": false,
          "loading": false,
          "tempUsed": '',
          "tempLimit": '',
          "projectId": "787036cd-e837-42a1-90f2-8eae8f901e5e",
          "resoure": "10011002",
          "resoureName": "快照个数",
          "updateAt": "2020-05-19 17:37:38",
          "used": "3"
        }
      ],
      loading: false
    }
  },
  created() {
    this.projectInit()
  },
  methods: {
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
      setTimeout(() => {
        item.isEdit = false
        item.loading = false
        item.used = item.tempUsed // 保存成功后更新页面
        this.$message.success('保存成功')
      }, 2000)
    },
    async projectInit() {
      this.loading = true
      this.projectInfo = (await getProjectInfo(this.$route.query.id)).result
      // this.quotaList = (await getProjectQuota(this.projectInfo.uuid)).result
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.project-info-container {
    padding: 20px;
}
</style>
