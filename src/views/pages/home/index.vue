<template>
    <q-card-section class="bg-primary">
        <h4 class="text-h5 text-white q-my-md">AyaQA</h4>
    </q-card-section>
    <q-card-section>
        <div class="row q-py-md">
            <q-btn
                push
                label="Create testing session"
                color="primary"
                class="col-12"
                @click="$router.push({ name: RouteNames.GOTO.NEW })"
            />
        </div>
        <q-separator />
        <div class="row q-py-md">
            <q-input
                square
                clearable
                v-model="session"
                type="text"
                label="Session Identifier"
                class="col-8 q-pr-sm"
            >
                <template v-slot:prepend></template>
            </q-input>
            <q-btn
                flat
                push
                label="Go"
                color="primary"
                class="col-4"
                @click="gotoSession"
                :disable="!hasValidSession"
            />
        </div>
    </q-card-section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from 'src/stores/app';

import { RouteNames, RouteParams } from 'src/consts/routes'

const router = useRouter()
const appStore = useAppStore();

const session = ref<string>(appStore.app.sessionId);
const hasValidSession = computed(() => { return session.value !== '' })

const gotoSession = () => {
    router.push({
        name: RouteNames.GOTO.ID,
        params: {
            [RouteParams.GOTO.ID]: session.value
        }
    })
}
</script>