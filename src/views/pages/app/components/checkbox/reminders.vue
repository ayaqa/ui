<template>
    <v-test-card :title="t('reminders.title')" :id="UI_SECTIONS.CHECKBOX_3" @onSave="onSave">
        <q-checkbox v-model="reminders" val="reminders" :label="t('reminders.label')" color="primary" />
        <div class="q-gutter-md" v-if="reminders">
            <q-checkbox v-model="channels" val="email" :label="t('reminders.viaEmail')" color="primary" />
            <q-checkbox v-model="channels" val="sms" :label="t('reminders.viaSMS')" color="primary" />
            <q-checkbox v-model="channels" val="app" :label="t('reminders.viaAPP')" color="primary" disable />
        </div>
    </v-test-card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { UI_SECTIONS } from 'src/consts'
import { useI18n } from 'vue-i18n'
import { fetchReminders, storeReminders } from 'src/api/checkbox'
import { ReminderResponseInterface, ReminderChannelsInterface } from 'src/types/api/checkbox'

const { t } = useI18n()
const reminders = ref(false)
const channels: Ref<string[]> = ref([])
const loading = ref(true)

fetchReminders().then((response) => {
    handleResponse(response.data)
})

function onSave () {
    loading.value = true

    let requestData: ReminderChannelsInterface = {}
    channels.value.forEach((key) => {
        requestData[key as keyof ReminderChannelsInterface] = true
    })

    storeReminders({
        reminders: reminders.value,
        ...requestData
    }).then((response) => {
        handleResponse(response.data)
    })
}

function handleResponse (data: ReminderResponseInterface) {
    loading.value = false
    reminders.value = data.reminders

    let tmp: string[] = []
    Object.keys(data.channels).forEach((key) => {
        if (data.channels[key as keyof ReminderChannelsInterface] === true) {
            tmp.push(key)
        }
    })

    channels.value = tmp

}
</script>