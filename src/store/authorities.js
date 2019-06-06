import {observable, action, runInAction} from 'mobx'
import axios from 'axios/index'
import {sortByAlphabet} from '../components/group/help-functions/sort-authorities'


class Authorities {
    @observable all = []
    @observable group = []
    @observable sortedByLetter = []
    @observable sortDate = 'descend'

    @action
    cleanState = () => {
        this.all = []
        this.group = []
        this.sortedByLetter = []
        this.sortDate = 'descend'
    }

    @action
    changeSortDate = (a,b,sorter) => {
        this.sortDate = sorter.order
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
        const response = await axios.post('/graphql', {query: '{findAllAuthorities{authority createdBy createdDate modifiedBy modifiedDate}}'})
        const authorities = response.data.data['findAllAuthorities']
        runInAction(() => {
            this.all = authorities
        })
    }

    @action
    findGroupAuthorities = async (groupName) => {
        const responseAll = await axios.post('/graphql', {query: '{findAllAuthorities{authority createdBy createdDate modifiedBy modifiedDate}}'})
        const allAuth = responseAll.data.data['findAllAuthorities']
        const names = allAuth.map(a => a.authority)
        runInAction(() => {
            this.sortedByLetter = sortByAlphabet(names)
        })
        const groupAuth = await axios.post('/graphql', {query: `{findGroupAuthorities(groupName:"${groupName}")}`})
        const authorities = groupAuth.data.data['findGroupAuthorities']
        runInAction(() => {
            this.group = authorities
        })
        authorities.forEach(a => this.changeCheckedAuthority(a))
        console.log(this.sortedByLetter)
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
    createAuthority = async name => {
        const response = await axios.post('/graphql', {query: `mutation{createAuthority(authority:"${name}"){authority createdBy createdDate modifiedBy modifiedDate}}`})
        const authority = response.data.data['createAuthority']
        runInAction(() => {
            this.all = [...this.all, authority]
            this.sortDate = 'descend'
        })
    }

    @action
    deleteAuthority = async name => {
        await axios.post('/graphql', {query: `mutation{deleteAuthority(authority:"${name}")}`})
        runInAction(() => {
            this.all = this.all.filter(a => a.authority !== name)
        })
    }

    @action
    renameAuthority = async (oldName, newName) => {
        await axios.post('/graphql', {query: `mutation{renameAuthority(oldName:"${oldName}" newName:"${newName}")}`})
        this.findAllAuthorities()
    }

}

export default Authorities