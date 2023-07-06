# RESTful API

Welcome to the RESTful API repository! This repository contains a RESTful API that allows you to interact with a collection of products. The API provides endpoints to filter and retrieve products based on various criteria.

## Installation

To use this API, follow the steps below:

1. Clone the repository to your local machine using the following command:

   git clone https://github.com/tanvirkamble/RESTful-api.git

2. Navigate to the project directory:

   cd RESTful-api

3. Install the required dependencies:

   npm install

4. Start the server:

   npm start

   The API will be accessible at `http://localhost:3000`.

## Endpoints

The following endpoints are available in this API:

- **GET /api/products**: Retrieves a list of all products.

## Filtering Products

You can filter the products by adding query parameters to the `/products` endpoint URL. The available filters are as follows:

- **Filter by name**: Use the `name` query parameter to filter products by their name. For example, to get all products with the name "iPhone", you can make a GET request to `/products?name=iPhone`.

- **Filter by category**: Use the `category` query parameter to filter products by their category. For example, to get all products in the "Electronics" category, you can make a GET request to `/products?category=Electronics`.

- **Filter by price**: Use the `price` query parameter to filter products by their price. For example, to get all products with a price less than $50, you can make a GET request to `/products?price_lte=50`.

You can combine multiple filters together to narrow down the results further.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name for your feature or bug fix.
3. Make the necessary changes in your branch.
4. Test your changes thoroughly.
5. Commit and push your changes to your forked repository.
6. Submit a pull request to the main repository.

Thank you for your interest in contributing to the RESTful API repository!

You can now copy the entire code block and paste it as a README file in your repository.
