<template>
    <v-test-card :title="t('technologies.title')" :id="UI_SECTIONS.CHECKBOX_2" @onSave="onSave" :loading="loading">
        <div class="q-gutter-md">
            <q-checkbox v-model="multi" val="2g" :label="t('technologies.2g')" color="primary" />
            <q-checkbox v-model="multi" val="3g" :label="t('technologies.3g')" color="primary" />
            <q-checkbox v-model="multi" val="4g" :label="t('technologies.4g')" color="primary" />
            <q-checkbox v-model="multi" val="5g" :label="t('technologies.5g')" color="primary" />
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

const { t } = useI18n()
const multi: Ref<string[]> = ref([])
const loading = ref(true)

// fetch state on init
fetchTechnologies().then((result) => {
    handleResponse(result.data)
})

function onSave () {
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