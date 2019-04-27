import React, {Component} from 'react'
import {PageHeader} from 'antd'
import SearchInput from '../common/SearchInput'

class HeadPeople extends Component {
    render() {
        return (
            <PageHeader
                className='header'
                title={<SearchInput/>}
            />
        )
    }
}

HeadPeople.propTypes = {}

export default HeadPeople
