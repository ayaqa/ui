import { httpClient } from './client'
import { AxiosResponse } from 'axios'
import { SESSION_CREATE_RESPONSE, SESSION_INFO_RESPONSE } from 'src/types/api'

const SESSION_URL_PATH = '/session'

const createSession = () => httpClient.post<any, AxiosResponse<SESSION_CREATE_RESPONSE>>(SESSION_URL_PATH)
const deleteSession = () => httpClient.delete(SESSION_URL_PATH)
const getSessionInfo = (sessionId: string) => httpClient.get<any, AxiosResponse<SESSION_INFO_RESPONSE>>(`${SESSION_URL_PATH}/${sessionId}`)

export {
    createSession,
    deleteSession,
    getSessionInfo
}