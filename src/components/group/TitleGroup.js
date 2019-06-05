import React, {Component} from 'react'
import {Button, Icon, PageHeader, Typography} from 'antd'
import {showDeleteConfirm} from './help-functions/delete-group-confirm'


class TitleGroup extends Component {
    render() {
        const {match, goBack, deleteGroup} = this.props
        const title = groupName => `Are you sure you want to delete ${groupName} group?`
        const content = 'Group cannot be restored'
        return (
            <PageHeader
                onBack={goBack}
                title={<Typography.Title level={3}>{match.params.groupName}</Typography.Title>}
                extra={[
                    <Button key='1' type="danger"
                            onClick={() => showDeleteConfirm(title,content,match.params.groupName, deleteGroup)}>
                        <Icon type="delete"/>Delete group
                    </Button>,
                ]}
            />
        )
    }
}

TitleGroup.propTypes = {}

export default TitleGroup
