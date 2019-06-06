import React from 'react'
import ListUsers from '../common/ListUsers'
import MenuUsers from './MenuUsers'
import {observer} from 'mobx-react'
import FiltersAndSortUsers from '../HOCs/FilterAndSortUsers'
import {Layout, Card} from 'antd'

const {Content, Sider} = Layout

const Users = observer(({users = {}, columns = [], changeFilter, loadData = f => f}) =>
    <Card className='container' title='Users'>
        <Layout>
            <Sider style={{background: '#fff'}}>
                <MenuUsers
                    changeFilter={changeFilter}
                />
            </Sider>

            <Content style={{background: '#fff', padding: '0 24px'}}>
                <ListUsers
                    total={users.total.all}
                    loading={users.loading}
                    data={users.dataListUsers}
                    columns={columns}
                    loadData={loadData}
                />
            </Content>
        </Layout>
    </Card>
)


Users.propTypes = {}

export default FiltersAndSortUsers(Users)
