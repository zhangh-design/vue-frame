/**
 * 工具栏
 * 默认位于查询栏下方
 */
const FastTBar = {
  inject: ['getFastGrid'],
  render (h) {
    return h(
      'div',
      {
        style: 'height: 100%;'
      },
      [this.$slots.default, this.$scopedSlots.tbarScope()]
    )
  }
}
export default FastTBar
