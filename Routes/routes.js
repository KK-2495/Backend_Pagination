import express from "express";
import { addProduct, categoryCount, getProduct, limit, priceRange, range, rangeAndCategory } from "../Controllers/productController.js";

const router = express.Router();

router.post('/addproduct', addProduct);

router.get('/', getProduct);
router.get('/category', categoryCount);
router.get('/pricerange', priceRange);
router.get('/range', range);
router.get('/rangeandcategory', rangeAndCategory);
router.get('/limit', limit);


export default router;