import React, {Component} from 'react'
import {Button, Form, Icon, PageHeader} from 'antd'
import SearchInput from '../common/SearchInput'
import PopupForm from './PopupForm'


class HeadGroups extends Component {
    render() {
        const {showModal, createGroup} = this.props
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
                <PopupForm
                    {...this.props}
                    title="Add group"
                    sendRequest={groupName => createGroup(groupName)}
                />
            </PageHeader>
        )
    }
}

HeadGroups.propTypes = {}

export default Form.create({name: 'add_group'})(HeadGroups)
