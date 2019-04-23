import React, {Component} from 'react'
import {PageHeader,Button,Icon} from 'antd'
import {withRouter} from 'react-router-dom'

class TitleGroup extends Component {
    render() {
        const {match,history} =this.props
        return (
            <PageHeader
                onBack={() => history.push('/groups')}
                title={match.params.groupName}
                extra={[
                    <Button type="danger"><Icon type="delete"/>Delete group</Button>,
                ]}
            />
        )
    }
}

TitleGroup.propTypes = {}

export default withRouter(TitleGroup)
