<template>
  <div>
    <fast-color
      v-model="color"
      @change="changeEvent"
      @active-change="activeChange"
    />
    <p>{{ color }}</p>
    <p />
    <button @click="_doChangeValue">
      测试响应式
    </button>
  </div>
</template>

<script>
import FastColor from '../common/form/tools/color.js'

export default {
  components: {
    FastColor
  },
  data () {
    return {
      color: '#68BE8E'
    }
  },
  mounted () {},
  methods: {
    _doChangeValue () {
      this.color = '#EB4D25'
    },
    changeEvent (value) {
      console.info('change：', value);
    },
    activeChange (value) {
      console.info('active-change', value);
    }
  }
}
</script>

<style></style>
