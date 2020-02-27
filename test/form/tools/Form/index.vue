<template>
  <div>
    <fast-form
      :detail="createDetail()"
      :model="form"
      :columns="columns"
      :colon="colon"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      label-position="left"
    />
    <p />
    <button @click="doTestResponsiveMode">
      测试响应式
    </button>
    &nbsp;&nbsp;
    <button @click="getFormValues">
      获取表单值
    </button>
    &nbsp;&nbsp;
    <button @click="clearForm">
      清空表单
    </button>
  </div>
</template>

<script>
import FastForm from '../common/form/index.js'

export default {
  components: {
    FastForm
  },
  data () {
    this.columns = 2
    this.colon = true
    this.checkbox = {
      options: [
        { label: '苹果', value: '01' },
        { label: '香蕉', value: '02' },
        { label: '桃子', value: '03' }
      ]
    }
    this.comboBox = {
      options: [
        { label: '面包', value: '01' },
        { label: '大饼', value: '02' },
        { label: '米饭', value: '03' },
        { label: '面条', value: '04' },
        { label: '饺子', value: '05' }
      ]
    }
    this.multiple = true
    return {
      form: {
        name: '短途旅游',
        address: '金沙湖',
        time: '2020-02-29',
        distance: '1公里',
        fruit: ['02', '01'],
        num: 6,
        goods: ['01', '03', '05']
      },
      rules: {
        address: [{ required: true, message: '请输入地点', trigger: 'blur' }]
      }
    }
  },
  mounted () {},
  methods: {
    createDetail () {
      // name 必须要唯一
      return [
        {
          span: 2,
          name: 'name',
          label: '活动',
          labelHtml: '<em>活动</em>',
          type: 'TextInput',
          placeholder: '活动',
          clearable: true,
          rules: [{ required: true, message: '请输入活动', trigger: 'blur' }]
        },
        {
          span: 1,
          name: 'address',
          label: '地址',
          type: 'TextInput',
          placeholder: '地址',
          disabled: false
        },
        {
          span: 1,
          name: 'time',
          label: '时间',
          type: 'DatePicker',
          placeholder: '时间',
          disabled: true,
          listeners: {
            change (val) {
              console.info(val)
            }
          }
        },
        {
          span: 2,
          name: 'distance',
          label: '路程',
          type: 'TextInput',
          placeholder: '路程'
        },
        {
          span: 2,
          name: 'fruit',
          options: this.checkbox.options,
          type: 'Checkbox',
          label: '水果',
          rules: [{ type: 'array', required: true, message: '请至少选择一个水果', trigger: 'change' }]
        },
        {
          span: 1,
          name: 'num',
          type: 'InputNumber',
          label: '人数',
          disabled: true
        },
        {
          span: 1,
          name: 'goods',
          options: this.comboBox.options,
          multiple: this.multiple,
          collapseTags: true,
          displayField: 'label',
          valueField: 'value',
          type: 'ComboBox',
          label: '食物'
        }
      ]
    },
    doTestResponsiveMode () {
      this.form.name = '公园野餐'
      this.form.time = '2020-03-07'
      this.form.num = 8
      this.form.fruit = ['03', '02']
    },
    getFormValues () {
      console.info(this.form)
    },
    clearForm () {
      this.$refs['ruleForm'].resetFields()
    }
  }
}
</script>

<style></style>
