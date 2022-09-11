const APP = {
    STORE: {
        APP_STORE_PERSIST_KEY: 'local_app_store'
    }
}

enum APPLICABLE_TO {
    ANY = 'any',
    BOTH = 'both',
    APP = 'app',
    API = 'api'
}

enum CONFIG_TYPE {
    NONE = 'none',

    REQ_PARAMETERS = 'req-params',
    REQ_PARAMETER_KEY = 'req-param-key',

    RESP_PARAMETERS = 'resp-params',
    RESP_PARAMETER_KEY = 'resp-param-key',

    UI_ELEMENTS = 'ui',
    UI_ELEMENT_KEY = 'ui-key',

    CUSTOM = 'custom',
    CUSTOM_KEY = 'custom-key',
}

enum SESSION_STATE {
    CREATED = 'created',
    PROVISIONING = 'provisioning',
    PROVISIONING_FAILED = 'failed',
    DELETING = 'deleting',
    READY = 'ready'
}

enum CONFIGURED_BUGS {
    DETACH_SAVE_BTN = 'detach-ui-save',
    HIDE_UI_ELEMENT = 'hide-ui-el',
    UPDATE_UI_LABEL = 'update-ui-label'

}

export {
    APP,
    APPLICABLE_TO,
    CONFIG_TYPE,
    SESSION_STATE,
    CONFIGURED_BUGS
}