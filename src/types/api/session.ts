
export interface SESSION_CREATE_RESPONSE {
    database: string,
    session: string,
    state: string,
    updated_at: string,
    created_at: string,
    id: number,
}

export enum SessionState {
    CREATED = 'created',
    PROVISIONING = 'provisioning',
    PROVISIONING_FAILED = 'failed',
    DELETING = 'deleting',
    READY = 'ready'
}

export interface SESSION_INFO_RESPONSE {
    id: number,
    session: string,
    state: SessionState,
    deletable: boolean,
}