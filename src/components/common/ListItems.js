import React from 'react'
import {Table} from 'antd'
import {Form} from 'antd/lib/index'
import PopupFormName from './PopupFormName'
import {observer} from 'mobx-react'


const ListItems = observer(({title, form, visible, getData, getColumns, placeholder, sendRequest, handleCancel}) =>
    <section>
        <PopupFormName
            placeholder={placeholder}
            form={form}
            visible={visible}
            title={title}
            handleCancel={handleCancel}
            sendRequest={sendRequest}
        />
        <Table
            size='middle'
            columns={getColumns}
            dataSource={getData}
        />
    </section>)


ListItems.propTypes = {}

export default Form.create({name: 'rename'})(ListItems)
