import React from 'react'
import {Form, Input} from 'antd'

const NameForm = ({form, placeholder}) =>
    <Form layout='horizontal'>
        <Form.Item>
            {form.getFieldDecorator('name', {
                rules: [{required: true, message: 'Required field'}],
            })(
                <Input placeholder={placeholder}/>
            )}
        </Form.Item>
    </Form>

NameForm.propTypes = {}

export default NameForm
