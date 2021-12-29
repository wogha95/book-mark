<template>
  <div>
    <guest-page v-if="!$store.state.email"></guest-page>
    <book-mark v-else></book-mark>
  </div>
</template>

<script>
import BookMark from '../components/BookMark.vue';
import GuestPage from '../components/GuestPage.vue';

export default {
  components: {
    GuestPage,
    BookMark,
  }
}
</script>

<style>

</style>