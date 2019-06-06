import React from 'react'
import {Table} from 'antd'
import {observer} from 'mobx-react'


const ListUsers = observer(({data = [], total = 0, columns = [], loading = false, loadData = f => f}) =>
    <Table
        size='middle'
        scroll={{ x: 1000 }}
        loading={loading}
        columns={columns}
        dataSource={data}
        onChange={loadData}
        pagination={{total: total}}
    />
)


ListUsers.propTypes = {}

export default ListUsers
