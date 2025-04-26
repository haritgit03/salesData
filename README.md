# Sales Data API

A simple Node.js Express API to manage and retrieve sales data with support for filtering, searching, sorting, and pagination.

## Features

- **GET /api/sales**: Fetch all sales data with pagination.
- **GET /api/sales/search**: Search sales data by customer name.
- **GET /api/sales/sort**: Sort sales data by any field (e.g., product name, date of sale).
- **POST /api/sales**: Add new sales data.
- **PUT /api/sales/:orderId**: Update a sales record by Order ID.
- **DELETE /api/sales/:orderId**: Delete a sales record by Order ID.
- **Pagination**: Supports paginated results for sales data.

## Sample API and Response
## Get All Sales (with Pagination)

URL: GET /api/sales?page=1&limit=5
Response: {
  "success": true,
  "count": 5,
  "total": 50,
  "totalPages": 10,
  "currentPage": 1,
  "data": [
    {
      "_id": "662b4a1c9d04e3eafc6b1234",
      "orderId": "ORD001",
      "productName": "Laptop",
      "region": "North",
      "dateOfSale": "2024-04-25T00:00:00.000Z",
      ...
    }
  ]
}

-----------------------------------------------------
## Search Sales by Customer Name
## Create New Sale
URL: GET /api/sales/search
Example Request: 
GET /api/sales/search?customerName=John
Response: 
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "662b4a1c9d04e3eafc6b5678",
      "orderId": "ORD045",
      "customerName": "John Doe",
      "productName": "Mobile",
      ...
    }
  ]
}
-------------------------------------------------------

## Sort Sales Data
URL: GET /api/sales/sort
Example Request: GET /api/sales/sort?sortBy=unitPrice&order=asc
Response: 
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "662b4a1c9d04e3eafc6b7890",
      "orderId": "ORD010",
      "unitPrice": 150,
      ...
    }
  ]
}
------------------------------------------------------------
## Create New Sale
POST /api/sales
Request Body: 
{
  "orderId": "ORD101",
  "productId": "P001",
  "customerId": "C001",
  "productName": "Smartphone",
  "category": "Electronics",
  "region": "South",
  "dateOfSale": "2024-04-26",
  "quantitySold": 2,
  "unitPrice": 300,
  "discount": 10,
  "shippingCost": 20,
  "paymentMethod": "Credit Card",
  "customerName": "Alice Johnson",
  "customerEmail": "alice@example.com",
  "customerAddress": "123 Street, City"
}

Response: 
{
  "message": "Sale created successfully",
  "newSale": {
    "_id": "662b4a1c9d04e3eafc6b9999",
    "orderId": "ORD101",
    "productName": "Smartphone",
    ...
  }
}
-----------------------------------------------------------------

## Update Sale by Order ID
PUT /api/sales/:orderId

Request body:
{
  "quantitySold": 3,
  "discount": 15
}

Response: 
{
  "message": "Sale updated successfully",
  "updatedSale": {
    "orderId": "ORD101",
    "quantitySold": 3,
    "discount": 15,
    ...
  }
}
-------------------------------------------------------

## Delete Sale by Order ID
URL: DELETE /api/sales/:orderId
Example Request: DELETE /api/sales/ORD101

Response:
{
  "message": "Sale deleted successfully",
  "deletedSale": {
    "orderId": "ORD101",
    ...
  }
}

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

1. Clone the repository:
   git clone <https://github.com/haritgit03/salesData>

Start the server: node app.js
The server will run on http://localhost:3000 by default
