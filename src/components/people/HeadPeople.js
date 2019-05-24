import React, {Component} from 'react'
import {Button, Icon, PageHeader} from 'antd'
import SearchInput from '../common/SearchInput'
import {PopupWindow} from '../HOCs/PopupWindow'
import PopupForm from './PopupForm'

class HeadPeople extends Component {
    render() {
        const {showModal, handleSubmit} = this.props
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
                <PopupForm
                    {...this.props}
                    handleSubmit={handleSubmit}
                />
            </PageHeader>
        )
    }
}

HeadPeople.propTypes = {}

export default PopupWindow(HeadPeople)
