import {observable, action, runInAction} from 'mobx'
import axios from 'axios/index'
import {sortByAlphabet} from '../components/group/sort-authorities'

class Group {
    @observable peopleInGroup = []
    @observable allPeople = []
    @observable groupAuthorities = []
    @observable allAuthorities = []


    @action
    cleanLists = () => {
        this.peopleInGroup = []
        this.allPeople = []
        this.groupAuthorities = []
        this.allAuthorities = []
    }

    //users in group

    @action
    deleteGroup = async groupName => {
        await axios.post('/graphql', {query: `mutation{deleteGroup(groupName:"${groupName}")}`})
        this.cleanLists()
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

    //authority

    @action
    changeCheckedAuthority = authority => {
        Object.keys(this.allAuthorities)
            .map(aByLetter =>
                this.allAuthorities[aByLetter].map(allA =>
                    allA.name !== authority ? null : allA.checked = true
                )
            )
    }


    @action
    findAllAuthorities = async (groupName) => {
        const response = await axios.post('/graphql', {query: `{findAllAuthorities}`})
        const authorities = response.data.data['findAllAuthorities']
        runInAction(() => {
            this.allAuthorities = sortByAlphabet(authorities)
        })
        await this.findGroupAuthorities(groupName)
    }

    @action
    findGroupAuthorities = async (groupName) => {
        const response = await axios.post('/graphql', {query: `{findGroupAuthorities(groupName:"${groupName}")}`})
        const authorities = response.data.data['findGroupAuthorities']
        runInAction(() => {
            this.groupAuthorities = authorities
        })
        authorities.forEach(a => this.changeCheckedAuthority(a))
    }

    @action
    addGroupAuthority = async (groupName, authority) => {
        await axios.post('/graphql', {query: `mutation{ addGroupAuthority(groupName:"${groupName}" authority:"${authority.name}")}`})
        runInAction(() => {
            authority.checked = true
        })
    }

    @action
    removeGroupAuthority = async (groupName, authority) => {
        await axios.post('/graphql', {query: `mutation{ removeGroupAuthority(groupName:"${groupName}" authority:"${authority.name}")}`})
        runInAction(() => {
            authority.checked = false
        })
    }

    //manage people

    @action
    findAllUser = async () => {

    }

}

export default Group