<template>
  <div>
    <!--change和radioChange两个事件都是选中项发生改变时触发可以只选一个接听，或者使用v-model的形式-->
    <fast-radio
      :value="value"
      :options="options"
      :ct-style="ctStyle"
      :ct-cls="ctCls"
      @change="changeEvent"
      @radioChange="radioChangeEvent"
      v-if="true"
    />
    <!--v-model-->
    <fast-radio
      v-model="value"
      :options="options"
      :ct-style="ctStyle"
      :ct-cls="ctCls"
      v-if="false"
    />
    <br><br>
    <button @click="bbb">
      测试响应式
    </button>
    &nbsp;&nbsp;
    <button @click="ccc">
      获取值
    </button>
  </div>
</template>

<script>
import FastRadio from '../common/form/tools/radio.js'

export default {
  components: {
    FastRadio
  },
  data () {
    this.listeners = {
      change: (value) => {
        // 触发
        console.info(value);
      }
    }
    this.ctStyle = {
      'background-color': 'red'
    }
    this.ctCls = {
      'fast-radio': true
    }
    return {
      value: '02',
      options: [
        { label: '室内', value: '01' },
        { label: '室外', value: '02', disabled: false }
      ]
    }
  },
  mounted () {},
  methods: {
    changeEvent (value) {
      // 不触发
      // 会触发 listeners 对象中的 change 函数
    },
    radioChangeEvent (value) {
      console.info(value);
      this.value = value
    },
    bbb () {
      this.value = '01'
    },
    ccc () {
      console.info(this.value);
    }
  }
}
</script>

<style>
.fast-radio{
  border: 1px solid yellow;
}
</style>
