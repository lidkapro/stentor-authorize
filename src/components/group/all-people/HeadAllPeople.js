import React, {Component} from 'react'
import {PageHeader} from 'antd'
import SearchInput from '../../common/SearchInput'

class HeadAllPeople extends Component {
    render() {
        return (
            <PageHeader
                className='header'
                title={<SearchInput/>}
                extra={[]}
            />
        )
    }
}

HeadAllPeople.propTypes = {}

export default HeadAllPeople
