<template>
    <q-layout view="hHh LpR lFf">
        <nav-bar />
        <left-nav-bar />
        <right-side-bar />
        <q-page-container>
            <router-view v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </q-page-container>
        <bottom-line />
    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import NavBar from 'src/views/components/layout/nav-bar.vue'
import LeftNavBar from 'src/views/components/layout/left-nav-sidebar.vue'
import RightSideBar from 'src/views/components/layout/right-sidebar.vue'
import BottomLine from '../components/layout/bottom-line.vue'

const appLayout = defineComponent({
    components: {
        NavBar,
        LeftNavBar,
        RightSideBar,
        BottomLine
    },
    setup () {
        return {}
    }
})

export default appLayout
</script>