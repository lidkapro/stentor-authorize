import {observable, action, runInAction, computed} from 'mobx'
import axios from 'axios/index'
import DataSearch from './data-search'

class People extends DataSearch {

    @observable all = []
    @observable lists = {group: [], all: []}
    @observable total = {group: 0, all: 0}
    @observable loading = false

    @action
    cleanState = () => {
        this.all = []
        this.total = {group: 0, all: 0}
        this.lists = {group: [], all: []}
        this.loading = false
    }

    @computed get dataListPeoples() {
        return this.all.map(p => ({...p, key: p.id}))
    }

    @action
    findAllUserBegin = async pageNum => {
        this.loading = true
        const response = await axios.post('/graphql', {query: `{findAllUser(pageNum:${pageNum}, ${this.builtFields} )${this.keys}}`})
        this.findAllUserDone(response)
    }

    @action
    findAllUserDone = response => {
        const data = response.data.data['findAllUser']
        setTimeout(() => runInAction(() => {
            this.loading = false
            this.all = data.content
            this.total = data.totalElements
        }), 200)
    }

    @action
    lockUser = async username => {
        await axios.post('/graphql', {query: `mutation{lockUser(username:"${username}")}`})
        const doLock = user => user.username === username ? ({...user, locked: true}) : user
        runInAction(() => {
            this.all = this.all.map(doLock)
        })
    }

    @action
    unLockUser = async username => {
        await axios.post('/graphql', {query: `mutation{unLockUser(username:"${username}")}`})
        const doUnlock = user => user.username === username ? ({...user, locked: false}) : user
        runInAction(() => {
            this.all = this.all.map(doUnlock)
        })
    }

    @action
    removeUserFromGroupBegin = async username => {
        await axios.post('/graphql', {query: `mutation{removeUserFromGroup(groupName:"${this.params.groupName}",username:"${username}")}`})
        runInAction(() => {
            this.lists.group = this.lists.group.filter(p => p.username !== username)
            this.lists.all.unshift({username: username,removed:true})
            --this.total.group
            ++this.total.all
        })
    }

    @action
    addUserToGroupBegin = async username => {
        await axios.post('/graphql', {query: `mutation{addUserToGroup(groupName:"${this.params.groupName}",username:"${username}"){username email}}`})
        runInAction(() => {
            this.lists.all = this.lists.all.filter(p => p.username !== username)
            this.lists.group.unshift({username: username,removed:true})
            ++this.total.group
            --this.total.all
        })
    }

    @action
    findAllUserInGroupBegin = async (pageNum, str) => {
        this.loading = true
        this.saveParams({filter: 'onlyGroup', search: str ? str : ''})
        const response = await axios.post('/graphql', {query: `{findAllUser(pageNum:${pageNum}, ${this.builtFields} )${this.keys}}`})
        if (str !== this.params.search || pageNum === 0) {
            runInAction(() => {
                this.lists.group = []
            })
        }
        this.findListUsersDone(response, 'group')
    }

    @action
    findAllUserExceptGroupBegin = async (pageNum, str) => {
        this.loading = true
        this.saveParams({filter: 'notGroup', search: str ? str : ''})
        const response = await axios.post('/graphql', {query: `{findAllUser(pageNum:${pageNum}, ${this.builtFields} )${this.keys}}`})
        if (str !== this.params.search || pageNum === 0) {
            runInAction(() => {
                this.lists.all = []
            })
        }
        this.findListUsersDone(response, 'all')
    }
}

export default People