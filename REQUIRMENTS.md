# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

# API Endpoints
**Products**
* Index '/products  [GET]'
* Show '/product/:id  [GET]'
* Create [token required] '/products  [POST]' {name: string, price: number, category: string}
* [OPTIONAL] Top 5 most popular products '/most_popular_products  [GET]'
* [OPTIONAL] Products by category (args: product category) '/products/:category  [GET]'<br />
**Users**
* Index [token required] '/users  [GET]'
* Show [token required] '/user/:id  [GET]'
* Create N[token required] '/users/adduser [POST]' {firstName: string, lastName: string, password: string}<br />
**Orders**
* Current Order by user (args: user id)[token required] '/order/:id  [GET]'
* [OPTIONAL] Completed Orders by user (args: user id)[token required] '/orders/:id [GET]'
* [ADDED] Add product to order [token required] '/orders/addproduct  [POST]' {quantity: number, order_id: number, product_id: number}
# Data Shapes
**Product**
* id
* name
* price
[OPTIONAL] category<br />
**User**
* id
* firstName
* lastName
* password<br />
**Orders**
* id
* user_id
* status of order (active or complete)<br />
**[ADDED] order_products**
* id
* id of each product in the order
* quantity of each product in the order