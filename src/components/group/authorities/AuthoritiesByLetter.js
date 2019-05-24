import React, {Component} from 'react'
import {Divider} from 'antd'
import Authority from './Authority'


class AuthoritiesByLetter extends Component {

    render() {
        const {rights, letter, groupName, authoritiesByLetter} = this.props
        return (
            <article style={{width: '45%'}}>
                <header>
                    <Divider orientation='left'>
                        <h2>{letter}</h2>
                    </Divider>
                </header>
                {authoritiesByLetter.map((authority, i) => (
                    <Authority
                        key={i}
                        rights={rights}
                        authority={authority}
                        groupName={groupName}
                    />))}
            </article>
        )
    }
}


export default AuthoritiesByLetter

