import { Layout, Menu, Popconfirm, message } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import React, { useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { loginOut, getUserInfo, getMenuList } from '@/api'
import Icon, * as Icons from '@ant-design/icons'
import './index.scss'
const { Header, Sider } = Layout

const GeekLayout = () => {
  // 获取当前路由
  const location = useLocation()
  // 获取当前路由的key
  const selectedKey = location.pathname

  // 缓存获取用户信息和菜单列表的结果
  const [userData, setUserData] = useState({
    userInfo: {},
    menuList: [],
  })
  // 获取用户信息和菜单列表
  const fetchUserData = async () => {
    try {
      const [userInfo, menuList] = await Promise.all([getUserInfo(), getMenuList(1)])
      setUserData({ userInfo, menuList })
    } catch (err) {
      message.error(err)
    }
  }
  // 组件挂载时获取用户信息和菜单列表
  useEffect(() => {
    fetchUserData()
  }, [])
  // 菜单列表
  const menuList = useMemo(() => userData.menuList.map((item) => {
    return {
      key: item.path,
      icon: item.icon ? <Icon component={Icons[item.icon]} /> : null,
      label: item.title,
      children: item.children && item.children.map((itemChildren) => {
        return {
          key: item.path + "/" + itemChildren.path,
          label: itemChildren.title,
        }
      }),
    }
  }), [userData.menuList])
  // 一级菜单的key
  const firstLevelKeys = useMemo(() => menuList.map(item => item.key), [menuList])
  // 二级菜单的key
  const [openKeys, setOpenKeys] = useState([])
  // 刷新时获取当前选中的菜单
  useEffect(() => {
    if (selectedKey.split('/').length > 2) {
      setOpenKeys(['/' + selectedKey.split('/')[1]])
    }
  }, [selectedKey])
  // 二级菜单的展开和收起
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (firstLevelKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  // 路由跳转
  const navigate = useNavigate()
  // 退出登录
  const onLogout = async () => {
    try {
      await loginOut()
      navigate('/login')
    } catch (error) {
      message.error(error)
    }
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userData.userInfo.username}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onLogout}>
              <Icon component={Icons.LogoutOutlined} /> &nbsp;退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            selectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0 }}
            onClick={({ key }) => navigate(key)}
            items={menuList}
          />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout)
