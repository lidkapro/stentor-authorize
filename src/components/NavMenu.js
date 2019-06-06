import React from 'react'
import {Button, Icon, Menu} from 'antd'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

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
                <form action="/logout"
                      method="post">
                    <Button htmlType="submit" style={{marginRight: 10}}>Log out</Button>

                    <input type="hidden"
                           name="${_csrf.parameterName}"
                           value="${_csrf.token}"/>
                </form>
            </header>
            {children}
        </section>


NavMenu.propTypes = {}

export default withRouter(NavMenu)
