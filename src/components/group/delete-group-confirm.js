import {Modal} from 'antd'

const confirm = Modal.confirm

export function showDeleteConfirm(groupName, deleteGroup) {
    confirm({
        title: `Are you sure you want to delete ${groupName} group?`,
        content: 'Group cannot be restored',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            deleteGroup(groupName)
        }
    })
}