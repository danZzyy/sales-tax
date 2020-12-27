<template>
  <div>
    <h1>Sales Tax Vue App</h1>
    <ul>
      <li>Books, Food, Medicine: no sales tax</li>
      <li>all other items: 10% sales tax</li>
      <li>'Imported': 5% on original price</li>
      <li>for sales tax round up to nearest $0.05</li>
    </ul>
    <SalesTax/>
  </div>
</template>

<style scoped>
@import 'app-style.css';
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SalesTax from './components/SalesTax.vue';

@Options({
  components: {
    SalesTax
  },
})
export default class App extends Vue {}
</script>
