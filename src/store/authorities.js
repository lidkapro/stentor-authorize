import {observable, action, runInAction} from 'mobx'
import axios from 'axios/index'
import {sortByAlphabet} from '../components/group/help-functions/sort-authorities'


class Authorities {
    @observable all = []
    @observable group = []
    @observable sortedByLetter = []

    @action
    cleanState = () => {
        this.all = []
        this.group = []
        this.sortedByLetter = []
    }

    @action
    changeCheckedAuthority = authority => {
        Object.keys(this.sortedByLetter)
            .map(aByLetter =>
                this.sortedByLetter[aByLetter].map(allA =>
                    allA.name !== authority ? null : allA.checked = true
                )
            )
    }

    @action
    findAllAuthorities = async () => {
        const response = await axios.post('/graphql', {query: `{findAllAuthorities}`})
        const authorities = response.data.data['findAllAuthorities']
        runInAction(() => {
            this.all = authorities
            this.sortedByLetter = sortByAlphabet(authorities)
        })
    }

    @action
    findGroupAuthorities = async (groupName) => {
        const response = await axios.post('/graphql', {query: `{findGroupAuthorities(groupName:"${groupName}")}`})
        const authorities = response.data.data['findGroupAuthorities']
        runInAction(() => {
            this.group = authorities
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


}

export default Authorities