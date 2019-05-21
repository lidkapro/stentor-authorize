import {observable, action, runInAction} from 'mobx'
import axios from 'axios/index'
import {configure} from 'mobx'


configure({enforceActions: 'observed'})

class Groups {
    @observable list = []
    @observable loading = false

    @action
    cleanList = () => {
        this.list = []
        this.loading = false
    }

    @action
    findAllGroups = async () => {
        this.loading = false
        const response = await axios.post('/graphql', {query: '{findAllGroups}'})
        const groups = response.data.data['findAllGroups']
        runInAction(() => {
            this.state = 'done'
            this.list = [...this.list, ...groups]
        })
    }

    @action
    createGroup = async (groupName) => {
        this.loading = false
        const response = await axios.post('/graphql', {query: `mutation{createGroup(authorities:["createGroup"],groupName:"${groupName}")}`})
        const group = response.data.data['createGroup']
        runInAction(() => {
            this.state = 'done'
            this.list = [...this.list, group]
        })
    }

    @action
    deleteGroup = async (groupName) => {
        this.loading = false
        await axios.post('/graphql', {query: `mutation{deleteGroup(groupName:"${groupName}")}`})
        runInAction(() => {
            this.state = 'done'
            this.list = this.list.filter(l => l !== groupName)
        })
    }

    @action
    renameGroup = async (oldName, newName) => {
        await axios.post('/graphql', {query: `mutation{renameGroup(newName:"${newName}"oldName:"${oldName}")}`})
        runInAction(() => {
            this.state = 'done'
            this.list = this.list.map(l => l === oldName ? newName : l)
        })
    }
}

export default Groups