import React, {Component} from 'react'
import {Button, Form, Icon, PageHeader} from 'antd'
import SearchInput from '../common/SearchInput'
import PopupForm from './PopupForm'


class HeadGroups extends Component {
    state = {
        visible: false,
    }

    handleCancel = () => {
        this.setState({visible: false})
    }

    showPopup = () => {
        this.setState({visible: true})
    }

    render() {
        const {visible} =this.state
        const {form, createGroup} = this.props
        return (
            <PageHeader
                className='header'
                title={<SearchInput/>}
                extra={[
                    <Button key='1' onClick={this.showPopup} type='primary'>
                        <Icon type="usergroup-add"/>Add group
                    </Button>
                ]}
            >
                <PopupForm
                    form={form}
                    title="Add group"
                    visible={visible}
                    handleCancel={this.handleCancel}
                    sendRequest={groupName => createGroup(groupName)}
                />
            </PageHeader>
        )
    }
}

HeadGroups.propTypes = {}

export default Form.create({name: 'add_group'})(HeadGroups)
