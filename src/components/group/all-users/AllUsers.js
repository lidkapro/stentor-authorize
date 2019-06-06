import React from 'react'
import {observer} from 'mobx-react'
import ListUsers from '../../common/ListUsers'
import FiltersAndSortUsers from '../../HOCs/FilterAndSortUsers'
import {withRouter} from 'react-router-dom'

const AllUsers = observer(({users, columns, loadData}) =>
    <ListUsers
        total={users.total.all}
        loading={users.loading}
        data={users.dataListUsers}
        columns={columns}
        loadData={loadData}
    />
)


AllUsers.propTypes = {}

export default withRouter(FiltersAndSortUsers(AllUsers))
