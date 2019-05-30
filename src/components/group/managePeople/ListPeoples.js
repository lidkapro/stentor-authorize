import React, {Component} from 'react'
import {Card, Checkbox, Col, Icon} from 'antd'

class ListPeoples extends Component {
    render() {
        const {title, side, list, onChange, onScroll} = this.props
        return (
            <Card title={
                <header>
                    {title === 'Members' ?
                        <Icon style={{marginRight: 3}} type="smile" theme="twoTone"/> :
                        <Icon style={{marginRight: 3}} type="frown" theme="twoTone" twoToneColor="#eb2f96"/>}
                    {title}
                </header>}
                  style={{width: '45%'}}
            >
                <Checkbox.Group
                    onScroll={onScroll}
                    className='manage_people_list'
                >
                    {list.map(l => (
                        <Col key={l.id} style={{marginBottom: 10}}>
                            <Checkbox onChange={e => onChange(e, side)} value={l.username}>{l.username}</Checkbox>
                        </Col>
                    ))}
                </Checkbox.Group>
            </Card>
        )
    }
}

ListPeoples.propTypes = {}

export default ListPeoples
