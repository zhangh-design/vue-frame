<template>
  <div>
    <fast-input-number
      ref="el-input-number-ref"
      v-model="value"
      :min="min"
      :size="size"
      @change="changeEvent"
    />
    <p>{{ value }}</p>
    <p />
    <button @click="_doChangeValue">
      测试响应式
    </button>&nbsp;&nbsp;
    <button @click="_focus">
      设置焦点
    </button>
  </div>
</template>

<script>
import FastInputNumber from '../common/form/tools/input-number.js'

export default {
  components: {
    FastInputNumber
  },
  data () {
    return {
      value: 10,
      min: 0,
      size: 'mini'
    }
  },
  mounted () {},
  methods: {
    changeEvent (value) {
      // 绑定值被改变时触发
      console.info(value)
    },
    _doChangeValue () {
      this.value = 2
    },
    _focus () {
      this.$refs['el-input-number-ref'].focus()
    }
  }
}
</script>

<style></style>
