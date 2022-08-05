<template>
    <q-list separator>
        <q-item v-for="item in items">
            <q-item-section avatar>
                <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>{{ item.title }}</q-item-section>
            <q-item-section side>
                <q-spinner-pie size="sm" v-if="item.state.value === SessionCheckState.LOADING" />
                <q-icon name="check_circle_outline" color="green" v-if="item.state.value === SessionCheckState.DONE" />
                <q-icon name="report" color="red" v-if="item.state.value === SessionCheckState.ERROR" />
            </q-item-section>
        </q-item>
    </q-list>
</template>
<script setup lang="ts">
import { SessionCheckItem, SessionCheckState } from 'src/composables/use-session-list'

defineProps<{
    items: SessionCheckItem[]
}>()


</script>