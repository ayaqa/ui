<template>
    <q-card class="q-ma-md" bordered :data-ayaqa="attr(`${AYAQA_ATTRS.testCard.card}-${id}`)">
        <q-toolbar>
            <q-toolbar-title>{{ computedTitle }}</q-toolbar-title>
            <q-space />
            <q-btn flat round icon="more_vert" size="md">
                <q-menu fit>
                    <q-list>
                        <q-item v-if="!hideCases" clickable v-close-popup>
                            <q-item-section avatar class="relative-position">
                                <q-icon name="description" />
                                <q-badge color="green" floating class="q-mr-lg">{{ cases }}</q-badge>
                            </q-item-section>
                            <q-item-section>{{ t('card.test_cases') }}</q-item-section>
                        </q-item>
                        <q-item v-if="!hideAutomations" clickable v-close-popup>
                            <q-item-section avatar class="relative-position">
                                <q-icon name="code" />
                                <q-badge color="green" floating class="q-mr-lg">{{ automations }}</q-badge>
                            </q-item-section>
                            <q-item-section>{{ t('card.automatons') }}</q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item clickable v-close-popup>
                            <q-item-section avatar>
                                <q-icon name="integration_instructions" />
                            </q-item-section>
                            <q-item-section>{{ t('card.api_docs') }}</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
        </q-toolbar>
        <q-separator />
        <q-card-section class="q-pa-sm">
            <slot></slot>
        </q-card-section>
        <q-card-actions>
            <q-btn flat color="primary" :label="t(btnText)" :data-ayaqa="attr(`${AYAQA_ATTRS.testCard.save}-${id}`)"
                @click="save" />
            <q-space />
            <q-btn flat size="sm" :color="btnColor" @click="copyIdToClipboard">
                <q-tooltip>
                    {{ t('btn.copy_to_clipboard') }}
                </q-tooltip>
                <span class="text-caption text-uppercase text-grey-5">{{ id }}</span>
            </q-btn>
        </q-card-actions>
        <q-inner-loading :showing="loading" />
    </q-card>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useDataAttribute, { AYAQA_ATTRS } from 'src/composables/use-data-attribute'
import { useMetaStore } from 'src/stores'
import { copyToClipboard } from 'quasar'

const props = defineProps({
    id: { type: String, required: true },
    title: { type: String, required: false },
    hideCases: { type: Boolean, default: () => false },
    hideAutomations: { type: Boolean, default: () => false },
    btnText: { type: String, default: () => 'btn.save' },
    loading: { type: Boolean, default: () => false }
})

const emit = defineEmits(['onSave'])

const metaStore = useMetaStore()
const { attr } = useDataAttribute()
const { t } = useI18n()

const cases = computed(() => metaStore.getCases(props.id))
const automations = computed(() => metaStore.getAutomations(props.id))
const computedTitle = computed(() => props.title ? props.title : props.id)
const btnColor = ref('')

function copyIdToClipboard () {
    btnColor.value = ''

    copyToClipboard(props.id).then(() => {
        btnColor.value = 'green'

        setTimeout(() => { btnColor.value = '' }, 500)
    })
}

function save () {
    emit('onSave')
}

</script>