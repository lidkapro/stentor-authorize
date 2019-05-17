import {observable} from 'mobx'



export class Groups {
    @observable fields = {}
    @observable error = false
    @observable loading = false

    handleChange(nameField, value) {
        this.fields[nameField].value = value
    }


}