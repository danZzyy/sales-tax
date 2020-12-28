import { expect } from 'chai';
import * as calculate from '../src/calculate';
import { Item, ItemType, TaxAndTotal } from '../src/types';

describe('Test calculate.ts', () => {
    describe('Test calculateSalesTax(item:Item)', () => {
        it('should return null when a null parameter is passed', () => {
            expect(calculate.calculateSalesTax(null as any)).to.be.null;
        });
        it('should add sales tax of 5% for type = Other', () => {
            const shoes: Item = {
                type: ItemType.Other,
                name: 'Shoes',
                price: 22.32,
                tax: 0.0,
                quantity: 3,
                imported: false
            };
            const pants: Item = {
                type: ItemType.Other,
                name: 'Pants',
                price: 12.55,
                tax: 0.0,
                quantity: 1,
                imported: false
            };

            const shoesResult: Item = calculate.calculateSalesTax(shoes);
            const pantsResult: Item = calculate.calculateSalesTax(pants);

            expect(shoesResult.tax).to.equal(2.25);
            expect(shoesResult.price).to.equal(24.57);
            expect(pantsResult.tax).to.equal(1.3);
            expect(pantsResult.price).to.equal(13.85);
        });
        it('should add no sales tax for type = Food, Book, or Medicine', () => {
            const food: Item = {
                type: ItemType.Food,
                name: 'Apple',
                price: 0.35,
                tax: 0.0,
                quantity: 3,
                imported: false
            };
            const book: Item = {
                type: ItemType.Book,
                name: 'Moby Dick',
                price: 10.00,
                tax: 0.0,
                quantity: 1,
                imported: false
            };
            const medicine: Item = {
                type: ItemType.Medicine,
                name: 'Meds',
                price: 8.43,
                tax: 0.0,
                quantity: 1,
                imported: false
            };

            const foodResult = calculate.calculateSalesTax(food);
            const bookResult = calculate.calculateSalesTax(book);
            const medicineResult = calculate.calculateSalesTax(medicine);

            expect(foodResult.tax).to.equal(0);
            expect(foodResult.price).to.equal(0.35);
            expect(bookResult.tax).to.equal(0);
            expect(bookResult.price).to.equal(10);
            expect(medicineResult.tax).to.equal(0);
            expect(medicineResult.price).to.equal(8.43);

        });
        it('should add tax of 10% for imported = true', () => {
            const importedFood: Item = {
                type: ItemType.Food,
                name: 'Apple',
                price: 0.35,
                tax: 0.0,
                quantity: 3,
                imported: true
            };
            const importedBook: Item = {
                type: ItemType.Book,
                name: 'Moby Dick',
                price: 10.00,
                tax: 0.0,
                quantity: 1,
                imported: true
            };
            const importedMedicine: Item = {
                type: ItemType.Medicine,
                name: 'Meds',
                price: 8.43,
                tax: 0.0,
                quantity: 1,
                imported: true
            };

            const foodResult = calculate.calculateSalesTax(importedFood);
            const bookResult = calculate.calculateSalesTax(importedBook);
            const medicineResult = calculate.calculateSalesTax(importedMedicine);

            expect(foodResult.tax).to.equal(0.05);
            expect(foodResult.price).to.equal(0.4);
            expect(bookResult.tax).to.equal(0.5);
            expect(bookResult.price).to.equal(10.5);
            expect(medicineResult.tax).to.equal(0.45);
            expect(medicineResult.price).to.equal(8.88);
           
        });
        it('should add 5% sales tax and additional 10% import tax based on base price', () => {
            const importedShoes: Item = {
                type: ItemType.Other,
                name: 'Shoes',
                price: 22.32,
                tax: 0.0,
                quantity: 3,
                imported: true
            };
            const importedPants: Item = {
                type: ItemType.Other,
                name: 'Pants',
                price: 12.55,
                tax: 0.0,
                quantity: 1,
                imported: true
            };

            const shoesResult: Item = calculate.calculateSalesTax(importedShoes);
            const pantsResult: Item = calculate.calculateSalesTax(importedPants);

            expect(shoesResult.tax).to.equal(3.35);
            expect(shoesResult.price).to.equal(25.67);
            expect(pantsResult.tax).to.equal(1.9);
            expect(pantsResult.price).to.equal(14.45);
        });
    });
    describe('Test getTotal(items: Item[])', () => {
        it('should accept empty lists and return tax:0 and total:0', () => {
            const emptyTotal: TaxAndTotal = calculate.getTotal([]);

            expect(emptyTotal.tax).to.equal(0);
            expect(emptyTotal.total).to.equal(0);
        });
        it('should return tax as sum of tax of all items and total as sum of price and tax of all items', () => {
            const itemList: Item[] = [
                {
                    type: ItemType.Food,
                    name: 'Apple',
                    price: 0.35,
                    tax: 0.05,
                    quantity: 3,
                    imported: true
                },
                {
                    type: ItemType.Book,
                    name: 'Moby Dick',
                    price: 10.00,
                    tax: 0.50,
                    quantity: 1,
                    imported: false
                },
                {
                    type: ItemType.Medicine,
                    name: 'Meds',
                    price: 8.43,
                    tax: 0.45,
                    quantity: 1,
                    imported: true
                }
            ];

            const taxAndTotal: TaxAndTotal = calculate.getTotal(itemList);

            expect(taxAndTotal.tax).to.equal(1.1);
            expect(taxAndTotal.total).to.equal(20.58);
        });
        it('should take ceiling if quantity is decimal and round if price or has more than 3 decimals', () => {
            const itemList: Item[] = [
                {
                    type: ItemType.Food,
                    name: 'Apple',
                    price: 0.3544,
                    tax: 0.0533,
                    quantity: 3.2,
                    imported: true
                },
                {
                    type: ItemType.Book,
                    name: 'Moby Dick',
                    price: 10.0011,
                    tax: 0.5011,
                    quantity: 1.4,
                    imported: false
                },
                {
                    type: ItemType.Medicine,
                    name: 'Meds',
                    price: 8.4333,
                    tax: 0.4522,
                    quantity: 1.3,
                    imported: true
                }
            ];

            const taxAndTotal: TaxAndTotal = calculate.getTotal(itemList);

            expect(taxAndTotal.tax).to.equal(2.12);
            expect(taxAndTotal.total).to.equal(40.41);
        });
    });
    describe('Test roundUp(price: number)', () => {
        it('should not round up zero', () => {
            expect(calculate.roundUp(0)).to.equal(0);
        });
        it('should round up decimals to the nearest 0.05', () => {
            expect(calculate.roundUp(0.47)).to.equal(0.5);
            expect(calculate.roundUp(5.52)).to.equal(5.55);
        });
        it('should round up decimals to the nearest 0.05 and remove decimals past the second', () => {
            expect(calculate.roundUp(10.47333)).to.equal(10.5);
            expect(calculate.roundUp(22.623333)).to.equal(22.65);
        });
    });
});