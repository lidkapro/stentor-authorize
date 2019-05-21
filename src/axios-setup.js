import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

axios.interceptors.response.use((response) => {

    return response
}, (error) => {
    if(error.response.status === 401){
        alert('Вы не авторизованы!')
    }
    return Promise.reject(error)
})
