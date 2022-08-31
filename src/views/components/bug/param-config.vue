<template>
    <div class="col-4 q-mr-sm" v-if="configType !== CONFIG_TYPE.NONE">
        <v-searchable-select v-model="selected.key" :label="label" :options="options" ayaqa-prefix="bug-param" />
    </div>
    <div class="col-2" v-if="!isOnlyKey">
        <q-input outlined filled stack-label v-model="selected.value" label="Value" data-ayaqa="bug-param-value">
            <template v-slot:append>
                <q-btn round dense flat icon="info" size="md" @click="onClickValueInfo()" />
            </template>
        </q-input>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import useModelValue from 'src/composables/use-model-value'
import {
    ConfigurableManifestInterface, TargetManifestAttributesInterface
} from 'src/types/api'
import { CONFIG_TYPE } from 'src/consts'


const props = defineProps({
    modelValue: {
        type: Object as () => ConfigurableManifestInterface,
        default: {
            key: null,
            value: null
        }
    },
    configType: { type: String as () => CONFIG_TYPE, default: CONFIG_TYPE.NONE },
    attributes: { type: Object as () => TargetManifestAttributesInterface, default: null },
    onClickValueInfo: { type: Function, default: () => { } }
})

const emit = defineEmits(['update:modelValue'])
const selected = useModelValue<ConfigurableManifestInterface>(props, emit)

const label = computed(() => {
    switch (props.configType) {
        case CONFIG_TYPE.REQ_PARAMETERS:
        case CONFIG_TYPE.REQ_PARAMETER_KEY:
            return 'Parameter Key'
        case CONFIG_TYPE.RESP_PARAMETERS:
        case CONFIG_TYPE.RESP_PARAMETER_KEY:
            return 'Response Parameter Key'
        default:
            return 'UI Element'
    }
})

const options = computed(() => {
    switch (props.configType) {
        case CONFIG_TYPE.REQ_PARAMETERS:
        case CONFIG_TYPE.REQ_PARAMETER_KEY:
            return props.attributes.reqParams
        case CONFIG_TYPE.RESP_PARAMETERS:
        case CONFIG_TYPE.RESP_PARAMETER_KEY:
            return props.attributes.respParams
        case CONFIG_TYPE.UI_ELEMENTS:
        case CONFIG_TYPE.UI_ELEMENT_KEY:
            return props.attributes.ui
        default:
            return []
    }
})

const isOnlyKey = computed(() => {
    switch (props.configType) {
        case CONFIG_TYPE.NONE: // edge case fix
        case CONFIG_TYPE.REQ_PARAMETER_KEY:
        case CONFIG_TYPE.RESP_PARAMETER_KEY:
        case CONFIG_TYPE.CUSTOM_KEY:
        case CONFIG_TYPE.UI_ELEMENT_KEY:
            return true
        default:
            return false
    }
})

</script>