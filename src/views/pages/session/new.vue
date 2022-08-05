<template>
    <q-card-section>
        <v-session-checklist :items="list" />
    </q-card-section>
</template>
<script setup lang="ts">

import { useRouter, useRoute } from 'vue-router'

import { RouteNames, RouteParams } from 'src/consts'
import { createSession } from 'src/api/session';

import useSessionList from 'src/composables/use-session-list'

const router = useRouter()
const route = useRoute()
const { list } = useSessionList(true)

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
    })

</script>