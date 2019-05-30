import React, {Component} from 'react'
import {Table} from 'antd'
import {observer} from 'mobx-react'


@observer
class ListPeoples extends Component {
    render() {
        const {data, total,columns, loading,loadMoreData} = this.props
        return (
            <Table
                size='middle'
                bordered={true}
                loading={loading}
                onChange={loadMoreData}
                columns={columns}
                style={{flex: '3 1 300px'}}
                dataSource={data}
                pagination={{total: total}}
            />
        )
    }
}

ListPeoples.propTypes = {}

export default ListPeoples
