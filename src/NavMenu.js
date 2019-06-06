import React from 'react'
import {Button, Icon, Menu} from 'antd'
import {withRouter} from 'react-router-dom'


export const NavMenu = ({children, history, location}) =>
    <section>
        <header className='main_header'>
            <Menu
                onClick={e => history.push(`/${e.key}`)}
                selectedKeys={[location.pathname.split('/')[1]]}
                mode="horizontal"
            >
                <Menu.Item key='users'>
                    <Icon type="user"/>Users
                </Menu.Item>
                <Menu.Item key='groups'>
                    <Icon type="team"/>Groups
                </Menu.Item>
                <Menu.Item key='authorities'>
                    <Icon type="team"/>Authorities
                </Menu.Item>
            </Menu>
            <Button onClick={() => window.location = '/logout'} style={{marginRight: 10}}>Log out</Button>
        </header>
        {children}
    </section>

NavMenu.propTypes = {}

export default withRouter(NavMenu)
