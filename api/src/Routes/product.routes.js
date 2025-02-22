import { Router } from 'express';
import productController from '../Controllers/product.controller.js';


const router = Router();


router.get('/productSearch', productController.productSearch);
router.get("/:productID", productController.getDetail);


export default router;