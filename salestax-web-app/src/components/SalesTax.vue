<template>
  <div id="sales-tax">
    <ul>
      <li v-for="item in items" :key="item.name">
        {{ item.quantity }} {{ item.name }} {{ item.price }}
      </li>
    </ul>
    <div v-if="!newItem">
      <button @click="addNewItem()">Add New Item</button>
    </div>
    <div v-if="newItem">
      <div>
        <div>Quantity</div>
        <input v-model="quantity" type="number">
      </div>
      <div>
        <div>Name</div>
        <input v-model="name" type="text">
      </div>
      <div>
        <div>Price</div>
        <input v-model="price" type="number">
      </div>
      <div>
        <div>Type</div>
        <select name="" v-model="type">
          <option value="Food">Food</option>
          <option value="Book">Book</option>
          <option value="Medicine">Medicine</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <input type="checkbox" value="Imported" v-model="imported">
      </div>
      <div>
        <button @click="saveNewItem()">Save Item</button>
      </div>
    </div>
    <button @click="getSalesTax()">Calculate Sales Tax</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Item, ItemType } from '../types';

@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  msg!: string;
  newItem: boolean = false;
  items: Item[] = [];
  type = ItemType.Other; 
  quantity = 0;
  name = '';
  price = 0.0;
  imported = false;

  calculateSalesTax() {
    return null;
  }

  addNewItem() {
    this.newItem = true;
  }

  saveNewItem() {
    const item: Item = new Item();
    item.type = this.type;
    item.name = this.name;
    item.quantity = this.quantity;
    item.price = this.price;
    item.imported = this.imported;

    this.type = ItemType.Other;
    this.quantity = 0;
    this.name = '';
    this.price = 0.0;
    this.imported = false;
    this.items.push(item);

    this.newItem = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
