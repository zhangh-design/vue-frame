<template>
  <div>
    <fast-date-picker
      :value="value"
      :editable="editable"
      :clearable="clearable"
      :size="size"
      :placeholder="placeholder"
      :type="type"
      :align="align"
      :is-render="isRender"
			@dateChange="dateChangeEvent"
			:listeners="listeners"
    />
		<!-- <fast-date-picker v-model="value" /> -->
  </div>
</template>

<script>
import FastDatePicker from '../common/form/tools/date-picker.js'

export default {
  components: {
    FastDatePicker
	},
	/* watch: {
    value (value, oldValue) {
			// 第二个示例 v-model的演示
      console.info('value=', value, 'oldValue=', oldValue);
    }
  }, */
  data() {
    this.listeners = {
			focus: (event) => {
        console.info('focus ', event);
      },
      change: (value) => {
        console.info('change ', value)
      },
      dateChange: (value) => {
				// dateChangeEvent 方法将不会触发，会触发到这里
        console.info('v-model ', value)
      }
    }
    return {
      	value: new Date(),
        editable: false,
        clearable: false,
        size: 'mini',
        placeholder: '请选择',
        type: 'date',
        align: 'right',
        isRender: true
    }
  },
  methods: {
    dateChangeEvent (value) {
      console.info(value);
		}
  }
};
</script>

<style></style>
