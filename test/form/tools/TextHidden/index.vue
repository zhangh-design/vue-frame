<template>
  <div>
    <fast-text-hidden
        :value="value"
      />
  </div>
</template>

<script>
import FastTextHidden from '../common/form/tools/text-hidden.js'

export default {
  components: {
    FastTextHidden
  },
  data() {
    return {
      value: `1001`
    }
  }
};
</script>

<style></style>
