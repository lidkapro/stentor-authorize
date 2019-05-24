import React, {Component} from 'react'
import {Form, Input, Select} from 'antd'

const {Option} = Select

class FormAddPerson extends Component {
    render() {
        const {getFieldDecorator} = this.props.form

        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 18},
        }
        return (
            <Form layout='horizontal'>
                <Form.Item
                    {...formItemLayout}
                    label="Username"
                >
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input username!'}],
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="E-Mail"
                >
                    {getFieldDecorator('eMail', {
                        rules: [{
                            type: 'email', message: 'The input is not valid e-mail!',
                        }, {
                            required: true, message: 'Please input e-mail!',
                        }],
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Groups"
                >
                    {getFieldDecorator('select-multiple', {
                        rules: [
                            {required: true, message: 'Please select groups!', type: 'array'},
                        ],
                    })(
                        <Select mode="multiple">
                            <Option value="users">Users</Option>
                            <Option value="managers">Managers</Option>
                            <Option value="cats">Cats</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Password"
                    hasFeedback
                >
                    <Select defaultValue="1">
                        <Option value="1">Set by User</Option>
                        <Option value="2">Option 2</Option>
                        <Option value="3">Option 3</Option>
                    </Select>
                </Form.Item>
            </Form>
        )
    }
}

FormAddPerson.propTypes = {}

export default FormAddPerson
