import React, {Component} from 'react'
import {Card, Checkbox} from 'antd'
import {inject, observer} from 'mobx-react'
import TitleList from './TitleList'
import ContentList from './ContentList'
import SearchInput from '../../common/SearchInput'


@inject('managePeople')
@observer
class ListPeoples extends Component {
    render() {
        const {title, side, loadMoreData,filterByUsername} = this.props
        const {total, lists, checked, allChecked, changeChecked, changeAllChecked} = this.props.managePeople
        return (
            <Card title={
                <Checkbox disabled={!lists[side].length} checked={allChecked[side]}
                          onClick={() => changeAllChecked(side)}>
                    loaded {lists[side].length} / {total[side]}
                </Checkbox>
            }
                  extra={<TitleList title={title}/>}
                  style={{width: '45%'}}
            >
                <div style={{marginBottom:10}}>
                    <SearchInput onSearch={filterByUsername}/>
                </div>
                <ContentList
                    list={lists[side]}
                    checked={checked[side]}
                    loadMoreData={loadMoreData}
                    changeChecked={e => changeChecked(e, side)}
                />
            </Card>
        )
    }
}

ListPeoples.propTypes = {}

export default ListPeoples
