<template>
  <div>
    {{ row }}
  </div>
</template>

<script>

export default {
  inject: ['getFastGrid'],
  props: {
    row: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  created () {},
  methods: {}
}
</script>

<style></style>
