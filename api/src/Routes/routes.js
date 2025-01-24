import Router from 'express';
import productRoutes from './product.routes.js';


const router = Router();

// Configurar los routers
router.use('/products', productRoutes);


export default router;