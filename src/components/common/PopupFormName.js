import React, {Component} from 'react'
import {Modal} from 'antd'
import NameForm from './NameForm'

class PopupFormName extends Component {

    handleSubmit = e => {
        e.preventDefault()
        const {form, handleCancel, sendRequest} = this.props
        form.validateFields((err, values) => {
            if (!err) {
                sendRequest(values.name)
                form.setFields({name: {value: ''}})
                handleCancel()
            }
        })
    }

    render() {
        const {form,title, handleCancel, visible,placeholder} = this.props
        return (
            <Modal
                title={title}
                visible={visible}
                onOk={this.handleSubmit}
                onCancel={handleCancel}
            >
                <NameForm form={form} placeholder={placeholder}/>
            </Modal>
        )
    }
}

PopupFormName.propTypes = {}

export default PopupFormName
