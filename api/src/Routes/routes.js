import Router from 'express';
import productRoutes from './product.routes.js';
import userRoutes from './user.routes.js';


const router = Router();

// Configurar los routers
router.use('/products', productRoutes);
router.use('/users', userRoutes);


export default router;