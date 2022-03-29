import { httpClient } from './client'
import { AxiosResponse } from 'axios'
import { SESSION_CREATE_RESPONSE } from 'src/types/api/session'

const SESSION_URL_PATH = '/session'

const createSession = () => httpClient.post<any, AxiosResponse<SESSION_CREATE_RESPONSE>>(SESSION_URL_PATH);
const deleteSession = () => httpClient.delete(SESSION_URL_PATH);
const getSessionInfo = (sessionId: string) => httpClient.get(SESSION_URL_PATH, { headers: { session: sessionId } });

export {
    createSession,
    deleteSession,
    getSessionInfo
}