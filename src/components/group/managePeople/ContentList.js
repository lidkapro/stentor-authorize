import React from 'react'
import {Checkbox} from 'antd'
import {observer} from 'mobx-react'


const ContentList = observer(({list, checked, changeChecked, loadMoreData}) =>
    <div
        onScroll={loadMoreData}
        onMouseMove={list.length < 10 ? loadMoreData : f=>f}
        className='manage_people_list'
    >
        {list.map(user => (
            <div key={user.username} className={user.removed ? 'manage_people_checkbox_remove':'manage_people_checkbox'}>
                <Checkbox
                    checked={checked.indexOf(user.username) !== -1}
                    value={user.username}
                    style={{width: '100%'}}
                    onChange={changeChecked}>{user.username}</Checkbox>
            </div>
        ))}
    </div>)


ContentList.propTypes = {}

export default ContentList
