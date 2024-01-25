<template>
  <router-view />
</template>

<script setup lang="ts">
import { appStore } from './config/store';

function loadBg() {
  const img = new Image()
  img.src = appStore().bgUrl
  img.onerror = () => {
    appStore().setBgUrl(new URL('./assets/img/wallPaper/1.png', import.meta.url).href)
  }
}

loadBg()
</script>

<style lang="scss"></style>