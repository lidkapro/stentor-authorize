import React from 'react'
import {Input} from 'antd'

const Search = Input.Search

const SearchInput = ({onSearch=f=>f}) =>
    <Search
        placeholder="search..."
        onSearch={value => onSearch(value)}
        onChange={e => onSearch(e.target.value)}
    />


SearchInput.propTypes = {}

export default SearchInput
