import { Space, Button, Table, Drawer, Form, Input, Tree, message, Modal } from 'antd'
import qs from 'qs'
import { useEffect, useState } from 'react'
import { getRolePageList, getMenuList, getRoleById, updateRoleById, addRole, deleteRoleById } from '@/api'
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
const Role = () => {
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
      title: '名称',
      dataIndex: 'title',
      width: '20%',
    },
    {
      title: '描述',
      dataIndex: 'description',
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
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => getRoleInfo(record.id)} key={`a-${record.id}`} type="primary" >
            编辑
          </Button>
          <Button type="primary" onClick={() => removeRoleInfo(record.id)} danger>
            删除
          </Button>
        </Space>
      ),
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
  // 权限菜单
  const [menuList, setMenuList] = useState()
  // form表单
  const [form] = Form.useForm()
  // 初始 展开的树节点
  const [expandedKeys, setExpandedKeys] = useState([])
  // 初始 选中的树节点
  const [checkedKeys, setCheckedKeys] = useState([1])
  // 自动 展开父节点
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  // 抽屉状态
  const [open, setOpen] = useState(false)
  // 获取数据
  const fetchRoleData = async () => {
    setLoading(true)
    getRolePageList(qs.stringify(queryParameters))
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
  // 获取权限菜单
  const fetchMenuData = async () => {
    getMenuList(0).then(res => {
      setMenuList(
        // 这里是权限菜单
        res.map((item) => {
          return {
            key: item.id,
            title: item.title,
            disabled: item.id === 1 ? true : false,
            children: item.children && item.children.map((itemChildren) => {
              return {
                key: itemChildren.id,
                title: itemChildren.title,
              }
            })
          }
        })
      )
    }).catch(err => {
      message.error(err)
    })
  }
  // 获取数据
  useEffect(() => {
    fetchRoleData()
    fetchMenuData()
  }, [setMenuList])//eslint-disable-line

  // 获取角色详情
  const getRoleInfo = async (id) => {
    setCheckedKeys([1])
    if (id === 0) {
      form.setFieldsValue({
        id: 0,
        title: '',
        menuIdList: [1],
        description: '',
      })
      // 打开抽屉
      showDrawer()
    } else {
      getRoleById(id).then(res => {
        // 设置表单数据
        form.setFieldsValue(res)
        // 设置展开的树节点
        setCheckedKeys(res.menuIdList)
        // 打开抽屉
        showDrawer()
      }).catch(err => {
        message.error(err)
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
  // 点击树节点触发
  const onExpand = (expandedKeysValue) => {
    // 如果未将autoExpandParent设置为false，则如果子级展开，则父级不能折叠
    // 或者，您可以删除所有展开的子密钥。
    setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }
  // 点击复选框触发
  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue)
    // 同时设置表单数据
    form.setFieldsValue({
      menuIdList: checkedKeysValue,
    })
  }
  // 提交表单
  const onFinish = async (values) => {
    values.menuId = values.menuIdList.join(',')
    if (values.id === 0) {
      addRole(values).then(res => {
        message.success(res.message)
        fetchRoleData()
        onClose()
      }).catch(err => {
        message.error(err)
      })
    } else {
      updateRoleById(values).then(res => {
        message.success(res.message)
        fetchRoleData()
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
          fetchRoleData()
        }).catch(err => {
          message.error(err)
        })
      },
    })
  }
  return (
    <>
      <Space wrap>
        <Button type="primary" onClick={() => getRoleInfo(0)}>添加角色</Button>
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
          <Form.Item name="menuIdList" label="权限">
            <Tree
              checkable
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              treeData={menuList}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}
export default Role