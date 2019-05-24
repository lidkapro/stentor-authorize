import React, {Component} from 'react'
import {inject, observer} from 'mobx-react/index'
import AuthoritiesByLetter from './AuthoritiesByLetter'
import {withRouter} from 'react-router-dom'

@inject('rights')
@observer
class Authorities extends Component {

    componentWillMount() {
        const {rights, match} = this.props
        rights.findAllAuthorities(match.params.groupName)
    }

    componentWillUnmount() {
        const {rights} = this.props
        rights.cleanLists()
    }

    render() {
        const {allAuthorities, authorities} = this.props.group
        const {rights, match} = this.props
        return (
            <div className='authorities'>{
                Object.keys(allAuthorities).map((letter, i) =>
                    <AuthoritiesByLetter
                        key={i}
                        rights={rights}
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
