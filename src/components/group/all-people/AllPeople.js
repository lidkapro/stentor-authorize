import React, {Component} from 'react'
import {Icon, Table} from 'antd'
import {inject, observer} from 'mobx-react'
import HeadAllPeople from './HeadAllPeople'

@inject('people')
@observer
class AllPeople extends Component {

    state = {
        pageSize: 10
    }

    changeSize = value => {
        this.setState({pageSize: value})
    }

    componentDidMount() {
        const {people, match} = this.props
        people.findUsersInGroup(match.params.groupName,0)
    }

    getColumns = () => {
        const {people, match} = this.props
        return [
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
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
            }
            ,
            {
                title: 'Action',
                key: 'action',
                render: group => <a onClick={() =>
                    people.removeUserFromGroup(match.params.groupName, group.username)}>Delete</a>
            }
        ]
    }

    componentWillUnmount() {
        const {people} = this.props
        people.cleanLists()
    }

    render() {
        const {pageSize} = this.state
        const {people} = this.props
        return (
            <section>
                <HeadAllPeople
                    pageSize={pageSize}
                    changeSize={this.changeSize}
                />
                <Table
                    size='small'
                    bordered={true}
                    columns={this.getColumns()}
                    dataSource={people.dataAllPeople}
                    pagination={{pageSize: pageSize}}/>
            </section>
        )
    }
}

AllPeople.propTypes = {}

export default AllPeople
