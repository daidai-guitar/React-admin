import React, { Component } from 'react'
import {Form, Button, Input, message} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import {Redirect} from 'react-router-dom'

import './login.less'
import logo from '../../assets/images/logo.png'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

export default class Login extends Component {

  // 创建表单关联
  formRef = React.createRef()

    
  handleSubmit = (event) => {
    // 取消登录默认行为
    // event.preventDefault()

    // const form = this.props.form
    // console.log('--------')
    // console.log(this.formRef.current)
    const { getFieldsValue, validateFields } = this.formRef.current

    // console.log(getFieldsValue())
    validateFields().then(async (values) => {
      // console.log(values)
      const {username, password} = values
      // 返回值result是一个promise对象 
      // 如果想要获取数据需要执行回调函数
      const result = await reqLogin(username, password)
      const user = result.data

      // 将user存到工具模块中(保存到内存中)
      memoryUtils.user = user

      // 将数据保存到本地
      storageUtils.saveUser(user)

      if (result.status === 0) {
        // 跳转到Admin界面
        message.success('登录成功')
        this.props.history.replace('/')
      } else {
        message.error('登录失败')
      }
      
    }).catch(error => {
      console.log(error)
    })
  }

  validate = (rule, value) => {
    if (!value) {
      return Promise.reject('密码不能为空')
    } else if (value.length < 4) {
      return Promise.reject('密码长度不能小于4位')
    } else if (value.length > 12) {
      return Promise.reject('密码长度不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return Promise.reject('密码必须是英文、数字或下划线组成')
    } else {
      return Promise.resolve()
    }
  }
  
  
  render() {

    // 如果已经登录了则重定向到Admin界面
    const user = memoryUtils.user
    if (user && user._id) {
      return <Redirect to="/admin" />
    }

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目:后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form ref={this.formRef} className="login-form" onFinish={this.handleSubmit}>
            {/* 标识名称 用来获取表单的值 */}
            <Form.Item name="username" rules={
              // 声明式表单验证
              [
                {required: true, whitespace: true, message: 'Please input your Username!'},
                {min: 4, message: '用户名最少4位'},
                {max: 9, message: '用户名最多9位'},
                {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是字母数字下划线'}
              ]
              }>
              <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[
              {
                required: true,
                message: 'Please input your Password!'
              },
              {
                validator: this.validate
              }
            ]}>
              <Input prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
              type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}


