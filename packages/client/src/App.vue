<template>
  <Header />
  <main role="main">
    <router-view />
  </main>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || 'GameSwap - Ücretsiz Oyun Takas Platformu';
      },
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

main {
  margin-top: 6rem;
  margin-bottom: 6rem;
}
</style>
