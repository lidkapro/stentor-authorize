import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Input} from 'antd'

const Search = Input.Search

class SearchInput extends Component {
    render() {
        return (
            <Search
                placeholder="search..."
                onSearch={value => console.log(value)}
                onChange={e => console.log(e.target.value)}
                style={{maxWidth:200}}
            />
        )
    }
}

SearchInput.propTypes = {}

export default SearchInput
