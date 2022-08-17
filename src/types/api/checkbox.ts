export interface TOC_RESPONSE {
    id: string,
    accepted: boolean,
}

export interface UPDATE_TOC_REQUEST {
    accepted: boolean,
}

export interface TECHNOLOGIES_RADIOS {
    '2g'?: boolean,
    '3g'?: boolean,
    '4g'?: boolean,
    '5g'?: boolean,
}

export interface TECHNOLOGIES_RESPONSE {
    id: string,
    radio: TECHNOLOGIES_RADIOS,
}

export interface REMINDERS_CHANNELS {
    email?: boolean,
    sms?: boolean,
    app?: boolean,
}

export interface REMINDERS_RESPONSE {
    id: string,
    reminders: boolean,
    channels: REMINDERS_CHANNELS,
}

export interface UPDATE_REMINDERS_REQUEST extends REMINDERS_CHANNELS {
    reminders: boolean,
}