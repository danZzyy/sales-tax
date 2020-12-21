# sales-tax

In the top level directory, you will find a package.json file listing all the dependencies for this application. Run this command:

```
npm install
```

To run the application run this command (uses relative path to source file in windows):

```
ts-node src\sales-tax.ts
```

#### Rules

* Books, Food, and Medicine are excluded from sales tax
* All other items get a 10% sales tax on their base price
* Imported items get a 5% sales tax on their base price
* Total tax is rounded up to the next $0.05

#### Usage

The command line application was made possible with the npm package 

[inquirer]: https://www.npmjs.com/package/inquirer

 The application starts with the following prompt:

```
Welcome to the Sales Tax Calculator
? Add an item? (Y/n)_
```

Selecting Yes will prompt you for info about the item

```
? What type of item is this? (Use arrrow keys)
> Book
  Food
  Medicine
  Other
```

```
? What is it called? _
```

```
? How much per item? (USD) _
```

```
? Is it imported? (Y/n)
```

```
? How many? _
```

Then thee "Add item" prompt will come up again and loop until No is selected

You can choose to include an itemized receipt

```
? Print Receipt? (Y/n)
```

the tax and total are then output

```
Sales Taxes: #.##
Total: #.##
```

