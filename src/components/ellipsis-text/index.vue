<!-- 超出限制字体显示省略号 -->
<template lang="html">
  <el-tooltip :disabled="computeLength < displayLength" :placement="placement">
    <span>{{ computedText }}</span>
    <div slot="content">
      {{ textContent }}
    </div>
  </el-tooltip>
</template>

<script>
import { getTextLen } from '@/utils/formHelper'

export default {
  props: {
    // 文字出现位置，同element
    placement: {
      type: String,
      default: 'top'
    },
    // 文字内容
    textContent: {
      type: String,
      default: ''
    },
    // 显示文字字节长度，默认为10个字节
    displayLength: {
      type: Number,
      default: 10
    },

    // 提示框大小
    size: {
      type: String,
      default: 'normal'
    }
  },
  computed: {
    computedText () {
      let text = this.textContent
      const length = getTextLen(text)
      const ccReg = /[\u4e00-\u9fa5]/
      let len = 0
      let finalLen = 0
      if (length > this.displayLength) {
        for (let i = 0; i < text.length; i++) {
          if (ccReg.test(text[i])) {
            len += 2
          } else {
            len++
          }
          if (Math.floor(len) >= this.displayLength) {
            finalLen = i
            break
          }
        }
        return text.substring(0, finalLen) + '...'
      }
      return text
    },
    computeLength () {
      return getTextLen(this.textContent)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
