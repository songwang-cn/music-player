<template>
  <van-config-provider :theme="(appStore().theme as any)">
    <router-view />
  </van-config-provider>
</template>

<script setup lang="ts">
import { appStore } from './config/store';
</script>

<style lang="scss">
</style>