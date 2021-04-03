import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
  // console.log("执行了obj的install函数")

  // 1创建组件构造器
const toastConstruct = Vue.extend(Toast)

// 2根据new方式，根据组件构造器，可以创建出来一个组件对象
const toast =  new toastConstruct()

// 3将组件对象手动挂载某一个元素上
toast.$mount(document.createElement('div'))

// 4 toast.$el就是div
document.body.appendChild(toast.$el)

Vue.prototype.$toast = toast
}



export default obj
