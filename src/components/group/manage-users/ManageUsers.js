import React, {Component} from 'react'
import {Card} from 'antd'
import {inject, observer} from 'mobx-react/index'
import Buttons from './Buttons'
import ListUsers from './ListUsers'

@inject('manageUsers')
@observer
class ManageUsers extends Component {

    componentDidMount() {
        const {manageUsers, match} = this.props
        manageUsers.saveParams({groupName: match.params.groupName})
        manageUsers.findAllUserInGroupBegin(0)
        manageUsers.findAllUserExceptGroupBegin(0)
    }

    componentWillUnmount() {
        this.props.manageUsers.cleanState()
    }

    render() {
        const {
            checked, addUserToGroup, removeUserFromGroup, loadMoreAllData,
            loadMoreGroupData, findAllUserInGroupBegin, findAllUserExceptGroupBegin
        } = this.props.manageUsers
        return (
            <Card
                size='small'
                type='inner'
                title='Add or remove users from the group'
            >
                <section className='manage_users_lists'>
                    <ListUsers
                        title='Not Members'
                        side='all'
                        loadMoreData={loadMoreAllData}
                        filterByUsername={str => findAllUserExceptGroupBegin(0, str)}
                    />
                    <Buttons
                        toRight={!checked.all.length}
                        toLeft={!checked.group.length}
                        addUserToGroup={addUserToGroup}
                        removeUserFromGroup={removeUserFromGroup}
                    />
                    <ListUsers
                        title='Members'
                        side='group'
                        loadMoreData={loadMoreGroupData}
                        filterByUsername={str => findAllUserInGroupBegin(0, str)}
                    />
                </section>
            </Card>
        )
    }
}

ManageUsers.propTypes = {}

export default ManageUsers
