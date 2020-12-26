export enum ItemType {
    Book = 'Book',
    Food = 'Food',
    Medicine = 'Medicine',
    Other =  'Other'
}

export class Item {
    type!: ItemType;
    name!: string;
    price!: number;
    tax!: number;
    quantity!: number;
    imported!: boolean;

    constructor() {}
}

export interface TaxAndTotal {
    tax: number;
    total: number;
}

export interface SalesTaxResponse {
    taxAndTotal: TaxAndTotal;
    displayReciept?: string[];
}
