<script setup lang="ts">
import StradaHeader from '@/components/StradaHeader.vue'
import {ref, watchEffect} from 'vue'
import {useRoute} from 'vue-router'
const route = useRoute()

const isNeedHeader = ref(false)
watchEffect(() => {
  isNeedHeader.value = route.meta.isNeedHeader as boolean
})
</script>

<template>
  <div class="min-h-screen bg-gray-200">
    <StradaHeader v-if="isNeedHeader" />
    <div class="container mx-auto">
      <RouterView />
    </div>
  </div>
</template>
