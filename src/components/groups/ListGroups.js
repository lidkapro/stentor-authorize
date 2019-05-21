import React, {Component} from 'react'
import {Table} from 'antd'
import {NavLink} from 'react-router-dom'
import RenameGroupForm from './RenameGroupForm'
import {showDeleteConfirm} from '../group/help-functions/delete-group-confirm'


class ListGroups extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            oldName: ''
        }
        this.getData = this.getData.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.getColumns = this.getColumns.bind(this)
    }


    handleCancel() {
        this.setState({visible: false})
    }


    getData() {
        const {groups} = this.props
        return groups.map((group, i) => ({name: group, key: i, people: (i + 2) * 13}))
    }

    getColumns() {
        const {deleteGroup} = this.props
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
                render: group => <p><a onClick={() => showDeleteConfirm(group.name, deleteGroup)}>Delete</a> /
                    <a onClick={() => this.setState({visible: true, oldName: group.name})}>Rename</a></p>
            }
        ]
    }

    render() {
        const {renameGroup} = this.props
        const {oldName, visible} = this.state
        return (
            <section>
                <RenameGroupForm
                    visible={visible}
                    oldName={oldName}
                    renameGroup={renameGroup}
                    handleCancel={this.handleCancel}
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

export default ListGroups
