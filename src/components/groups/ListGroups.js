import React, {Component} from 'react'
import {Table} from 'antd'
import {NavLink} from 'react-router-dom'
import {showDeleteConfirm} from '../group/help-functions/delete-group-confirm'
import {Form} from 'antd/lib/index'
import PopupForm from './PopupForm'


class ListGroups extends Component {

    getData() {
        const {groups} = this.props
        return groups.list.map((group, i) => ({name: group, key: i, people: (i + 2) * 13}))
    }

    getColumns() {
        const {groups} = this.props
        return [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: groupName => <NavLink to={`/groups/${groupName}/allPeople`}>{groupName}</NavLink>,
            },
            {
                title: 'People',
                dataIndex: 'people',
                key: 'people',
            }, {
                title: 'Actions',
                key: 'actions',
                render: group => <p><a onClick={() => showDeleteConfirm(group.name, groups.deleteGroup)}>Delete</a> /
                    <a onClick={() => super.setState({visible: true, oldName: group.name})}>Rename</a></p>
            }
        ]
    }

    render() {
        const {groups, oldName} = this.props
        return (
            <section>
                <PopupForm
                    {...this.props}
                    title="Rename group"
                    sendRequest={groupName => groups.renameGroup(oldName, groupName)}
                />
                <Table
                    size='small'
                    bordered={true}
                    columns={this.getColumns()}
                    dataSource={this.getData()}/>
            </section>
        )
    }
}

ListGroups.propTypes = {}

export default Form.create({name: 'rename_group'})(ListGroups)
