import React from 'react'
import _ from 'lodash'
import Moment from 'react-moment'
import {Icon, Input, Tag} from 'antd'
import {inject} from 'mobx-react'
import Highlighter from 'react-highlight-words'

const FiltersAndSortPeople = ComposedComponent => {
    return inject('people')(class FiltersAndSortPeople extends ComposedComponent {

        constructor(props) {
            super(props)
            this.state = {
                searchText: '',
            }

            this.loadData = _.debounce(this.loadData, 200)
            this.searchByUsername = _.debounce(this.searchByUsername, 200)
        }

        componentDidMount() {
            const {people, match} = this.props
            const filter = match.params.groupName ? 'onlyGroup' : 'everyone'
            const groupName = match.params.groupName ? match.params.groupName : ''
            people.saveParams({filter: filter, groupName: groupName})
            people.findAllUserBegin(0)
        }

        changeFilter = e => {
            const {people} = this.props
            people.saveParams({filter: e.key, search: ''})
            people.findAllUserBegin(0)
        }

        searchByUsername = str => {
            const {people} = this.props
            people.saveParams({search: str})
            people.findAllUserBegin(0)
        }

        loadData = ({current}, a, {order, field}) => {
            const {people} = this.props
            const page = current - 1
            const sort = order ? order : ''
            const sortBy = sort ? field : ''
            people.saveParams({sort: sort, sortBy: sortBy})
            people.findAllUserBegin(page)
        }

        getColumns = () => {
            const {people} = this.props
            return [
                {
                    title: 'Username',
                    dataIndex: 'username',
                    key: 'username',
                    sorter: () => {
                    },
                    ...this.getColumnSearchProps('username')
                },
                {
                    title: 'e-mail',
                    dataIndex: 'email',
                    key: 'email',
                },
                {
                    title: 'Activation',
                    dataIndex: 'activationDate',
                    key: 'activationDate',
                    sorter: (user) => {
                    },
                    render: date => date ? <Moment format='DD.MM.YY HH:mm'>{date}</Moment> : <div/>
                },
                {
                    title: 'Groups',
                    dataIndex: 'groups',
                    key: 'groups',
                    render: groups =>
                        <span>
                       {groups.map(tag => (
                           <Tag color='geekblue' key={tag}>
                               {tag}
                           </Tag>
                       ))}
                       </span>
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

        getColumnSearchProps = dataIndex => ({
            filterDropdown: () => (
                <div style={{padding: 8}}>
                    <Input
                        ref={node => {
                            this.searchInput = node
                        }}
                        value={this.props.people.params.search}
                        placeholder={`Search ${dataIndex}`}
                        onChange={e => this.searchByUsername(e.target.value)}
                        style={{width: 150, marginBottom: 8, display: 'block'}}
                    />
                </div>
            ),
            filterIcon: filtered =>
                <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
            ,
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => this.searchInput.select())
                }
            },
            render: text => (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[this.props.people.params.search]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ),
        })


        componentWillUnmount() {
            const {people} = this.props
            people.saveParams({sort: '', sortBy: '', filter: 'everyone', search: ''})
            people.cleanState()
        }

        render() {
            return (
                <ComposedComponent
                    {...this.props}
                    loadData={this.loadData}
                    columns={this.getColumns()}
                    changeFilter={this.changeFilter}
                    searchByUsername={this.searchByUsername}
                />
            )
        }
    })
}

FiltersAndSortPeople.propTypes = {}

export default FiltersAndSortPeople
