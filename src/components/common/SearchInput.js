import React, {Component} from 'react'
import {Input} from 'antd'

const Search = Input.Search

class SearchInput extends Component {
    render() {
        const {onSearch = f => f} = this.props
        return (
            <Search
                placeholder="search..."
                onSearch={value => onSearch(value)}
                onChange={e => onSearch(e.target.value)}
                style={{maxWidth: 200}}
            />
        )
    }
}

SearchInput.propTypes = {}

export default SearchInput
