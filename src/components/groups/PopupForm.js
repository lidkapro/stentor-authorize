import React, {Component} from 'react'
import {Modal} from 'antd'
import GroupNameForm from './GroupNameForm'

class PopupForm extends Component {

    handleSubmit = e => {
        e.preventDefault()
        const {form, handleCancel, sendRequest} = this.props
        form.validateFields((err, values) => {
            if (!err) {
                sendRequest(values.groupName)
                form.setFields({newName: {value: ''}})
                handleCancel()
            }
        })
    }

    render() {
        const {form,title, handleCancel, visible} = this.props
        return (
            <Modal
                title={title}
                visible={visible}
                onOk={this.handleSubmit}
                onCancel={handleCancel}
            >
                <GroupNameForm form={form}/>
            </Modal>
        )
    }
}

PopupForm.propTypes = {}

export default PopupForm
