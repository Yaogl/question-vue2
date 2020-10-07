<template lang="html">
  <div class="question-create-container" v-loading="loading">
    <el-form ref="form" :model="formData" label-width="300px" :rules="rules">
        <el-form-item label="题目内容：" prop="content">
            <el-input v-model.trim="formData.content" type="textarea" style="width: 400px;" :autosize="{ minRows: 3, maxRows: 8}"></el-input>
        </el-form-item>
        <el-form-item label="题目答案：" prop="answers">
            <div v-for="(item, index) in formData.answers" :key="index">
                {{ item.title }}：
                <el-input v-model.trim="item.content" style="width: 200px;"></el-input>
                <i @click="addAns" class="el-icon-circle-plus-outline" style="font-size: 20px;cursor: pointer;color: #409EFF;"></i>
                <i @click="delAns(index)" class="el-icon-remove-outline" style="font-size: 20px;cursor: pointer;color: #409EFF;" v-if="formData.answers.length > 1"></i>
            </div>
        </el-form-item>
        <el-form-item label="正确答案：" prop="rigtkeys">
            <el-select placeholder="请选择正确答案" multiple v-model="formData.rightkeys">
                <el-option v-for="(item, index) in formData.answers" :key="index" :value="item.title">{{ item.content }}</el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button :loading="btnLoading" type="primary" @click="createQuestion">{{ $route.query.id ? '立即更新' : '立即创建' }}</el-button>
            <el-button @click="backToList">取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getList, questionAdd, getDetail } from '@/api/question'

const toChart = (num) => {
    return  String.fromCharCode(64 + parseInt(num))
}

export default {
  data() {
    return {
      formData: {
          content: '',
          answers: [{
              content: '',
              title: 'A'
          }],
          rigtkeys: []
      },
      rules: {
          content: [
              { required: true, message: '请输入题目内容', trigger: 'blur' }
          ],
          answers: [
              { validator: this.checkAns, trigger: 'blur' }
          ],
          rigtkeys: [
              { validator: this.checkRight, trigger: 'blur' }
          ]
      },
      loading: false,
      btnLoading: false
    }
  },
  created () {
    if (this.$route.query.id) {
      this.loading = true
      getDetail(this.$route.query.id).then(res => {
        this.formData.answers = JSON.parse(res.data.answers)
        this.formData.rightkeys = JSON.parse(res.data.rightkeys)
        this.formData.content = res.data.content
        this.loading = false
      })
    }
  },
  methods: {
      createQuestion() {
          this.$refs['form'].validate(valid => {
              console.log(valid);
              if (valid) {
                  this.btnLoading = true
                  questionAdd(this.formData, this.$route.query.id).then(res => {
                    if (res.code === 0) {
                      this.backToList()
                    } 
                    this.btnLoading = false
                  })
              }
          })
      },
      addAns() {
          this.formData.answers.push({
              content: ''
          })
          this.formData.answers.map((item, index) => {
              item.title = toChart(index + 1)
          })
          this.formData.rightkeys = []
      },
      delAns(index) {
          this.formData.answers.splice(index, 1)
          this.formData.answers.map((item, index) => {
              item.title = toChart(index + 1)
          })
          this.formData.rightkeys = []
      },
      backToList() {
        this.$router.push('/dashboard')
      },
      checkAns (rule, value, callback) {
        for (let index = 0; index < this.formData.answers.length; index++) {
            if (!this.formData.answers[index].content) {
                return callback(new Error('请输入答案内容'))
            }
        }
        callback()
      },
      checkRight(rule, value, callback) {
        if (this.formData.rightkeys && this.formData.rightkeys.length) {
          return callback()
        }
        return callback(new Error('请选择正确答案'))
      }
  }
}
</script>

<style lang="scss" scoped>
.question-create-container{
  padding: 20px;
  padding-top: 50px;
}
</style>
