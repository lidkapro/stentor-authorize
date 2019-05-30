import React, {Component} from 'react'
import {Menu} from 'antd'
import {withRouter} from 'react-router-dom'
import {inject} from 'mobx-react/index'

@inject('people')
class MenuPeople extends Component {

    handleClick = e => {
        const {history, people,match} = this.props
        const search = match.params.search ? match.params.search : ''
        const params = {search: search,sortBy:'sort', filter: e.key, sort: 'not'}
        console.log(match.params)
        people.saveParams(params)
        people.findAllUserBegin(0)
        history.push(`/people/${e.key}/not/sort/${search}`)
    }

    render() {
        const {match} = this.props
        return (
            <Menu
                className='people_menu'
                mode='inline'
                defaultSelectedKeys={[match.params.filter]}
                onClick={this.handleClick}
            >
                <Menu.Item key="everyone">Everyone</Menu.Item>
                <Menu.Item key="active">Active</Menu.Item>
                <Menu.Item key="notActive">Not Active</Menu.Item>
                <Menu.Item key="banned">Banned</Menu.Item>
                <Menu.Item key="passwordReset">Password Reset</Menu.Item>
            </Menu>
        )
    }
}

MenuPeople.propTypes = {}

export default withRouter(MenuPeople)
