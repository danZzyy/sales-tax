import * as calculate from './calculate';
import * as parse from './parse';
import { Item, ItemType, TaxAndTotal, SalesTaxResponse } from './types';

import { json } from 'body-parser';
import express from 'express';

const app = express();
app.use(json());
const port = 3000;
/*
    RULES:
    - Books, Food, Medicine: no sales tax
    - all other items: 10% sales tax
    - 'Imported': 5% on original price
    - for sales tax round up to nearest $0.05

*/
app.post('/salestax', (req, res) => {
    const body = req.body;
    if (!body) {
        res.status(400);
        res.send('POST Body Required');
    } else {
        const itemsPreTax: Item[] = body.items;
        let itemsPostTax: Item[] = [];
        itemsPreTax.forEach((item: Item) => {
            itemsPostTax.push(calculate.calculateSalesTax(item));
        });
        let taxAndTotal = calculate.getTotal(itemsPostTax);
        let resBody: SalesTaxResponse = {
            taxAndTotal: taxAndTotal
        };

        if (body.print) {
            let receiptLines = parse.formatReceipt(itemsPostTax);
            receiptLines = receiptLines.concat(parse.formatTotal(taxAndTotal));
            resBody.displayReciept = receiptLines;
        }
        res.status(200);
        res.send(resBody);
    }
});

app.listen(port, () => {
    console.log('Listening at localhost:3000');
});
