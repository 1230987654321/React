import { Space, Button, Table, Drawer } from 'antd'
import qs from 'qs'
import { useEffect, useState } from 'react'
import { useStore } from '@/store'
// 获取查询参数
const getRandomuserParams = (params) => ({
  size: params.pagination?.pageSize,
  current: params.pagination?.current,
  ...params,
})
const Role = () => {
  // 获取store
  const { roleStore } = useStore()
  // 获取数据
  useEffect(() => {
    fetchData()
  })
  // 获取数据
  const fetchData = async () => {
    setLoading(true)
    // 如果查询参数没有变化，不再请求
    if (JSON.stringify(queryParameters) === JSON.stringify(lastQueryParams)) {
      setLoading(false)
      return
    }
    roleStore.getRoleList(qs.stringify(queryParameters))
      .then(res => {
        // 处理数据
        setData(res.records)
        // 保存最后一次查询参数
        setLastQueryParams(queryParameters)
        // 设置分页
        setTableParams(t => ({
          ...t,
          pagination: {
            ...t.pagination,
            total: res.total,
          },
        }))
      })
      .finally(
        setLoading(false)
      )
  }
  // 表格列
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      width: '80px',
      align: 'center',
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
          <Button onClick={showDrawer} key={`a-${record.id}`} type="primary" >
            编辑
          </Button>
          <Button type="primary" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ]
  // 数据
  const [data, setData] = useState()
  // 加载状态
  const [loading, setLoading] = useState(false)
  // 抽屉状态
  const [open, setOpen] = useState(false)
  // 打开抽屉
  const showDrawer = () => {
    setOpen(true)
  }
  // 关闭抽屉
  const onClose = () => {
    setOpen(false)
  }
  // 表格参数
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  })
  // 保存最后一次查询参数
  const [lastQueryParams, setLastQueryParams] = useState()
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
  return (
    <>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        bordered
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
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
            <Button type="primary" onClick={onClose}>
              提交
            </Button>
          </Space>
        }
      >
        <p className="site-description-item-profile-p">Personal</p>
      </Drawer>
    </>
  )
}
export default Role