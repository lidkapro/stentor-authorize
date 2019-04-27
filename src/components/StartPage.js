import React, {Component} from 'react'
import {Button} from 'antd'
import {NavLink} from 'react-router-dom'



class StartPage extends Component {
    render() {
        return (
            <div>
                <NavLink to='/groups' style={{margin: 5}}>
                    <Button type="primary">Groups</Button>
                </NavLink>
                <NavLink to='/people'>
                    <Button type="primary">People</Button>
                </NavLink>
            </div>
        )
    }
}

StartPage.propTypes = {}

export default StartPage
