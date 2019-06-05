import React from 'react'
import ListPeoples from '../common/ListPeoples'
import MenuPeople from './MenuPeople'
import {observer} from 'mobx-react'
import FiltersAndSortPeople from '../HOCs/FilterAndSortPeople'
import {Layout,Card} from 'antd'

const {Content, Sider} = Layout

const People = observer(({people = {}, columns = [], changeFilter, loadData = f => f}) =>
    <Card className='container'>
        <Layout>
                <Sider style={{background: '#fff'}}>
                    <MenuPeople
                        changeFilter={changeFilter}
                    />
                </Sider>

                <Content style={{background: '#fff',padding:'0 24px'}}>
                    <ListPeoples
                        total={people.total.all}
                        loading={people.loading}
                        data={people.dataListPeoples}
                        columns={columns}
                        loadData={loadData}
                    />
                </Content>

        </Layout>
    </Card>
)


People.propTypes = {}

export default FiltersAndSortPeople(People)
