import React from 'react'
import {PageHeader} from 'antd'
import SearchInput from './SearchInput'


const HeadPeople = ({onSearch=f=>f}) =>
    <PageHeader
        className='header'
        title={<SearchInput onSearch={onSearch}/>}
    />

HeadPeople.propTypes = {}

export default HeadPeople
