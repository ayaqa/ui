<template>
    <q-layout view="hHh LpR lFf">
        <q-page-container>
            <router-view v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts"></script>