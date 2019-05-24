import React, {Component} from 'react'
import {InputNumber, PageHeader} from 'antd'
import SearchInput from '../../common/SearchInput'

class HeadAllPeople extends Component {
    render() {
        const {pageSize, changeSize} = this.props
        return (
            <PageHeader
                className='header'
                title={<SearchInput/>}
                extra={[
                    <div key='1' style={{display: 'flex', alignItems: 'center'}}>
                        Show
                        <InputNumber
                            defaultValue={pageSize}
                            min={0}
                            max={100}
                            style={{marginLeft: 5}}
                            formatter={value => value < 100 ? `${value}` : 100}
                            onChange={changeSize}
                        />
                    </div>
                ]}
            />
        )
    }
}

HeadAllPeople.propTypes = {}

export default HeadAllPeople
