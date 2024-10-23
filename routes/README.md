# Personal Financial Records Management API

This project is a RESTful API for managing personal financial records, allowing users to record their income and expenses, retrieve past transactions, and get summaries by category or time period.

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**

## Features
- Record income and expenses
- Retrieve all transactions or by specific ID
- Update and delete transactions
- Get transaction summaries (total income, total expenses, and balance) with optional filters (by date range or category)


## To run the backend
 - command will be 
   npm run dev

## API Endpoints
 POST /api/transactions/add: Add a new transaction (income or expense).
 GET /api/transactions: Retrieve all transactions.
 GET /api/transactions/:id: Retrieve a specific transaction by ID.
 PUT /api/transactions/:id: Update a transaction by ID.
 DELETE /api/transactions/:id: Delete a transaction by ID.
 GET /api/summary:


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/personal-finance-api.git
