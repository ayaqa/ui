
import { SESSION_STATE } from 'src/consts'

export interface CreateSessionResponseInterface {
    database: string,
    session: string,
    state: string,
    updated_at: string,
    created_at: string,
    id: number,
}

export interface InfoSessionResponseInterface {
    id: number,
    session: string,
    state: SESSION_STATE,
    deletable: boolean,
}