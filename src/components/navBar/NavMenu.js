import React from 'react'
import {Menu, Icon} from 'antd'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'


export const NavMenu = ({children, history, location}) =>
    <div>
        <Menu
            onClick={e => history.push(e.key)}
            selectedKeys={[location.pathname]}
            mode="horizontal"
        >
            <Menu.Item key='/main/groups'>
                <Icon type="team"/>Groups
            </Menu.Item>
            <Menu.Item key='/main/people'>
                <Icon type="user"/>People
            </Menu.Item>
        </Menu>
        {children}
    </div>

NavMenu.propTypes = {
    children:PropTypes.array
}

export default withRouter(NavMenu)
