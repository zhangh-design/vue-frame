<template>
  <div style="height: 50px;">
    <fast-double-wing-layout :border="border">
      <template v-slot:left>
        <div style="padding: 10px;">
          左侧
        </div>
      </template>
      <template v-slot:middle>
        <div>
          中间
        </div>
      </template>
      <template v-slot:right>
        <div>
          右侧-用户名-登出
        </div>
      </template>
    </fast-double-wing-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      border: '1px solid blue'
    }
  }
}
</script>

<style>

</style>
