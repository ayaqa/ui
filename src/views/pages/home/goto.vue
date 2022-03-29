<template>
    <q-card-section>
        <v-session-checklist :items="list" />
    </q-card-section>
</template>
<script setup lang="ts">

import { useRoute } from 'vue-router';
import useSessionList, { ItemState } from 'src/composables/use-session-list'

const { query } = useRoute()

// in case it coming from new url then display different checklist
const isNew = query?.newSession === '1' || false;
const { list, markSesssionCheck } = useSessionList(isNew)

if (isNew) {
    markSesssionCheck(ItemState.DONE)
}

</script>