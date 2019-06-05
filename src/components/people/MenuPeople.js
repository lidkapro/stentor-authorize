import React from 'react'
import {Menu} from 'antd'


const MenuPeople = ({changeFilter}) =>
    <Menu
        mode='inline'
        defaultSelectedKeys={['everyone']}
        onClick={changeFilter}
    >
        <Menu.Item key="everyone">Everyone</Menu.Item>
        <Menu.Item key="active">Active</Menu.Item>
        <Menu.Item key="notActive">Not Active</Menu.Item>
        <Menu.Item key="banned">Banned</Menu.Item>
        <Menu.Item key="passwordReset">Password Reset</Menu.Item>
    </Menu>


MenuPeople.propTypes = {}

export default MenuPeople
