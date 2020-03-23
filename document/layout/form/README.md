## FormLayout 表单布局

#### 说明
FormLayout（表单布局）


#### 用法

需要结合 `Form` 表单控件使用单独无法使用。

具体示例请看 [++->Form 表单文档++](https://github.com/zhangh-design/vue-frame/tree/master/document/form/Form)

示例显示效果图：

![image](http://m.qpic.cn/psc?/V12UXEll2JjLTU/S1G4*2hi*D5aPIJug2nMa.JTbTSnJc3bOHJjH8BR89be704igzdGdnCOw*P0GdFxb5jLNep10nu*8f39A6gYtdr2XKwpTpUSgCt1.p6780g!/b&bo=IwNGAQAAAAARB1c!&rf=viewer_4&t=5)

#### FormLayout表单布局-单项数据流（props）

名称 | 必填 | 类型 | 默认值 | 说明
---|---|---|---|---
colon | — | String | false | 是否需要在 label 文字后面自动添加冒号`：`
columns | — | Number | 2 | 表单一行分多少列
detail | — | Array | [] | 表单详情数据，行和列的配置
model | — | Boolean |  true | 表单数据对象，响应式Form表单值


#### 注意：

- detail

```
[
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
    }
]
```

- model

```
data(){
    return {
        form: {
            address: '金沙湖',
            time: '2020-02-29',
            distance: '1公里',
            fruit: ['02', '01'],
            num: 6,
            goods: ['01', '03', '05'],
            isGo: false
      }
    }
}
```
