import React, {Component} from 'react'
import {Button, Form, Icon, Input, Modal, PageHeader} from 'antd'
import SearchInput from '../common/SearchInput'
import {PopupWindow} from '../HOCs/PopupWindow'


class HeadGroups extends Component {

    handleSubmit = e => {
        e.preventDefault()
        const {form, handleOk, createGroup} = this.props
        form.validateFields((err, values) => {
            if (!err) {
                createGroup(values.groupName)
                form.setFields({groupName:{value:''}})
                handleOk()
            }
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form
        const {visible, showModal, handleCancel} = this.props
        return (
            <PageHeader
                className='header'
                title={<SearchInput/>}
                extra={[
                    <Button key='1' onClick={showModal} type='primary'>
                        <Icon type="usergroup-add"/>Add group
                    </Button>
                ]}
            >
                <Modal
                    title="Add group"
                    visible={visible}
                    onOk={this.handleSubmit}
                    onCancel={handleCancel}
                >
                    <Form layout='horizontal'>
                        <Form.Item>
                            {getFieldDecorator('groupName', {
                                rules: [{required: true, message: 'Required field'}],
                            })(
                                <Input placeholder='Enter name Group'/>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </PageHeader>
        )
    }
}

HeadGroups.propTypes = {}

export default Form.create({name: 'add_group'})(PopupWindow(HeadGroups))
