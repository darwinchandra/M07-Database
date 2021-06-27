<template>
  <div id="app">
      <div class="display-6 mx-auto w-50"><marquee behavior="alternate" class="mx-auto d-block">TUGAS WEB-LANJUTAN</marquee></div>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>