import React, {Component} from 'react'
import HeadGroups from './HeadGroups'
import ListGroups from './ListGroups'


class Groups extends Component {
    render() {
        return (
           <div className='container'>
               <HeadGroups/>
               <ListGroups/>
           </div>
        )
    }
}

Groups.propTypes = {}

export default Groups
