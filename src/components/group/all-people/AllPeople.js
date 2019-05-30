import React, {Component} from 'react'
import {Icon, Table} from 'antd'
import {inject, observer} from 'mobx-react'
import HeadAllPeople from './HeadAllPeople'


@inject('people')
@observer
class AllPeople extends Component {

    componentDidMount() {
        const {people, match} = this.props
        people.findAllUserInGroupBegin(match.params.groupName, 0)
    }

    getColumns = () => {
        const {people, match} = this.props
        return [
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
                sorter: () => {
                }
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
                render: user =>
                    <div>
                        <a onClick={() => user.removeUserFromGroup(match.params.groupName, user.username)}>Delete </a>
                        /
                        {!user.locked ?
                            <a onClick={() => people.lockUser(user.username)}> Lock</a> :
                            <a onClick={() => people.unLockUser(user.username)}> Unlock</a>
                        }
                    </div>
            }
        ]
    }

    loadPage = ({current}, a, {order}) => {
        const {people, match} = this.props
        const page = current - 1
        people.findAllUserInGroupBegin(match.params.groupName, page, !order ? null : order === 'ascend' ? 'ASC' : 'DESC')
    }

    componentWillUnmount() {
        const {people} = this.props
        people.cleanState()
    }


    render() {
        const {people} = this.props
        return (
            <section>
                <HeadAllPeople/>
                <Table
                    size='middle'
                    bordered={true}
                    loading={people.loading}
                    onChange={this.loadPage}
                    columns={this.getColumns()}
                    dataSource={people.dataAllPeople}
                    pagination={{total: people.totalInGroup}}
                />
            </section>
        )
    }
}

AllPeople.propTypes = {}

export default AllPeople
