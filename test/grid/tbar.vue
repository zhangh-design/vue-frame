<template>
  <div class="tbar-container">
    工具栏{{ userName }}
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    userName () {
      return this.row.username
    }
  }
}
</script>

<style>
.tbar-container{
  padding: 5px;
}
</style>
