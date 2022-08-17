import { httpClient } from './client'
import { AxiosResponse } from 'axios'
import {
    TOC_RESPONSE,
    UPDATE_TOC_REQUEST,

    TECHNOLOGIES_RESPONSE,
    TECHNOLOGIES_RADIOS,

    REMINDERS_RESPONSE,
    UPDATE_REMINDERS_REQUEST
} from 'src/types/api'

const CHECKBOX_URL_PATH = '/playground/checkbox'

const fetchTOC = () => httpClient.get<any, AxiosResponse<TOC_RESPONSE>>(`${CHECKBOX_URL_PATH}/toc`)
const storeTOC = (data: UPDATE_TOC_REQUEST) => httpClient.post<any, AxiosResponse<TOC_RESPONSE>>(`${CHECKBOX_URL_PATH}/toc`, data)

const fetchTechnologies = () => httpClient.get<any, AxiosResponse<TECHNOLOGIES_RESPONSE>>(`${CHECKBOX_URL_PATH}/technologies`)
const storeTechnologies = (data: TECHNOLOGIES_RADIOS) => httpClient.post<any, AxiosResponse<TECHNOLOGIES_RESPONSE>>(`${CHECKBOX_URL_PATH}/technologies`, data)

const fetchReminders = () => httpClient.get<any, AxiosResponse<REMINDERS_RESPONSE>>(`${CHECKBOX_URL_PATH}/reminders`)
const storeReminders = (data: UPDATE_REMINDERS_REQUEST) => httpClient.post<any, AxiosResponse<REMINDERS_RESPONSE>>(`${CHECKBOX_URL_PATH}/reminders`, data)


export {
    fetchTOC,
    storeTOC,

    fetchTechnologies,
    storeTechnologies,

    fetchReminders,
    storeReminders
}