<template>
    <q-list separator>
        <q-item v-for="item in items">
            <q-item-section avatar>
                <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>{{ item.title }}</q-item-section>
            <q-item-section side>
                <q-spinner-pie size="sm" v-if="item.state.value === 'loading'" />
                <q-icon name="check_circle_outline" color="green" v-if="item.state.value === 'done'" />
            </q-item-section>
        </q-item>
        <q-inner-loading :showing="showLoading" label-class="text-teal" label-style="font-size: 1.1em" />
    </q-list>
</template>
<script setup lang="ts">
import { withDefaults, Ref } from 'vue'
import { Item } from 'src/composables/use-session-list'

interface Props {
    items: Item[],
    showLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    showLoading: false
});

</script>