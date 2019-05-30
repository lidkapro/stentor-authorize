import React, {Component} from 'react'
import HeadGroups from './HeadGroups'
import ListGroups from './ListGroups'
import {inject, observer} from 'mobx-react'

@inject('groups')
@observer
class Groups extends Component {

    componentDidMount() {
        this.props.groups.findAllGroups()
    }

    componentWillUnmount() {
        this.props.groups.cleanState()
    }

    render() {
        const {groups} = this.props
        return (
            <main className='container groups_enter'>
                <HeadGroups createGroup={groups.createGroup}/>
                <ListGroups groups={groups}/>
            </main>
        )
    }
}

Groups.propTypes = {}

export default Groups
