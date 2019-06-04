import {action, computed, runInAction} from 'mobx'

class DataSearch {

    params = {sort: '', sortBy: '', filter: 'everyone', search: '', groupName: ''}

    settings = {
        active: 'enabled: {equals: true}, locked: {equals: false}',
        notActive: ' enabled: {equals: false}',
        banned: 'locked: {equals: true}',
        passwordReset: 'resetKey:{specified: true}',
    }

    keys = '{totalElements content{email activationDate id locked enabled username langKey groups}}'

    @computed get search() {
        return `username:{contains:"${this.params.search}"}`
    }

    @computed get sortMethod() {
        const sort = this.params.sort === 'ascend' ? 'ASC' : 'DESC'
        return `sort:${sort} properties:["${this.params.sortBy}"]`
    }

    @computed get filter() {
        const {filter, groupName} = this.params
        return filter === 'everyone' ? ''
            :
            filter === 'onlyGroup' ? `groupName:{equals:"${groupName}"}`
                :
                filter === 'notGroup' ? `notInGroupName:"${groupName}"`
                    :
                    this.settings[filter]
    }

    @computed get builtFields() {
        const {params} = this
        const sort = params.sort ? this.sortMethod : ''
        const filter = this.filter
        const search = params.search ? this.search : ''
        return `${sort} filter:{${filter} ${search}}`
    }

    checkParam = (param, name) => {
        return param === '' ? '' : param ? param : this.params[name]
    }


    @action saveParams = ({sort, filter, sortBy, search, groupName}) => {
        runInAction(() => {
            this.params = {
                sort: this.checkParam(sort, 'sort'),
                filter: this.checkParam(filter, 'filter'),
                sortBy: this.checkParam(sortBy, 'sortBy'),
                search: this.checkParam(search, 'search'),
                groupName: this.checkParam(groupName, 'groupName'),
            }
        })
    }

}

export default DataSearch