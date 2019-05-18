import {observable} from 'mobx'
import axios from 'axios/index'

export class Groups {
    @observable groups = []

    findAllGroups() {
        axios.post('/graphql', {query: '{findAllAuthorities}'})
            .then(response => response.data)
            .then(groups => this.groups = [...this.groups, groups])
    }
}