import React, {Component} from 'react'
import {Form, Input} from 'antd'

class GroupNameForm extends Component {
    render() {
        const {form} = this.props
        return (
            <Form layout='horizontal'>
                <Form.Item>
                    {form.getFieldDecorator('groupName', {
                        rules: [{required: true, message: 'Required field'}],
                    })(
                        <Input placeholder='Enter new name Group'/>
                    )}
                </Form.Item>
            </Form>
        )
    }
}

GroupNameForm.propTypes = {}

export default GroupNameForm
