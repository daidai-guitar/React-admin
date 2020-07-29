/* 
  发送异步ajax请求的模块
  优化错误处理 实现统一的错误提示
 */
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data={}, type="GET") {

  return new Promise((resolve, reject) => {   

    let promise 

    if (type==='GET') {
      promise = axios.get(url, {
        // 配置对象 进行参数的拼接
        params: data
      })
    } else {
      promise = axios.post(url, data)
    }
    // 直接返回promise对象.then的异步回调函数的结果
    promise.then(response => {
      resolve(response.data)
    })
    promise.catch(error => {
      message.error('请求出错了', error.message)
    })
  })
}
