<template>
  <div class="home">
    x
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {}
}
</script>
<style scoped lang="scss">
  @tailwind base;

  @tailwind components;

  @tailwind utilities;
  @tailwind screens;

  .home {
    transform: scale();
    @apply flex bg-teal-300 text-3xl;
  }

  @screen xl {
    .home {
      @apply bg-red-300 ;
    }
  }
</style>
