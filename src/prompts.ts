import { ItemType } from './types';

export const first = [
    {
        type: 'list',
        name: 'options',
        message: 'Welcome to the Sales Tax Calculator.\nHow would you like to enter data?',
        choices: ['Enter Manually', 'Enter Filepath', 'Exit']
    }   
];

export const filePrompt = [
    {
        type: 'input',
        name: 'filepath',
        message: 'Enter relative filepath'
    }
];
export const enterItemPrompt = [
    {
        type: 'confirm',
        name: 'another',
        message: 'Add an item?'
    }
];

export const itemPrompt = [
    {
        type: 'list',
        name: 'type',
        message: 'What type of item is this?',
        choices: [ItemType.Book, ItemType.Food, ItemType.Medicine, ItemType.Other]
    },
    {
        type: 'text',
        name: 'name',
        message: 'What is it called?'
    },
    {
        type: 'number',
        name: 'price',
        message: 'How much per item? (USD)'
    },
    {
        type: 'confirm',
        name: 'imported',
        message: 'Is it imported?'
    },
    {
        type: 'number',
        name: 'quantity',
        message: 'How many?' 
    }
];

export const receiptPrompt = [
    {
        type: 'confirm',
        name: 'printreceipt',
        message: 'Print Receipt?'
    }
];