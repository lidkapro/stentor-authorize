import React from 'react'
import {observer} from 'mobx-react'
import HeadPeople from '../../common/HeadPeople'
import ListPeoples from '../../common/ListPeoples'
import FiltersAndSortPeople from '../../HOCs/FilterAndSortPeople'
import {withRouter} from 'react-router-dom'

const AllPeople = observer(({people, columns, loadData, searchByUsername}) =>
    <section>
        <HeadPeople onSearch={searchByUsername}/>
        <ListPeoples
            total={people.total.all}
            loading={people.loading}
            data={people.dataListPeoples}
            columns={columns}
            loadData={loadData}
        />
    </section>
)


AllPeople.propTypes = {}

export default withRouter(FiltersAndSortPeople(AllPeople))
