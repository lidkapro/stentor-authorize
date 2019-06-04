import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import AuthoritiesByLetter from './AuthoritiesByLetter'
import {withRouter} from 'react-router-dom'

@inject('authorities')
@observer
class Authorities extends Component {

    componentWillMount() {
        const {authorities, match} = this.props
        authorities.findAllAuthorities()
        authorities.findGroupAuthorities(match.params.groupName)
    }

    componentWillUnmount() {
        const {authorities} = this.props
        authorities.cleanState()
    }

    render() {
        const {sortedByLetter} = this.props.authorities
        const {authorities, match} = this.props
        return (
            <div className='authorities'>{
                Object.keys(sortedByLetter).map((letter,i) =>
                    <AuthoritiesByLetter
                        key={i}
                        letter={letter}
                        authorities={authorities}
                        groupName={match.params.groupName}
                        authoritiesByLetter={sortedByLetter[letter]}
                    />)}
            </div>
        )
    }
}

Authorities.propTypes = {}

export default withRouter(Authorities)
