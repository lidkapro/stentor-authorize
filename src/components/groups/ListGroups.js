import React, {Component} from 'react'
import {Table} from 'antd'
import {NavLink} from 'react-router-dom'

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: groupName => <NavLink to={`/groups/${groupName}/allPeople`}>{groupName}</NavLink>,
},
    {
        title: 'Description',
        key: 'description',
        dataIndex: 'description'
    },
    {
        title: 'People',
        dataIndex: 'people',
        key: 'people',
    }, {
        title: 'Action',
        key: 'action',
        render: () => <a href="javascript:;">Delete</a>
    }]

const data = [{
    key: '1',
    name: 'Users',
    people: 32,
    description:'All registered people'
}, {
    key: '2',
    name: 'Managers',
    people: 45,
    description:'Manage content and advertising'
}, {
    key: '3',
    name: 'Administrators',
    people: 2,
    description:'The Gods',
}]

class ListGroups extends Component {
    render() {
        return (
            <Table bordered={true}  columns={columns} dataSource={data}/>
        )
    }
}

ListGroups.propTypes = {}

export default ListGroups
