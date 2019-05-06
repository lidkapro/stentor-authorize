const group = {field: 'name', placeholder: 'Enter group name', value: '',}
const user = {field: 'name', label: 'add user', value: ''}
const username = {field: 'username', label: 'e-mail', value: '', autoComplete: 'email', type: 'email'}
const password = {field: 'password', label: 'Пароль', value: '', autoComplete: 'current-password', type: 'password'}
const search = {field: 'search', value: ''}

export const initialStateForms = {
    login:  {username, password},
    addGroup: {group},
    addUser:  {user},
    registration: {username, password},
    search: {search}
}


