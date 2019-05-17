import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Button, Form, Icon, Input, Modal, PageHeader} from 'antd'
import SearchInput from '../common/SearchInput'
import {PopupWindow} from '../HOCs/PopupWindow'


@observer
class HeadGroups extends Component {
    render() {
        const {visible, showModal, handleOk,handleCancel} = this.props
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
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form.Item>
                        <Input placeholder='Enter name Group'/>
                    </Form.Item>
                </Modal>
            </PageHeader>
        )
    }
}

HeadGroups.propTypes = {}

export default PopupWindow(HeadGroups)
