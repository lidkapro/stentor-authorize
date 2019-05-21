import React, {Component} from 'react'
import {Switch} from 'antd'
import {observer} from 'mobx-react'

@observer
class Authority extends Component {

    handleChange = (v,e) => {
        e.preventDefault()
        const {authority, group,groupName} = this.props
        authority.checked ?
            group.removeGroupAuthority(groupName, authority) : group.addGroupAuthority(groupName, authority)
    }

    render() {
        const {authority} = this.props
        return (
            <div className='authority' key={authority.name}>
                <p>{authority.name}</p>
                <Switch
                    checked={authority.checked}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}


export default Authority
