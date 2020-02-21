<template>
  <div>
		<!--change和checkboxChange两个事件都是选中项发生改变时触发可以只选一个接听，或者使用v-model的形式-->
    <fast-checkbox
      :max="checkBox.max"
      :value="checkBox.value"
      :options="checkBox.options"
			@change="changeEvent"
      @checkboxChange="checkboxChangeEvent"
      v-if="true"
    />
		<!--v-model-->
    <fast-checkbox
      v-model="checkBox.value"
      :options="checkBox.options"
      v-if="false"
    />
    <button @click="bbb">
      测试响应式
    </button>
    <button @click="ccc">
      获取值
    </button>
  </div>
</template>

<script>
import FastCheckbox from '../common/form/tools/checkbox.js'

export default {
  components: {
    FastCheckbox
  },
  data () {
    return {
      checkBox: {
				// 默认选中项
				value: ['02', '01'],
				// 最多勾选两个
				max: 2,
				// el-checkbox 选项
        options: [
          { label: '爬山', value: '01' },
          { label: '美食', value: '02', disabled: false },
          { label: '骑车', value: '03' }
        ]
      }
    }
  },
  mounted () {},
  methods: {
    changeEvent (value) {
      console.info(value);
    },
    bbb () {
      this.checkBox.value = ['01', '03']
    },
    ccc () {
      console.info(this.checkBox.value);
    },
    checkboxChangeEvent (value) {
      this.checkBox.value = value
    }
  }
}
</script>

<style></style>
