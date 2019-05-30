import {observable, action, runInAction, computed} from 'mobx'
import axios from 'axios/index'


class People {
    @observable group = []
    @observable all = []
    @observable page = {group: [], all: []}
    @observable total = {group: 0, all: 0}
    @observable loading = false

    @action
    cleanState = () => {
        this.group = []
        this.all = []
        this.page = {group: [], all: []}
        this.total = {group: 0, all: 0}
        this.loading = false
    }

    @computed get dataAllPeople() {
        return this.page.group.map(p => ({...p, key: p.id}))
    }

    @computed get dataListPeoples() {
        return this.page.all.map(p => ({...p, key: p.id}))
    }

    @action
    findAllUserBegin = async (pageNum, sort) => {
        this.loading = true
        const sortMethod = sort ? `sort:${sort}` : ''
        const response = await axios.post('/graphql', {query: `{findAllUser(pageNum:${pageNum} ${sortMethod}){totalElements content{email id locked enabled username langKey groups}}}`})
        const data = response.data.data['findAllUser']
        this.findAllUserDone(data)
    }


    @action
    findAllUserDone = data => {
        setTimeout(() => runInAction(() => {
            this.loading = false
            this.all = [...this.all, ...data.content]
            this.page.all = data.content
            this.total.all = data.totalElements
        }), 200)
    }

    @action
    findAllUserInGroupBegin = async (groupName, pageNum, sort) => {
        this.loading = true
        const sortMethod = sort ? `sort:${sort}` : ''
        const response = await axios.post('/graphql', {query: `{findAllUser(pageNum:${pageNum}, filter:{groupName:{equals:"${groupName}"}} ${sortMethod}){totalElements content{email id locked enabled username langKey groups}}}`})
        const data = response.data.data['findAllUser']
        this.findAllUserInGroupDone(data)
    }


    @action
    findAllUserInGroupDone = data => {
        setTimeout(() => runInAction(() => {
            this.loading = false
            this.group = [...this.group, ...data.content]
            this.page.group = data.content
            this.total.group = data.totalElements
        }), 200)
    }


    @action
    removeUserFromGroup = async (groupName, username) => {
        await axios.post('/graphql', {query: `mutation{removeUserFromGroup(groupName:"${groupName}",username:"${username}")}`})
        runInAction(() => {
            this.peopleInGroup = this.peopleInGroup.filter(p => p.username !== username)
            --this.totalInGroup
        })
    }

    @action
    addUserToGroup = async (groupName, username) => {
        const response = await axios.post('/graphql', {query: `mutation{addUserToGroup(groupName:"${groupName}",username:"${username}"){username email}}`})
        const user = response.data.data['addUserToGroup']
        runInAction(() => {
            this.group = [...this.group, user]
            ++this.total.group
        })
    }

    @action
    lockUser = async username => {
        await axios.post('/graphql', {query: `mutation{lockUser(username:"${username}")}`})
        const doLock = user => user.username === username ? ({...user, locked: true}) : user
        runInAction(() => {
            this.page = {
                all: this.page.all.map(doLock),
                group: this.page.group.map(doLock)
            }
        })
    }

    @action
    unLockUser = async username => {
        await axios.post('/graphql', {query: `mutation{unLockUser(username:"${username}")}`})
        const doUnlock = user => user.username === username ? ({...user, locked: false}) : user
        runInAction(() => {
            this.page = {
                all: this.page.all.map(doUnlock),
                group: this.page.group.map(doUnlock)
            }
        })
    }

}

export default People