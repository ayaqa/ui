<template>
    <v-test-card :title="t('toc.title')" :id="UI_SECTIONS.CHECKBOX_1" @onSave="onSave" :loading="request">
        <q-skeleton type="QRange" v-if="loading" />
        <q-checkbox v-model="state" :label="labelText" v-if="!isCheckboxHidden && !loading" />
    </v-test-card>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { UI_SECTIONS } from 'src/consts'
import { useI18n } from 'vue-i18n'
import { fetchTOC, storeTOC } from 'src/api/checkbox'
import { TocReponseInterface } from 'src/types/api'
import useConfiguredBugs from 'src/composables/use-configured-bugs'

const { t } = useI18n()
const state = ref(false)
const loading = ref(true)
const request = ref(false)

const UI_ELEMENT_ACCEPTED = 'accepted'

// bugs related code {{{
const configuredBugs = useConfiguredBugs()
const { isHidden, isSaveButtonDetached, getLabel } = configuredBugs

let isButtonDetached = false
const isCheckboxHidden = isHidden(UI_SECTIONS.CHECKBOX_1, UI_ELEMENT_ACCEPTED)
const labelText = getLabel(UI_SECTIONS.CHECKBOX_1, UI_ELEMENT_ACCEPTED) ?? t('toc.label')

watch(state, (newValue) => {
    isButtonDetached = isSaveButtonDetached(UI_SECTIONS.CHECKBOX_1, { [UI_ELEMENT_ACCEPTED]: newValue })
})
// }}}

// ui logic
fetchTOC().then((result) => {
    if (result.data) {
        handleResponse(result.data)
    }
}).finally(() => {
    loading.value = false
    request.value = false
})

function onSave () {
    if (isButtonDetached) return // bug

    request.value = true

    storeTOC({
        [UI_ELEMENT_ACCEPTED]: state.value
    }).then((result) => {
        handleResponse(result.data)
    }).finally(() => {
        loading.value = false
        request.value = false
    })
}

function handleResponse (data: TocReponseInterface) {
    state.value = data[UI_ELEMENT_ACCEPTED] || false
}

</script>