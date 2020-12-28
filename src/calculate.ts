import { isConstructorDeclaration } from 'typescript';
import { Item, ItemType, TaxAndTotal } from './types';

export const calculateSalesTax = (item: Item): Item  => {
    if (item === null) {
        return null as any;
    }
    let tax = 0.0;
    if (item.type === ItemType.Other) {
        tax += item.price * 0.1;
    }
    if (item.imported) {
        tax += item.price * 0.05;
    }
    item.tax = roundUp(tax);
    item.price += item.tax;
    item.price = parseFloat(item.price.toFixed(2));
    return item;
};

export const getTotal = (items: Item[]): TaxAndTotal => {
    let total = 0;
    let tax = 0;
    items.forEach((i: Item) => {
        let quantity = Math.ceil(i.quantity);
        total += quantity * i.price;
        tax += quantity * i.tax;
    });
    tax = parseFloat(tax.toFixed(2));
    total = total + tax;
    total = parseFloat(total.toFixed(2));
    return { tax: tax, total: total };
};

export const roundUp = (price: number): number => {
    return parseFloat((Math.ceil(price * 20) / 20).toFixed(2));
};
