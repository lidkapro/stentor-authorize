import React, {Component} from 'react'
import ListPeoples from './ListPeoples'
import HeadPeople from './HeadPeople'
import MenuPeople from './MenuPeople'
import {inject, observer} from 'mobx-react'
import {Icon} from 'antd'
import {withRouter} from 'react-router-dom'
import Moment from 'react-moment'
import _ from 'lodash'

@inject('people')
@observer
class People extends Component {

    constructor(props){
        super(props)
        this.loadMoreData = _.debounce(this.loadMoreData, 200)
    }

    componentDidMount() {
        const {people, match} = this.props
        people.saveParams(match.params)
        people.findAllUserBegin(0)
    }

    loadMoreData = ({current}, a, {order, field}) => {
        const {people, history, match} = this.props
        const p = match.params
        const search = p.search ? `/${p.search}` : ''
        const page = current - 1
        const sort = !order ? 'not' : order === 'ascend' ? 'ASC' : 'DESC'
        const sortBy = sort === 'not' ? 'sort' : field
        history.push(`/people/${p.filter}/${sort}/${sortBy}${search}`)
        people.saveParams({sort: sort, sortBy: sortBy, filter: p.filter, search: p.search })
        people.findAllUserBegin(page)
    }

    componentWillUnmount() {
        const {people} = this.props
        people.cleanState()
    }

    getColumns = () => {
        const {people} = this.props
        return [
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
                sorter: () => {
                }
            },
            {
                title: 'e-mail',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Activation Date',
                dataIndex: 'activationDate',
                key: 'activationDate',
                sorter: (user) => {
                },
                render: date => date ? <Moment format='DD.MM.YYYY'>{date}</Moment> : <div/>
            },
            {
                title: 'Enabled',
                dataIndex: 'enabled',
                key: 'enabled',
                render: enabled => enabled ?
                    <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/> :
                    <Icon type="close-circle" theme="twoTone" twoToneColor="#eb2f96"/>
            },
            {
                title: 'Locked',
                dataIndex: 'locked',
                key: 'locked',
                render: locked => locked ?
                    <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/> :
                    <Icon type="close-circle" theme="twoTone" twoToneColor="#eb2f96"/>
            },
            {

                title: 'Action',
                key: 'action',
                render: user => !user.locked ?
                    <a onClick={() => people.lockUser(user.username)}>Lock</a> :
                    <a onClick={() => people.unLockUser(user.username)}>Unlock</a>
            }
        ]
    }

    render() {
        const {loading, total, dataListPeoples} = this.props.people
        return (
                <section className='all_people_table'>
                    <MenuPeople />
                    <ListPeoples
                        total={total.all}
                        loading={loading}
                        data={dataListPeoples}
                        columns={this.getColumns()}
                        loadMoreData={this.loadMoreData}
                    />
                </section>
        )
    }
}

People.propTypes = {}

export default withRouter(People)
