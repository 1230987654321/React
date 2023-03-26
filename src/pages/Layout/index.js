import { Layout, Menu, Popconfirm, message } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'

const { Header, Sider } = Layout

const GeekLayout = () => {
  const { userStore, loginStore } = useStore()
  // 获取用户数据
  useEffect(() => {
    try {
      userStore.getUserInfo()
    } catch { }
  }, [userStore])

  const location = useLocation()
  // 这里是当前浏览器上的路径地址
  const selectedKey = location.pathname
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
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0 }}
            onClick={({ key }) => {
              navigate(key)
            }}
            items={[
              {
                icon: <HomeOutlined />,
                key: '/',
                label: '数据概览',
              },
              {
                icon: <DiffOutlined />,
                key: '/article',
                label: '内容管理',
              },
              {
                icon: <EditOutlined />,
                key: '/publish',
                label: '发布文章',
              },
            ]}
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