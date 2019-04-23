import React, {Component} from 'react'
import {Button, Icon, PageHeader, Modal, Input} from 'antd'
import SearchInput from '../common/SearchInput'


class HeadGroups extends Component {
    state = {visible: false}

    showModal = () => {
        this.setState({visible: true})
    }

    handleOk = () => {
        this.setState({visible: false})
    }

    handleCancel = () => {
        this.setState({visible: false})
    }

    render() {
        const {visible} = this.state
        return (
            <PageHeader
                className='header'
                title={<SearchInput/>}
                extra={[
                    <Button onClick={this.showModal} type='primary'>
                        <Icon type="usergroup-add"/>Add group
                    </Button>
                ]}
            >
                <Modal
                    title="Add group"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Input placeholder="Enter group name"/>
                </Modal>
            </PageHeader>
        )
    }
}

HeadGroups.propTypes = {}

export default HeadGroups
