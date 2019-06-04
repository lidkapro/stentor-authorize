import {action, observable, runInAction} from 'mobx'
import _ from 'lodash'
import People from './people'


class ManagePeople extends People {

    @observable allChecked = {group: false, all: false}
    @observable checked = {group: [], all: []}

    constructor() {
        super()
        this.loadMoreAllData = _.debounce(this.loadMoreAllData, 200)
        this.loadMoreGroupData = _.debounce(this.loadMoreGroupData, 200)
    }

    removeDouble = arr => {
        const names = arr.map(a => a.username)
        const filteredNames = names.reduce((accum, val) => accum.indexOf(val) !== -1 ? accum : [...accum, val], [])
        return filteredNames.map(a => ({username: a}))
    }

    @action
    cleanState = () => {
        this.all = []
        this.total = {group: 0, all: 0}
        this.lists = {group: [], all: []}
        this.loading = false
        this.allChecked = {group: false, all: false}
        this.checked = {group: [], all: []}
    }

    @action
    findListUsersDone = (response, list) => {
        const data = response.data.data['findAllUser']
        runInAction(() => {
            this.loading = false
            this.lists[list] = this.removeDouble([...this.lists[list], ...data.content])
            this.total[list] = data.totalElements
        })
    }

    loadMoreGroupData = () => {
        const keys = this.lists.group.length
        if (keys < this.total.group) {
            const page = Math.floor(keys / 10)
            this.findAllUserInGroupBegin(page, this.params.search)
        }
    }

    loadMoreAllData = () => {
        const data = this.lists.all.length
        if (data < this.total.all) {
            const page = Math.floor(data / 10)
            this.findAllUserExceptGroupBegin(page, this.params.search)
        }
    }

    @action
    removeUserFromGroup = () => {
        this.checked.group.forEach(key => this.removeUserFromGroupBegin(key))
        runInAction(() => {
            this.checked.group = []
            this.allChecked.group = false
        })
    }

    @action
    addUserToGroup = () => {
        this.checked.all.forEach(key => this.addUserToGroupBegin(key))
        runInAction(() => {
            this.checked.all = []
            this.allChecked.all = false
        })
    }

    @action
    changeChecked = (e, list) => {
        const value = e.target.value
        const checked = e.target.checked
        const arr = list === 'group' ? this.checked.group : this.checked.all
        checked ?
            runInAction(() => {
                this.checked[list] = [...arr, value]
            })
            :
            runInAction(() => {
                this.checked[list] = arr.filter(a => a !== value)
            })
    }

    @action
    changeAllChecked = list => {
        const arr = list === 'group' ? this.lists.group : this.lists.all
        const checked = this.checked[list].length !== arr.length
        checked ?
            runInAction(() => {
                this.allChecked[list] = checked
                this.checked[list] = arr.map(user => user.username)
            })
            :
            runInAction(() => {
                this.allChecked[list] = checked
                this.checked[list] = []
            })
    }

}


export default ManagePeople
