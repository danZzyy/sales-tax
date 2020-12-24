<template>
  <h2>Welcome to the Sales Tax Calculator</h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SalesTax from './components/SalesTax.vue';

interface State {
  inputText: string;
}

export default defineComponent({
  name: 'App',
  data: (): State => {
    return { inputText: '' }
  },
  methods: {
    reset(){
      this.inputText = ''
    }
  },
  computed: {
    count(): number {
      return this.inputText.length
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
