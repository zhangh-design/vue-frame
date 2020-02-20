<template>
  <div>
    <fast-text-password :value="value" clearable @inputChange="inputChangeEvent" :slotNode="slotNode" :listeners="listeners">
      <template v-slot:prepend>
        <em>密码：</em>
      </template>
    </fast-text-password>
  </div>
</template>

<script>
import FastTextPassword from "../common/form/tools/text-password.js";

export default {
  components: {
    FastTextPassword
  },
  data() {
    this.listeners = {
      focus: () => {
        console.info("focus ", event);
      }
    }
    this.slotNode = {
      template: "<em>取消</em>"
    }
    return {
      value: `123456`
    }
  },
  methods: {
    inputChangeEvent(value) {
      console.info(value);
    }
  }
};
</script>

<style></style>
