import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons'

import './index.less'
import LinkButton from '../LinkButton/LinkButton'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import {formateDate} from '../../utils/timeFormatUtils'
import {reqWeather} from '../../api/index'
import menuList from '../../config/menuConfig'

const {confirm} = Modal

class Header extends Component {

  state = {
    currentTime: formateDate(Date.now()),   // 当前时间
    dayPictureUrl: '', // 天气图片url
    weather: '',      // 天气的文本
  }

  logout = () => {
    // 函数的参数为一个配置对象
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        // 清除用户信息和数据
        memoryUtils.user = {}
        storageUtils.removeUser()
        // 跳转到登录页面   需要将这个组件包装为路由组件
        this.props.history.replace('/login')
      }
    })

  }

  getTime = () => {
    this.intervalId = setInterval(() => {
      // 生成新状态
      let currentTime = formateDate(Date.now())
      // 更新状态
      this.setState({currentTime})
    }, 1000)
  }

  getWeather = async (city) => {
    // 发送jsonp请求获取数据
    let {dayPictureUrl, weather} = await reqWeather(city)
    // 更新状态
    this.setState({
      dayPictureUrl,
      weather
    })
  }

  getTitle = () => {
    let title
    // 获取某个路由组件的路径
    const path = this.props.location.pathname
    // 遍历menuList
    menuList.forEach(item => {
      if (item.key===path) {
        title = item.title
      } else if (item.children) { // 如果有children属性则
        // 在所有元素中查找   find方法返回一个元素
        const cItem = item.children.find(cItem => cItem.key===path)
        // 如果cItem有值才算是找到
        if (cItem) {
          title = cItem.title
        }
      }
    })

    return title
  }

  // 组件初始化渲染完毕回调
  componentDidMount () {
    // 开启定时器
    this.getTime()
    // 获取天气数据
    this.getWeather('北京')
  }

  // 组件将要卸载前回调
  componentWillUnmount () {
    // 清除定时器
    clearInterval(this.intervalId)
  }

  render() {

    const {currentTime, dayPictureUrl, weather} = this.state
    const {username} = memoryUtils.user

    // 获取当前title  每次渲染都要调用
    const title = this.getTitle()

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{username}</span>
          <LinkButton href="javascript:;" onClick={this.logout} >退出</LinkButton>
        </div>
        <div className="header-body">
          <div className="header-body-left">
            {title}
          </div>
          <div className="header-body-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="天气"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)