import axios from 'axios'
import { useAppStore } from '/src/stores'

const appStore = useAppStore()

const httpClient = axios.create({
    baseURL: appStore.app.apiURL,
    headers: {
        "Content-Type": "application/json",
    },
    params: {
        session: ''
    }
})

// put default get param
appStore.$subscribe((mutation, state) => {
    httpClient.defaults.params.session = state.app.sessionId
})

export { httpClient }