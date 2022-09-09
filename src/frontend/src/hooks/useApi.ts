import Axios from "axios";

const useApi = () => {

    let config = {
        apikey: '',
        baseUrl: 'http://localhost:8000/api'
    }

    const makeRequest = (method: string, url: string, data: Object = {}, onSuccess: Function = () => {}, onError: Function = () => {}) => {
        // check request method is acceptable
        if (!['get', 'post', 'put', 'patch', 'delete'].includes(method.toLowerCase())) {
            throw new Error(`Invalid request method: ${method}`)
        }

        return (
            Axios[method](config.baseUrl + url, data)
                .then(response => {
                    onSuccess({
                        data: response.data,
                        status: response.status,
                        statusText: response.statusText,
                        headers: response.headers
                    })
                })
                .catch(err => {
                    console.log(err)
                    onError({
                        status: err.response.status,
                        statusText: err.response.statusText,
                        data: err.response.data,
                        headers: err.response.headers
                    })
                })
        )
    }

    const get = (url: string, data: Object, onSuccess: Function = () => {}, onError: Function = () => {}) => {
        // build query string from data object
        const params = (() => {
            const params = Object.entries(data).map(([key,value]) => key + '=' + value).join(',')
            if (params.length === 0) {
                return ''
            }
            return '&' + params
        })()

        return makeRequest('get', url+params, data, onSuccess, onError)
    }

    const post = (url: string, data: Object, onSuccess: Function = () => {}, onError: Function = () => {}) => {
        return makeRequest('post', url, data, onSuccess, onError)
    }

    const put = (url: string, data: Object, onSuccess: Function = () => {}, onError: Function = () => {}) => {
        return makeRequest('put', url, data, onSuccess, onError)
    }

    const patch = (url: string, data: Object, onSuccess: Function = () => {}, onError: Function = () => {}) => {
        return makeRequest('patch', url, data, onSuccess, onError)
    }

    const deleteRequest = (url: string, onSuccess: Function = () => {}, onError: Function = () => {}) => {
        return makeRequest('delete', url, {}, onSuccess, onError)
    }

    return {
        get,
        post,
        put,
        patch,
        delete: deleteRequest,  // delete is a reserved word for a function
        config
    }
}

export default useApi
