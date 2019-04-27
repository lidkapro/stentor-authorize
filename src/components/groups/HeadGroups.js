import React, {Component} from 'react'
import {Button, Icon, PageHeader, Modal, Input} from 'antd'
import SearchInput from '../common/SearchInput'
import {PopupWindow} from '../HOCs/PopupWindow'


class HeadGroups extends Component {
    render() {
        const {visible,showModal,handleOk,handleCancel} = this.props
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
                    <Input placeholder="Enter group name"/>
                </Modal>
            </PageHeader>
        )
    }
}

HeadGroups.propTypes = {}

export default PopupWindow(HeadGroups)
