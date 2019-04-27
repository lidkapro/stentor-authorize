import React, {Component} from 'react'
import {Card} from 'antd'
import ListPeoples from './ListPeoples'
import HeadPeople from './HeadPeople'
import MenuPeople from '../groups/MenuPeople'


class People extends Component {
    render() {
        return (
            <div className='container'>
                <HeadPeople/>
                <div style={{display: 'flex', flexFlow: 'row nowrap', border: '0.3px solid rgba(0,0,0,.1)',marginBottom:'10px'}}>
                    <MenuPeople/>
                    <ListPeoples/>
                </div>
            </div>
        )
    }
}

People.propTypes = {}

export default People
