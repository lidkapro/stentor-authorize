import React, {Component} from 'react'
import HeadGroups from './HeadGroups'
import ListGroups from './ListGroups'
import {inject, observer} from 'mobx-react'

@inject('groups')
@observer
class Groups extends Component {

    state = {
        visible: false,
        oldName: ''
    }

    handleCancel = () => {
        this.setState({visible: false})
    }

    showModal = () => {
        this.setState({visible: true})
    }


    componentWillMount() {
        this.props.groups.findAllGroups()
    }

    componentWillUnmount() {
        this.props.groups.cleanList()
    }

    render() {
        const {groups} = this.props
        return (
            <main className='container groups_enter'>
                <HeadGroups
                    {...this.state}
                    showModal={this.showModal}
                    createGroup={groups.createGroup}
                    handleCancel={this.handleCancel}
                />
                <ListGroups
                    {...this.state}
                    groups={groups}
                    showModal={this.showModal}
                    handleCancel={this.handleCancel}
                />
            </main>
        )
    }
}

Groups.propTypes = {}

export default Groups
