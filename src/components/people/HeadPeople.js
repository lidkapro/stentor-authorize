import React, {Component} from 'react'
import {PageHeader} from 'antd'
import SearchInput from '../common/SearchInput'
import {inject, observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import _ from 'lodash'


@inject('people')
@observer
class HeadPeople extends Component {

    constructor(props) {
        super(props)
        this.state ={
            search:''
        }
        this.searchByUsername = _.debounce(this.searchByUsername, 200)
    }

    searchByUsername = str => {
        const {history, location} = this.props
        const search = str ? str : ''
        this.setState({search:search})
        const url = location.pathname.split('/')
        const [, people, filter, sort, sortBy] = url
        history.push(`/${people}/${filter}/${sort}/${sortBy}/${search}`)
        this.props.people.saveParams({filter: filter, sort: sort, sortBy: sortBy, search: str})
        this.props.people.findAllUserBegin(0)
    }
    // componentWillUpdate(nextProps){
    //     const {location} = this.props
    //     const urlNext = nextProps.location.pathname.split('/')
    //     const [, , filterNext, sortNext] = urlNext
    //     const url = location.pathname.split('/')
    //     const [, , filter, sort] = url
    //     if(this.state.search) {
    //         if (sortNext !== sort || filterNext !== filter) {
    //             this.searchByUsername(this.state.search)
    //         }
    //     }
    // }

    render() {

        return (
            <PageHeader
                className='header'
                title={<SearchInput onSearch={this.searchByUsername}/>}
            />
        )
    }
}

HeadPeople.propTypes = {}

export default withRouter(HeadPeople)
