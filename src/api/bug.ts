import { httpClient } from './client'
import type { AxiosResponse } from 'axios'

import {
    BugManifestInterface,
    ManifestResponseInterface
} from 'src/types/api/bug'

const BUG_URL_PATH = '/bugs'

const fetchManifest = () => httpClient.get<any, AxiosResponse<ManifestResponseInterface>>(`${BUG_URL_PATH}/manifest`)
const fetchBugs = () => httpClient.get<any, AxiosResponse<BugManifestInterface[]>>(BUG_URL_PATH)
const storeBugs = (bugs: Array<BugManifestInterface>) => httpClient.post<any, AxiosResponse<BugManifestInterface[]>>(BUG_URL_PATH, bugs)

export {
    fetchManifest,
    fetchBugs,
    storeBugs
}