import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu} from 'antd'


import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu

class LeftNav extends Component {

  getMenuNodes = (menuList) => {
    // 获取当前访问的路径
    const path = this.props.location.pathname
    // 映射 根据一个数组返回另一种类型的数组
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
        const cItem = item.children.find(cItem => cItem.key===path)
        
        // 如果存在子菜单就打开
        if (cItem) {
          this.openKey = item.key
        }
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

    const path = this.props.location.pathname
    const openKey = this.openKey

    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="硅谷后台" />
          <h1>硅谷后台</h1>
        </Link>
        <Menu selectedKeys={[path]} defaultOpenKeys={[openKey]} mode="inline" theme="dark">
          {
            this.menuNodes
          }
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)