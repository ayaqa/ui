<template>
    <div class="row no-wrap items-center">
        <div class="col-4 q-mr-sm">
            <v-searchable-select v-model="selected.target" label="Target" :options="targetOptions"
                ayaqa-prefix="target" />
        </div>
        <div class="col-2">
            <v-searchable-select v-model="selected.applicable" label="Applicable to" :options="applicableOptions"
                :width=150 ayaqa-prefix="applicable" />
        </div>
        <div class="col-1 offset-5 text-right">
            <q-btn round flat icon="delete" size="sm" @click="removeRow(selected)" />
        </div>
    </div>
    <div class="row q-mt-sm q-mb-sm items-center">
        <div class="col-1 text-right q-pr-sm">
            <q-icon name="pest_control" size="md" :color="selectedBug?.description ? 'primary' : 'dark'"
                :class="{ 'cursor-pointer': selectedBug?.description ?? false }"
                @click="displayInDialog(selectedBug?.description ?? '')">
            </q-icon>
        </div>
        <div class="col-3 q-mr-sm">
            <v-searchable-select v-model="selected.bug" label="Bug" :options="bugs" ayaqa-prefix="bug" use-chip
                chip-label="for" />
        </div>
        <param-config v-model="selected.bugConfig" :config-type="selectedBug?.configType ?? CONFIG_TYPE.NONE"
            :attributes="selectedTarget?.attributes" @click-value-info="displayValueInfo" />
    </div>
    <div class="row q-mt-sm items-center">
        <div class="col-1 text-right q-pr-sm">
            <q-icon name="calculate" size="md" :color="selectedCondition?.description ? 'primary' : 'dark'"
                @click="displayInDialog(selectedCondition?.description ?? '')"
                :class="{ 'cursor-pointer': selectedCondition?.description ?? false }">
            </q-icon>
        </div>
        <div class="col-3 q-mr-sm">
            <v-searchable-select v-model="selected.condition" label="Condition" :options="conditions"
                ayaqa-prefix="condition" />
        </div>
        <param-config v-model="selected.conditionConfig"
            :config-type="selectedCondition?.configType ?? CONFIG_TYPE.NONE" :attributes="selectedTarget?.attributes"
            @click-value-info="displayValueInfo" />
    </div>
    <q-separator class="q-my-md" />
</template>
<script setup lang="ts">
// @TODO Translate
import { computed, watch } from 'vue'
import type { ComputedRef } from 'vue'
import { useQuasar } from 'quasar'

import useModelValue from 'src/composables/use-model-value'
import {
    MinimalItemInterface,
    TargetManifestItemInterface,
    BugManifestItemInterface,
    ConditionManifestItemInterface,
    BugManifestInterface
} from 'src/types/api/bug'

import { APPLICABLE_TO, CONFIG_TYPE } from 'src/consts'

import ParamConfig from './param-config.vue'

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
const $q = useQuasar()

watch(() => [selected.value.target, selected.value.applicable], (newValues, oldValues) => {
    if (newValues[0] !== oldValues[0] && newValues[1] !== APPLICABLE_TO.ANY) {
        selected.value.applicable = APPLICABLE_TO.ANY
    }

    let diff = newValues.filter(x => oldValues.includes(x))

    // only if have diff in any call clearing blugs
    if (diff.length != 2) {
        clearSelectedBug(true)
    }
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
        if (itm.for != applicable && applicable !== APPLICABLE_TO.ANY) {
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

function displayInDialog (message: string) {
    if (message === '') {
        return
    }

    $q.dialog({
        title: 'Usage info',
        message,
        ok: 'Ok'
    })
}

function displayValueInfo () {

    // @TODO locale
    $q.dialog({
        title: 'Usage info',
        message: `
        Values are <strong>not validated and might cause isssue with DB</strong>. 
        Configure values only from same type as parameter!
        <br /><br />
        <strong>All values are compared lowercased.</strong>
        <br /><br />Cast rules<ul><li>true / false (string) -> bool</li></ul>`,
        html: true,
        ok: 'Ok'
    })
}

</script>