# sales-tax

This application is broken into two parts:

* Express Typescript web server located at the top level /src directory

  * in this directory install dependencies with

    ```
    npm install
    ```

  * run with 

    ```
    ts-node src/sales-tax.ts
    ```

  * the Node Express server will run at localhost:3000

* Vue Typescript web app located in the /salestax-web-app directory

  * in this directory install dependencies with

    ```
    npm install
    ```

  * run with

    ```
    npm run start
    ```

  * the Vue app will run at localhost:8080

#### Rules

* Books, Food, and Medicine are excluded from sales tax
* All other items get a 10% sales tax on their base price
* Imported items get a 5% sales tax on their base price
* Total tax is rounded up to the next $0.05

#### Usage

* Run both parts of the project as described above
* navigate in a browser to localhost:8080 to see a a web page entitled Sales Tax
* Here you can create a shopping list by specifying the following item details:
  * Quantity
  * Name
  * Price
  * Type
  * Whether it is imported
* These fields are then checked for validation and warnings are displayed if there are any errors. Otherwise the item is added to the list.
* Items can be removed from the list by clicking 'remove'
* You may add a new item
* You may calculate the sales tax for the current list
  * This makes a POST request to the Express app endpoint /salestax sending the list of items in the request body
  * This request returns a list of strings with the itemized receipt and tax and total 

#### Testing

* Unit testing is done with Mocha with the 'expect' pattern of assertion from Chai

* There are Unit Tests in both projects and can be run at the top level with

  ```
  npm run test
  ```

  

