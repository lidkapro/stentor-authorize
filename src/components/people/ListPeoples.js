import React, {Component} from 'react'
import {Icon, Table} from 'antd'
import {inject, observer} from 'mobx-react'

@inject('people')
@observer
class ListPeoples extends Component {
    componentDidMount() {
        const {people} = this.props
        people.findAllUser(0)
    }

    getColumns = () => {
        return [
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'name',
            },
            {
                title: 'e-mail',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Enabled',
                dataIndex: 'enabled',
                key: 'enabled',
                render: enabled => enabled ?
                    <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/> :
                    <Icon type="close-circle" theme="twoTone" twoToneColor="#eb2f96"/>
            }
            ,
            {
                title: 'Locked',
                dataIndex: 'locked',
                key: 'locked',
                render: locked => locked ?
                    <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/> :
                    <Icon type="close-circle" theme="twoTone" twoToneColor="#eb2f96"/>
            }
        ]
    }

    componentWillUnmount(){
        const {people} = this.props
        people.cleanLists()
    }

    render() {
        const {allPeople} = this.props.people
        return (
            <Table
                size='middle'
                bordered={true}
                style={{flex: '3 1 300px'}}
                columns={this.getColumns()}
                dataSource={allPeople}/>
        )
    }
}

ListPeoples.propTypes = {}

export default ListPeoples
