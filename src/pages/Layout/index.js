import { Layout, Menu, Popconfirm, message } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store'
import Icon, * as Icons from '@ant-design/icons'
import './index.scss'

const { Header, Sider } = Layout

const GeekLayout = () => {
  // 获取store
  const { userStore, loginStore, menuStore } = useStore()
  // 侧边栏展开的key
  const [openKeys, setOpenKeys] = useState(["/"])
  // 获取当前浏览器上的路径地址
  const location = useLocation()
  // 这里是当前浏览器上的路径地址
  const selectedKey = location.pathname

  // 获取用户数据
  useEffect(() => {
    try {
      userStore.getUserInfo()
      menuStore.getMenuList(1)
    } catch { }
  }, [userStore, menuStore])
  // 刷新的时候侧边栏展开
  useEffect(() => {
    if (selectedKey.split('/').length > 2) {
      setOpenKeys(['/' + selectedKey.split('/')[1]])
    }
  }, [selectedKey])
  // 侧边栏菜单
  const menuList = menuStore.menuList.map((item) => {
    return {
      key: item.path,
      icon: item.icon ? <Icon component={Icons[item.icon]} /> : null,
      label: item.title,
      children: item.children && item.children.map((itemChildren) => {
        return {
          key: item.path + "/" + itemChildren.path,
          label: itemChildren.title,
        }
      })
    }
  })
  // 侧边栏一级菜单的key
  const firstLevelKeys = menuList.map(item => item.key)
  // 侧边栏展开
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
      await loginStore.loginOut()
      navigate('/login')
    } catch (error) {
      // handle error
      message.error(error.message)
    }
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.username}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onLogout}>
              <Icon component={Icons.LogoutOutlined} />退出
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
            defaultSelectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0 }}
            onClick={({ key }) => {
              navigate(key)
            }}
            items={menuList}
          >
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default observer(GeekLayout)