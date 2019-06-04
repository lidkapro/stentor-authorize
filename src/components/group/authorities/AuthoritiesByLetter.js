import React, {Component} from 'react'
import {Divider} from 'antd'
import Authority from './Authority'
import {observer} from 'mobx-react'


@observer
class AuthoritiesByLetter extends Component {

    render() {
        const {authorities, letter, groupName, authoritiesByLetter} = this.props
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
                        authority={authority}
                        groupName={groupName}
                        authorities={authorities}
                    />))}
            </article>
        )
    }
}


export default AuthoritiesByLetter

