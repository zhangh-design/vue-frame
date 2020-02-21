<template>
  <div>
    <fast-button
      text="提交"
      :slot-node="slotNode"
      type="primary"
      icon="el-icon-edit"
      icon-position="right"
      :loading="loading"
      :is-display="isDisplay"
      :listeners="listeners"
      @click="clickHandler"
    >
		  <!-- 配置插槽的话 text和slot-node都将失效 -->
      <template v-slot:default>
        升级
      </template>
    </fast-button>
  </div>
</template>

<script>
import FastButton from '../common/form/tools/button.js'

export default {
  components: {
    FastButton
  },
  data () {
		// 事件 （配置了 listeners 对象那模板中的@click=''事件将失效）
    this.listeners = {
      click: () => {
        console.info('bb', event);
      }
		}
		// 按钮文件内容，可以传递 html 结构的字符
    this.slotNode = {
      template: '<em>取消</em>'
    }
    return {
      isDisplay: true,
      loading: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.loading = false
    }, 3000);
  },
  methods: {
    clickHandler (event) {
      console.info('aa', event);
    }
  }
}
</script>

<style></style>
