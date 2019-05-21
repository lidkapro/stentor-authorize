import React, {Component} from 'react'
import ListPeoples from './ListPeoples'
import HeadPeople from './HeadPeople'
import MenuPeople from '../groups/MenuPeople'


class People extends Component {
    render() {
        return (
            <main className='container'>
                <HeadPeople/>
                <section className='all_people_table'>
                    <MenuPeople/>
                    <ListPeoples/>
                </section>
            </main>
        )
    }
}

People.propTypes = {}

export default People
