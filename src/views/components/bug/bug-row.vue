<template>
    <div class="row no-wrap items-center">
        <div class="col-4 q-mr-sm">
            <v-searchable-select v-model="selected.target" label="Target" :options="targetOptions" />
        </div>
        <div class="col-2">
            <v-searchable-select v-model="selected.applicable" label="Applicable to" :options="applicableOptions"
                :width=150 />
        </div>
        <div class="col-1 offset-5 text-right">
            <q-btn round flat icon="delete" size="sm" @click="removeRow(selected)" />
        </div>
    </div>
    <div class="row q-mt-sm q-mb-sm items-center">
        <div class="col-1 text-right q-pr-sm">
            <q-icon name="pest_control" size="md" :color="selectedBug?.description ? 'primary' : 'dark'">
                <q-tooltip v-if="selectedBug?.description">
                    {{ selectedBug.description }}
                </q-tooltip>
            </q-icon>
        </div>
        <div class="col-3 q-mr-sm">
            <v-searchable-select v-model="selected.bug" label="Bug" :options="bugs" />
        </div>
        <template
            v-if="selectedBug?.configurable === CONFIGURABLE.WITH_PARAMS || selectedBug?.configurable === CONFIGURABLE.WITH_PARAM_KEY">
            <div class="col-4 q-mr-sm">
                <v-searchable-select v-model="selected.bugConfig.key" label="Paramter"
                    :options="selectedTarget?.params" />
            </div>
            <div class="col-2" v-if="selectedBug.configurable === CONFIGURABLE.WITH_PARAMS">
                <q-input outlined filled stack-label v-model="selected.bugConfig.value" label="Value" />
            </div>
        </template>
        <template
            v-if="selectedBug?.configurable === CONFIGURABLE.WITH_UI_ELEMENTS || selectedBug?.configurable === CONFIGURABLE.with_UI_ELEMENT_KEY">
            <div class="col-4">
                <v-searchable-select v-model="selected.bugConfig.key" label="UI Element"
                    :options="selectedTarget?.elements" />
            </div>
            <div class="col-2" v-if="selectedBug.configurable === CONFIGURABLE.WITH_UI_ELEMENTS">
                <q-input outlined filled stack-label v-model="selected.bugConfig.value" label="Value" />
            </div>
        </template>
    </div>
    <div class="row q-mt-sm items-center">
        <div class="col-1 text-right q-pr-sm">
            <q-icon name="calculate" size="md" :color="selectedCondition?.description ? 'primary' : 'dark'">
                <q-tooltip v-if="selectedCondition?.description">
                    {{ selectedCondition.description }}
                </q-tooltip>
            </q-icon>
        </div>
        <div class="col-3 q-mr-sm">
            <v-searchable-select v-model="selected.condition" label="Condition" :options="conditions" />
        </div>
        <template
            v-if="selectedCondition?.configurable === CONFIGURABLE.WITH_PARAMS || selectedCondition?.configurable === CONFIGURABLE.WITH_PARAM_KEY">
            <div class="col-4 q-mr-sm">
                <v-searchable-select v-model="selected.conditionConfig.key" label="Paramter"
                    :options="selectedTarget?.params" />
            </div>
            <div class="col-2" v-if="selectedCondition.configurable === CONFIGURABLE.WITH_PARAMS">
                <q-input outlined filled stack-label v-model="selected.conditionConfig.value" label="Value" />
            </div>
        </template>
        <template
            v-if="selectedCondition?.configurable === CONFIGURABLE.WITH_UI_ELEMENTS || selectedCondition?.configurable === CONFIGURABLE.with_UI_ELEMENT_KEY">
            <div class="col-4">
                <v-searchable-select v-model="selected.conditionConfig.key" label="UI Element"
                    :options="selectedTarget?.elements" />
            </div>
            <div class="col-2" v-if="selectedCondition.configurable === CONFIGURABLE.WITH_UI_ELEMENTS">
                <q-input outlined filled stack-label v-model="selected.conditionConfig.value" label="Value" />
            </div>
        </template>
    </div>
    <q-separator class="q-my-md" />
</template>
<script setup lang="ts">
// @TODO Translate
import { computed, watch } from 'vue'
import type { ComputedRef } from 'vue'

import useModelValue from 'src/composables/use-model-value'
import {
    MinimalItemInterface,
    TargetManifestItemInterface,
    BugManifestItemInterface,
    ConditionManifestItemInterface,
    BugManifestInterface
} from 'src/types/api/bug'

import { APPLICABLE_TO, CONFIGURABLE } from 'src/consts'

const props = defineProps({
    modelValue: {
        type: Object as () => BugManifestInterface, default: {
            target: '',
            applicable: '',
            bug: '',
            bugConfig: { key: '', value: '' },
            condition: '',
            conditionConfig: { key: '', value: '' }
        }
    },
    targetOptions: { type: Array<TargetManifestItemInterface>, default: [] },
    applicableOptions: { type: Array<MinimalItemInterface>, default: [] },
    bugOptions: { type: Array<BugManifestItemInterface>, default: [] },
    conditionOptions: { type: Array<ConditionManifestItemInterface>, default: [] }
})

const emit = defineEmits(['update:modelValue', 'removeRow'])
const selected = useModelValue<BugManifestInterface>(props, emit)

watch(() => [selected.value.target, selected.value.applicable], (newValues, oldValues) => {
    if (newValues[0] !== oldValues[0] && newValues[1] !== APPLICABLE_TO.BOTH) {
        selected.value.applicable = APPLICABLE_TO.BOTH
    }

    clearSelectedBug(true)
})

watch(() => selected.value.bug, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        clearSelectedCondition(true)
        selected.value.bugConfig = { key: '', value: '' }
    }
})

const selectedTarget: ComputedRef<TargetManifestItemInterface | undefined> = computed(() => {
    return props.targetOptions.find(itm => itm.id === selected.value.target)
})

const selectedBug: ComputedRef<BugManifestItemInterface | undefined> = computed(() => {
    return props.bugOptions.find(itm => itm.id === selected.value.bug)
})

const selectedCondition: ComputedRef<ConditionManifestItemInterface | undefined> = computed(() => {
    return props.conditionOptions.find(itm => itm.id === selected.value.condition)
})

const bugs = computed(() => {
    let bugs: Array<string> = []
    const returnBugs: Array<BugManifestItemInterface> = []

    const applicable = selected.value.applicable

    if (selectedTarget.value === undefined || applicable === '') {
        return returnBugs
    }

    bugs = bugs.concat(selectedTarget.value.bugs)

    // remove duplicates
    bugs = bugs.filter((itm, index) => bugs.indexOf(itm) === index)

    props.bugOptions.forEach(itm => {
        if (itm.for != applicable) {
            return
        }

        if (bugs.indexOf(itm.id) === -1) {
            return
        }

        returnBugs.push(itm)
    })

    return returnBugs
})

const conditions = computed(() => {
    let conditions: Array<string> = []
    const returnConditions: Array<ConditionManifestItemInterface> = []

    if (selectedBug.value === undefined) {
        return returnConditions
    }

    conditions = conditions.concat(selectedBug.value.conditions)

    // remove duplicates
    conditions = conditions.filter((itm, index) => conditions.indexOf(itm) === index)

    props.conditionOptions.forEach(itm => {
        // if is not found - skip it
        if (conditions.indexOf(itm.id) === -1) {
            return
        }

        returnConditions.push(itm)
    })

    return returnConditions
})

function removeRow (bugRow: BugManifestInterface) {
    emit('removeRow', bugRow)
}

function clearSelectedBug (resetConfigs: boolean) {
    selected.value.bug = ''
    if (resetConfigs) {
        selected.value.bugConfig = { key: '', value: '' }
    }

    clearSelectedCondition(true)
}

function clearSelectedCondition (resetConfigs: boolean) {
    selected.value.condition = ''
    if (resetConfigs) {
        selected.value.conditionConfig = { key: '', value: '' }
    }
}

</script>