import React, {Component} from 'react'
import {Form, Input, Modal} from 'antd'

class RenameGroupForm extends Component {

    handleSubmit = e => {
        e.preventDefault()
        const {form, handleCancel,oldName, renameGroup} = this.props
        form.validateFields((err, values) => {
            if (!err) {
                renameGroup(oldName,values.newName)
                form.setFields({newName:{value:''}})
                handleCancel()
            }
        })
    }

    render() {
        const {form,handleCancel,visible} = this.props
        return (
            <Modal
                title="Rename group"
                visible={visible}
                onOk={this.handleSubmit}
                onCancel={handleCancel}
            >
                <Form layout='horizontal'>
                    <Form.Item>
                        {form.getFieldDecorator('newName', {
                            rules: [{required: true, message: 'Required field'}],
                        })(
                            <Input placeholder='Enter new name Group'/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

RenameGroupForm.propTypes = {}

export default  Form.create({name: 'rename_group'})(RenameGroupForm)
