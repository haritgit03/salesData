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
