<template>
    <q-footer reveal class="bg-teal-1 text-primary">
        <p class="text-right q-mt-none q-mb-none q-mr-sm text-caption">
            App: <span class="text-bold">{{ t('common.v') }}{{ config.APP_VERSION }}</span> &nbsp; &nbsp;
            API: <span class="text-bold">{{ t('common.v') }}{{ config.API_VERSION }}</span>
        </p>
    </q-footer>
</template>

<script setup lang="ts">
import config from 'src/config'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

</script>