<template>
  <div id="sales-tax">
    <ul>
      <li v-for="item in items" :key="item.name">
        {{ item.quantity }} {{ item.name }} {{ item.price }}
      </li>
    </ul>
    <button @click="getSalesTax">Calculate Sales Tax</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Item } from '../types';
import * as http from 'http';

export default defineComponent({
  name: 'SalesTaxt',
  props: {
    inputText: {
      type: String,
      required: false
    },
    items: {
      type: Item[],
      required: true
    },
    taxAndTotal: {

    }
  },
  data() {
    return {
      items = []
    }
  },
  computed: {
    count(): number {
      return this.inputText.length
    }
  },
  methods: {
    getSalesTax: () => {
      http.request({
        url: 'localhost:3000/salestax',
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
          items: this.items
        })
        
      }, res => {
        console.log(res);
      });
    }
  }
});
</script>