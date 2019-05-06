import {observable} from 'mobx'
import {initialStateForms} from './initial-values'


export class Form {
    @observable fields = {}
    @observable error = false
    @observable loading = false

    constructor(formName) {
        this.fields = initialStateForms[formName]
    }

    handleChange(nameField, value) {
        this.fields[nameField].value = value
    }


}



