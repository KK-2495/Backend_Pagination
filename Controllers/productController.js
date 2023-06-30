import path from "path";
import fs from "fs";
import products from "../Models/products.js";

const __dirname = path.resolve();

const productsData = JSON.parse(fs.readFileSync(__dirname + '/products.json'));


export const addProduct = async (req,res) => {
    try {
        // // insert Products data to Mongodb
        const promises = productsData.map(async (productData) => {
            const { p_id, name, price, description, category } = productData;
      
            const newProduct = new products({
              Id: p_id,
              name,
              description,
              price,
              category,
            });
      
            await newProduct.save();
          });
      
          await Promise.all(promises);
    return res.send("Products added Successfully");
}

        
     catch (error) {
        return res.send(error);
    }
 }



export const getProduct = async (req,res) =>{
    try {
        const allProducts = await products.find().exec();

        const count = allProducts.length;
        return res.send({
            'Total number of Products': count.toString(),
            products: allProducts,
          });
    } catch (error) {
        return res.send(error);
    }
} 




export const categoryCount = async (req,res) =>{
    try {
        const {category} = req.body;
        const allProducts = await products.find({category}).exec();


        const count = allProducts.length;
        return res.send({
            'Total number of Products in this Category': count.toString(),
            products: allProducts,
          });
    } catch (error) {
        return res.send(error);
    }
} 


export const priceRange = async (req,res) =>{
    try {
        const {min, max} = req.body;
        const allProducts = await products.find().exec();

        const priceFilter = allProducts.filter(product => product.price >= min && product.price <= max);

        const count = priceFilter.length;
        return res.send({
            'Total number of Products in this Price Range': count.toString(),
            products: priceFilter,
          });
        
    } catch (error) {
        return res.send(error);
    }
} 


export const range = async (req,res) =>{
    try {
        const {range} = req.body;
        const allProducts = await products.find().exec();

        const priceFilter = allProducts.filter(product => product.price >= range);

        const count = priceFilter.length;
        // return res.send();
        return res.send({
            'Total number of Products in this Range': count.toString(),
            products: priceFilter,
          });
    } catch (error) {
        return res.send(error);
    }
} 


export const rangeAndCategory = async (req,res) =>{
    try {
        const {min, max,category} = req.body;
        if(!category) return res.send("category is required")
        const allProducts = await products.find({category}).exec();

        const priceFilter = allProducts.filter(product => product.price >= min && product.price <= max);

        const count = priceFilter.length;
        return res.send({
            'Total number of Products in this Price Range': count.toString(),
            products: priceFilter,
          });
        
    } catch (error) {
        return res.send(error);
    }
} 


export const limit = async (req, res) => {
    try {
      const { page, offset } = req.body;
      const limit = 5;
      const skip = (page - 1) * offset;
  
      const allProducts = await products.find().skip(skip).limit(limit).exec();
  
      const count = allProducts.length;
      return res.send({
        'Total number of Products': count.toString(),
        products: allProducts,
      });
    } catch (error) {
      return res.send(error);
    }
  };
  