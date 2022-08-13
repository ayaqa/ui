<template>
    <q-header reveal class="bg-primary text-white">
        <q-toolbar>
            <!-- <q-btn dense flat round icon="menu" @click="toggleSideMenu"
                :data-ayaqa="attr(AYAQA_ATTRS.topNav.sideMenuButton)">
                <q-tooltip>
                    {{ t('tooltip.navigation_toggle') }}
                </q-tooltip>
            </q-btn> -->
            <q-toolbar-title shrink>
                <q-avatar>
                    <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
                </q-avatar>
                AyaQA Playground
            </q-toolbar-title>
            <q-tabs v-model="navBarActiveItem" inline-label :data-ayaqa="attr(AYAQA_ATTRS.topNav.bar)">
                <q-route-tab icon="settings" name="configure" :label="t('btn.configure')"
                    :data-ayaqa="attr(AYAQA_ATTRS.topNav.configureButton)"
                    :to="{ name: RouteNames.SESSION.CONFIGURE }" />
                <q-route-tab icon="bug_report" name="bugs" :label="t('btn.bugs')"
                    :data-ayaqa="attr(AYAQA_ATTRS.topNav.bugButton)" :to="{ name: RouteNames.SESSION.BUGS }" />
            </q-tabs>
            <q-space />
            <q-btn-dropdown stretch flat :label="t('btn.support')" :data-ayaqa="attr(AYAQA_ATTRS.topNav.supportButton)">
                <q-list dense padding>
                    <template v-for="(item, idx) in menuListItems" :key="idx">
                        <q-item clickable v-close-popup @click="handleClickDropdown(item.url)"
                            :data-ayaqa="attr(item.ayaqa)">
                            <q-item-section avatar>
                                <q-icon :name="item.icon" size="sm" />
                            </q-item-section>
                            <q-item-section>
                                {{ t(item.text) }}
                            </q-item-section>
                        </q-item>
                        <q-separator v-if="item.addSeparatorAfter" />
                    </template>
                </q-list>
            </q-btn-dropdown>
            <q-btn flat round icon="logout" :data-ayaqa="attr(AYAQA_ATTRS.topNav.logoutButton)" @click="handleLogout">
                <q-tooltip>
                    {{ t('logout') }}
                </q-tooltip>
            </q-btn>
        </q-toolbar>
    </q-header>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useAppStore } from 'src/stores'
import useDataAttribute from 'src/composables/use-data-attribute'
import useSupportDropdownList from 'src/composables/use-support-dropdown-list'
import { AYAQA_ATTRS, RouteNames } from 'src/consts'

export default defineComponent({
    name: 'NavBar',
    setup () {
        const { attr } = useDataAttribute()
        const { t } = useI18n({ useScope: 'global' })
        const { toggleSideMenu, logoutSession } = useAppStore()
        const route = useRoute()
        const router = useRouter()
        const { menuListItems } = useSupportDropdownList()

        const navBarActiveItem = ref(route.name?.toString() || '')
        watch(() => route.name, (newName): void => {
            navBarActiveItem.value = newName?.toString() || ''
        })

        const handleClickDropdown = (url: string) => {
            window.open(url, '_blank')
        }

        const handleLogout = () => {
            logoutSession()
            router.push({ name: RouteNames.SESSION.ROOT, query: route.query })
        }

        return {
            attr, t, AYAQA_ATTRS, RouteNames,
            navBarActiveItem, menuListItems,
            toggleSideMenu, handleLogout, handleClickDropdown
        }
    }
})
</script>