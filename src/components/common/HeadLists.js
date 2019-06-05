import React, {Component} from 'react'
import {Button, Form, Icon} from 'antd'
import PopupFormName from './PopupFormName'


class HeadLists extends Component {
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
        const {visible} = this.state
        const {icon, form, title, sendRequest, placeholder} = this.props
        return (
            <div>
                <Button key='1' onClick={this.showPopup} type='primary'>
                    <Icon type={icon}/>{title}
                </Button>
                <PopupFormName
                    form={form}
                    title={title}
                    visible={visible}
                    sendRequest={sendRequest}
                    placeholder={placeholder}
                    handleCancel={this.handleCancel}
                />
            </div>
        )
    }
}

HeadLists.propTypes = {}

export default Form.create({name: 'add_by_name'})(HeadLists)
