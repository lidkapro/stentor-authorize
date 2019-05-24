import {observable, action, runInAction, computed} from 'mobx'
import axios from 'axios/index'


class People {
    @observable peopleInGroup = []
    @observable allPeople = []

    @action
    cleanList = () => {
        this.peopleInGroup = []
        this.allPeople = []
    }

    @computed get data() {
        return this.peopleInGroup.map((p, i) => ({username: p, status: 'active', key: i}))
    }

    @action
    findUsersInGroup = async (groupName) => {
        const response = await axios.post('/graphql', {query: `{findUsersInGroup(groupName:"${groupName}")}`})
        const peopleInGroup = response.data.data['findUsersInGroup']
        runInAction(() => {
            this.groupName = groupName
            this.peopleInGroup = [...this.peopleInGroup, ...peopleInGroup]
        })
    }

    @action
    deleteUserFromGroup = async (groupName, username) => {
        await axios.post('/graphql', {query: `mutation{removeUserFromGroup(groupName:"${groupName}",username:"${username}")}`})
        runInAction(() => {
            this.peopleInGroup = this.peopleInGroup.filter(p => p !== username)
        })
    }

    @action
    create = async () => {
        this.loading = false
        const response = await axios.post('/graphql', {query: '{findAllGroups}'})
        const groups = response.data.data['findAllGroups']
        runInAction(() => {
            this.state = 'done'
            this.list = [...this.list, ...groups]
        })
    }

}

export default People