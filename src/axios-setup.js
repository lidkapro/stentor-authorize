import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
let csrfHeader = document.getElementsByName('_csrf_header')[0].content;
let csrfContent = document.getElementsByName('_csrf')[0].content;
if (csrfHeader && csrfContent) {
    axios.defaults.headers.common[csrfHeader] = csrfContent;
}
axios.interceptors.response.use((response) => {
    const error = response.data.errors
    if (error) {
        console.log(error)
        return Promise.reject('При обработке запроса произошла ошибка. Попробуйте позднее')
    }
    return response
}, (error) => {
    if (error.message === 'Network Error') {
        alert('Сервер не работает!')
        return Promise.reject(error)
    }
    if (error.response.status === 401) {
        window.location = 'http://localhost:8086/login/index.html#/en/login'
        return Promise.reject(error)
    }
    return Promise.reject(error)
})
