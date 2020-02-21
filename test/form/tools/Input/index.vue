<template>
  <div>
    <p>text-field 组件</p>
    <fast-input ref="el-input-ref" :isRender="isRender" :value="value" label="用户名" placeholder="请输入用户名" clearable :slotNode="slotNode" :listeners="listeners">
      <!-- slot 可以使用 template 定义，也可以使用 slotNode 属性传递-->
      <!-- 如果 template 节点和 slotNode 属性都定义了同一个 slot 那么以 template 定义的起效 -->
      <!-- 如果 template 节点 和 slotNode 属性都没有定义，那么使用 label 属性作为 v-slot:prepend -->
    </fast-input>
    <br/>
    <p>Input Methods</p>
    <button @click="_focus">设置焦点</button>&nbsp;
    <button @click="_blur">失去焦点</button>&nbsp;
    <button @click="_select">选中文字</button>&nbsp;
    <p>value值响应式</p>
    <button @click="_updateValue">value 属性响应式</button>
  </div>
</template>

<script>
export default {
  components: {
    fastInput: () => import('../common/form/tools/text-input.js')
  },
  data () {
    // slots
    this.slotNode = {
      prepend: {
        template: '<a>名称：</a>'
      }
      /* append: {
        template: '<a>后缀</a>'
      } */
    }
    // listeners
    this.listeners = {
      focus: this.focusHandler,
      blur: this.blurHandler,
      change: this.changeHandler,
      clear: this.clearHandler,
      // v-model 由 listeners 对象传递 inputChange 属性
      inputChange: this.inputChangeHandler
    }
    return {
      value: 'hello input',
      // v-if 在对象写法下的实现
      isRender: true
      // v-show 在对象写法下的实现
      // isDisplay: true
    }
  },
  methods: {
    _updateValue () {
      this.value = 'hello fastInput'
    },
    focusHandler (event) {
      console.info('获取焦点事件触发：', event)
    },
    blurHandler (event) {
      console.info('失去焦点时触发：', event)
    },
    changeHandler (value) {
      console.info('仅在输入框失去焦点或用户按下回车时触发：', value)
    },
    clearHandler () {
      console.info('在点击由 clearable 属性生成的清空按钮时触发')
    },
    inputChangeHandler (value) {
      // v-mode 事件
			console.info('input 值发生改变时触发：', value)
			this.value=value
    },
    _focus () {
      this.$refs['el-input-ref'].focus()
    },
    _blur () {
      this.$refs['el-input-ref'].blur()
    },
    _select () {
      this.$refs['el-input-ref'].select()
    }
  }
}
</script>

<style></style>
