import { Item, TaxAndTotal } from './types';

export const formatReceipt = (items: Item[]): string[] => {
    let receiptLines: string[] = []
    items.forEach((i: Item) => {
        const line = i.quantity + (i.imported ? ' Imported ' : ' ') 
            + i.name + ': ' + (i.price * i.quantity).toFixed(2) 
            + (i.quantity > 1 ? ` (${i.quantity} @ ${i.price.toFixed(2)})`: '');
        receiptLines.push(line);
    });
    return receiptLines;
};

export const formatTotal = (taxAndTotal: TaxAndTotal): string[] => {
    let receiptLines: string[] = [];
    receiptLines.push('Sales Taxes: ' + taxAndTotal.tax.toFixed(2));
    receiptLines.push('Total: ' + taxAndTotal.total.toFixed(2));
    return receiptLines;
};