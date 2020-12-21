export enum ItemType {
    Book = 'Book',
    Food = 'Food',
    Medicine = 'Medicine',
    Other =  'Other'
}

export interface Item {
    type: ItemType;
    name: string;
    price: number;
    tax: number;
    quantity: number;
    imported: boolean;
}

export interface TaxAndTotal {
    tax: number;
    total: number;
}