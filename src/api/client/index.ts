import axios from 'axios'
import { useAppStore } from 'src/stores'

const httpClient = axios.create({
    baseURL: '',
    headers: {
        "Content-Type": "application/json",
    },
    params: {
        session: ''
    }
})

// apply store values dinamically
httpClient.interceptors.request.use(request => {
    const appStore = useAppStore()

    request.baseURL = appStore.app.apiURL
    httpClient.defaults.params.session = appStore.app.sessionId

    return request
})

export { httpClient }