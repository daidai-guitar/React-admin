/* 
  菜单配置文件
*/

import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons'

const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: MenuUnfoldOutlined, // 图标名称
  },
  {
    title: '商品',
    key: '/products',
    icon: AppstoreOutlined,
    children: [ // 子菜单列表
      {
        title: '品类管理',
        key: '/category',
        icon: DesktopOutlined
      },
      {
        title: '商品管理',
        key: '/product',
        icon: ContainerOutlined
      },
    ]
  },

  {
    title: '用户管理',
    key: '/user',
    icon: PieChartOutlined
  },
  {
    title: '角色管理',
    key: '/role',
    icon: MenuFoldOutlined
  },

  {
    title: '图形图表',
    key: '/charts',
    icon: MailOutlined,
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: MailOutlined
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: MailOutlined
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: MailOutlined
      },
    ]
  },

  {
    title: '订单管理',
    key: '/order',
    icon: MailOutlined
  }
]

export default menuList