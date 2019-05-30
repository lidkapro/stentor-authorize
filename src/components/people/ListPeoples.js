import React, {Component} from 'react'
import {Icon, Table} from 'antd'
import {inject, observer} from 'mobx-react'

@inject('people')
@observer
class ListPeoples extends Component {
    componentDidMount() {
        const {people} = this.props
        people.findAllUserBegin(0)
    }

    getColumns = () => {
        const {people} = this.props
        return [
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'name',
                sorter: () => {
                }
            },
            {
                title: 'e-mail',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Enabled',
                dataIndex: 'enabled',
                key: 'enabled',
                render: enabled => enabled ?
                    <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/> :
                    <Icon type="close-circle" theme="twoTone" twoToneColor="#eb2f96"/>
            }
            ,
            {
                title: 'Locked',
                dataIndex: 'locked',
                key: 'locked',
                render: locked => locked ?
                    <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/> :
                    <Icon type="close-circle" theme="twoTone" twoToneColor="#eb2f96"/>
            },
            {
                title: 'Action',
                key: 'action',
                render: user => !user.locked ?
                    <a onClick={() => people.lockUser(user.username)}>Lock</a> :
                    <a onClick={() => people.unLockUser(user.username)}>Unlock</a>
            }
        ]
    }

    loadPage = ({current}, a, {order}) => {
        const {people} = this.props
        const page = current - 1
        people.findAllUserBegin(page, !order ? null : order === 'ascend' ? 'ASC' : 'DESC')
    }

    componentWillUnmount() {
        const {people} = this.props
        people.cleanState()
    }

    render() {
        const {dataListPeoples, total, loading} = this.props.people
        return (
            <Table
                size='middle'
                bordered={true}
                loading={loading}
                onChange={this.loadPage}
                columns={this.getColumns()}
                style={{flex: '3 1 300px'}}
                dataSource={dataListPeoples}
                pagination={{total: total.all}}
            />
        )
    }
}

ListPeoples.propTypes = {}

export default ListPeoples
