// toc
export interface TocReponseInterface {
    id: string,
    accepted: boolean,
}

export interface UpdateTocRequestInterface {
    accepted: boolean,
}

// technologies
export interface TechnologiesRadiosInterface {
    '2g'?: boolean,
    '3g'?: boolean,
    '4g'?: boolean,
    '5g'?: boolean,
}

export interface TechnologiesResponseInterface {
    id: string,
    radio: TechnologiesRadiosInterface,
}


// reminders
export interface ReminderChannelsInterface {
    email?: boolean,
    sms?: boolean,
    app?: boolean,
}

export interface ReminderResponseInterface {
    id: string,
    reminders: boolean,
    channels: ReminderChannelsInterface,
}

export interface UpdateReminderRequestInterface extends ReminderChannelsInterface {
    reminders: boolean,
}