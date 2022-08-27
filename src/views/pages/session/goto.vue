<template>
    <q-card>
        <q-card-section>
            <v-session-checklist :items="list" show-loading=true />
        </q-card-section>
        <q-card-actions v-if="showBtn" vertical>
            <q-btn @click="handleRemoveSession" color="red" flat>{{ t('init.btn_remove_session') }}</q-btn>
        </q-card-actions>
    </q-card>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Notify } from 'quasar'

import useSessionList, { SessionCheckState } from 'src/composables/use-session-list'
import { useAppStore } from 'src/stores'
import { useI18n } from 'vue-i18n'

import { RouteNames, RouteParams } from 'src/consts'
import { getSessionInfo } from 'src/api/session'
import { SESSION_STATE } from 'src/consts'

const router = useRouter()
const route = useRoute()
const store = useAppStore()
const { t } = useI18n()

// in case it coming from new url then display different checklist
const isNew = route.query?.newSession === '1' || false
const { list, markSesssionCheck, markMigrateDB, markSeedDB } = useSessionList(isNew)
const showBtn = ref(false)

let intervalId: number
onMounted(() => {
    if (isNew) {
        markSesssionCheck(SessionCheckState.DONE)
    }

    intervalId = setInterval(getSessionDetails, 2000)
})

onUnmounted(() => {
    clearInterval(intervalId)
})


const getSessionDetails = () => {
    getSessionInfo(route.params.id as string)
        .then((response) => response.data)
        .then((json) => {

            // clear interval if is ready
            if (json.state !== SESSION_STATE.PROVISIONING) {
                clearInterval(intervalId)
            }

            // handle different cases
            if (json.state !== SESSION_STATE.READY) {

                handleNotReadyState(json.state)

                return
            }

            markSesssionCheck(SessionCheckState.DONE)

            // success handle
            store.loginSession(json.session)

            const pathRedirect = (route.query?.[RouteParams.REDIRECT_TO]) as string || false

            if (pathRedirect !== false) {
                router.push({ path: pathRedirect })
            } else {
                router.push({ name: RouteNames.HOME })
            }
        }).catch((json) => {
            markSesssionCheck(SessionCheckState.ERROR)
            clearInterval(intervalId)

            Notify.create({
                type: 'negative',
                message: t('init_errors.fetch_data', {
                    code: json.response.status,
                    error: json.message
                }),
                position: 'top',
                timeout: 50000,
                progress: true,
                actions: [
                    { label: t('btn.close'), color: 'white', handler: () => { } }
                ]
            })

            showBtn.value = true
        })
}

const handleNotReadyState = (state: SESSION_STATE) => {
    if (state !== SESSION_STATE.PROVISIONING_FAILED) {
        return
    }

    markMigrateDB(SessionCheckState.ERROR)
    markSeedDB(SessionCheckState.ERROR)

    if (false === isNew) {
        markSesssionCheck(SessionCheckState.ERROR)
    }

    Notify.create({
        type: 'negative',
        message: t('init_errors.provision_failed'),
        position: 'top',
        timeout: 50000,
        progress: true,
        actions: [
            { label: t('btn.close'), color: 'white', handler: () => { } }
        ]
    })

    showBtn.value = true
}

const handleRemoveSession = () => {
    store.logoutSession()
    router.push({ name: RouteNames.SESSION.ROOT, query: route.query })
}

</script>