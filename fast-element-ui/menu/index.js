/**
 * @desc
 * menu 菜单按钮控件
 * 在其它控件右键菜单事件 'contextmenu'时，可以动态在点击的位置处显示menu控件
 * 比如：tree的右键 '刷新'节点
 * tip: 必须显示调用showAt(x,y)才能创建控件
 * @example
 * mounted(){
 *  let menu = new tjMenu()
 *  menu.add([{text: '增加',grade: 'info'},{text: '下载文档',grade: 'warning'}])
 *  //menu.add({text: '增加'})
 *  menu.showAt(200,300)
 * }
 * */
// @ts-ignore
// eslint-disable-next-line no-unused-vars
import Vue from 'vue'

class FastMenu {

}
export default FastMenu
