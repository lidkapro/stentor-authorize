import React from 'react'
import {Menu, Icon} from 'antd'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'


export const NavMenu = ({children, history, location}) =>
    <div>
        <Menu
            onClick={e => history.push(`/${e.key}`)}
            selectedKeys={[location.pathname.split('/')[1]]}
            style={{marginBottom: 20}}
            mode="horizontal"
        >
            <Menu.Item key='groups'>
                <Icon type="team"/>Groups
            </Menu.Item>
            <Menu.Item key='people'>
                <Icon type="user"/>People
            </Menu.Item>
        </Menu>
        {children}
    </div>

NavMenu.propTypes = {

}

export default withRouter(NavMenu)
