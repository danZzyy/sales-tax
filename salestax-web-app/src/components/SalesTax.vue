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
        <div v-if="errors.quantity" class="error-msg">Quantity required as positive integer</div>
      </div>
      <div class="new-item-input">
        <div>Name</div>
        <input v-model="name" type="text">
        <div v-if="errors.name" class="error-msg">Name required</div>
      </div>
      <div class="new-item-input">
        <div>Price</div>
        <input v-model.number="price" step=".01" type="number">
        <div v-if="errors.price" class="error-msg">Price required in no more than two decimal places</div>
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
  errors = {
    quantity: false,
    name: false,
    price: false
  };

  receipt: string[] = [];
  taxAndTotal: TaxAndTotal = {
    tax: 0,
    total: 0
  };

  validateNewItem() {
    let valid = true;
    if (!Number.isInteger(this.quantity))  {
      this.errors.quantity = true;
      valid = false;
      this.quantity = Math.ceil(this.quantity);
    } else {
      this.errors.quantity = false; 
    }

    if (this.name.length === 0) {
      this.errors.name = true;
      valid = false;
    } else {
      this.errors.name = false;
    }

    if (this.checkDecimals(this.price) > 2) {
      this.price = parseFloat(this.price.toFixed(2));
      this.errors.price = true;
      valid = false;
    } else {
      this.errors.price = false;
    }
    return valid;
  }

  calculateSalesTax() {
    const requestBody = {
      items: this.items,
      print: true
    };
    axios.post('http://localhost:3000/salestax', requestBody).then(
      res => {
        this.receipt = res.data.displayReceipt;
        this.taxAndTotal = res.data.taxAndTotal;
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
    if (this.validateNewItem()) {
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

  private checkDecimals(num: number): number {
    const numArray = num.toString().split('.');
    return numArray[1].length;
  }
}
</script>
