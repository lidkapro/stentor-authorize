import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'antd'
import {NavLink} from 'react-router-dom'

class StartPage extends Component {
    render() {
        return (
            <div>
                <NavLink to='/main/groups' style={{margin:5}}>
                    <Button type="primary">Groups</Button>
                </NavLink>
                <NavLink to='/main/people'>
                    <Button type="primary">People</Button>
                </NavLink>
            </div>
        )
    }
}

StartPage.propTypes = {}

export default StartPage
