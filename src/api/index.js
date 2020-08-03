/* 
包含多个接口请求函数的模块
*/
import jsonp from 'jsonp'
import {message} from 'antd'

import ajax from "./ajax"

// 登录
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

/* 
  添加用户
  user是一个包含5个属性的对象
    username password phone email role_id(角色ID值)
  这样传递参数更加简洁
  箭头函数的箭头有返回作用当写{}的时候就需要自己返回了
*/
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

// 获取一级或某个二级分类列表 父级分类的ID
export const reqCategories = (parentId) => ajax('manage/category/list', {parentId})

// 添加分类 父级分类的ID  
export const reqAddCategory = (parentId, categoryName) => ajax('manage/category/add', {parentId, categoryName}, 'POST')

// 更新品种名称 父级分类的ID  名称
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax('manage/category/update', {categoryId, categoryName}, 'POST')

// 获取天气数据的接口
export const reqWeather = (city) => {
  let url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`

  return new Promise((resolve, reject) => {

    jsonp(url, {}, (err, data) => {
      if (!err && data.status === 'success') {   // 成功
        // console.log('jsonp()', err, data)
        // 取出需要的数据
        const { dayPictureUrl, weather } = data.results[0].weather_data[0]
        // 返回一个状态为resolved的promise对象
        resolve({ dayPictureUrl, weather})
      } else {      // 失败
        message.error('请求天气数据失败')
      }
    })
  })
}