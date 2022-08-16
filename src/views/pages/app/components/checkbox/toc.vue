<template>
    <v-test-card :title="t('toc.title')" :id="UI_SECTIONS.CHECKBOX_1" @onSave="onSave">
        <q-checkbox v-model="state" :label="t('toc.label')" />
    </v-test-card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { UI_SECTIONS } from 'src/consts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const state = ref(false)

function onSave () {
    console.log('onSave', state)
}

</script>