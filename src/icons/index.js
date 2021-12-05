// @ts-nocheck
// 1导入所有的svg图标
// 2完成svgIcon的全局注册
import svgIcon from '@/components/svgIcon'

// 使用webpack的方法 require.context
const svgRequire = require.context('./svg', false, /\.svg$/)

// 此时返回一个require函数，可以接受一个request的参数，用户require的导入
// 该函数提供了3个属性，可以通过svgRequire.keys()获得所有的svg图标
// 遍历图标，把图标作为request参数传入到svgRequire导入函数中，完成本地svg图标的导入
console.log(svgRequire.keys())
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon))

export default (app) => {
  app.component('svg-icon', svgIcon)
}
