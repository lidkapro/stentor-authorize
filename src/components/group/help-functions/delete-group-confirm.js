import {Modal} from 'antd'

const confirm = Modal.confirm

export function showDeleteConfirm(title,content,name, deleteFunc) {
    confirm({
        title: title(name),
        content: content,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            deleteFunc(name)
        }
    })
}