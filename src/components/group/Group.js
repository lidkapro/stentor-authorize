import React, {Component} from 'react'
import TitleGroup from './TitleGroup'
import NavButtons from './NavButtons'
import {withRouter} from 'react-router-dom'
import {inject} from 'mobx-react'


@inject('group')
class Group extends Component {

    constructor(props) {
        super(props)
        this.state = {exit: false}
        this.goBack = this.goBack.bind(this)
        this.deleteGroup = this.deleteGroup.bind(this)
    }

    goBack() {
        const {history} = this.props
        this.setState({exit: true})
        setTimeout(() => history.push('/groups'), 800)
    }

    deleteGroup() {
        const {group, match} = this.props
        group.deleteGroup(match.params.groupName)
        this.goBack()
    }

    render() {
        const {exit} = this.state
        const {children, match} = this.props
        return (
            <div className='container'>
                <div className={!exit ? 'group_head_appearance' : 'group_head_disappearance'}>
                    <TitleGroup
                        match={match}
                        goBack={this.goBack}
                        deleteGroup={this.deleteGroup}
                    />
                    <NavButtons/>
                </div>
                <div className={!exit ? 'group_enter' : 'group_exit'}>
                    {children}
                </div>
            </div>
        )
    }
}

Group.propTypes = {}

export default withRouter(Group)
