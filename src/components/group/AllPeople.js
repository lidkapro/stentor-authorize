import React, {Component} from 'react'
import {InputNumber, PageHeader, Table} from 'antd'
import SearchInput from '../common/SearchInput'
import {inject, observer} from 'mobx-react/index'

@inject('group')
@observer
class AllPeople extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pageSize:10
        }
        this.getData = this.getData.bind(this)
        this.changeSize = this.changeSize.bind(this)
        this.getColumns = this.getColumns.bind(this)
    }

    componentWillMount() {
        const {group, match} = this.props
        group.findUsersInGroup(match.params.groupName)
    }

    getData() {
        const {peopleInGroup} = this.props.group
        return peopleInGroup.map((p, i) => ({username: p, status: 'active', key: i}))
    }

    getColumns() {
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

    changeSize(value) {
        this.setState({pageSize: value})
    }

    componentWillUnmount() {
        const {group} = this.props
        group.cleanLists()
    }

    render() {
        const {pageSize} = this.state
        return (
            <section>
                <PageHeader
                    className='header'
                    title={<SearchInput/>}
                    extra={[
                        <div key='1' style={{display: 'flex', alignItems: 'center'}}>
                            Show
                            <InputNumber
                                defaultValue={pageSize}
                                min={0}
                                max={100}
                                style={{marginLeft: 5}}
                                formatter={value => value < 100 ? `${value}` : 100}
                                onChange={this.changeSize}
                            />
                        </div>
                    ]}
                />
                <Table
                    pagination={{pageSize: pageSize}}
                    size='small'
                    bordered={true}
                    columns={this.getColumns()}
                    dataSource={this.getData()}/>
            </section>
        )
    }
}

AllPeople.propTypes = {}

export default AllPeople
