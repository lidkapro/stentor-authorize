import React, {Component} from 'react'
import {Table} from 'antd'
import {inject, observer} from 'mobx-react/index'
import HeadAllPeople from './HeadAllPeople'

@inject('people')
class AllPeople extends Component {

    state = {
        pageSize: 10
    }

    changeSize = value => {
        this.setState({pageSize: value})
    }

    componentDidMount() {
        const {people, match} = this.props
        people.findUsersInGroup(match.params.groupName)
    }

    getColumns = () => {
        const {deleteUserFromGroup} = this.props.group
        return [
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status'
            },
            {
                title: 'Action',
                key: 'action',
                render: group => <a onClick={() => deleteUserFromGroup(group.username)}>Delete</a>
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
                    dataSource={people.data()}
                    pagination={{pageSize: pageSize}}/>
            </section>
        )
    }
}

AllPeople.propTypes = {}

export default AllPeople
