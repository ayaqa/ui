<template>
    <q-layout>
        <q-page-container>
            default layout
            <router-view :key="key" v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
</script>