<template>
<div :class="['v-easy-input', 'input', 'input-ip']" :style="{ 'max-width': maxWidth + 'px', 'width': maxWidth + 'px', height: '36px'}">
  <ul ref="box" :class="disabled ? 'disabled' : ''">
    <li v-for="(item, index) in vHtml" :key="index" :class="format">
      <input type="text"
        :maxlength="maxlength[index]"
        :value="result[index]"
        :readonly="readonly"
        :class="errorClass[index]"
        :disabled="disabled"
        v-bind="$attrs"
        @keydown="keyDown(index, $event)"
        @keyup="handleKeyUp(index, $event)"
        @input="handleInput(index, $event)"
        @focus="handleFocus(index, $event)"
        @blur="handelBlur(index, $event)" />
      <span v-if="index !== (vHtml.length - 1)">{{ splitChar }}</span>
    </li>
  </ul>
  <transition name="v-easy-error">
    <div class="error inspection" v-show="conformity">{{ msg }}</div>
  </transition>
</div>
</template>

<script>
import {
  _initArray
} from './ArrayExtend'
import merge from './merge'
export default {
  model: {
    event: 'changeResult'
  },
  name: 'VeIp',
  mixins: [merge],
  data() {
    return {
      maxlength: _initArray(4, '3'),
    }
  },

  props: {
    maxWidth: {
      type: String,
      default: '200px'
    },
    width: [String],
    disabled: {
      type: [Boolean, String],
      default: false
    },
    spliceChar: {
      type: String,
      default: '.'
    },
    readonly: {
      type: [Boolean, String],
      default: false
    },
    message: {
      type: String
    },
    value: [String, Array],
    format: {
      type: String,
      default: 'ipv4'
    }
  },

  watch: {
    result(val) {
      let statusSuccess = true;
      for (let i = 0; i < 4; i++) {
        if (typeof val[i] === 'undefined') {
          statusSuccess = false
        }
      }
      if (val.every(item => item === '')) {
        this.conformity = false
        this.errorClass = [] // 如果数据全部为空，那么对错误信息进行隐藏
      }
      if (statusSuccess && val.length > 3) this.$emit('status', this.isIpv4Reg(val.join('.')))
    }
  },

  computed: {
    msg() {
      return this.message || '请输入正确的ip地址'
    },
    splitChar() {
      if (this.spliceChar !== '.') {
        return this.spliceChar
      }
      return this.format === 'ipv4' ? '.' : ':'
    },
    vHtml() {
      let len = [];
      if (this.format === 'ipv4') {
        this.maxlength = _initArray(4, '3')
        len = _initArray(4);
      } else if (this.format === 'ipv6') {
        this.maxlength = _initArray(8, '4')
        len = _initArray(8);
      }
      return len
    }
  },

  methods: {
    handleInput(index, $event) {

      this.setCurrentValue($event.target.value, index)

      this.format === 'ipv4' ? this.isIpv4(index) : this.isIpv6(index, $event)

      if ($event.target.value == 0) {
        this.maxlength[index] = '1'
      } else {
        this.maxlength[index] = this.format === 'ipv4' ? '3' : '4'
      }

      // 自动对焦
      if (!this.conformity && this.result[index] && this.result[index].length === Number(this.maxlength[index]) && index < (this.vHtml.length - 1)) {
        this.$refs.box.getElementsByTagName('input')[index + 1].focus()
      }


      this.$emit('input', {
        $event,
        index
      })

    },

    isIpv4(index) {
      // 正则检验

      if (this.result[index] && this.result[index].length > 3 && index === 3) {
        this.result[index] = this.result[index].substring(4, 1)
      }

      if (this.result[index] > 255) {
        this.errorClass[index] = 'red'
        this.conformity = true
        this.$emit('error', this.result)
      } else {
        this.errorClass[index] = 'none'
        this.conformity = false;
        this.errorClass.forEach(item => {
          if (item === 'red') {
            this.conformity = true;
          }
        })
      }
    },

    isIpv4Reg(ip) {
      let regexp = /^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-4][0-9])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/;
      return regexp.test(ip)
    },

    isIpv6(index, $event) {
      let regexp = /^[0-9a-fA-F]{0,}$/g;
      if (!regexp.test(this.result[index])) {
        this.result[index] = this.result[index] && this.result[index].substring(0, this.result[index].length - 1);
      }
    },

    handelBlur(index, $event) {
      if (index === 7 && this.format === 'ipv6') {
        let regexp =
          /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
        if (regexp.test(this.result.join(':'))) {
          this.conformity = false
        } else {
          this.conformity = true
          this.$emit('error', this.result)
        }
      }
      if (this.format === 'ipv4' && index === 3) {
        let isCheck = this.result.length > 3 && this.result.every(item => item !== '');
        if (isCheck && !this.isIpv4Reg(this.result.join('.'))) {
          this.conformity = true;
        }
      }
      this.$emit('blur', {
        $event,
        index
      })
    },

    keyDown(index, $event) {
      if ($event.keyCode === 8 && this.currentIndex !== 0 && (!this.result[this.currentIndex] || this.result[this.currentIndex].length === 0)) {
        this.$refs.box.getElementsByTagName('input')[this.currentIndex - 1].focus()
      }
      if ($event.keyCode === 110 && index !== 3 && $event.target.value !== '') {
        this.$refs.box.getElementsByTagName('input')[this.currentIndex + 1].focus()
      }
      let obj = this.$refs.box.getElementsByTagName('input'),
        current = this.getCursortPosition(obj[index]),
        len = $event.target.value.length
      if ($event.keyCode === 39 && current >= len && index !== 3) { // 往后
        obj[index + 1].focus()
        setTimeout(() => {
          this.setCaretPosition(obj[index + 1], 0)
        }, 0)
      }
      if ($event.keyCode === 37 && current === 0 && index !== 0) { // 往前
        this.$refs.box.getElementsByTagName('input')[index - 1].focus();
        setTimeout(() => {
          this.setCaretPosition(obj[index - 1], this.result[index - 1] ? this.result[index - 1].length : 0)
        }, 0)
      }
      this.$emit('keyDown', {
        $event,
        index
      })
    }
  }
}
</script>

<style scoped lang="scss">
.v-easy-input {
  height: 36px;
  padding: 0 4px;
  display: inline-block;
  color: #909399;
  ul {
    min-width: 138px;
    min-height: 34px;
    margin: 0;
    padding: 0;
    height: 80%;
    border: 1px solid #c0c4cc;
    border-radius: 4px;
    .ipv6 {
      width: 62px;
    }
    li {
      position: relative;
      list-style-type: none;
      float: left;
      height: 100%;
      vertical-align: middle;
      width: calc(24% - 3px);
      overflow: visible;
      margin-right: 4px;
      input {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        color: #606266;
        margin: auto;
        text-align: center;
        width: 100%;
        height: 64%;
        border: none;
      }
      input:focus {
        outline: none;
      }
      input:disabled {
        background-color: #f5f7fa;
        border-color: #e4e7ed;
        color: #c0c4cc;
        cursor: not-allowed;
      }
      span {
        position: absolute;
        bottom: 0;
        right: -4px;
        color: #999;
        user-select: none;
        font-weight: 700;
      }
      .none {
        color: #606266;
      }
      .red {
        color: #f56c6c;
      }
    }
    li:last-child {
      margin-right: 0;
    }
  }
  .inspection {
    color: #f56c6c;
    font-size: 12px;
    text-align: left;
    transition: all 0.3s;
  }
}
.disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}
.v-easy-error-enter,
.v-easy-error-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
