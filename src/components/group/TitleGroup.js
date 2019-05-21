import React, {Component} from 'react'
import {Button, Icon, PageHeader} from 'antd'
import {showDeleteConfirm} from './delete-group-confirm'


class TitleGroup extends Component {
    render() {
        const {match, goBack,deleteGroup} = this.props
        return (
            <PageHeader
                onBack={goBack}
                title={match.params.groupName}
                extra={[
                    <Button key='1' type="danger" onClick={() =>
                        showDeleteConfirm(match.params.groupName, deleteGroup)}>
                        <Icon type="delete"/>Delete group
                    </Button>,
                ]}
            />
        )
    }
}

TitleGroup.propTypes = {}

export default TitleGroup
