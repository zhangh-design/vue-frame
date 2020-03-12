<template>
  <div>
    <!--如果不是 v-model 那么一定要将 switchChange 事件传递进去，并且在 methods 中手动赋值，手动实现 v-model 的功能-->
    <!-- <fast-switch
      :value="value1"
      @switchChange="switchChangeEvent"
      @change="changeEvent"
    /> -->
    <fast-switch
      v-model="value1"
      :ct-style="ctStyle"
      :ct-cls="ctCls"
      :listeners="listeners"
    />
    <p>{{ value1 }}</p>
    <p />
    <button @click="_doChangeValue">
      测试响应式
    </button>
  </div>
</template>

<script>
import FastSwitch from '../common/form/tools/switch.js'

export default {
  components: {
    FastSwitch
  },
  data () {
    this.listeners = {
      change: this.changeEvent
    }
    this.ctCls = {
      'fats-switch': true
    }
    this.ctStyle = {
      'background-color': 'red'
    }
    return {
      value1: true
    }
  },
  mounted () {},
  methods: {
    _doChangeValue () {
      this.value1 = !this.value1
    },
    switchChangeEvent (value) {
      this.value1 = value
    },
    changeEvent (value) {
      console.info('change：', value);
    }
  }
}
</script>

<style>
  .fats-switch{
    border: 1px solid yellow;
  }
</style>
