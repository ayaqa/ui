import { defineStore } from 'pinia'

import { APP } from 'src/consts'
import config from 'src/config'

export const useAppStore = defineStore('app', {
    state: () => ({
        app: {
            apiURL: config.API_URL,
            sessionId: '',
            isSideMenuOpened: false,
            isRightSidebarOpened: true
        },
        sessionVerified: false
    }),
    getters: {
        hasSession (): boolean { return this.app.sessionId !== '' },
        isValidSession (): boolean { return this.sessionVerified },
    },
    actions: {
        loginSession (sessionId: string) {
            this.app.sessionId = sessionId
            this.setVerifiedSession(true)
        },
        logoutSession () {
            this.app.sessionId = ''
        },
        setVerifiedSession (verified: boolean) {
            this.sessionVerified = verified
        },
        toggleSideMenu () {
            this.app.isSideMenuOpened = !this.app.isSideMenuOpened
        }
    },
    persist: {
        key: APP.STORE.APP_STORE_PERSIST_KEY,
        storage: window.localStorage,
        paths: ['app']
    }
})