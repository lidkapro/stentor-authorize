import React, {Component} from 'react'
import {Button, Icon, Modal, PageHeader} from 'antd'
import {withRouter} from 'react-router-dom'

const confirm = Modal.confirm

function showDeleteConfirm(match) {
    confirm({
        title: `Are you sure you want to delete ${match.params.groupName} group?`,
        content: 'Group cannot be restored',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            console.log('OK')
        },
        onCancel() {
            console.log('Cancel')
        },
    })
}

class TitleGroup extends Component {
    render() {
        const {match, goBack} = this.props
        return (
            <PageHeader
                onBack={goBack}
                title={match.params.groupName}
                extra={[
                    <Button key='1' type="danger" onClick={()=>showDeleteConfirm(match)}>
                        <Icon type="delete"/>Delete group
                    </Button>,
                ]}
            />
        )
    }
}

TitleGroup.propTypes = {}

export default withRouter(TitleGroup)
