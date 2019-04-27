import React, {Component} from 'react'
import {Table} from 'antd'

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
},
    {
        title: 'e-mail',
        key: 'eMail',
        dataIndex: 'eMail'
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    }, {
        title: 'Action',
        key: 'action',
        render: () => <a href="javascript:;">Delete</a>
    }]

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `person ${i}`,
        eMail: `human${i}@mail.ru`,
        status: 'active'
    });
}


class ListPeoples extends Component {
    render() {
        return (
            <Table size='middle' style={{flex:'3 1 300px'}} columns={columns} dataSource={data}/>
        )
    }
}

ListPeoples.propTypes = {}

export default ListPeoples
