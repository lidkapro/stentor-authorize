import React, {Component} from 'react'
import {Divider, Radio} from 'antd'
import {withRouter} from 'react-router-dom'

class NavButtons extends Component {
    render() {
        const {history, location} = this.props
        return (
            <Divider orientation="left">
                <Radio.Group
                    value={location.pathname.split('/').pop()}
                    onChange={e => history.push(e.target.value)}
                >
                    <Radio.Button value="allPeople">People in a group</Radio.Button>
                    <Radio.Button value="manage">Manage people</Radio.Button>
                    <Radio.Button value="authorities">Authorities</Radio.Button>
                </Radio.Group>
            </Divider>
        )
    }
}

NavButtons.propTypes = {}

export default withRouter(NavButtons)
