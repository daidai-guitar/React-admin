import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Menu} from 'antd'


import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu

export default class LeftNav extends Component {

  getMenuNodes = (menuList) => {
    // 映射 根据一个数组返回另一中类型的数组
    return menuList.map((item) => {  // item表示一个数组项
      if (!item.children) {   
        return (
          <Menu.Item key={item.key} icon={<item.icon />}>
            <Link to={item.key}>
              {item.title}
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu icon={<item.icon />} title={item.title} key={item.key}>
            {
              // 递归调用
              this.getMenuNodes(item.children)
            }
          </SubMenu>
        )
      }
    })
  }

  /* 
    在组件将要第一次渲染时将需要渲染的数据准备好
    为第一个render()准备数据(必须同步的)
  */
  componentWillMount () {
    this.menuNodes = this.getMenuNodes(menuList)
  }
  
  render() {
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="硅谷后台" />
          <h1>硅谷后台</h1>
        </Link>
        <Menu defaultSelectedKeys={['/home']} defaultOpenKeys={['sub1']} mode="inline" theme="dark">
          {
            this.menuNodes
          }
        </Menu>
      </div>
    )
  }
}