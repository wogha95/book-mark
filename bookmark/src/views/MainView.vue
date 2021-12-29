<template>
  <div>
    <guest v-if="!$store.state.email"></guest>
    <book-mark v-else></book-mark>
  </div>
</template>

<script>
import BookMark from '../components/BookMark.vue';
import Guest from '../components/Guest.vue';

export default {
  components: {
    Guest,
    BookMark,
  }
}
</script>

<style>

</style>