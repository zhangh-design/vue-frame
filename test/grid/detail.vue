<template>
  <div>
    {{ row }}
  </div>
</template>

<script>

export default {
  inject: ['getFastGrid', 'getFastElDialog'],
  props: {
    row: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    'row.name': {
      handler () {
        console.log('row.name ', this.row.name);
        this.getFastElDialog.setTitle(this.row.name)
      },
      immediate: true
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
