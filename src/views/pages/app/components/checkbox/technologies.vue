<template>
    <v-test-card :title="t('technologies.title')" :id="UI_SECTIONS.CHECKBOX_2" @onSave="onSave" :loading="loading">
        <div class="q-gutter-md">
            <q-checkbox v-model="multi" val="2g" :label="label['2g']" color="primary" v-if="!isHidden['2g']" />
            <q-checkbox v-model="multi" val="3g" :label="label['3g']" color="primary" v-if="!isHidden['3g']" />
            <q-checkbox v-model="multi" val="4g" :label="label['4g']" color="primary" v-if="!isHidden['4g']" />
            <q-checkbox v-model="multi" val="5g" :label="label['5g']" color="primary" v-if="!isHidden['5g']" />
        </div>
    </v-test-card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { UI_SECTIONS } from 'src/consts'
import { useI18n } from 'vue-i18n'
import { fetchTechnologies, storeTechnologies } from 'src/api/checkbox'
import { TechnologiesResponseInterface, TechnologiesRadiosInterface } from 'src/types/api'
import useConfiguredBugs from 'src/composables/use-configured-bugs'

const configuredBugs = useConfiguredBugs()

const { t } = useI18n()
const multi: Ref<string[]> = ref([])
const loading = ref(true)

// bugs
const isHidden = {
    '2g': configuredBugs.isHidden(UI_SECTIONS.CHECKBOX_2, '2g'),
    '3g': configuredBugs.isHidden(UI_SECTIONS.CHECKBOX_2, '3g'),
    '4g': configuredBugs.isHidden(UI_SECTIONS.CHECKBOX_2, '4g'),
    '5g': configuredBugs.isHidden(UI_SECTIONS.CHECKBOX_2, '5g'),
}
const isButtonDetached = configuredBugs.isSaveButtonDetached(UI_SECTIONS.CHECKBOX_2)
const label = {
    '2g': configuredBugs.getLabel(UI_SECTIONS.CHECKBOX_2, '2g') ?? t('technologies.2g'),
    '3g': configuredBugs.getLabel(UI_SECTIONS.CHECKBOX_2, '3g') ?? t('technologies.3g'),
    '4g': configuredBugs.getLabel(UI_SECTIONS.CHECKBOX_2, '4g') ?? t('technologies.4g'),
    '5g': configuredBugs.getLabel(UI_SECTIONS.CHECKBOX_2, '5g') ?? t('technologies.5g'),
}

// ui logic
fetchTechnologies().then((result) => {
    handleResponse(result.data)
})

function onSave () {
    if (isButtonDetached) return // bug

    loading.value = true

    let requestData: TechnologiesRadiosInterface = {}
    multi.value.forEach((key) => {
        requestData[key as keyof TechnologiesRadiosInterface] = true
    })

    storeTechnologies(requestData).then((result) => {
        handleResponse(result.data)
    })
}

function handleResponse (data: TechnologiesResponseInterface) {
    loading.value = false

    let radios: string[] = []
    Object.keys(data.radio).forEach((key) => {
        if (data.radio[key as keyof TechnologiesRadiosInterface] === true) {
            radios.push(key)
        }
    })

    multi.value = radios
}

</script>