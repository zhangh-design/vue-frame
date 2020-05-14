<template>
  <div class="fast-double-wing-container">
    <div
      class="view"
      :style="{border: border}"
    >
      <div
        class="le"
        :style="{'border-right': border}"
      >
        <slot name="left">
        <!--子列-->
        </slot>
      </div>
      <div class="mi">
        <slot name="middle">
        <!--主列-->
        </slot>
      </div>
      <div
        class="ri"
        :style="{'border-left': border}"
      >
        <slot name="right">
        <!--附加列-->
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FastDoubleWingLayout',
  props: {
    border: {
      type: String,
      default: null
    }
  },
  data () {
    this.desc = '双飞翼布局，左右两列需要设置宽度值，高度自适应父容器'
    return {}
  }
}
</script>
