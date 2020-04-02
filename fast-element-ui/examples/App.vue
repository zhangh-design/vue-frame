<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" v-if="true" />
    <HelloWorld msg="Welcome to Your Vue.js App" v-if="false" />
    <fast-button text="测试-按钮" v-if="false" />
    <span v-if="false">{{value}}</span>
    <bdfsd v-if="false"></bdfsd>
    <fast-panel v-if="false" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import FastPanel from "./components/panel.vue";
import bdfsd from "./components/htllo.vue";

export default {
  name: "App",
  components: {
    bdfsd,
    HelloWorld,
    FastPanel
  },
  data() {
    return {
      value: 1
    }
  },
  mounted() {
    console.log('process.env.NODE_ENV ',process.env.NODE_ENV);
    console.log('process.env.BASE_URL ',process.env.BASE_URL);
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
