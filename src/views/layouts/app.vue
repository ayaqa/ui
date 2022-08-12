<template>
    <q-layout view="hHh LpR lFf">
        <nav-bar />
        <left-nav-bar />
        <q-page-container>
            <router-view v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import NavBar from 'src/views/components/layout/NavBar.vue'
import LeftNavBar from 'src/views/components/layout/LeftNavBar.vue'

const appLayout = defineComponent({
    components: {
        NavBar,
        LeftNavBar
    },
    setup () {
        return {}
    }
})


export default appLayout

</script>