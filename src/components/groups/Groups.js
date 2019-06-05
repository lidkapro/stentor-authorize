import React, {Component} from 'react'
import HeadLists from '../common/HeadLists'
import ListItems from '../common/ListItems'
import {inject, observer} from 'mobx-react'
import {showDeleteConfirm} from '../group/help-functions/delete-group-confirm'
import {NavLink} from 'react-router-dom'
import Moment from 'react-moment'
import {Button, Card, Icon} from 'antd'
import ListsControl from '../HOCs/ListsControl'


@inject('groups')
@observer
class Groups extends Component {

    componentDidMount() {
        this.props.groups.findAllGroups()
    }

    getData() {
        const {groups} = this.props
        return groups.list.map((group, i) => ({...group, key: i}))
    }

    getColumns() {
        const {groups, getOldName, getColumnSearchProps} = this.props
        const title = groupName => `Are you sure you want to delete ${groupName} group?`
        const content = 'Group cannot be restored'
        return [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                ...getColumnSearchProps('name'),
                render: groupName => <NavLink to={`/groups/${groupName}/allPeople`}>{groupName}</NavLink>,
            },
            {
                title: 'People',
                dataIndex: 'userCount',
                key: 'userCount',
                sorter: (a, b) => a.userCount - b.userCount,
            },
            {
                title: 'Created by',
                dataIndex: 'createdBy',
                key: 'createdBy',
            },
            {
                title: 'Created date',
                dataIndex: 'createdDate',
                key: 'createdDate',
                render: date => date ? <Moment format='DD.MM.YY HH:mm'>{date}</Moment> : <div/>
            },
            {
                title: 'Modified by',
                dataIndex: 'modifiedBy',
                key: 'modifiedBy',
            },

            {
                title: 'Modified date',
                dataIndex: 'modifiedDate',
                key: 'modifiedDate',
                render: date => date ? <Moment format='DD.MM.YY HH:mm'>{date}</Moment> : <div/>
            },
            {
                title: 'Actions',
                key: 'actions',
                render: group => <section>
                    <a onClick={() => showDeleteConfirm(title, content, group.name, groups.deleteGroup)}>Delete</a> /
                    <a onClick={() => getOldName(group.name)}>Rename</a>
                </section>
            }
        ]
    }

    componentWillUnmount() {
        this.props.groups.cleanState()
    }

    render() {
        const {visible, oldName, groups, getOldName, handleCancel = f => f} = this.props
        return (
            <Card title='Groups' className='container groups_enter'
                  extra={
                   <HeadLists
                       title="Add group"
                       icon='usergroup-add'
                       placeholder='enter name group...'
                       sendRequest={groupName => groups.createGroup(groupName)}
                   />
                  }
            >
                <ListItems
                    visible={visible}
                    title="Rename group"
                    placeholder='enter new name group...'
                    getOldName={getOldName}
                    getData={this.getData()}
                    handleCancel={handleCancel}
                    getColumns={this.getColumns()}
                    sendRequest={groupName => groups.renameGroup(oldName, groupName)}
                />
            </Card>
        )
    }
}

Groups.propTypes = {}

export default ListsControl(Groups)
