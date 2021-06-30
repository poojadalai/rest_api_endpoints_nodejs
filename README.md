# rest_api_endpoints
REST API project endpoints that can return product information and the insurance necessary to cover the risks of delivering them.

Task 1 Implement an endpoint that accepts product id as input and returns the corresponding product information.You can find this list of the products in the project json folder.

Task 2 Implement an endpoint that accepts product type id as input and returns the corresponding product type information.You can find the list of the product types in the json folder.

Task 3 Implement an endpoint that accepts product id and calculates the total cost of insurance for that product according to the rules below:

If the product sales price is less than € 500, no insurance required
If the product sales price=> € 500 but < € 2000, insurance cost is € 1000
If the product sales price=> € 2000, insurance cost is €2000
If the type of the product is a smartphone or a laptop, add € 500 more to the insurance cost.
