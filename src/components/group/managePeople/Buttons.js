import React, {Component} from 'react'
import {Button, Icon} from 'antd'

class Buttons extends Component {
    render() {
        const {toLeft, toRight, addUserToGroup, removeUserFromGroup} = this.props
        return (
            <section className='manage_people_buttons'>
                <Button onClick={addUserToGroup} disabled={toRight} style={{marginBottom: 5}}>
                    <Icon type="right"/>
                </Button>
                <Button onClick={removeUserFromGroup} disabled={toLeft}>
                    <Icon type="left"/>
                </Button>
            </section>
        )
    }
}

Buttons.propTypes = {}

export default Buttons
