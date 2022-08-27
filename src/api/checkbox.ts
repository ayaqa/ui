import { httpClient } from './client'
import { AxiosResponse } from 'axios'
import {
    TocReponseInterface,
    UpdateTocRequestInterface,

    TechnologiesResponseInterface,
    TechnologiesRadiosInterface,

    ReminderResponseInterface,
    UpdateReminderRequestInterface
} from 'src/types/api'

const CHECKBOX_URL_PATH = '/playground/checkbox'

const fetchTOC = () => httpClient.get<any, AxiosResponse<TocReponseInterface>>(`${CHECKBOX_URL_PATH}/toc`)
const storeTOC = (data: UpdateTocRequestInterface) => httpClient.post<any, AxiosResponse<TocReponseInterface>>(`${CHECKBOX_URL_PATH}/toc`, data)

const fetchTechnologies = () => httpClient.get<any, AxiosResponse<TechnologiesResponseInterface>>(`${CHECKBOX_URL_PATH}/technologies`)
const storeTechnologies = (data: TechnologiesRadiosInterface) => httpClient.post<any, AxiosResponse<TechnologiesResponseInterface>>(`${CHECKBOX_URL_PATH}/technologies`, data)

const fetchReminders = () => httpClient.get<any, AxiosResponse<ReminderResponseInterface>>(`${CHECKBOX_URL_PATH}/reminders`)
const storeReminders = (data: UpdateReminderRequestInterface) => httpClient.post<any, AxiosResponse<ReminderResponseInterface>>(`${CHECKBOX_URL_PATH}/reminders`, data)


export {
    fetchTOC,
    storeTOC,

    fetchTechnologies,
    storeTechnologies,

    fetchReminders,
    storeReminders
}