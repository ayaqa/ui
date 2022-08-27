<template>
    <v-test-card :title="t('toc.title')" :id="UI_SECTIONS.CHECKBOX_1" @onSave="onSave" :loading="loading">
        <q-checkbox v-model="state" :label="t('toc.label')" />
    </v-test-card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { UI_SECTIONS } from 'src/consts'
import { useI18n } from 'vue-i18n'
import { fetchTOC, storeTOC } from 'src/api/checkbox'
import { TocReponseInterface } from 'src/types/api'

const { t } = useI18n()
const state = ref(false)
const loading = ref(true)

// fetch state on init
fetchTOC().then((result) => {
    if (result.data) {
        handleResponse(result.data)
    }
})

function onSave () {
    loading.value = true

    storeTOC({
        accepted: state.value
    }).then((result) => {
        handleResponse(result.data)
    })
}

function handleResponse (data: TocReponseInterface) {
    state.value = data.accepted || false
    loading.value = false
}

</script>