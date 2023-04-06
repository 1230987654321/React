import { Layout, Menu, Popconfirm, message } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { loginOut, getUserInfo, getMenuList } from '@/api'
import Icon, * as Icons from '@ant-design/icons'
import './index.scss'

const { Header, Sider } = Layout

const GeekLayout = () => {
  // 侧边栏展开的key初始化数据
  const [openKeys, setOpenKeys] = useState(["/"])
  // 获取当前浏览器上的路径地址
  const location = useLocation()
  // 这里是当前浏览器上的路径地址
  const selectedKey = location.pathname
  // 定义登录用户初始数据
  const [userInfo, setUserInfo] = useState({})
  // 定义侧边栏菜单初始数据
  const [menuList, setMenuList] = useState([])

  useEffect(() => {
    // 获取用户数据
    getUserInfo().then(res => {
      setUserInfo(res)
    }).then(() => {
      // getMenuData()
      // 获取侧边栏菜单数据
      getMenuList(1).then(res => {
        setMenuList(
          // 这里是侧边栏菜单数据
          res.map((item) => {
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
        )
      }).catch(err => {
        message.error(err)
      })
    }).catch(err => {
      message.error(err)
    })
    // 刷新的时候判断侧边栏展开
    if (selectedKey.split('/').length > 2) {
      setOpenKeys(['/' + selectedKey.split('/')[1]])
    }
  }, [selectedKey])

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
      await loginOut()
      navigate('/login')
    } catch (error) {
      // handle error
      message.error(error)
    }
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userInfo.username}</span>
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