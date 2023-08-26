<script setup lang="ts"></script>

<template>
  <section class="min-h-screen flex flex-col justify-center items-center">
    <h1 class="text-6xl mb-8">404</h1>
    <RouterLink
      class="inline-block bg-yellow-300 text-3xl py-5 px-8"
      :to="{name: 'orders'}"
      >На главную</RouterLink
    >
  </section>
</template>
