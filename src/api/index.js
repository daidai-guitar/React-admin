/* 
包含多个接口请求函数的模块
*/
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
