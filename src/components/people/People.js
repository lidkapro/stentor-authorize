import React from 'react'
import ListPeoples from '../common/ListPeoples'
import MenuPeople from './MenuPeople'
import {observer} from 'mobx-react'
import HeadPeople from '../common/HeadPeople'
import FiltersAndSortPeople from '../HOCs/FilterAndSortPeople'


const People = observer(({people = {}, columns = [], searchByUsername = f => f, changeFilter, loadData = f => f}) =>
    <main className='container'>
        <HeadPeople onSearch={searchByUsername}/>
        <section className='all_people_table'>
            <MenuPeople
                changeFilter={changeFilter}
            />
            <ListPeoples
                total={people.total.all}
                loading={people.loading}
                data={people.dataListPeoples}
                columns={columns}
                loadData={loadData}
            />
        </section>
    </main>)


People.propTypes = {}

export default FiltersAndSortPeople(People)
