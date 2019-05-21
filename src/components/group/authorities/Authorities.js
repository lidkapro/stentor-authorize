import React, {Component} from 'react'
import {inject, observer} from 'mobx-react/index'
import AuthoritiesByLetter from './AuthoritiesByLetter'
import {withRouter} from 'react-router-dom'

@inject('group')
@observer
class Authorities extends Component {

    componentWillMount() {
        const {group, match} = this.props
        group.findAllAuthorities(match.params.groupName)
    }

    componentWillUnmount() {
        const {group} = this.props
        group.cleanLists()
    }

    render() {
        const {allAuthorities, authorities} = this.props.group
        const {group,match} = this.props
        return (
            <div style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between', padding: '0 5%'}}>
                {Object.keys(allAuthorities).map((letter, i) =>
                    <AuthoritiesByLetter
                        key={i}
                        group={group}
                        letter={letter}
                        authorities={authorities}
                        groupName={match.params.groupName}
                        authoritiesByLetter={allAuthorities[letter]}
                    />)}
            </div>
        )
    }
}

Authorities.propTypes = {}

export default withRouter(Authorities)
