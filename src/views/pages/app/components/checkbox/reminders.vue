<template>
    <v-test-card :title="t('reminders.title')" :id="UI_SECTIONS.CHECKBOX_3" @onSave="onSave">
        <q-checkbox v-model="reminders" val="reminders" :label="label[CHECKBOX_TYPES.REMINDERS]" color="primary"
            v-if="!isHiddenMap[CHECKBOX_TYPES.REMINDERS]" />
        <div class="q-gutter-md" v-if="reminders">
            <q-checkbox v-model="channels" val="email" :label="label[CHECKBOX_TYPES.EMAIL]" color="primary"
                v-if="!isHiddenMap[CHECKBOX_TYPES.EMAIL]" />
            <q-checkbox v-model="channels" val="sms" :label="label[CHECKBOX_TYPES.SMS]" color="primary"
                v-if="!isHiddenMap[CHECKBOX_TYPES.SMS]" />
            <q-checkbox v-model="channels" val="app" :label="label[CHECKBOX_TYPES.APP]" color="primary" disable
                v-if="!isHiddenMap[CHECKBOX_TYPES.APP]" />
        </div>
    </v-test-card>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { UI_SECTIONS } from 'src/consts'
import { useI18n } from 'vue-i18n'
import { fetchReminders, storeReminders } from 'src/api/checkbox'
import { ReminderResponseInterface, ReminderChannelsInterface } from 'src/types/api/checkbox'
import useConfiguredBugs from 'src/composables/use-configured-bugs'


enum CHECKBOX_TYPES {
    REMINDERS = 'reminders',
    EMAIL = 'email',
    SMS = 'sms',
    APP = 'app',
}

const { t } = useI18n()
const reminders = ref(false)
const channels: Ref<string[]> = ref([])
const loading = ref(true)

// bugs related code {{{
const configuredBugs = useConfiguredBugs()
const { isHidden, isSaveButtonDetached, getLabel } = configuredBugs

const isHiddenMap = {
    [CHECKBOX_TYPES.REMINDERS]: isHidden(UI_SECTIONS.CHECKBOX_3, CHECKBOX_TYPES.REMINDERS),
    [CHECKBOX_TYPES.EMAIL]: isHidden(UI_SECTIONS.CHECKBOX_3, CHECKBOX_TYPES.EMAIL),
    [CHECKBOX_TYPES.SMS]: isHidden(UI_SECTIONS.CHECKBOX_3, CHECKBOX_TYPES.SMS),
    [CHECKBOX_TYPES.APP]: isHidden(UI_SECTIONS.CHECKBOX_3, CHECKBOX_TYPES.APP),
}

const label = {
    [CHECKBOX_TYPES.REMINDERS]: getLabel(UI_SECTIONS.CHECKBOX_3, CHECKBOX_TYPES.REMINDERS) ?? t('reminders.label'),
    [CHECKBOX_TYPES.EMAIL]: getLabel(UI_SECTIONS.CHECKBOX_3, CHECKBOX_TYPES.EMAIL) ?? t('reminders.viaEmail'),
    [CHECKBOX_TYPES.SMS]: getLabel(UI_SECTIONS.CHECKBOX_3, CHECKBOX_TYPES.SMS) ?? t('reminders.viaSMS'),
    [CHECKBOX_TYPES.APP]: getLabel(UI_SECTIONS.CHECKBOX_3, CHECKBOX_TYPES.APP) ?? t('reminders.viaAPP'),
}

let isButtonDetached = saveButtonDetached(reminders.value, channels.value)
watch([reminders, channels], (newValue) => {
    isButtonDetached = saveButtonDetached(reminders.value, newValue[1])
})
// }}}


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

function saveButtonDetached (reminders: boolean, newValue: string[]) {
    return isSaveButtonDetached(UI_SECTIONS.CHECKBOX_3, {
        [CHECKBOX_TYPES.REMINDERS]: reminders,
        [CHECKBOX_TYPES.EMAIL]: newValue.indexOf(CHECKBOX_TYPES.EMAIL) !== -1,
        [CHECKBOX_TYPES.SMS]: newValue.indexOf(CHECKBOX_TYPES.SMS) !== -1,
        [CHECKBOX_TYPES.APP]: newValue.indexOf(CHECKBOX_TYPES.APP) !== -1
    })
}
</script>