import {observable, action, runInAction} from 'mobx'
import axios from 'axios/index'


class People {
    @observable list = []

    @action
    cleanList = () => {
        this.list = []
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