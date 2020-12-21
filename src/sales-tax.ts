import chalk from 'chalk';
import * as inquirer from 'inquirer';
import * as prompts from './prompts';
import * as calculate from './calculate';
import * as parse from './parse';
import { Item, ItemType, TaxAndTotal } from './types';
/*
    RULES:
    - Books, Food, Medicine: no sales tax
    - all other items: 10% sales tax
    - 'Imported': 5% on original price
    - for sales tax round up to nearest $0.05

*/

let promptItemLine = (itemList: Item[]) => {
    inquirer.prompt(prompts.enterItemPrompt).then(enterItem => {
        if (enterItem.another) {
            inquirer.prompt(prompts.itemPrompt).then((newItem: Item) => {
                newItem = calculate.calculateSalesTax(newItem);
                itemList.push(newItem);
                promptItemLine(itemList);
            });
        } else {
            calculateTotal(itemList);
        }
    });
};

let calculateTotal = (items: Item[]) => {
    let total: TaxAndTotal = calculate.getTotal(items);
    inquirer.prompt(prompts.receiptPrompt).then(answer => {
        console.log('Calculating Total...');
        if (answer.printreceipt) {
            parse.formatReceipt(items);
        }
        parse.formatTotal(total);
        console.log('Thank You for using the Sales Tax Calculator');
    })
};

console.log('Welcome to the Sales Tax Calculator');
promptItemLine([]);
/*
inquirer.prompt(prompts.first).then(answers => {
    if (answers.options === 'Enter Filepath') {
        inquirer.prompt(prompts.filePrompt).then(fileAns =>{
            console.log(fileAns);
        });
    }
});
*/