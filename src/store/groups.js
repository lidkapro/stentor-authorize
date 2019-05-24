import {action, configure, observable, runInAction} from 'mobx'
import axios from 'axios/index'


configure({enforceActions: 'observed'})

class Groups {
    @observable list = []

    @action
    cleanList = () => {
        this.list = []
    }

    @action
    findAllGroups = async () => {
        const response = await axios.post('/graphql', {query: '{findAllGroups}'})
        const groups = response.data.data['findAllGroups']
        runInAction(() => {
            this.list = [...this.list, ...groups]
        })
    }

    @action
    createGroup = async groupName => {
        const response = await axios.post('/graphql', {query: `mutation{createGroup(authorities:["createGroup"],groupName:"${groupName}")}`})
        const group = response.data.data['createGroup']
        runInAction(() => {
            this.list = [...this.list, group]
        })
    }

    @action
    deleteGroup = async groupName => {
        await axios.post('/graphql', {query: `mutation{deleteGroup(groupName:"${groupName}")}`})
        runInAction(() => {
            this.list = this.list.filter(l => l !== groupName)
        })
    }

    @action
    renameGroup = async (oldName, newName) => {
        await axios.post('/graphql', {query: `mutation{renameGroup(newName:"${newName}"oldName:"${oldName}")}`})
        runInAction(() => {
            this.list = this.list.map(l => l === oldName ? newName : l)
        })
    }
}

export default Groups