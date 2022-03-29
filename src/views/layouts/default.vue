<template>
  <q-layout>
    <q-page class="window-height window-width row justify-center items-center">
      <div class="row">
        <q-card square class="shadow-10" style="width: 600px;">
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </q-card>
      </div>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
</script>