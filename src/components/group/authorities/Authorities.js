import React, {Component} from 'react'
import {Divider, Switch} from 'antd'

const authorities = ['addGroupAuthority', 'addToCatAlbum', 'addToCatComments',]

class Authorities extends Component {
    render() {
        return (
            <div
                style={{display: 'flex',justifyContent:'space-around', height: 300}}
            >
                <div style={{width: '40%'}}>
                    <Divider orientation='left'><h1>A</h1></Divider>
                    {authorities.map(a => (<div className='authority' key={a}>{a}<Switch/></div>))}
                </div>
                <div style={{width: '40%'}}>
                    <Divider orientation='left'><h1>B</h1></Divider>
                    {authorities.map(a => (<div className='authority' key={a}>{a}<Switch/></div>))}
                </div>
            </div>
        )
    }
}

Authorities.propTypes = {}

export default Authorities
