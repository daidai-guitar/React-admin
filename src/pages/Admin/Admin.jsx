import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Layout} from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import Header from '../../components/Header/Header'
import LeftNav from '../../components/LeftNav/LeftNav'
import Home from '../Home/Home'
import User from '../User/User'
import Product from '../Product/Product'
import Category from '../Category/Category'
import Bar from '../Charts/Bar'
import Line from '../Charts/Line'
import Pie from '../Charts/Pie'
import Role from '../Role/Role'

const {Sider, Content, Footer} = Layout

export default class Admin extends Component {
  
  render() {
    const user = memoryUtils.user

    // 当user为空或者当user._id没有值时重定向到登录页面
    if (!user || !user._id) {
      return <Redirect to="/login" />
    }

    return (
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin: 20, backgroundColor: '#fff' }}>
            <Switch>
              <Redirect from='/' exact to='/home' />
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/product' component={Product} />
              <Route path='/user' component={User} />
              <Route path='/role' component={Role} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/pie" component={Pie} />
              <Route path="/charts/line" component={Line} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', opacity: .6}}>推荐使用谷歌浏览器浏览，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}