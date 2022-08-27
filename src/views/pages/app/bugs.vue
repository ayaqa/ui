<template>
    <div class="q-ma-md">
        <div class="row no-wrap justify-between">
            <div class="col-2">
                <span class="text-h6">Bugs Configurator</span>
            </div>
            <div class="col-2 text-right">
                <q-btn label="Apply" size="md" color="primary" class="q-mx-sm" @click="storeBugs"></q-btn>
                <q-btn flat label="Reset" size="md" @click="refreshManifestAndBugs"></q-btn>
            </div>
        </div>
        <q-separator class="q-my-sm" />
        <template v-for="(selectItem, idx) in storedBugs">
            <bug-row v-model="storedBugs[idx]" :target-options="bugManifest?.targets"
                :applicable-options="bugManifest?.applicable" :bug-options="bugManifest?.bugs"
                :condition-options="bugManifest?.conditions" @removeRow="removeBug">
            </bug-row>
        </template>
        <div>
            <q-btn icon="add" label="Add bug row" class="full-width" color="primary" @click="addEmptyBug"></q-btn>
        </div>
    </div>
</template>
<script setup lang="ts">
// @TODO - translation
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'

import { useSessionStore } from 'src/stores'
import {
    BugManifestInterface
} from 'src/types/api'

import BugRow from 'src/views/components/bug/bug-row.vue'

const sessionStore = useSessionStore()

const storedBugs: Array<BugManifestInterface> = reactive(sessionStore.bugs)
const { bugManifest } = storeToRefs(sessionStore)
const { addEmptyBug, removeBug, storeBugs, refreshManifestAndBugs } = sessionStore

if (sessionStore.bugManifest === undefined) {
    refreshManifestAndBugs()
}

</script>