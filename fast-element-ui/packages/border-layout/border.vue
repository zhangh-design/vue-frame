<template>
  <el-container
    class="fast-border-container"
    :style="{border: drawBorder}"
  >
    <el-header
      :height="northHeight"
      :style="{padding}"
    >
      <slot name="north" />
    </el-header>
    <el-container :style="{height: this.middleHeight}">
      <el-aside
        :width="westWidth"
        :style="{padding}"
      >
        <slot name="west" />
      </el-aside>
      <el-main
        :style="{padding}"
      >
        <slot name="center" />
      </el-main>
      <el-aside
        :width="eastWidth"
        :style="{padding}"
      >
        <slot name="east" />
      </el-aside>
    </el-container>
    <el-footer
      :height="southHeight"
      :style="{padding}"
    >
      <slot name="south" />
    </el-footer>
    <slot name="default" />
  </el-container>
</template>

<script>
export default {
  name: 'FastBorderLayout',
  props: {
    border: {
      type: Boolean,
      default: false
    },
    borderStyle: {
      type: String,
      default: '1px solid #81ADF7'
    },
    padding: {
      type: String,
      default: '0px'
    },
    northHeight: {
      type: String,
      default: 'auto'
    },
    westWidth: {
      type: String,
      default: '0px'
    },
    eastWidth: {
      type: String,
      default: '0px'
    },
    southHeight: {
      type: String,
      default: 'auto'
    }
  },
  data () {
    this.desc = 'border布局，将容器分为五个区域：east、south、west、north、center'
    return {
      middleHeight: '100%'
    }
  },
  created () {
    setTimeout(() => {
      var southHeight = 0
      var northHeight = 0
      if (this.$slots.south) {
        southHeight = this.$slots.south[0].elm.offsetHeight
      }
      if (this.$slots.north) {
        northHeight = this.$slots.north[0].elm.offsetHeight
      }
      this.middleHeight = `${this.$el.offsetHeight - southHeight - northHeight}px`
    })
  },
  computed: {
    drawBorder () {
      return this.border ? this.borderStyle : null
    }
  }
}
</script>
