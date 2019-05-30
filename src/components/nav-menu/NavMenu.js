import React from 'react'
import {Icon, Menu} from 'antd'
import {withRouter} from 'react-router-dom'


export const NavMenu = ({children, history, location}) =>
    <header>
        <nav>
            <Menu
                selectedKeys={[location.pathname.split('/')[1]]}
                style={{marginBottom: 20}}
                mode="horizontal"
            >
                <Menu.Item key='groups' onClick={e => history.push(`/${e.key}`)}>
                    <Icon type="team"/>Groups
                </Menu.Item>
                <Menu.Item key='people' onClick={e => history.push(`/${e.key}/everyone/not/sort`)}>
                    <Icon type="user"/>People
                </Menu.Item>
            </Menu>
            {children}
        </nav>
    </header>

NavMenu.propTypes = {}

export default withRouter(NavMenu)
