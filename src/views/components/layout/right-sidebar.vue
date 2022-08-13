<template>
    <q-drawer v-model="isOpen" side="right" :width=config.APP.rightSidebarWidth show-if-above bordered>
        <div class="text-center text-caption text-blue-grey-13">{{ t('common.do_not_test') }}</div>
        <q-separator />
    </q-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import config from 'src/config'

const isOpen = ref(true)
const { t } = useI18n()

</script>