import React, {Component} from 'react'
import {Card, Checkbox, Layout} from 'antd'
import {inject, observer} from 'mobx-react'
import TitleList from './TitleList'
import ContentList from './ContentList'
import SearchInput from '../../common/SearchInput'

const {Footer} = Layout

@inject('manageUsers')
@observer
class ListUsers extends Component {
    render() {
        const {title, side, loadMoreData, filterByUsername} = this.props
        const {total, lists, checked, allChecked, changeChecked, changeAllChecked} = this.props.manageUsers
        return (
            <div style={{width: '45%'}}>
                <Layout>
                    <Card title={
                        <Checkbox disabled={!lists[side].length} checked={allChecked[side]}
                                  onClick={() => changeAllChecked(side)}>
                            {checked[side].length} / {lists[side].length}
                        </Checkbox>
                    }
                          extra={<TitleList title={title}/>}
                    >
                        <div style={{marginBottom: 10}}>
                            <SearchInput onSearch={filterByUsername}/>
                        </div>
                        <ContentList
                            list={lists[side]}
                            checked={checked[side]}
                            loadMoreData={loadMoreData}
                            changeChecked={e => changeChecked(e, side)}
                        />
                    </Card>
                </Layout>
                <Layout style={{border:'0.3px solid rgba(0, 0, 0, .1)'}}>
                    <div style={{backgroundColor:'white',padding:'8px 0 8px 24px'}}>loaded {lists[side].length} / {total[side]}</div>
                </Layout>
            </div>
        )
    }
}

ListUsers.propTypes = {}

export default ListUsers
