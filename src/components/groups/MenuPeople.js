import React, {Component} from 'react'
import {Menu} from 'antd'

const MenuItemGroup = Menu.ItemGroup;


class MenuPeople extends Component {
    render() {
        return (
            <Menu
                style={{border: '0.3px solid rgba(0,0,0,.1)',padding:0,background:'whitesmoke',flex:'1 1 100px'}}
                mode='inline'
                defaultSelectedKeys={['0']}
            >
                <Menu.Item key="0">Everyone</Menu.Item>
                <MenuItemGroup key="g1" title="ONBOARDING">
                    <Menu.Item key="1">Staged</Menu.Item>
                    <Menu.Item key="2">Pending user action</Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup key="g2" title="ACTIVE">
                    <Menu.Item key="4">Password Reset</Menu.Item>
                    <Menu.Item key="5">Password Expired</Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup key="g3" title="INACTIVE">
                    <Menu.Item key="6">Suspended</Menu.Item>
                    <Menu.Item key="7">Deactivated</Menu.Item>
                </MenuItemGroup>
            </Menu>
        )
    }
}

MenuPeople.propTypes = {}

export default MenuPeople
