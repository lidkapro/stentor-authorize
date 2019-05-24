import React, {Component} from 'react'
import TitleGroup from './TitleGroup'
import NavButtons from './NavButtons'


class HeadGroup extends Component {
    render() {
        const {match, exit,goBack,deleteGroup} = this.props
        return (
            <header className={!exit ? 'group_head_appearance' : 'group_head_disappearance'}>
                <TitleGroup
                    match={match}
                    goBack={goBack}
                    deleteGroup={deleteGroup}
                />
                <nav>
                    <NavButtons/>
                </nav>
            </header>
        )
    }
}

HeadGroup.propTypes = {}

export default HeadGroup
