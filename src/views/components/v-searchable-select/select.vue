<template>
    <q-select outlined filled stack-label v-model="selected" use-input input-debounce="0" :label="label"
        :options="options" @filter="filterFn" :style="width ? { width: `${width}px` } : {}" behavior="menu"
        :emit-value="isObject" :map-options="isObject" :option-value="optionValue" :option-label="optionLabel"
        :data-ayaqa="`${ayaqaPrefix}-select`">
        <template v-slot:no-option>
            <q-item>
                <q-item-section class="text-grey">
                    No results
                </q-item-section>
            </q-item>
        </template>
        <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
                <q-item-section :data-ayaqa="`${ayaqaPrefix}-${scope.opt[optionValue]}`">
                    <q-item-label>{{ (useChip ? `${scope.opt[chipLabel]}: ` : '') + scope.opt[optionLabel] }}
                    </q-item-label>
                </q-item-section>
            </q-item>
        </template>
        <template v-slot:selected-item="scope" v-if="useChip">
            {{ scope.opt[optionLabel] ? scope.opt[chipLabel] + ': ' + scope.opt[optionLabel] : '' }}
        </template>
    </q-select>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import useModelValue from 'src/composables/use-model-value'

const props = defineProps({
    label: { type: String, required: true },
    options: { type: Array<String | Object>, default: () => [] },
    optionValue: { type: String, default: 'id' },
    optionLabel: { type: String, default: 'text' },
    width: { type: Number, default: null },
    modelValue: { type: String, default: '' },
    ayaqaPrefix: { type: String, default: '' },
    useChip: { type: Boolean, required: false, default: () => false },
    chipLabel: { type: String, required: false, default: 'text' }
})

const options = ref(props.options)
const isObject = computed(() => typeof props.options === 'object')

const emit = defineEmits(['update:modelValue'])
const selected = useModelValue<String>(props, emit)

function filterFn (val: string, update: Function) {
    if (val === '') {
        update(() => {
            options.value = props.options

            return
        })
    }

    update(() => {
        const value = val.toLocaleLowerCase()

        options.value = props.options.filter((v: any) => {
            let filterValue = v
            if (typeof v === 'object') {
                filterValue = v[props.optionLabel as string]
            }

            return filterValue.toLowerCase().indexOf(value) > -1
        })
    })
}

</script>