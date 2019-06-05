import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {inject} from 'mobx-react'
import HeadGroup from './HeadGroup'
import {Card} from 'antd'

@inject('groups')
class Group extends Component {

    state = {exit: false}

    goBack = () => {
        const {history} = this.props
        this.setState({exit: true})
        setTimeout(() => history.push('/groups'), 800)
    }

    deleteGroup = () => {
        const {groups, match} = this.props
        groups.deleteGroup(match.params.groupName)
        this.goBack()
    }

    render() {
        const {exit} = this.state
        const {children, match} = this.props
        return (
            <Card className='container'>
               <HeadGroup
                   exit={exit}
                   match={match}
                   goBack={this.goBack}
                   deleteGroup={this.deleteGroup}
               />
                <section className={!exit ? 'group_enter' : 'group_exit'}>
                    {children}
                </section>
            </Card>
        )
    }
}

Group.propTypes = {}

export default withRouter(Group)
