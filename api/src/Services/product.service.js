import ProductDAO from '../DAO/product.dao.js';


class ProductService {

    async getProductCategoryNames(search) {
        try {
          const products = await ProductDAO.getProductCategoryNames(search);
          return products;
        } catch (error) {
          console.error('Error en el servicio de productos:', error);
          throw error;
        }
      }

}

export default new ProductService();