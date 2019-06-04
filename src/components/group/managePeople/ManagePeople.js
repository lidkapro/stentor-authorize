import React, {Component} from 'react'
import {Card} from 'antd'
import {inject, observer} from 'mobx-react/index'
import Buttons from './Buttons'
import ListPeoples from './ListPeoples'

@inject('managePeople')
@observer
class ManagePeople extends Component {

    componentDidMount() {
        const {managePeople, match} = this.props
        managePeople.saveParams({groupName: match.params.groupName})
        managePeople.findAllUserInGroupBegin(0)
        managePeople.findAllUserExceptGroupBegin(0)
    }

    componentWillUnmount() {
        this.props.managePeople.cleanState()
    }

    render() {
        const {
            checked, addUserToGroup, removeUserFromGroup, loadMoreAllData,
            loadMoreGroupData, findAllUserInGroupBegin, findAllUserExceptGroupBegin
        } = this.props.managePeople
        return (
            <Card
                size='small'
                type='inner'
                title='Add or remove people from the group'
            >
                <section className='manage_people_lists'>
                    <ListPeoples
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
                    <ListPeoples
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

ManagePeople.propTypes = {}

export default ManagePeople
