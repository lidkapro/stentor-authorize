import React, {Component} from 'react'
import HeadGroups from './HeadGroups'
import ListGroups from './ListGroups'
import {inject,observer} from 'mobx-react'

@inject('groups')
@observer
class Groups extends Component {

    componentWillMount() {
        this.props.groups.findAllGroups()
    }

    componentWillUnmount(){
        this.props.groups.cleanList()
    }


    render() {
        const {groups} = this.props
        return (
            <main className='container groups_enter'>
                <HeadGroups createGroup={groups.createGroup}/>
                <ListGroups
                    groups={groups.list}
                    deleteGroup={groups.deleteGroup}
                    renameGroup={groups.renameGroup}
                />
            </main>
        )
    }
}

Groups.propTypes = {}

export default Groups
