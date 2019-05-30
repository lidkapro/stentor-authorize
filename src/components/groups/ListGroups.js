import React, {Component} from 'react'
import {Table} from 'antd'
import {NavLink} from 'react-router-dom'
import {showDeleteConfirm} from '../group/help-functions/delete-group-confirm'
import {Form} from 'antd/lib/index'
import PopupForm from './PopupForm'
import {observer} from 'mobx-react'


@observer
class ListGroups extends Component {

    state = {
        visible: false,
        oldName: ''
    }

    handleCancel = () => {
        this.setState({visible: false})
    }

    getOldName = oldName => {
        this.setState({visible: true, oldName: oldName})
    }

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
                render: group => <section><a onClick={() => showDeleteConfirm(group.name, groups.deleteGroup)}>Delete</a> /
                    <a onClick={() => this.getOldName(group.name)}>Rename</a></section>
            }
        ]
    }

    render() {
        const {oldName, visible} = this.state
        const {form, groups} = this.props
        return (
            <section>
                <PopupForm
                    form={form}
                    visible={visible}
                    title="Rename group"
                    handleCancel={this.handleCancel}
                    sendRequest={groupName => groups.renameGroup(oldName, groupName)}
                />
                <Table
                    size='middle'
                    bordered={true}
                    columns={this.getColumns()}
                    dataSource={this.getData()}/>
            </section>
        )
    }
}

ListGroups.propTypes = {}

export default Form.create({name: 'rename_group'})(ListGroups)
