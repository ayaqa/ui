const APP = {
    STORE: {
        APP_STORE_PERSIST_KEY: 'local_app_store'
    }
}

enum APPLICABLE_TO {
    BOTH = 'both',
    APP = 'app',
    API = 'api'
}

enum CONFIGURABLE {
    NONE = 'none',
    WITH_PARAMS = 'params',
    WITH_PARAM_KEY = 'param-key',

    WITH_UI_ELEMENTS = 'ui',
    with_UI_ELEMENT_KEY = 'ui-key',

    WITH_CUSTOM = 'custom',
    WITH_CUSTOM_KEY = 'custom-key'
}

enum SESSION_STATE {
    CREATED = 'created',
    PROVISIONING = 'provisioning',
    PROVISIONING_FAILED = 'failed',
    DELETING = 'deleting',
    READY = 'ready'
}

export {
    APP,
    APPLICABLE_TO,
    CONFIGURABLE,
    SESSION_STATE
}