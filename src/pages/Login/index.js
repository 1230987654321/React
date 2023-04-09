import { Card, Form, Input, Button, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { setToken } from '@/utils'
import { useNavigate } from 'react-router-dom'
import { login } from '@/api'
import logo from '@/assets/logo.png'

import './index.scss'

const Login = () => {
  // const { loginStore } = useStore()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      // 登录用户并重定向到主页
      const result = await login(values)
      setToken(result)
      navigate('/')
    } catch (error) {

      // 向用户显示错误消息
      message.error(error)
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          >
            <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input size="large" prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login