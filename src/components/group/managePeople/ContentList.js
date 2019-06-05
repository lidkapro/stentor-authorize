import React from 'react'
import {Checkbox, Row, Col} from 'antd'
import {observer} from 'mobx-react'


const ContentList = observer(({list, checked, changeChecked, loadMoreData}) =>
    <div
        onScroll={loadMoreData}
        onMouseMove={list.length < 10 ? loadMoreData : f => f}
        className='manage_people_list'
    >
        {list.map(user => (
            <Row key={user.username}
                 className={user.removed ? 'manage_people_checkbox_remove' : 'manage_people_checkbox'}>
                <Col>
                    <Checkbox
                        checked={checked.indexOf(user.username) !== -1}
                        value={user.username}
                        style={{width: '100%'}}
                        onChange={changeChecked}>{user.username}</Checkbox>
                </Col>
            </Row>
        ))}
    </div>)


ContentList.propTypes = {}

export default ContentList
