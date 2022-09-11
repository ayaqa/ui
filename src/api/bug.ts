import { httpClient } from './client'
import type { AxiosResponse } from 'axios'

import {
    BugManifestInterface,
    ManifestResponseInterface,
    ConfiguredBugsResponseInterface
} from 'src/types/api/bug'

const BUG_URL_PATH = '/bugs'

const fetchManifest = () => httpClient.get<any, AxiosResponse<ManifestResponseInterface>>(`${BUG_URL_PATH}/manifest`)
const fetchBugs = () => httpClient.get<any, AxiosResponse<BugManifestInterface[]>>(BUG_URL_PATH)
const fetchUIBugs = () => httpClient.get<any, AxiosResponse<ConfiguredBugsResponseInterface>>(`${BUG_URL_PATH}/ui`)
const storeBugs = (bugs: Array<BugManifestInterface>) => httpClient.post<any, AxiosResponse<BugManifestInterface[]>>(BUG_URL_PATH, bugs)

export {
    fetchManifest,
    fetchBugs,
    fetchUIBugs,
    storeBugs
}