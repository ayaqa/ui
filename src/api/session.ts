import { httpClient } from './client'
import { AxiosResponse } from 'axios'
import { CreateSessionResponseInterface, InfoSessionResponseInterface } from 'src/types/api'

const SESSION_URL_PATH = '/session'

const createSession = () => httpClient.post<any, AxiosResponse<CreateSessionResponseInterface>>(SESSION_URL_PATH)
const deleteSession = () => httpClient.delete(SESSION_URL_PATH)
const getSessionInfo = (sessionId: string) => httpClient.get<any, AxiosResponse<InfoSessionResponseInterface>>(`${SESSION_URL_PATH}/${sessionId}`)

export {
    createSession,
    deleteSession,
    getSessionInfo
}