import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {Table,PageHeader,InputNumber} from 'antd'
import SearchInput from '../../common/SearchInput'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: Name => <NavLink to={`${Name}`}>{Name}</NavLink>,
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status'
    },
    {
        title: 'Action',
        key: 'action',
        render: () => <a href="javascript:;">Delete</a>
    }]

const data = [{
    key: '1',
    name: 'Ivan Ivanov',
    status: 'password expired',
}, {
    key: '2',
    name: 'Stepan Litvinov',
    status: 'active',
}]

class AllPeople extends Component {
    render() {
        return (
            <div>
                <PageHeader
                    className='header'
                    title={<SearchInput/>}
                    extra={[
                        <div style={{display:'flex',alignItems:'center'}}>
                            Show
                            <InputNumber
                                defaultValue={20}
                                min={0}
                                max={100}
                                style={{marginLeft:5}}
                                formatter={value => `${value}`}
                            />
                        </div>
                    ]}
                />
            <Table bordered={true} columns={columns} dataSource={data}/>
            </div>
        )
    }
}

AllPeople.propTypes = {}

export default AllPeople
