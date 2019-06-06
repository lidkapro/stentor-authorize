import React, {Component} from 'react'
import {Card} from 'antd'
import {showDeleteConfirm} from './group/help-functions/delete-group-confirm'
import ListItems from './common/ListItems'
import HeadLists from './common/HeadLists'
import {inject, observer} from 'mobx-react'
import Moment from 'react-moment'
import ListsControl from './HOCs/ListsControl'
import moment from 'moment'

@inject('authorities')
@observer
class ManageAuthorities extends Component {

    componentDidMount() {
        this.props.authorities.findAllAuthorities()
    }

    getData() {
        const {authorities} = this.props
        return authorities.all.map((auth, i) => ({...auth, key: i}))
    }

    getColumns() {
        const {authorities, getOldName, getColumnSearchProps} = this.props
        const title = name => `Are you sure you want to delete ${name} authority?`
        const content = 'Authority cannot be restored'
        return [
            {
                title: 'Name',
                dataIndex: 'authority',
                key: 'authority',
                ...getColumnSearchProps('authority'),
            },
            {
                title: 'Created by',
                dataIndex: 'createdBy',
                key: 'createdBy',
            },
            {
                title: 'Created date',
                dataIndex: 'createdDate',
                key: 'createdDate',
                sorter:(a,b) => moment(a.createdDate).format('DD.MM.YY HH:mm') - moment(b.createdDate).format('DD.MM.YY HH:mm'),
                render: date => date ? <Moment format='DD.MM.YY HH:mm'>{date}</Moment> : <div/>
            },
            {
                title: 'Modified by',
                dataIndex: 'modifiedBy',
                key: 'modifiedBy',
            },

            {
                title: 'Modified date',
                dataIndex: 'modifiedDate',
                key: 'modifiedDate',
                render: date => date ? <Moment format='DD.MM.YY HH:mm'>{date}</Moment> : <div/>
            },
            {
                title: 'Actions',
                key: 'actions',
                render: auth => <section>
                    <a onClick={() => showDeleteConfirm(title, content, auth.authority, authorities.deleteAuthority)}>Delete </a> /
                    <a onClick={() => getOldName(auth.authority)}> Rename</a>
                </section>
            }
        ]
    }

    componentWillUnmount() {
        this.props.authorities.cleanState()
    }

    render() {
        const {visible, oldName, authorities, getOldName, handleCancel = f => f} = this.props
        return (
            <Card title='Authorities' className='container groups_enter'
                  extra={<HeadLists
                      title="Add authority"
                      icon='plus-circle'
                      placeholder='enter name authority...'
                      sendRequest={name => authorities.createAuthority(name)}
                  />}>
                <ListItems
                    visible={visible}
                    title="Rename authority"
                    placeholder='enter new name authority...'
                    getOldName={getOldName}
                    getData={this.getData()}
                    handleCancel={handleCancel}
                    getColumns={this.getColumns()}
                    sendRequest={name => authorities.renameAuthority(oldName, name)}
                />
            </Card>
        )
    }
}


export default ListsControl(ManageAuthorities)
