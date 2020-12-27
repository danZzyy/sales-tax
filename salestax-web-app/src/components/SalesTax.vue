<template>
  <div id="sales-tax">
    <ul>
      <li v-for="(item, index) in items" :key="item.name">
        {{ item.quantity }} {{ item.name }} {{ item.price }}
        <button @click="removeItem(index)">Remove Item</button>
      </li>
    </ul>
    <div v-if="!newItem">
      <button @click="addNewItem()">Add New Item</button>
    </div>
    <div v-if="newItem">
      <div>
        <div>Quantity</div>
        <input v-model.number="quantity" step="1" type="number">
      </div>
      <div>
        <div>Name</div>
        <input v-model="name" type="text">
      </div>
      <div>
        <div>Price</div>
        <input v-model.number="price" step=".01" type="number">
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

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Item, ItemType, TaxAndTotal } from '../types';
import axios from 'axios';

@Options({
  props: {
    msg: String
  }
})
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
