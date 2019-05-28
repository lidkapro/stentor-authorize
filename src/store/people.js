import {observable, action, runInAction, computed} from 'mobx'
import axios from 'axios/index'


class People {
    @observable peopleInGroup = []
    @observable allPeople = []

    @action
    cleanLists = () => {
        this.peopleInGroup = []
        this.allPeople = []
    }

    @computed get dataAllPeople() {
        return this.peopleInGroup.map(p => ({...p, key: p.id}))
    }

    @computed get dataManagePeople() {
        return this.allPeople.map(p => ({key: p.username}))
    }

    @computed get keysManagePeople() {
        return this.peopleInGroup.map(p => p.username)
    }

    @action
    findAllUser = async pageNum => {
        this.loading = false
        const response = await axios.post('/graphql', {query: `{findAllUser(pageNum:${pageNum}){total content{email id locked enabled username langKey groups}}}`})
        const content = response.data.data['findAllUser'].content
        runInAction(() => {
            this.allPeople = [...this.allPeople, ...content]
        })
    }

    @action
    findUsersInGroup = async (groupName, pageNum) => {
        const response = await axios.post('/graphql', {query: `{findUsersInGroup(pageNum:${pageNum}, groupName:"${groupName}"){total content{email id locked enabled username langKey groups}}}`})
        const peopleInGroup = response.data.data['findUsersInGroup'].content
        runInAction(() => {
            this.peopleInGroup = [...this.peopleInGroup, ...peopleInGroup]
        })
    }

    @action
    removeUserFromGroup = async (groupName, username) => {
        await axios.post('/graphql', {query: `mutation{removeUserFromGroup(groupName:"${groupName}",username:"${username}")}`})
        runInAction(() => {
            this.peopleInGroup = this.peopleInGroup.filter(p => p.username !== username)
        })
    }

    @action
    addUserToGroup = async (groupName, username) => {
        const response = await axios.post('/graphql', {query: `mutation{addUserToGroup(groupName:"${groupName}",username:"${username}")}`})
        const user = response.data.data['addUserToGroup']
         console.log(user)
        runInAction(() => {
            this.peopleInGroup = [...this.peopleInGroup, user]
        })
    }

}

export default People