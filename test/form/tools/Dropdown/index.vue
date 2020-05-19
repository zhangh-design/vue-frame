<template>
  <div>
    <fast-dropdown
      :title="title"
      :options="options"
      size="medium"
      :ct-style="ctStyle"
      :ct-cls="ctCls"
      :is-render="isRender"
      :is-display="isDisplay"
      :type="type"
      :split-button="splitButton"
      trigger="click"
      @click="handleClick"
      @command="handleCommand"
      @visible-change="handleVisibleChange"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      ctStyle: {
        fontSize: '30px'
      },
      ctCls: {
        isActive: true,
        hasError: false
      },
      isRender: true,
      isDisplay: true,
      type: 'primary',
      splitButton: true,
      title: '下拉菜单',
      options: [
        { text: '黄金糕', class: 'bbbb', command: '01' },
        { text: '狮子头' },
        { text: '螺蛳粉' },
        { text: '双皮奶', disabled: true },
        { text: '蚵仔煎', divided: true }
      ]
    }
  },
  methods: {
    handleClick (event) {
      console.info('click', event)
    },
    handleCommand (command) {
      console.info('command', command);
    },
    handleVisibleChange (result) {
      console.info('visible-change ', result);
    }
  }
}
</script>

<style></style>
