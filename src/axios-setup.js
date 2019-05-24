import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

axios.interceptors.response.use((response) => {

    return response
}, (error) => {
    if(error.message === "Network Error"){
        alert('Сервер не работает!')
        return Promise.reject(error)
    }
    if(error.response.status === 401){
        alert('Вы не авторизованы!')
        return Promise.reject(error)
    }
    return Promise.reject(error)
})
