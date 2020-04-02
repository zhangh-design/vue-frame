<template>
  <div class="child">
    <fast-panel
      layout="fast-border-layout"
      :layout-config="layoutConfig"
      ref="fast-panel-ref"
      v-if="true"
    >
      <template v-slot:north>
        <div style="background-color: #4989F4;">
          north面板
        </div>
      </template>
      <template v-slot:west>
        <div style="background-color: #DC5145;">
          west面板
        </div>
      </template>
      <template v-slot:center>
        <div style="background-color: #179656;">
          center面板
        </div>
      </template>
      <template v-slot:east>
        <div style="background-color: #DC5145;">
          east面板
        </div>
      </template>
      <template v-slot:south>
        <div style="background-color: #FECC42;">
          south面板
        </div>
      </template>
    </fast-panel>
    <fast-panel
      layout="fast-border"
      :layout-config="layoutConfig"
      ref="fast-panel-ref"
      v-if="false"
    />
    <button
      @click="addPanel"
      v-if="false"
      style="position: absolute;top:40px;left:10px;"
    >
      动态添加panel
    </button>
  </div>
</template>

<script>

export default {
  data () {
    this.layoutConfig = {
      border: true,
      northHeight: '100px',
      southHeight: '100px'
      // westWidth: '100px',
      // eastWidth: '50px'
    }
    return {}
  },
  methods: {
    addPanel () {
      const north = {
        component: 'div',
        style: { 'background-color': 'red' },
        slot: 'north',
        children: ['north']
      }
      const south = {
        component: 'div',
        style: { 'background-color': 'yellow' },
        slot: 'south',
        children: ['south']
      }
      const center = {
        component: 'div',
        style: { 'background-color': 'blue' },
        slot: 'center',
        children: ['center']
      }
      this.$refs['fast-panel-ref'].add([north, south, center])
    }
  }
}
</script>

<style scope>
.child{
  height: 500px;
}
</style>
