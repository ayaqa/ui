<template>
    <v-test-card :title="t('technologies.title')" :id="UI_SECTIONS.CHECKBOX_2" @onSave="onSave" :loading="request">
        <q-skeleton type="QRange" v-if="loading" />
        <div class="q-gutter-md" v-if="!loading">
            <q-checkbox v-model="multi" :val="RADIO_KEYS.G2" :label="label[RADIO_KEYS.G2]" color="primary"
                v-if="!isHiddenMap[RADIO_KEYS.G2]" />
            <q-checkbox v-model="multi" :val="RADIO_KEYS.G3" :label="label[RADIO_KEYS.G3]" color="primary"
                v-if="!isHiddenMap[RADIO_KEYS.G3]" />
            <q-checkbox v-model="multi" :val="RADIO_KEYS.G4" :label="label[RADIO_KEYS.G4]" color="primary"
                v-if="!isHiddenMap[RADIO_KEYS.G4]" />
            <q-checkbox v-model="multi" :val="RADIO_KEYS.G5" :label="label[RADIO_KEYS.G5]" color="primary"
                v-if="!isHiddenMap[RADIO_KEYS.G5]" />
        </div>
    </v-test-card>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { UI_SECTIONS } from 'src/consts'
import { useI18n } from 'vue-i18n'
import { fetchTechnologies, storeTechnologies } from 'src/api/checkbox'
import { TechnologiesResponseInterface, TechnologiesRadiosInterface } from 'src/types/api'
import useConfiguredBugs from 'src/composables/use-configured-bugs'


const { t } = useI18n()
const multi: Ref<string[]> = ref([])
const loading = ref(true)
const request = ref(false)

enum RADIO_KEYS {
    G2 = '2g',
    G3 = '3g',
    G4 = '4g',
    G5 = '5g'
}

// bugs related code {{{
const configuredBugs = useConfiguredBugs()
const { isHidden, isSaveButtonDetached, getLabel } = configuredBugs

const isHiddenMap = {
    [RADIO_KEYS.G2]: isHidden(UI_SECTIONS.CHECKBOX_2, RADIO_KEYS.G2),
    [RADIO_KEYS.G3]: isHidden(UI_SECTIONS.CHECKBOX_2, RADIO_KEYS.G3),
    [RADIO_KEYS.G4]: isHidden(UI_SECTIONS.CHECKBOX_2, RADIO_KEYS.G4),
    [RADIO_KEYS.G5]: isHidden(UI_SECTIONS.CHECKBOX_2, RADIO_KEYS.G5),
}
const label = {
    [RADIO_KEYS.G2]: getLabel(UI_SECTIONS.CHECKBOX_2, RADIO_KEYS.G2) ?? t('technologies.2g'),
    [RADIO_KEYS.G3]: getLabel(UI_SECTIONS.CHECKBOX_2, RADIO_KEYS.G3) ?? t('technologies.3g'),
    [RADIO_KEYS.G4]: getLabel(UI_SECTIONS.CHECKBOX_2, RADIO_KEYS.G4) ?? t('technologies.4g'),
    [RADIO_KEYS.G5]: getLabel(UI_SECTIONS.CHECKBOX_2, RADIO_KEYS.G5) ?? t('technologies.5g'),
}

let isButtonDetached = saveButtonDetached(multi.value)
watch(multi, (newValue) => {
    isButtonDetached = saveButtonDetached(newValue)
})
// }}}

// ui logic
fetchTechnologies().then((result) => {
    handleResponse(result.data)
}).finally(() => {
    loading.value = false
    request.value = false
})

function onSave () {
    if (isButtonDetached) return // bug

    request.value = true

    let requestData: TechnologiesRadiosInterface = {}
    multi.value.forEach((key) => {
        requestData[key as keyof TechnologiesRadiosInterface] = true
    })

    storeTechnologies(requestData).then((result) => {
        handleResponse(result.data)
    }).finally(() => {
        loading.value = false
        request.value = false
    })
}

function handleResponse (data: TechnologiesResponseInterface) {
    let radios: string[] = []
    Object.keys(data.radio).forEach((key) => {
        if (data.radio[key as keyof TechnologiesRadiosInterface] === true) {
            radios.push(key)
        }
    })

    multi.value = radios
}

function saveButtonDetached (newValue: string[]) {
    return isSaveButtonDetached(UI_SECTIONS.CHECKBOX_2, {
        [RADIO_KEYS.G2]: newValue.indexOf(RADIO_KEYS.G2) !== -1,
        [RADIO_KEYS.G3]: newValue.indexOf(RADIO_KEYS.G3) !== -1,
        [RADIO_KEYS.G4]: newValue.indexOf(RADIO_KEYS.G4) !== -1,
        [RADIO_KEYS.G5]: newValue.indexOf(RADIO_KEYS.G5) !== -1
    })
}

</script>