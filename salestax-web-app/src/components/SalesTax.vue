<template>
  <div id="sales-tax">
    <ul>
      <li v-for="(item, index) in items" :key="item.name" class="item">
        <div class="item-details">{{ item.quantity }} {{ item.imported ? 'Imported' : '' }} {{ item.name }} {{ item.price }}</div>
        <button class="remove-btn" @click="removeItem(index)">Remove Item</button>
      </li>
    </ul>
    <div v-if="!newItem" class="action-btn">
      <button @click="addNewItem()">Add New Item</button>
    </div>
    <div v-if="newItem">
      <div class="new-item-input">
        <div>Quantity</div>
        <input v-model.number="quantity" step="1" type="number">
      </div>
      <div class="new-item-input">
        <div>Name</div>
        <input v-model="name" type="text">
      </div>
      <div class="new-item-input">
        <div>Price</div>
        <input v-model.number="price" step=".01" type="number">
      </div>
      <div class="new-item-input">
        <div>Type</div>
        <select name="" v-model="type">
          <option value="Food">Food</option>
          <option value="Book">Book</option>
          <option value="Medicine">Medicine</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="new-item-input">
        <input type="checkbox" value="Imported" v-model="imported">Imported
      </div>
      <div>
        <button @click="saveNewItem()">Save Item</button>
      </div>
    </div>
    <button @click="calculateSalesTax()">Calculate Sales Tax</button>
    <div>
      <div v-for="line in receipt" :key="line">
        {{ line }}
      </div>
    </div>
  </div>
</template>
<style scoped>
@import 'style.css';
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Item, ItemType, TaxAndTotal } from '../types';
import axios from 'axios';

@Options({})
export default class HelloWorld extends Vue {
  msg!: string;
  newItem = false;
  items: Item[] = [];
  type = ItemType.Other; 
  quantity = 1;
  name = '';
  price = 0.01;
  imported = false;

  receipt: string[] = [];
  taxAndTotal: TaxAndTotal = {
    tax: 0,
    total: 0
  };

  calculateSalesTax() {
    const requestBody = {
      items: this.items,
      print: true
    };
    console.log(requestBody);
    axios.post('http://localhost:3000/salestax', requestBody).then(
      res => {
        this.receipt = res.data.displayReceipt;
        this.taxAndTotal = res.data.taxAndTotal;
        console.log(res);
      }
    );
  }

  addNewItem() {
    this.newItem = true;
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  saveNewItem() {
    const item: Item = new Item();
    item.type = this.type;
    item.name = this.name;
    item.quantity = this.quantity;
    item.price = this.price;
    item.imported = this.imported;

    this.type = ItemType.Other;
    this.quantity = 1;
    this.name = '';
    this.price = 0.01;
    this.imported = false;
    this.items.push(item);

    this.newItem = false;
  }
}
</script>
