import React, {Component} from 'react'
import TitleGroup from './TitleGroup'
import NavButtons from './NavButtons'

class HeadGroup extends Component {
    render() {
        const {children} = this.props
        return (
            <div>
                <TitleGroup/>
                <NavButtons/>
                <div className='container'>
                    {children}
                </div>
            </div>
        )
    }
}

HeadGroup.propTypes = {}

export default HeadGroup
