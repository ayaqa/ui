<template>
    <q-drawer v-model="store.app.isSideMenuOpen" side="left" :width=200 show-if-above bordered>
        <q-scroll-area class="fit">
            <q-list data-ayaqa="side-menu">
                <template v-for="(item, idx) in NAV_BAR_LIST">
                    <q-expansion-item v-if="item.type === SideNavItemType.HEADER && item.children" :key="idx"
                        :icon="item.icon" :label="t(item.title)" :content-inset-level="0.1" :data-ayaqa="item.ayaqa"
                        expand-separator default-opened>

                        <template v-for="(childItem, idx) in item.children">
                            <q-item clickable v-ripple :to="{ name: childItem.route }"
                                :active="childItem.route === activeRouterName"
                                v-if="childItem.type === SideNavItemType.ITEM" :key="idx" :data-ayaqa="item.ayaqa">
                                <q-item-section avatar>
                                    <q-icon :name="childItem.icon" />
                                </q-item-section>
                                <q-item-section>
                                    {{ t(childItem.title) }}
                                </q-item-section>
                            </q-item>
                            <q-separator v-if="childItem.addSeparatorAfter" />
                        </template>

                    </q-expansion-item>
                    <q-item clickable v-ripple :to="{ name: item.route }" :active="item.route === activeRouterName"
                        v-if="item.type === SideNavItemType.ITEM" :key="idx" :data-ayaqa="item.ayaqa">
                        <q-item-section avatar>
                            <q-icon :name="item.icon" />
                        </q-item-section>
                        <q-item-section>
                            {{ t(item.title) }}
                        </q-item-section>
                    </q-item>
                    <q-separator v-if="item.addSeparatorAfter" />
                </template>
            </q-list>
        </q-scroll-area>
    </q-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from "vue-router"

import { useAppStore } from 'src/stores'
import { NAV_BAR_LIST, SideNavItemType } from 'src/consts/menu'

const store = useAppStore()
const { t } = useI18n()
const route = useRoute()

const activeRouterName = ref('')
watch(() => route.name, (newName): void => {
    activeRouterName.value = newName?.toString() || '';
})

</script>