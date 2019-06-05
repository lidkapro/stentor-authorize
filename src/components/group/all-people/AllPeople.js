import React from 'react'
import {observer} from 'mobx-react'
import ListPeoples from '../../common/ListPeoples'
import FiltersAndSortPeople from '../../HOCs/FilterAndSortPeople'
import {withRouter} from 'react-router-dom'

const AllPeople = observer(({people, columns, loadData}) =>
    <ListPeoples
        total={people.total.all}
        loading={people.loading}
        data={people.dataListPeoples}
        columns={columns}
        loadData={loadData}
    />
)


AllPeople.propTypes = {}

export default withRouter(FiltersAndSortPeople(AllPeople))
