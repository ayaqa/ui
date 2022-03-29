import axios from 'axios'
import { useAppStore } from '/src/stores'

const appStore = useAppStore();

const httpClient = axios.create({
    baseURL: appStore.app.apiURL,
    headers: {
        "Content-Type": "application/json",
    }
})

export { httpClient }