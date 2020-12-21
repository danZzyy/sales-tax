import { Item, TaxAndTotal } from './types';
import * as fs from 'fs';
//import * as lineReader from 'line-reader';

/*
export const parseFromFile = (filepath: string): Item[] => {
    lineReader.open(filepath, line => {
        let words = line.split(' ');
        let quantity = words[0];
        let price = words[-1];
    });
    
    return [];
}*/

export const formatReceipt = (items: Item[]) => {
    items.forEach((i: Item) => {
        console.log(
            i.quantity + (i.imported ? ' Imported ' : ' ') 
            + i.name + ': ' + (i.price * i.quantity).toFixed(2) 
            + (i.quantity > 1 ? ` (${i.quantity} @ ${i.price.toFixed(2)})`: '')
        );
    });
};

export const formatTotal = (taxAndTotal: TaxAndTotal) => {
    console.log('Sales Taxes: ' + taxAndTotal.tax.toFixed(2));
    console.log('Total: ' + taxAndTotal.total.toFixed(2));
};