<template>
    <q-expansion-item v-if="item.type === SideNavItemType.HEADER && item.children" :icon="item.icon" :label="title"
        :content-inset-level="0.1" :data-ayaqa="attr(item.ayaqa)" expand-separator :default-opened="opened">
        <slot></slot>
    </q-expansion-item>

    <q-item clickable v-ripple :to="{ name: item.route }" :active="item.route === activeRoute"
        v-if="item.type === SideNavItemType.ITEM" :data-ayaqa="attr(item.ayaqa)">
        <q-item-section avatar>
            <q-icon :name="item.icon" />
        </q-item-section>
        <q-item-section>
            {{ title }}
        </q-item-section>
    </q-item>
    <q-separator v-if="item.addSeparatorAfter" />
</template>
<script setup lang="ts">
import { SideNavItem, SideNavItemType } from 'src/consts/menu'
import useDataAttribute from 'src/composables/use-data-attribute'

const { attr } = useDataAttribute()

defineProps<{
    title: string,
    item: SideNavItem,
    activeRoute: string
    opened?: boolean
}>()
</script>