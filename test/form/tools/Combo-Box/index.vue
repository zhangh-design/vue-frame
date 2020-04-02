<template>
  <div>
    <fast-combo-box
      ref="fast-comboBox-ref"
      :value="comboBoxValue"
      :multiple="multiple"
      :display-field="displayField"
      :value-field="valueField"
      :options="options"
      :slot-node="slotNode"
      :ct-style="ctStyle"
      :ct-cls="ctCls"
      :width="width"
      @selectChange="_selectChangeEvent"
      @remove-tag="removeTagEvent"
      :listeners="listeners"
    />
    <p>{{ comboBoxValue }}</p>
    <div>
      <button @click="doTestResponsiveMode">
        测试响应式
      </button>
      &nbsp;&nbsp;
      <!--远程请求数据时才有效-->
      <button @click="reloadHandler">
        手动刷新
      </button>
    </div>
  </div>
</template>

<script>
import FastComboBox from '../common/form/tools/combo-box.js'

export default {
  components: {
    FastComboBox
  },
  data () {
    this.options = [{ value: '01', label: '苹果' }, { value: '02', label: '香梨' }, { value: '03', label: '西瓜' }, { value: '04', label: '桃子' }, { value: '05', label: '猕猴桃' }]
    // this.options = []
    this.listeners = {
      change: this.changeEvent
    }
    // slots
    this.slotNode = {
      prefix: {
        // 前缀
        template: '<em style="line-height: 40px;">f:</em>'
      },
      empty: {
        template: '<div style="text-align: center;padding: 5px 0 5px 0">没有水果了</div>'
      }
    }
    this.ctStyle = {
      'background-color': 'red'
    }
    this.ctCls = {
      'fast-combo-box': true
    }
    this.width = '200px'
    return {
      // 静态数据-多选
      multiple: true,
      comboBoxValue: ['03', '04'],
      // 静态数据-单选
      /* multiple: false,
      comboBoxValue: '03', */
      // 远程请求数据-多选
      /* multiple: true,
      comboBoxValue: ['2', '4'],
      api: 'user/getUserInfo', */
      displayField: 'label',
      valueField: 'value'
    }
  },
  mounted () {
    /* this.$api['user/getUserInfo']().then((data) => {
      console.info(data);
    }) */
  },
  methods: {
    changeEvent (item) {
      // 选中值发生变化时触发
      console.info(item);
    },
    _selectChangeEvent (value) {
      // 手动实现 v-model 的赋值
      this.comboBoxValue = value
    },
    doTestResponsiveMode () {
      if (this.multiple) {
        this.comboBoxValue = ['01']
      } else {
        this.comboBoxValue = '01'
      }
    },
    reloadHandler () {
      // 传递一个查询参数
      this.$refs['fast-comboBox-ref'].reload({ id: '1002' })
    },
    removeTagEvent (value) {
      console.info(value);
    }
  }
}
</script>

<style></style>
