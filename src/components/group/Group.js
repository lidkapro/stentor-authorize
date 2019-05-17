import React, {Component} from 'react'
import TitleGroup from './TitleGroup'
import NavButtons from './NavButtons'
import {withRouter} from 'react-router-dom'


class Group extends Component {
    state = {exit: false}

    goBack = () => {
        const {history} = this.props
        this.setState({exit: true})
        setTimeout(() => history.push('/groups'),1200)
    }

    render() {
        const {exit} = this.state
        const {children} = this.props
        return (
            <div className='container'>
                <div className={!exit ? 'group_head_appearance' : 'group_head_disappearance'}>
                    <TitleGroup goBack={this.goBack}/>
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
