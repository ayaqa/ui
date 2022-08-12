<template>
    <q-drawer v-model="store.app.isSideMenuOpen" side="left" :width=250 show-if-above bordered>
        <q-scroll-area class="fit">
            <q-list :data-ayaqa="attr(AYAQA_ATTRS.sideNav.container)">
                <template v-for="(item, idx) in NAV_BAR_LIST" :key="idx">
                    <left-nav-bar-item :item="item" :title="t(item.title)" :activeRoute="activeRouterName"
                        :opened="item.opened" v-if="item.children">
                        <template v-for="(childItem, idxChild) in item.children" :key="idxChild">
                            <left-nav-bar-item :item="childItem" :title="t(childItem.title)" :opened="childItem.opened"
                                :activeRoute="activeRouterName" v-if="childItem.children">
                                <template v-for="(cldItem, idxCld) in childItem.children" :key="idxCld">
                                    <left-nav-bar-item :item="cldItem" :title="t(cldItem.title)"
                                        :opened="cldItem.opened" :activeRoute="activeRouterName" />
                                </template>
                            </left-nav-bar-item>
                            <left-nav-bar-item :item="childItem" :title="t(childItem.title)" :opened="childItem.opened"
                                :activeRoute="activeRouterName" v-if="!childItem.children" />
                        </template>
                    </left-nav-bar-item>
                    <left-nav-bar-item :item="item" :title="t(item.title)" :activeRoute="activeRouterName"
                        :opened="item.opened" v-if="!item.children" />
                </template>
            </q-list>
        </q-scroll-area>
    </q-drawer>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from "vue-router"

import { useAppStore } from 'src/stores'
import { AYAQA_ATTRS } from 'src/consts'
import { NAV_BAR_LIST, SideNavItem } from 'src/consts/menu'
import useDataAttribute from 'src/composables/use-data-attribute'

import LeftNavBarItem from 'src/views/components/layout/partial/left-nav-bar-item.vue'

const store = useAppStore()
const { t } = useI18n()
const route = useRoute()
const { attr } = useDataAttribute()

const activeRouterName = ref(getRouteName())
watch(() => route.name, (): void => {
    activeRouterName.value = getRouteName();
})

onBeforeMount(() => {
    findActiveMenuAndMarkAsOpened(NAV_BAR_LIST)
})

function getRouteName (): string {
    return route.name?.toString() || ''
}

function findActiveMenuAndMarkAsOpened (navBarList: Array<SideNavItem>): boolean {
    const routeName = getRouteName();

    let foundRoute = false
    navBarList.forEach((item) => {
        let activeChildren = false

        if (item.children) {
            activeChildren = findActiveMenuAndMarkAsOpened(item.children)
        }

        if (routeName === item.route || activeChildren) {
            item.opened = true

            foundRoute = true

            return;
        }
    })

    return foundRoute
}

</script>