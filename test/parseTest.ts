import { expect } from 'chai';
import * as parse from '../src/parse';
import { Item, ItemType, TaxAndTotal } from '../src/types';

describe('Test parse.ts', () => {
    describe('Test formatReceipt(items: Item[])', () => {
        it('should return an empty list for an empty or null item parameter', () => {
            const nullReceipt = parse.formatReceipt(null as any);
            const emprtyReceipt = parse.formatReceipt([]);

            expect(nullReceipt.length).to.equal(0);
            expect(emprtyReceipt.length).to.equal(0);
        });
        it('should display single items and their price', () => {
            const items: Item[] = [
                {
                    type: ItemType.Other,
                    name: 'Shoes',
                    price: 22.32,
                    tax: 0.0,
                    quantity:  1,
                    imported: false
                },
                {
                    type: ItemType.Other,
                    name: 'Pants',
                    price: 12.55,
                    tax: 0.0,
                    quantity: 1,
                    imported: false
                },
                {
                    type: ItemType.Food,
                    name: 'Apple',
                    price: 0.35,
                    tax: 0.0,
                    quantity: 1,
                    imported: false
                }
            ];

            const receipt = parse.formatReceipt(items);

            expect(receipt[0]).to.equal('1 Shoes: 22.32');
            expect(receipt[1]).to.equal('1 Pants: 12.55');
            expect(receipt[2]).to.equal('1 Apple: 0.35');

        });
        it('should display items with quantity 2+ with total and individual price', () => {
            const items: Item[] = [
                {
                    type: ItemType.Other,
                    name: 'Shoes',
                    price: 22.32,
                    tax: 0.0,
                    quantity:  2,
                    imported: false
                },
                {
                    type: ItemType.Other,
                    name: 'Pants',
                    price: 12.55,
                    tax: 0.0,
                    quantity: 3,
                    imported: false
                },
                {
                    type: ItemType.Food,
                    name: 'Apple',
                    price: 0.35,
                    tax: 0.0,
                    quantity: 5,
                    imported: false
                }
            ];

            const receipt = parse.formatReceipt(items);

            expect(receipt[0]).to.equal('2 Shoes: 44.64 (2 @ 22.32)');
            expect(receipt[1]).to.equal('3 Pants: 37.65 (3 @ 12.55)');
            expect(receipt[2]).to.equal('5 Apple: 1.75 (5 @ 0.35)');
        });
        it('should indicate imported items', () => {
            const items: Item[] = [
                {
                    type: ItemType.Other,
                    name: 'Shoes',
                    price: 22.32,
                    tax: 0.0,
                    quantity:  2,
                    imported: false
                },
                {
                    type: ItemType.Other,
                    name: 'Pants',
                    price: 12.55,
                    tax: 0.0,
                    quantity: 1,
                    imported: true
                },
                {
                    type: ItemType.Food,
                    name: 'Apple',
                    price: 0.35,
                    tax: 0.0,
                    quantity: 5,
                    imported: true
                }
            ];

            const receipt = parse.formatReceipt(items);

            expect(receipt[0]).to.equal('2 Shoes: 44.64 (2 @ 22.32)');
            expect(receipt[1]).to.equal('1 Imported Pants: 12.55');
            expect(receipt[2]).to.equal('5 Imported Apple: 1.75 (5 @ 0.35)');
        });
    });
    describe('Test formatTotal(taxAndTotal: TaxAndTotal)', () => {
        it('should display zero for a null taxAndTotal provided', () => {
            const taxAndTotalLines: string[] = parse.formatTotal(null as any);
            expect(taxAndTotalLines[0]).to.equal('Sales Taxes: 0.00');
            expect(taxAndTotalLines[1]).to.equal('Total: 0.00');
        });
        it('should format the taxAndTotal', () => {
            const taxAndTotal: TaxAndTotal = {
                tax: 12.35,
                total: 132.35
            };
            let taxAndTotalLines: string[] = parse.formatTotal(taxAndTotal);
            expect(taxAndTotalLines[0]).to.equal('Sales Taxes: 12.35');
            expect(taxAndTotalLines[1]).to.equal('Total: 132.35');
        });
        it('should format and round tax and total values to two decimal places', () => {
            const taxAndTotal: TaxAndTotal = {
                tax: 12.3565,
                total: 132.35123
            };
            const taxAndTotalLines: string[] = parse.formatTotal(taxAndTotal);
            expect(taxAndTotalLines[0]).to.equal('Sales Taxes: 12.36');
            expect(taxAndTotalLines[1]).to.equal('Total: 132.35');
        });
    });
});