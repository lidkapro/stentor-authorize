import React, {Component} from 'react'
import {PageHeader, Button, Icon, Modal, Input} from 'antd'
import SearchInput from '../common/SearchInput'
import {PopupWindow} from '../HOCs/PopupWindow'
import {Form} from 'antd/lib/index'
import FormAddPerson from './FormAddPerson'

class HeadPeople extends Component {

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                alert('request sended')
                this.props.handleOk()
            }
        })
    }

    render() {
        const {form,visible, showModal, handleCancel} = this.props
        return (
            <PageHeader
                className='header'
                title={<SearchInput/>}
                extra={[
                    <Button key='1' onClick={showModal} type='primary'>
                        <Icon type="usergroup-add"/>Add person
                    </Button>
                ]}
            >
                <Modal
                    title="Add person"
                    visible={visible}
                    onOk={this.handleSubmit}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="1" onClick={handleCancel}>Cancel</Button>,
                        <Button key="2" type="primary" onClick={this.handleSubmit}>
                            Save
                        </Button>,
                        <Button key="3" type="primary" onClick={this.handleSubmit}>
                            Save and Add Another
                        </Button>,
                    ]}
                >
                    <div className=''>
                        <FormAddPerson form={form}/>
                    </div>
                </Modal>
            </PageHeader>
        )
    }
}

HeadPeople.propTypes = {}

export default Form.create({name: 'add_person'})(PopupWindow(HeadPeople))
