<template>
  <div>
      <fast-text-area
        :value="value"
        :rows="rows"
        :listeners="listeners"
        @focus="focusEvent"
      />
  </div>
</template>

<script>
import FastTextArea from '../common/form/tools/text-area.js'

export default {
  components: {
    FastTextArea
  },
  data () {
    this.listeners = {
      inputChange: this.inputChangeHandler
    }
    return {
      value: `hello input-${Math.ceil(Math.random() * 1000)}`,
      rows: 5
    }
  },
  methods: {
    inputChangeHandler (value) {
      // v-mode 事件
      console.info('textArea 值发生改变时触发：', value)
    },
    focusEvent (event) {
      console.info(event);
    }
  }
}
</script>

<style></style>
