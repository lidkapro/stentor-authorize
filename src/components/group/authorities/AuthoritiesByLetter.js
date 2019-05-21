import React, {Component} from 'react'
import {Divider} from 'antd'
import Authority from './Authority'


class AuthoritiesByLetter extends Component {

    render() {
        const {group, letter,groupName, authoritiesByLetter} = this.props
        return (
            <div style={{width: '45%'}}>
                <Divider orientation='left'><h1>{letter}</h1></Divider>
                {authoritiesByLetter.map((authority, i) => (
                    <Authority
                        key={i}
                        group={group}
                        authority={authority}
                        groupName={groupName}
                    />))}
            </div>
        )
    }
}


export default AuthoritiesByLetter

