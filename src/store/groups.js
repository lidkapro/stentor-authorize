import {action, configure, observable, runInAction} from 'mobx'
import axios from 'axios/index'


configure({enforceActions: 'observed'})

class Groups {
    @observable list = []

    @action
    cleanState = () => {
        this.list = []
    }

    @action
    findAllGroups = async () => {
        const response = await axios.post('/graphql', {query: '{findAllGroups{createdBy createdDate modifiedBy modifiedDate name userCount}}'})
        const groups = response.data.data['findAllGroups']
        runInAction(() => {
            this.list = groups
        })
    }

    @action
    createGroup = async groupName => {
        const response = await axios.post('/graphql', {query: `mutation{createGroup(authorities:["createGroup"],groupName:"${groupName}"){createdBy createdDate modifiedBy modifiedDate name userCount}}`})
        const group = response.data.data['createGroup']
        runInAction(() => {
            this.list = [...this.list, group]
        })
    }

    @action
    deleteGroup = async groupName => {
        await axios.post('/graphql', {query: `mutation{deleteGroup(groupName:"${groupName}")}`})
        runInAction(() => {
            this.list = this.list.filter(group => group.name !== groupName)
        })
    }

    @action
    renameGroup = async (oldName, newName) => {
        await axios.post('/graphql', {query: `mutation{renameGroup(oldName:"${oldName}" newName:"${newName}")}`})
        this.findAllGroups()
    }
}

export default Groups