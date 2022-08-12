<template>
    <q-card-section>
        <v-session-checklist :items="list" />
        <q-card-actions v-if="showBtn" vertical>
            <q-btn @click="$router.go(-1)" color="red" flat>{{ t('btn.go_back') }}</q-btn>
        </q-card-actions>
    </q-card-section>
</template>
<script setup lang="ts">
import { Notify } from 'quasar'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { RouteNames, RouteParams } from 'src/consts'
import { createSession } from 'src/api/session'

import useSessionList from 'src/composables/use-session-list'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const { list } = useSessionList(true)
const { t } = useI18n()

const showBtn = ref(false)

createSession()
    .then((response) => response.data)
    .then((json) => {

        const query = Object.assign({}, { newSession: 1 }, route.query)

        router.push({
            name: RouteNames.SESSION.ID,
            params: {
                [RouteParams.SESSION.ID]: json.session,
            },
            query
        })
    }).catch((json) => {

        showBtn.value = true
        Notify.create({
            type: 'negative',
            message: t('init_errors.create_session', {
                code: json.response.status,
                error: json.response.data?.message || json.message
            }),
            position: 'top',
            timeout: 50000,
            progress: true,
            actions: [
                { label: t('btn.close'), color: 'white', handler: () => { } }
            ]
        })
    })

</script>