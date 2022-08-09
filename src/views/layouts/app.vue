<template>
    <q-layout view="hHh LpR lFf">
        <nav-bar />
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import NavBar from 'src/views/components/layout/NavBar.vue'

const appLayout = defineComponent({
    components: {
        NavBar
    },
    setup() {
        return {}
    }
})


export default appLayout

</script>