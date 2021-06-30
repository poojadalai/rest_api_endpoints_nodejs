//initializing required Express modules
const express = require('express');
const fs = require('fs');
const app = express();
const routes = express.Router();

//read json files using file system
let productData = fs.readFileSync('./json_data/products.json');
let producTypesJson = fs.readFileSync('./json_data/product_types.json')

//parsing json to get js object
let productDetails = JSON.parse(productData);
let productTypeData = JSON.parse(producTypesJson);

/*************************GET (PRODUCT BY ID)***********************/
routes.get("/getProductById", (req, res) => {
    //declaring empty array
    let isFound = [];
    //Using array filter method to check each id in the productDetails
    productDetails.filter(productDetail => {
        if (productDetail.id == req.body.id) {
            isFound.push(productDetail);
        }
    })
    //Using ternary operator to check and send json respone to client
    res.json((isFound.length > 0) ? { status: "success", data: isFound } : { status: "success", message: "The product with the provided ID does not exist" });
});

/*************************GET (PRODUCT TYPE BY ID)***********************/
routes.get("/getProductTypeId", (req, res) => {
    //declaring empty array
    let isTypeFound = [];

    //Using array filter method to check each id in the productTypeData
    productTypeData.filter(e => {
        if (e.id == req.body.id) {
            isTypeFound.push(e);
        }
    })
    //Using ternary operator to check and send json respone to client
    res.json((isTypeFound.length > 0) ? { status: "success", data: isTypeFound } : { status: "success", message: "The product type with the provided ID does not exist" });
});


/*************************GET (PRODUCT INSURANCE BY ID)***********************/
routes.get("/getProductInsCostById", (req, res) => {
    let insuranceCost = 0;
    let getProductDetails = {};
    let userMessage = "The product and it type does not exist";

    //Using array filter method to check each id in the productDetails
    //Getting Product Type and SalesPrice from productDetails and adding in getProductDetails
    productDetails.filter(productDetail => {
        if (productDetail.id == req.body.id) {
            getProductDetails.productTypeId = productDetail.productTypeId;
            getProductDetails.salesPrice = productDetail.salesPrice;
        }
    })
    //console.log(getProductDetails);
    productTypeData.filter((t => {
        if (t.id == getProductDetails.productTypeId) {

            if (t.canBeInsured == true) {
                // If the product sales price is less than € 500, no insurance required
                if (getProductDetails.salesPrice < 500) {
                    insuranceCost = 0;
                    userMessage = "The insurance cost is 0.";
                }
                // If the product sales price => € 500 but < € 2000, insurance cost is € 1000
                else if (getProductDetails.salesPrice >= 500 && getProductDetails.salesPrice < 2000) {
                    insuranceCost = 1000;
                }
                // If the product sales price => € 2000, insurance cost is €2000
                else if (getProductDetails.salesPrice >= 2000) {
                    insuranceCost = 2000;
                }
                // If the type of the product is a smartphone or a laptop, add € 500 more to the insurance cost
                if (t.name == "Laptops" || t.name == "Smartphones") {
                    insuranceCost += 500;
                }

            } else {
                //Send JSON message if product type is not insured
                userMessage = "The Product is not entitled for insurance.";
            }
        }
    }))
    //Using ternary operator to check and send json respone to client
    res.json((insuranceCost > 0) ? { status: "success", data: `Insurance cost is ${insuranceCost}` } : { status: "success", message: userMessage });
});

module.exports = routes;