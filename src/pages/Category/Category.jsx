import React, { Component } from 'react'
import {Card, Table, Button, message} from 'antd'

import LinkButton from '../../components/LinkButton/LinkButton'
import {reqAddCategory, reqCategories, reqUpdateCategory} from '../../api/index'

export default class Category extends Component {

  state = {
    loading: false,   // 数据是否在加载中
    categories: [],   //   一级分类列表
    subCategories: [],  // 二级分类列表
    parentId: '0',     // 默认显示一级列表
    parentName: ''    // 父分类列表的名称
  }

  // 异步获取一级/二级列表显示
  getCategories = async () => {
    // 请求前
    this.setState({loading: true})
    const {parentId} = this.state
    const result = await reqCategories(parentId)
    // 请求后
    this.setState({loading: false})
    // 获取分类列表数据 可能是一级列表也可能是二级列表
    const categories = result.data  
    if (result.status === 0) {  // 请求成功
        if (parentId === '0') {
          this.setState({
            categories
          })
        } else {
          this.setState({
            subCategories: categories
          })
        }
    } else {    /// 请求失败
      message.error('获取分类列表数据失败')
    }
  }

  getSubCategories = (category) => {
    // 更新状态后获取二级分类列表
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => {  // 在状态更新且界面重新渲染后执行
      this.getCategories()
    })
  }

  // 再次显示一级列表
  showCategories = () => {
    // 从二级列表更新显示为一级列表
    this.setState({
      parentId: '0',
      parentName: '',
      subCategories: []
    })
  }

  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: '30%',
        // 渲染某一行数据
        render: (category) => (
          <span>
            <LinkButton>修改分类</LinkButton>
            {this.state.parentId === '0' ? <LinkButton onClick={() => this.getSubCategories(category)}>查看子分类</LinkButton> : null}
          </span>
        )
      }
    ]
  }

  // 组件将要渲染时为其准备数据
  componentWillMount () {
    this.initColumns()
  }

  componentDidMount () {
    this.getCategories()
  }

  render() {

    const { categories, loading, parentId, subCategories, parentName } = this.state
      
    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategories}>一级分类列表</LinkButton>
        ->
        <span>{parentName}</span>
      </span>
    )
    const extra = (
      <span>
        <Button type="primary">添加</Button>
      </span>
    )


    return (
      <Card title={title} bordered={false} extra={extra}> 
        <Table
          rowKey="_id"
          bordered
          // 页面是否在加载中
          loading={loading}
          dataSource={parentId === '0' ? categories : subCategories}
          columns={this.columns}
          // 每页最多5个项
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />
      </Card>
    )
  }
}

/* 
  怎样判断显示一级分类列表还是二级分类列表？
    父分类的parentId: '0'   parentName: ''  父分类标题
    子分类的parentId: 
*/