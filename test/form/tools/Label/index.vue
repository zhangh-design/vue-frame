<template>
  <div>
    <fast-label
      text="介绍"
      :html="html"
      :label-style="labelStyle"
      :is-render="isRender"
			@click="labelClickEvent"
      :listeners="listeners"
    />
  </div>
</template>

<script>
import FastLabel from '../common/form/tools/label.js'
export default {
  components: {
    FastLabel
  },
  data () {
    // listeners
    this.listeners = {
        click: (event)=>{
					// 如果传入了 listeners对象并且定义了 click 属性 这样 @click 传入的事件不会触发。
					console.info('click ',event);
				}
    }
    return {
      isRender: true,
      labelStyle: {
        color: '#24ABF2',
        'font-size': '14px'
      },
      // 如果同时配置了 text 属性，那么只会显示 html 传入的内容
      html: '<em>介绍</em>'
    }
  },
  methods: {
    labelClickEvent (event) {
      console.info('label Click ', event);
    }
  }
}
</script>

<style></style>