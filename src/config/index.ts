
export default {
    IS_PRODUCTION: import.meta.env.PROD || false,
    APP_VERSION: import.meta.env.AYAQA_VERSION_APP,
    API_VERSION: import.meta.env.AYAQA_VERSION_API,

    API_URL: import.meta.env.AYAQA_URL_API_BACKEND,
    API_URL_META: import.meta.env.AYAQA_URL_API_META,
    BASE_URL_GOTO: import.meta.env.AYAQA_URL_GOTO,


    APP: {
        leftNavBarWidth: 250,
        rightSidebarWidth: 200
    }
}