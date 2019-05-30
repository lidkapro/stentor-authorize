import {observable, action, runInAction} from 'mobx'
import axios from 'axios/index'
import {sortByAlphabet} from '../components/group/help-functions/sort-authorities'


class Rights {
    @observable groupAuthorities = []
    @observable allAuthorities = []

    @action
    cleanState = () => {
        this.groupAuthorities = []
        this.allAuthorities = []
    }

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


}

export default Rights