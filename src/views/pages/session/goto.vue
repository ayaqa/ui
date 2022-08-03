<template>
    <q-card-section>
        <v-session-checklist :items="list" />
    </q-card-section>
</template>
<script setup lang="ts">

import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import useSessionList, { SessionCheckState } from 'src/composables/use-session-list'
import { useAppStore } from 'src/stores'
import { RouteNames, RouteParams } from 'src/consts'
import { getSessionInfo } from 'src/api/session'
import { SessionState } from 'src/types/api/session'


const route = useRoute()
const router = useRouter()
const store = useAppStore()

// in case it coming from new url then display different checklist
const isNew = route.query?.newSession === '1' || false;
const { list, markSesssionCheck } = useSessionList(isNew)

let intervalId: number;
onMounted(() => {
    if (isNew) {
        markSesssionCheck(SessionCheckState.DONE)
    }

    intervalId = setInterval(validateSession, 2000)
})

onUnmounted(() => {
    clearInterval(intervalId);
})

const validateSession = () => {
    getSessionInfo(route.params.id as string)
        .then((response) => response.data)
        .then((json) => {
            if (json.state !== SessionState.READY) {
                // @TODO handle deleted and failed states
                return;
            }

            clearInterval(intervalId)

            store.setSession(json.session)
            store.setValidSession(true)

            const pathRedirect = (route.query?.[RouteParams.REDIRECT_TO]) as string || false;

            if (pathRedirect !== false) {
                router.push({ path: pathRedirect })
            } else {
                router.push({ name: RouteNames.HOME })
            }
        })
};

</script>