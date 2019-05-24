import React, {Component} from 'react'
import {Button, Modal} from 'antd'
import FormAddPerson from './form-add-person/FormAddPerson'


class PopupForm extends Component {
    render() {
        const {form,visible,handleSubmit,handleCancel}=this.props
        return (
            <Modal
                title="Add person"
                visible={visible}
                onOk={handleSubmit}
                onCancel={handleCancel}
                footer={[
                    <Button key="1" onClick={handleCancel}>Cancel</Button>,
                    <Button key="2" type="primary" onClick={handleSubmit}>
                        Save
                    </Button>,
                    <Button key="3" type="primary" onClick={handleSubmit}>
                        Save and Add Another
                    </Button>,
                ]}
            >
                <FormAddPerson form={form}/>
            </Modal>
        )
    }
}

PopupForm.propTypes = {}

export default PopupForm
