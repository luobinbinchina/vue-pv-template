<template lang="html">
  <div class="setting-up">
    <Building></Building>
  </div>
</template>

<script>
  import Building from '@/components/common/building/building';

  export default {
    components: {
      Building
    },
  }
</script>

<style lang="css">
  .setting-up {
    background: #eee;
  }
  .setting-up .setting-up-img {
    width: 100%;
  }
</style>
