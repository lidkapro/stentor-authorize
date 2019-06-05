import React from 'react'
import {Icon, Menu} from 'antd'
import {withRouter} from 'react-router-dom'


export const NavMenu = ({children, history, location}) =>
    <header>
        <nav>
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
                <Menu.Item key='authorities'>
                    <Icon type="team"/>Authorities
                </Menu.Item>
            </Menu>
            {children}
        </nav>
    </header>

NavMenu.propTypes = {}

export default withRouter(NavMenu)
