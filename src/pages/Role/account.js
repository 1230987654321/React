import { Space, Button, Table, Drawer, Form, Input, message, Modal, Select } from 'antd'
import qs from 'qs'
import { useEffect, useState } from 'react'
import { getAdminPageList, getAdminById, getAllRole, updateRoleById, addRole, deleteRoleById } from '@/api'
// 获取查询参数
const getRandomuserParams = (params) => ({
  size: params.pagination?.pageSize,
  current: params.pagination?.current,
  ...params,
})
// 表单布局
const formLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}
const RoleAccount = () => {
  // 表格列
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      width: '80px',
      align: 'center',
      render: (_text, _record, index) => `${(tableParams.pagination.current - 1) * tableParams.pagination.pageSize + index + 1}`,
    },
    {
      title: '账号',
      dataIndex: 'username',
      width: '20%',
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      width: '40%',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      width: '240px',
      aligen: 'center',
      render: (_, record) => {
        if (record.id === 1) {
          return
        }
        return (
          <Space size="middle">
            <Button onClick={() => fetchAdminInfo(record.id)} key={`a-${record.id}`} type="primary" >
              编辑
            </Button>
            <Button type="primary" onClick={() => removeRoleInfo(record.id)} danger>
              删除
            </Button>
          </Space>
        )
      },
    },
  ]
  // 数据
  const [data, setData] = useState()
  // 表格参数
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  })
  // 获取查询参数
  const queryParameters = getRandomuserParams(tableParams)
  // 处理表格更改
  const handleTableChange = (pagination) => {
    setTableParams((t) => ({
      ...t,
      pagination,
    }))
    // `dataSource`由于`pageSize`已更改而毫无用处
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }
  // 加载状态
  const [loading, setLoading] = useState(false)

  // form表单
  const [form] = Form.useForm()

  const [roleData, setRoleData] = useState([])
  // 抽屉状态
  const [open, setOpen] = useState(false)
  // 获取数据
  const fetchAdminData = async () => {
    setLoading(true)
    getAdminPageList(qs.stringify(queryParameters))
      .then(res => {
        // 处理数据
        setData(res.records)
        // 设置分页
        setTableParams(t => ({
          ...t,
          pagination: {
            ...t.pagination,
            total: res.total,
          },
        }))
      }).catch(err => {
        message.error(err)
      })
      .finally(
        setLoading(false)
      )
  }
  const fetchRoleData = async () => {
    getAllRole().then(res => {
      setRoleData(res)
    }).catch(err => {
      message.error(err)
    })
  }
  // 获取数据
  useEffect(() => {
    fetchAdminData()
    fetchRoleData()
  }, [setRoleData]) // eslint-disable-line
  // 获取角色详情
  const fetchAdminInfo = async (id) => {
    if (id === 0) {
      form.setFieldsValue({
        id: 0,
        title: '',
        description: '',
      })
      // 打开抽屉
      showDrawer()
    } else {
      getAdminById(id).then(res => {
        // 设置表单数据
        form.setFieldsValue(res)
        // 打开抽屉
        showDrawer()
      }).catch(err => {
        console.log(err)
      })
    }
  }
  // 打开抽屉
  const showDrawer = () => {
    setOpen(true)
  }
  // 关闭抽屉
  const onClose = () => {
    setOpen(false)
  }

  // 提交表单
  const onFinish = async (values) => {
    values.controlId = values.controlIdList.join(',')
    if (values.id === 0) {
      addRole(values).then(res => {
        message.success(res.message)
        fetchAdminData()
        onClose()
      }).catch(err => {
        message.error(err)
      })
    } else {
      updateRoleById(values).then(res => {
        message.success(res.message)
        fetchAdminData()
        onClose()
      }).catch(err => {
        message.error(err)
      })
    }
  }
  // 删除角色
  const removeRoleInfo = async (id) => {
    Modal.confirm({
      title: '提示',
      content: '确定删除该角色吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        deleteRoleById(id).then(res => {
          message.success(res.message)
          fetchAdminData()
        }).catch(err => {
          message.error(err)
        })
      },
    })
  }
  return (
    <>
      <Space wrap>
        <Button type="primary" onClick={() => fetchAdminInfo(0)}>添加账号</Button>
      </Space>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        bordered
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        style={{
          marginTop: 20,
        }}
      />
      <Drawer
        title="角色"
        placement="right"
        closable={false}
        width="40%"
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>关闭</Button>
            <Button type="primary" onClick={() => form.submit()}>
              提交
            </Button>
          </Space>
        }
      >
        <Form
          {...formLayout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="id"
            label="id"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="名称"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="roleId" label="角色">
            <Select
              labelInValue
              style={{
                width: 120,
              }}
              // onChange={handleChange}
              options={roleData}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}
export default RoleAccount 